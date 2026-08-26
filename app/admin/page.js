"use client";

import { useState, useMemo } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");

  const load = async (pw) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/list", {
        headers: { "x-admin-password": pw },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setRows(data.applications || []);
      setAuthed(true);
    } catch (e) {
      setError(e.message);
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    load(password);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.full_name, r.mobile, r.city, r.routes]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [rows, query]);

  const exportCsv = () => {
    const cols = [
      "created_at", "full_name", "mobile", "city", "total_buses",
      "bus_types", "routes", "ticketing", "timeline", "language",
    ];
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [cols.join(",")];
    filtered.forEach((r) => {
      lines.push(cols.map((c) => esc(Array.isArray(r[c]) ? r[c].join(" | ") : r[c])).join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `pathyatra-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100 px-5">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 w-full max-w-sm"
        >
          <h1 className="text-xl font-extrabold text-slate-900">PathYatra Admin</h1>
          <p className="text-sm text-slate-500 mt-1">Enter admin password to view applications.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/40"
          />
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-bold py-3 rounded-full transition"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-lg font-extrabold text-brand-dark">
            PathYatra Admin <span className="text-slate-400 font-medium text-sm">({filtered.length} applications)</span>
          </h1>
          <div className="flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, mobile, city, route"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-brand w-56"
            />
            <button onClick={() => load(password)} className="text-sm font-semibold px-3 py-2 rounded-full border border-slate-300 hover:border-brand">
              Refresh
            </button>
            <button onClick={exportCsv} className="text-sm font-semibold px-3 py-2 rounded-full bg-accent text-slate-900 hover:brightness-110">
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-6">
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                {["Date", "Name", "Mobile", "City", "Buses", "Type", "Routes", "Ticketing", "Timeline", "Lang"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50 align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                    {new Date(r.created_at).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{r.full_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={`https://wa.me/91${r.mobile}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                      {r.mobile}
                    </a>
                  </td>
                  <td className="px-4 py-3">{r.city}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.total_buses}</td>
                  <td className="px-4 py-3">{Array.isArray(r.bus_types) ? r.bus_types.join(", ") : ""}</td>
                  <td className="px-4 py-3">{r.routes}</td>
                  <td className="px-4 py-3">{r.ticketing}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.timeline}</td>
                  <td className="px-4 py-3 uppercase text-slate-400">{r.language}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-10 text-center text-slate-400">No applications yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { translations } from "../lib/translations";
import { supabase } from "../lib/supabaseClient";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/C5i3D8BNkcY6wNqwqE07lh?s=sh&p=a&mlu=0&ilr=0";

const SOCIALS = [
  { name: "Instagram", url: "https://www.instagram.com/pathyatra", icon: "📸" },
  { name: "YouTube", url: "https://www.youtube.com/@pathyatraapp", icon: "▶️" },
  { name: "X", url: "https://x.com/PathYatra", icon: "𝕏" },
  { name: "Facebook", url: "https://www.facebook.com/share/1Bq6cjgMod/", icon: "📘" },
];

function inputCls(error) {
  return `w-full rounded-xl border px-4 py-3 text-slate-800 outline-none transition focus:ring-2 focus:ring-brand/40 ${
    error ? "border-red-400 bg-red-50" : "border-slate-300 focus:border-brand"
  }`;
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
    </label>
  );
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    city: "",
    total_buses: "",
    bus_types: [],
    routes: "",
    ticketing: "",
    timeline: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggleBusType = (type) => {
    setForm((f) => ({
      ...f,
      bus_types: f.bus_types.includes(type)
        ? f.bus_types.filter((x) => x !== type)
        : [...f.bus_types, type],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = t.form.required;
    if (!/^[0-9]{10}$/.test(form.mobile.trim())) e.mobile = t.form.invalidMobile;
    if (!form.city.trim()) e.city = t.form.required;
    if (!form.total_buses) e.total_buses = t.form.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setSubmitting(true);
    try {
      if (!supabase) {
        // No backend configured yet — still show success for preview.
        console.warn("Supabase not configured; skipping insert.");
      } else {
        const { error } = await supabase.from("pre_applications").insert([
          {
            full_name: form.full_name.trim(),
            mobile: form.mobile.trim(),
            city: form.city.trim(),
            total_buses: form.total_buses,
            bus_types: form.bus_types,
            routes: form.routes.trim(),
            ticketing: form.ticketing,
            timeline: form.timeline,
            language: lang,
          },
        ]);
        if (error) throw error;
      }
      setShowSuccess(true);
      setForm({
        full_name: "",
        mobile: "",
        city: "",
        total_buses: "",
        bus_types: [],
        routes: "",
        ticketing: "",
        timeline: "",
      });
    } catch (err) {
      console.error(err);
      setServerError(t.form.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () =>
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-brand-dark text-lg">
            <img src="/logo.jpeg" alt="PathYatra" className="h-9 w-9 rounded-lg object-cover" />
            PathYatra <span className="text-brand">Partner</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="text-sm font-semibold px-3 py-1.5 rounded-full border border-slate-300 hover:border-brand hover:text-brand transition"
            >
              {t.langLabel}
            </button>
            <button
              onClick={scrollToForm}
              className="hidden sm:inline-flex bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-full transition"
            >
              {t.nav.apply}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-light text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            🔥 {t.hero.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight max-w-3xl">
            {t.hero.heading}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/90 max-w-2xl">
            {t.hero.sub}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
            <button
              onClick={scrollToForm}
              className="bg-accent hover:brightness-110 text-slate-900 font-bold px-7 py-3.5 rounded-full shadow-lg transition text-lg"
            >
              {t.hero.cta}
            </button>
            <span className="text-sm text-white/85 flex items-center gap-2">
              🏆 {t.hero.trust}
            </span>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center">
          {t.benefits.title}
        </h2>
        <p className="text-center text-slate-500 mt-2">{t.benefits.subtitle}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.items.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="text-4xl">{b.icon}</div>
              <h3 className="mt-4 font-bold text-slate-900">{b.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="bg-slate-100 py-16">
        <div className="mx-auto max-w-2xl px-5">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-9">
            <h2 className="text-2xl font-extrabold text-slate-900">{t.form.title}</h2>
            <p className="text-slate-500 mt-1 text-sm">{t.form.subtitle}</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-7" noValidate>
              {/* Owner details */}
              <fieldset className="space-y-4">
                <legend className="text-xs font-bold uppercase tracking-wider text-brand mb-1">
                  {t.form.ownerSection}
                </legend>
                <Field label={t.form.fullName} error={errors.full_name}>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={(e) => update("full_name", e.target.value)}
                    placeholder={t.form.fullNamePh}
                    className={inputCls(errors.full_name)}
                  />
                </Field>
                <Field label={t.form.mobile} error={errors.mobile}>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={form.mobile}
                    onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder={t.form.mobilePh}
                    className={inputCls(errors.mobile)}
                  />
                </Field>
                <Field label={t.form.city} error={errors.city}>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder={t.form.cityPh}
                    className={inputCls(errors.city)}
                  />
                </Field>
              </fieldset>

              {/* Fleet details */}
              <fieldset className="space-y-4">
                <legend className="text-xs font-bold uppercase tracking-wider text-brand mb-1">
                  {t.form.fleetSection}
                </legend>
                <Field label={t.form.totalBuses} error={errors.total_buses}>
                  <select
                    value={form.total_buses}
                    onChange={(e) => update("total_buses", e.target.value)}
                    className={inputCls(errors.total_buses)}
                  >
                    <option value="">{t.form.selectPlaceholder}</option>
                    {t.busCountOpts.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label={t.form.busType}>
                  <div className="flex flex-wrap gap-2">
                    {t.form.busTypes.map((type) => {
                      const active = form.bus_types.includes(type);
                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => toggleBusType(type)}
                          className={`px-3.5 py-2 rounded-full text-sm font-medium border transition ${
                            active
                              ? "bg-brand text-white border-brand"
                              : "bg-white text-slate-600 border-slate-300 hover:border-brand"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <Field label={t.form.routes}>
                  <input
                    type="text"
                    value={form.routes}
                    onChange={(e) => update("routes", e.target.value)}
                    placeholder={t.form.routesPh}
                    className={inputCls()}
                  />
                </Field>
              </fieldset>

              {/* Operations */}
              <fieldset className="space-y-4">
                <legend className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t.form.opsSection}
                </legend>
                <Field label={t.form.ticketing}>
                  <div className="flex flex-wrap gap-2">
                    {t.form.ticketingOpts.map((opt) => (
                      <label
                        key={opt}
                        className={`px-3.5 py-2 rounded-full text-sm font-medium border cursor-pointer transition ${
                          form.ticketing === opt
                            ? "bg-brand text-white border-brand"
                            : "bg-white text-slate-600 border-slate-300 hover:border-brand"
                        }`}
                      >
                        <input
                          type="radio"
                          name="ticketing"
                          className="hidden"
                          checked={form.ticketing === opt}
                          onChange={() => update("ticketing", opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label={t.form.timeline}>
                  <select
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    className={inputCls()}
                  >
                    <option value="">{t.form.selectPlaceholder}</option>
                    {t.timelineOpts.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </fieldset>

              {serverError && (
                <p className="text-sm text-red-600 font-medium">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent hover:brightness-110 disabled:opacity-60 text-slate-900 font-bold py-3.5 rounded-full shadow-lg transition text-lg"
              >
                {submitting ? t.form.submitting : t.form.submit}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-brand-dark text-white/80 py-10 px-5">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-2 font-extrabold text-white text-lg">
            <img src="/logo.jpeg" alt="PathYatra" className="h-8 w-8 rounded-lg object-cover" />
            PathYatra <span className="text-accent">Partner</span>
          </div>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                title={s.name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg hover:bg-white/25 transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-sm">{t.footer}</p>
          <p className="text-xs text-white/50">© {new Date().getFullYear()} PathYatra. All rights reserved.</p>
        </div>
      </footer>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/50">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl">
            <div className="text-5xl">🚀</div>
            <h3 className="mt-4 text-2xl font-extrabold text-slate-900">
              {t.success.title}
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed">{t.success.body}</p>
            <div className="mt-6 space-y-3">
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition"
              >
                {t.success.whatsapp}
              </a>
              <button
                onClick={() => setShowSuccess(false)}
                className="block w-full text-slate-500 font-medium py-2 hover:text-slate-800 transition"
              >
                {t.success.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

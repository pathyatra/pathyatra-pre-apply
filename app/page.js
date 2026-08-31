"use client";

import { useState, useEffect } from "react";
import { translations } from "../lib/translations";
import { supabase } from "../lib/supabaseClient";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/C5i3D8BNkcY6wNqwqE07lh?s=sh&p=a&mlu=0&ilr=0";

const SOCIALS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/pathyatra",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.4-10.4a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@pathyatraapp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.5 6.2a3 3 0 0 0-2.11-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.39.52A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.13c1.89.52 9.39.52 9.39.52s7.5 0 9.39-.52a3 3 0 0 0 2.11-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.24 3.6Z" />
      </svg>
    ),
  },
  {
    name: "X",
    url: "https://x.com/PathYatra",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93ZM17.6 20.65h2.04L6.48 3.23H4.29Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1Bq6cjgMod/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12Z" />
      </svg>
    ),
  },
];

function HeroText({ t, onApply }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm sm:text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {t.hero.badge}
      </span>

      <h1 className="mt-4 text-[1.75rem] font-extrabold leading-[1.1] tracking-tight [text-wrap:balance] drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
        {t.hero.heading}
      </h1>

      <div className="mt-4 h-1 w-16 rounded-full bg-accent" />

      <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/85 drop-shadow sm:text-base lg:text-lg">
        {t.hero.sub}
      </p>

      <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-5">
        <button
          onClick={onApply}
          className="rounded-full bg-accent px-7 py-3.5 text-base font-bold text-slate-900 shadow-xl shadow-black/30 transition hover:brightness-110 active:scale-[0.98] sm:px-8 sm:py-4 sm:text-lg"
        >
          {t.hero.cta}
        </button>
        <span className="flex items-start gap-2 text-[13px] text-white/85 sm:text-sm">
          <span className="mt-0.5">🏆</span>
          <span>{t.hero.trust}</span>
        </span>
      </div>
    </div>
  );
}

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

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* Header — floats over the banner, turns solid on scroll */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur border-b border-slate-200"
            : "bg-gradient-to-b from-black/55 to-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <div
            className={`flex items-center gap-2.5 text-lg font-extrabold sm:text-xl ${
              scrolled ? "text-brand-dark" : "text-white drop-shadow"
            }`}
          >
            <img
              src="/logo.jpeg"
              alt="PathYatra"
              className="h-11 w-11 rounded-xl object-cover shadow-md sm:h-12 sm:w-12"
            />
            PathYatra <span className={scrolled ? "text-brand" : "text-accent"}>Partner</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                scrolled
                  ? "border-slate-300 text-slate-700 hover:border-brand hover:text-brand"
                  : "border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              }`}
            >
              {t.langLabel}
            </button>
            <button
              onClick={scrollToForm}
              className={`hidden rounded-full px-4 py-2 text-sm font-bold transition sm:inline-flex ${
                scrolled
                  ? "bg-brand text-white hover:bg-brand-dark"
                  : "bg-accent text-slate-900 shadow-lg hover:brightness-110"
              }`}
            >
              {t.nav.apply}
            </button>
          </div>
        </div>
      </header>

      {/* Hero — full banner, never cropped. Text overlays from the far left. */}
      <section className="relative isolate bg-slate-950 text-white">
        {/* Banner shown in full (aspect ratio preserved, nothing cut off) */}
        <img
          src="/banner.jpg"
          alt="PathYatra bus on highway at sunrise"
          className="block w-full"
        />

        {/* Desktop / tablet: text overlaid on the left of the image */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[30%] hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
          <div className="relative flex h-full items-center">
            <div className="pointer-events-auto w-[54%] max-w-3xl pl-5 pr-5 lg:pl-9 xl:pl-12">
              <HeroText t={t} onApply={scrollToForm} />
            </div>
          </div>
        </div>

        {/* Mobile: text sits directly below the banner so nothing is cropped */}
        <div className="bg-slate-950 px-5 pb-12 pt-8 md:hidden">
          <HeroText t={t} onApply={scrollToForm} />
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
          <div className="flex items-center gap-2.5 font-extrabold text-white text-xl">
            <img src="/logo.jpeg" alt="PathYatra" className="h-11 w-11 rounded-xl object-cover" />
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

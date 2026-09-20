"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Experience } from "@/lib/types";

const steps = ["About you", "Your trip", "Why this?", "Preferences", "Review"];

export function RequestToJoin({ experience }: { experience: Experience }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [data, setData] = useState<Record<string, string>>({ guests: "1" });

  const update = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));
  const close = () => {
    setOpen(false);
    setTimeout(() => { setStep(0); setSent(false); }, 300);
  };
  const submit = () => {
    localStorage.setItem(
      "samaroh-guest-request",
      JSON.stringify({ ...data, experienceTitle: experience.title, status: "Request sent", createdAt: new Date().toISOString() })
    );
    setSent(true);
  };

  const priceLabel = experience.price ? `${experience.currency ?? ""} ${experience.price.toLocaleString()}`.trim() : "Free";

  return (
    <>
      <aside className="sticky top-28 hidden border border-[color:var(--line)] bg-white p-7 lg:block">
        <p className="eyebrow text-[color:var(--stone)]">{experience.availableSpots} of {experience.capacity} spots left</p>
        <p className="display mt-3 text-3xl">{priceLabel}</p>
        <button onClick={() => setOpen(true)} className="focus-ring mt-6 w-full bg-[color:var(--ink)] px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-[#3a352f]">
          Request to Join
        </button>
        <p className="mt-3 text-xs leading-5 text-[color:var(--stone)]">Guest approval required. Your private details stay private until the host accepts.</p>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-[color:var(--line)] bg-[color:var(--paper)]/95 p-4 backdrop-blur lg:hidden">
        <div>
          <p className="text-xs text-[color:var(--stone)]">{experience.availableSpots} spots left</p>
          <p className="display text-lg">{priceLabel}</p>
        </div>
        <button onClick={() => setOpen(true)} className="focus-ring bg-[color:var(--ink)] px-6 py-3 text-xs font-bold uppercase tracking-[.15em] text-white">
          Request to Join
        </button>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={close}
                className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 md:items-center md:p-6"
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 0.84, 0.24, 1] }}
                  className="max-h-[92svh] w-full max-w-xl overflow-y-auto bg-[color:var(--paper)] p-7 md:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="eyebrow text-[color:var(--stone)]">Request to join</p>
                      <h2 className="display mt-2 text-2xl leading-tight">{experience.title}</h2>
                    </div>
                    <button onClick={close} aria-label="Close" className="focus-ring text-2xl leading-none text-[color:var(--stone)]">×</button>
                  </div>

                  {!sent ? (
                    <>
                      <div className="mt-8 flex items-center gap-2">
                        {steps.map((s, i) => (
                          <div key={s} className="flex flex-1 flex-col gap-2">
                            <span className={`h-[3px] w-full rounded-full transition ${i <= step ? "bg-[color:var(--ink)]" : "bg-[color:var(--line)]"}`} />
                            <span className={`hidden text-[10px] uppercase tracking-[.1em] sm:block ${i === step ? "text-[color:var(--ink)]" : "text-[color:var(--stone)]"}`}>{s}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.3, ease: [0.16, 0.84, 0.24, 1] }}
                          >
                            {step === 0 && (
                              <div className="space-y-6">
                                <p className="text-lg leading-7 text-[color:var(--stone)]">Tell the host a little about yourself.</p>
                                <Field label="Name" value={data.name} onChange={(v) => update("name", v)} />
                                <Field label="Country" value={data.country} onChange={(v) => update("country", v)} />
                                <Field label="Age range" placeholder="e.g. 25–34" value={data.age_range} onChange={(v) => update("age_range", v)} />
                              </div>
                            )}
                            {step === 1 && (
                              <div className="space-y-6">
                                <p className="text-lg leading-7 text-[color:var(--stone)]">A little about your trip.</p>
                                <Field label="Travel dates" placeholder="e.g. Dec 17–21" value={data.travel_dates} onChange={(v) => update("travel_dates", v)} />
                                <Field label="Guests" type="number" value={data.guests} onChange={(v) => update("guests", v)} />
                                <Field label="Dietary requirements" placeholder="Optional" value={data.dietary} onChange={(v) => update("dietary", v)} />
                              </div>
                            )}
                            {step === 2 && (
                              <div className="space-y-6">
                                <p className="text-lg leading-7 text-[color:var(--stone)]">Why would you like to join this experience?</p>
                                <TextArea value={data.why_join} onChange={(v) => update("why_join", v)} placeholder="What draws you to it? What are you hoping to understand or take part in?" />
                              </div>
                            )}
                            {step === 3 && (
                              <div className="space-y-6">
                                <p className="text-lg leading-7 text-[color:var(--stone)]">Anything the host should know?</p>
                                <TextArea label="Accessibility needs" value={data.accessibility} onChange={(v) => update("accessibility", v)} placeholder="Optional" />
                              </div>
                            )}
                            {step === 4 && (
                              <div className="space-y-4 border-y border-[color:var(--line)] py-6 text-sm leading-7">
                                <p><strong>Name:</strong> {data.name || "—"}</p>
                                <p><strong>Country:</strong> {data.country || "—"}</p>
                                <p><strong>Travel dates:</strong> {data.travel_dates || "—"}</p>
                                <p><strong>Guests:</strong> {data.guests || "1"}</p>
                                <p><strong>Why:</strong> {data.why_join || "—"}</p>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="mt-10 flex items-center justify-between border-t border-[color:var(--line)] pt-6">
                        <button disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="focus-ring text-sm disabled:opacity-30">Back</button>
                        {step < steps.length - 1 ? (
                          <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} className="focus-ring border border-[color:var(--ink)] px-5 py-3 text-xs font-bold uppercase tracking-[.15em]">Continue</button>
                        ) : (
                          <button onClick={submit} className="focus-ring bg-[color:var(--ink)] px-5 py-3 text-xs font-bold uppercase tracking-[.15em] text-white">Send Request</button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="mt-10 border border-[color:var(--line)] bg-[color:var(--cream)] p-7">
                      <p className="eyebrow text-[color:var(--stone)]">Request sent</p>
                      <h3 className="display mt-2 text-2xl">Your request is with the host.</h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--stone)]">The host will review your details and respond soon. Your private contact information stays hidden until then.</p>
                      <button onClick={close} className="focus-ring mt-6 border border-[color:var(--ink)] px-5 py-3 text-xs font-bold uppercase tracking-[.15em]">Done</button>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value?: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-0 border-b border-[color:var(--line)] bg-transparent px-0 py-3 text-lg outline-none transition focus:border-[color:var(--ink)]"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder }: { label?: string; value?: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-semibold">{label}</span>}
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-32 w-full border border-[color:var(--line)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--ink)]"
      />
    </label>
  );
}


"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const types = ["Wedding","Festival","Concert","Yoga / Wellness","Cultural event","Food experience","Workshop","Community event","Tour / local experience","Other"];
const stepLabels = ["Experience","Story & details","Schedule","Review & submit"];

export function HostWizard() {
  const [type, setType] = useState("Wedding");
  const [step, setStep] = useState(1);
  const max = 4;
  return <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
    <aside className="lg:border-r lg:border-[color:var(--line)] lg:pr-8">
      <div className="eyebrow mb-6 text-[color:var(--stone)]">Host flow</div>
      <div className="space-y-1">
        {stepLabels.map((s,i) => <div key={s} className={`flex items-center gap-4 border-l-2 py-3 pl-4 text-sm transition ${step === i+1 ? "border-[color:var(--ink)] font-semibold" : "border-[color:var(--line)] text-[color:var(--stone)]"}`}>
          <span className="numeral">{String(i+1).padStart(2,"0")}</span>
          {s}
        </div>)}
      </div>
    </aside>
    <div className="max-w-3xl">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.16,0.84,0.24,1] }}>
          {step === 1 && <section><p className="eyebrow mb-3 text-[color:var(--stone)]">Step 1</p><h2 className="display text-4xl md:text-5xl">What are you hosting?</h2><p className="mt-3 max-w-xl text-[color:var(--stone)]">Samaroh is built around experiences. Choose a type and we&rsquo;ll ask only for the details that matter.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{types.map(t => <button key={t} onClick={() => setType(t)} className={`focus-ring border p-5 text-left text-sm transition ${type===t ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white" : "border-[color:var(--line)] bg-white hover:border-[color:var(--ink)]"}`}>{t}</button>)}</div></section>}
          {step === 2 && <section><p className="eyebrow mb-3 text-[color:var(--stone)]">Step 2</p><h2 className="display text-4xl md:text-5xl">Tell us about it.</h2><div className="mt-8 space-y-6"><Input label="Experience title" placeholder={type === "Wedding" ? "e.g. A Jaipur Wedding, Three Days with the Family" : "Give it a name people would actually use"}/><Text label="Short description" placeholder="What is this experience, in one or two human sentences?"/><Text label="What will guests actually experience?" placeholder="Describe the moments, people and place."/><Input label="City / region" placeholder="Keep private addresses out of the public listing."/></div></section>}
          {step === 3 && <section><p className="eyebrow mb-3 text-[color:var(--stone)]">Step 3</p><h2 className="display text-4xl md:text-5xl">Shape the day.</h2><div className="mt-8 space-y-6"><Input label="Date" placeholder="e.g. Dec 18–20, 2026"/><Text label="Schedule" placeholder="One line per moment — ceremony, concert, session, meal, walk, etc."/><div className="grid gap-6 md:grid-cols-2"><Input label="Guest capacity" type="number"/><Input label="Language" placeholder="English, Hindi"/></div><Text label="Good to know" placeholder="Dress, food, etiquette, accessibility, age requirements..."/></div></section>}
          {step === 4 && <section><p className="eyebrow mb-3 text-[color:var(--stone)]">Step 4</p><h2 className="display text-4xl md:text-5xl">Review before Samaroh approval.</h2><div className="mt-8 space-y-3 border-y border-[color:var(--line)] py-6 text-sm leading-7"><p><strong>Type:</strong> {type}</p><p><strong>Public location:</strong> City / region only</p><p><strong>Status:</strong> Pending Review after submission</p><p><strong>Privacy:</strong> Exact private addresses and direct contact details remain hidden.</p></div><button onClick={() => { localStorage.setItem("samaroh-host-submission", JSON.stringify({ type, status: "Pending Review", submittedAt: new Date().toISOString() })); alert("Submitted. The listing is now Pending Review in this MVP."); }} className="focus-ring mt-8 bg-[color:var(--ink)] px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-[#3a352f]">Submit for Samaroh approval</button></section>}
        </motion.div>
      </AnimatePresence>
      <div className="mt-10 flex items-center justify-between border-t border-[color:var(--line)] pt-5"><button disabled={step===1} onClick={() => setStep(s => Math.max(1,s-1))} className="focus-ring text-sm disabled:opacity-30">Back</button><button onClick={() => setStep(s => Math.min(max,s+1))} className="focus-ring border border-[color:var(--ink)] px-5 py-3 text-xs font-bold uppercase tracking-[.15em]">{step === max ? "Done" : "Continue"}</button></div>
    </div>
  </div>;
}

function Input({label,placeholder,type="text"}:{label:string;placeholder?:string;type?:string}){return <label className="block text-sm"><span className="mb-2 block font-semibold">{label}</span><input type={type} placeholder={placeholder} className="w-full border-0 border-b border-[color:var(--line)] bg-transparent px-0 py-3 text-lg outline-none transition focus:border-[color:var(--ink)]"/></label>}
function Text({label,placeholder}:{label:string;placeholder?:string}){return <label className="block text-sm"><span className="mb-2 block font-semibold">{label}</span><textarea placeholder={placeholder} className="min-h-28 w-full border border-[color:var(--line)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--ink)]"/></label>}


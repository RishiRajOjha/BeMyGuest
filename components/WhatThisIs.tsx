"use client";
import { useState } from "react";

export function WhatThisIs() {
  const [mode, setMode] = useState<"traveler" | "host">("traveler");
  const traveler = mode === "traveler";
  return (
    <section className="bg-[color:var(--paper)] py-24 md:py-36">
      <div className="container">
        <p className="eyebrow text-[color:var(--stone)]">What this is</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <button onClick={() => setMode("traveler")} className={`focus-ring border px-4 py-2 text-xs uppercase tracking-[.12em] transition ${traveler ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white" : "border-[color:var(--line)] bg-white text-[color:var(--stone)]"}`}>I&rsquo;m a traveler</button>
          <button onClick={() => setMode("host")} className={`focus-ring border px-4 py-2 text-xs uppercase tracking-[.12em] transition ${!traveler ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white" : "border-[color:var(--line)] bg-white text-[color:var(--stone)]"}`}>I&rsquo;m a host</button>
        </div>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <h2 className="display text-[clamp(3.3rem,8.5vw,8rem)] leading-[.9]">Real People.<br/>Real Place.<br/><span className="display-italic text-[color:var(--terracotta)]">Real Samaroh.</span></h2>
          </div>
          <div className="lg:pb-2">
            {traveler ? (
              <p className="max-w-xl text-lg leading-8 text-[color:var(--stone)]">Looking for a wedding, festival, ceremony or cultural celebration to attend? Samaroh helps you discover it, understand what you are stepping into, and decide whether it is right for you before you go.</p>
            ) : (
              <p className="max-w-xl text-lg leading-8 text-[color:var(--stone)]">Have a wedding, celebration, ceremony, concert or cultural experience worth sharing? Samaroh gives hosts a clear way to tell the story, explain the practical details, and welcome the right guests.</p>
            )}
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {traveler ? <a href="/explore" className="link-underline">Explore experiences ↗</a> : <a href="/host" className="link-underline">Host your celebration ↗</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

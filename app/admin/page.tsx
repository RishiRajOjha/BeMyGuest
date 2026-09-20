"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";

export default function AdminPage() {
  const [submission, setSubmission] = useState<{type:string;status:string;submittedAt:string}|null>(null);
  const [guestRequest, setGuestRequest] = useState<Record<string,string>|null>(null);
  useEffect(() => {
    const raw = localStorage.getItem("samaroh-host-submission");
    const guest = localStorage.getItem("samaroh-guest-request");
    if (raw) setSubmission(JSON.parse(raw));
    if (guest) setGuestRequest(JSON.parse(guest));
  }, []);
  const update = (status: string) => {
    if (!submission) return;
    const next = { ...submission, status };
    localStorage.setItem("samaroh-host-submission", JSON.stringify(next));
    setSubmission(next);
  };
  return <main className="min-h-screen bg-[color:var(--cream)]"><Header overlay={false} /><div className="container pb-20 pt-32 md:pt-40"><div className="max-w-4xl"><p className="eyebrow mb-4 text-[color:var(--stone)]">Applications</p><h1 className="display text-[clamp(2.6rem,7vw,6rem)] leading-[.95]">Keep the marketplace trustworthy.</h1><p className="mt-5 text-[color:var(--stone)]">This local MVP demonstrates the moderation states. Replace localStorage with authenticated server actions and a real database before production.</p></div><div className="mt-12 grid gap-8 lg:grid-cols-2"><section className="border border-stone-300 bg-white p-7"><div className="eyebrow mb-3">Experience application</div>{submission ? <><h2 className="display text-3xl">{submission.type}</h2><p className="mt-3 text-sm text-stone-500">Submitted {new Date(submission.submittedAt).toLocaleString()}</p><p className="mt-5 text-sm"><strong>Status:</strong> {submission.status}</p><div className="mt-7 flex flex-wrap gap-2"><button onClick={()=>update("Changes Requested")} className="border border-stone-300 px-4 py-2 text-xs font-bold uppercase tracking-[.1em]">Request changes</button><button onClick={()=>update("Approved")} className="border border-stone-900 bg-stone-900 px-4 py-2 text-xs font-bold uppercase tracking-[.1em] text-white">Approve</button><button onClick={()=>update("Published")} className="border border-stone-900 px-4 py-2 text-xs font-bold uppercase tracking-[.1em]">Publish</button><button onClick={()=>update("Rejected")} className="border border-red-300 px-4 py-2 text-xs font-bold uppercase tracking-[.1em] text-red-700">Reject</button></div></> : <p className="text-sm text-stone-500">No local host submission yet. Submit one from <Link className="underline" href="/host">Host an Experience</Link>.</p>}</section><section className="border border-stone-300 bg-white p-7"><div className="eyebrow mb-3">Guest request</div>{guestRequest ? <><h2 className="display text-3xl">{guestRequest.name || "Guest"}</h2><p className="mt-2 text-sm text-stone-500">{guestRequest.experienceTitle}</p><div className="mt-6 space-y-2 text-sm"><p><strong>Country:</strong> {guestRequest.country}</p><p><strong>Guests:</strong> {guestRequest.guests}</p><p><strong>Why:</strong> {guestRequest.why_join}</p><p><strong>Status:</strong> {guestRequest.status}</p></div><div className="mt-7 flex gap-2"><Link href="/host/requests" className="border border-stone-900 px-4 py-2 text-xs font-bold uppercase tracking-[.1em]">Open host requests</Link></div></> : <p className="text-sm text-stone-500">No local guest request yet.</p>}</section></div></div></main>;
}

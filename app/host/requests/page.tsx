"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";

export default function HostRequestsPage(){
  const [request,setRequest]=useState<Record<string,string>|null>(null);
  useEffect(()=>{const raw=localStorage.getItem("samaroh-guest-request"); if(raw) setRequest(JSON.parse(raw));},[]);
  const setStatus=(status:string)=>{if(!request)return; const next={...request,status}; localStorage.setItem("samaroh-guest-request",JSON.stringify(next));setRequest(next)};
  return <main className="min-h-screen bg-[color:var(--paper)]"><Header overlay={false} /><div className="container pb-20 pt-32 md:pt-40"><p className="eyebrow mb-4 text-[color:var(--stone)]">Host / Requests</p><h1 className="display text-[clamp(2.6rem,7vw,6rem)] leading-[.95]">Who wants to join?</h1>{request ? <div className="mt-12 max-w-3xl border border-[color:var(--line)] bg-[color:var(--cream)] p-7 md:p-10"><div className="flex flex-col justify-between gap-6 sm:flex-row"><div><h2 className="display text-4xl">{request.name}</h2><p className="mt-2 text-sm text-stone-500">{request.country} · {request.guests} guest(s)</p></div><div className="text-xs font-bold uppercase tracking-[.12em]">{request.status}</div></div><p className="mt-8 text-sm leading-7"><strong>Why they want to join:</strong><br/>{request.why_join}</p><p className="mt-6 text-sm"><strong>Travel dates:</strong> {request.travel_dates || "Not provided"}</p><div className="mt-8 flex flex-wrap gap-2"><button onClick={()=>setStatus("Accepted")} className="bg-stone-900 px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-white">Accept</button><button onClick={()=>setStatus("Declined")} className="border border-stone-900 px-5 py-3 text-xs font-bold uppercase tracking-[.12em]">Decline</button></div></div> : <p className="mt-10 text-stone-500">No request yet. A guest can submit one from an experience detail page.</p>}</div></main>
}

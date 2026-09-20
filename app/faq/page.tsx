import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
const faqs=[
 ["About Samaroh","Samaroh helps people discover celebrations and experiences and understand what they are stepping into before they go."],
 ["Finding Events","Explore by category, location and experience. Event details are presented with practical context."],
 ["Weddings","Wedding listings explain the ceremonies, dress guidance, food and etiquette that matter to guests."],
 ["Festivals","Festival pages connect current experiences with guides that explain what is happening and how to participate respectfully."],
 ["Ceremonies","Ceremony guides explain common rituals such as mehendi, haldi and other family or cultural milestones."],
 ["Concerts","Concert pages cover the event, venue context, timing and practical guest information where available."],
 ["Organizers","Hosts can submit experiences through the Host an Experience flow and manage requests."],
 ["Safety & Trust","Listings are presented with privacy boundaries and a route for reporting information that needs correction."],
 ["Tickets / Registration","Not every Samaroh experience is ticket-first. Depending on the host, the action may be a request to join, RSVP, book or learn more."],
 ["Changes & Cancellations","Always check the current experience information and host updates before travelling."],
];
export default function FAQPage(){
  const schema={"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqs.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}}))};
  return <main className="min-h-screen bg-[color:var(--paper)]"><Header overlay={false}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><section className="container pb-24 pt-32 md:pt-44"><p className="eyebrow text-[color:var(--stone)]">FAQ</p><h1 className="display mt-4 max-w-5xl text-[clamp(3rem,8vw,7.5rem)] leading-[.92]">Questions before you go.</h1><div className="mt-16 border-t border-[color:var(--line)]">{faqs.map(([q,a])=><details key={q} className="group border-b border-[color:var(--line)] py-6"><summary className="flex cursor-pointer list-none justify-between gap-8"><span className="display text-2xl md:text-3xl">{q}</span><span className="text-xl">+</span></summary><p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--stone)]">{a}</p></details>)}</div></section><SiteFooter/></main>}

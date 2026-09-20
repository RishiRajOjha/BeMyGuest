import { Header } from "@/components/Header";
import { HostWizard } from "@/components/HostWizard";
import { Reveal } from "@/components/motion/Reveal";

export default function HostPage() {
  return (
    <main className="min-h-screen bg-[color:var(--cream)]">
      <Header overlay={false} />
      <div className="container pb-20 pt-32 md:pt-40">
        <div className="mb-14 max-w-4xl">
          <Reveal><p className="eyebrow mb-4 text-[color:var(--stone)]">Host an experience</p></Reveal>
          <Reveal delay={0.08}><h1 className="display text-[clamp(2.6rem,7vw,6rem)] leading-[.95]">What are you hosting?</h1></Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--stone)]">Wedding, festival, concert, yoga, workshop or something that doesn&rsquo;t fit a category yet. Tell us what people can actually experience.</p>
          </Reveal>
        </div>
        <HostWizard />
      </div>
    </main>
  );
}


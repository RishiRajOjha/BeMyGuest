import { CategoryLanding } from "@/components/CategoryLanding";
export default function ConcertsPage() {
  return <CategoryLanding eyebrow="Concerts" title="Concerts, live music and cultural performances." intro="Discover live sets, independent artists and classical or cultural performances with enough context to know what the room will feel like." primary="Concerts & live music" secondary={["Live concerts", "Classical", "Indie", "Cultural performances"]} type="Concert" questionLinks={["What should you know before your first concert?", "Live music events in India", "Classical vs contemporary live performances", "What to expect at a live concert"]} />;
}

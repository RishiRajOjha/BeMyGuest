import { CategoryLanding } from "@/components/CategoryLanding";
export default function CeremoniesPage() {
  return <CategoryLanding eyebrow="Ceremonies" title="Traditional ceremonies and rituals." intro="Understand the smaller moments inside bigger celebrations — from haldi and mehendi to family milestones and cultural rituals." primary="Traditional ceremonies" secondary={["Wedding rituals", "Religious ceremonies", "Family milestones", "Cultural rituals"]} types={["Wedding", "Religious", "Cultural"]} questionLinks={["What is a mehendi ceremony?", "What is a haldi ceremony?", "Meaning of Indian wedding rituals", "Traditional ceremonies around the world"]} />;
}

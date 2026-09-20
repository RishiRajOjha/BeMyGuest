export type ExperienceType =
  | "Wedding" | "Festival" | "Concert" | "Yoga" | "Cultural"
  | "Food" | "Workshop" | "Wellness" | "Religious" | "Community" | "Tourism" | "Other";

export type ExperienceStatus = "Draft" | "Pending Review" | "Changes Requested" | "Approved" | "Published" | "Paused" | "Completed" | "Cancelled";

export type VerificationStatus = "Unverified" | "Pending" | "Verified";

export type Experience = {
  id: string;
  slug: string;
  type: ExperienceType;
  title: string;
  shortDescription: string;
  description: string;
  hostName: string;
  hostStory: string;
  city: string;
  region: string;
  date: string;
  endDate?: string;
  schedule: { time: string; title: string; detail: string }[];
  capacity: number;
  availableSpots: number;
  price?: number;
  currency?: string;
  included: string[];
  excluded: string[];
  language: string[];
  food?: string;
  dressCode?: string;
  etiquette?: string;
  accessibility?: string;
  ageRequirement?: string;
  images: string[];
  status: ExperienceStatus;
  verificationStatus: VerificationStatus;
  privacyLevel: "city" | "region" | "approximate" | "private";
  categoryData: Record<string, string | string[]>;
};

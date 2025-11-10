"use client";

import AboutClient from "./AboutClient";
import { AboutData } from "@/lib/interfaces/aboutData";
import { useAppData } from "@/hooks/AppDataContext";

// ...existing code...
export default function AboutPage() {
  // call hook at top level of component (fixes invalid hook call)
  const { about, loading } = useAppData();
  const aboutData: AboutData | null = (about ?? null) as AboutData | null;

  if (loading) return <p>Loading...</p>;
  if (!aboutData) return <p>About content is not available.</p>;

  return <AboutClient about={aboutData} />;
}
// ...existing code...
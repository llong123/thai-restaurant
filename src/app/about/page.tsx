"use client";

import AboutClient from "./AboutClient";
import { AboutData } from "@/lib/interfaces/aboutData";
import { useAppData } from "@/hooks/AppDataContext";

export default function AboutPage() {
  // call hook at top level of component (fixes invalid hook call)
  const { about, loading } = useAppData();
  const aboutData: AboutData | null = (about ?? null) as AboutData | null;

  return <AboutClient loading={loading} about={aboutData as AboutData} />;
}

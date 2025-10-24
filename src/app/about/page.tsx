"use client";

import { useEffect, useState } from "react";
import AboutClient from "./AboutClient";
import { AboutData } from "@/lib/interfaces/aboutData";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const res = await fetch("/api/about");
        if (!res.ok) throw new Error("Failed to fetch about data");
        const data: AboutData = await res.json();
        setAboutData(data);
      } catch (err) {
        console.error(err);
        setAboutData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAboutData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!aboutData) return <p>About content is not available.</p>;

  return <AboutClient about={aboutData} />;
}

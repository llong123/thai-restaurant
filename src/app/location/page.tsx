"use client";

import LocationClient from "./LocationClient";
import { LocationData } from "@/lib/interfaces/locationData";
import { useAppData } from "@/hooks/AppDataContext";

export default function LocationPage() {
  const { location, loading } = useAppData();
  const locationData: LocationData | null = (location ??
    null) as LocationData | null;

  if (!locationData) return <p>Location content is not available.</p>;

  return <LocationClient loading={loading} locationData={locationData} />;
}

"use client";

import LocationClient from "./LocationClient";
import { LocationData } from "@/lib/interfaces/locationData";
import { useAppData } from "@/hooks/AppDataContext";

export default function LocationPageClient() {
  const { location, loading } = useAppData();
  const locationData: LocationData | null = (location ??
    null) as LocationData | null;

  return <LocationClient loading={loading} locationData={locationData ?? undefined} />;
}

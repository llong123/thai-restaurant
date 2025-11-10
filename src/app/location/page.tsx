"use client";

import LocationClient from "./LocationClient";
import { useEffect, useState } from "react";
import { LocationData } from "@/lib/interfaces/locationData";
import { useAppData } from "@/hooks/AppDataContext";

export default function LocationPage() {
  const { location, loading } = useAppData();
  const locationData: LocationData | null = (location ??
    null) as LocationData | null;

  if (loading) return <p>Loading...</p>;
  if (!locationData) return <p>Location content is not available.</p>;

  return <LocationClient locationData={locationData} />;
}

"use client";

import LocationClient from "./LocationClient";
import { useEffect, useState } from "react";
import { LocationData } from "@/lib/interfaces/locationData";

export default function LocationPage() {
  const [locationData, setLocationData] = useState<any>(null);

  useEffect(() => {
    async function fetchLocationData() {
      const res = await fetch("/api/location");
      const data: LocationData = await res.json();
      setLocationData(data);
    }
    fetchLocationData();
  }, []);
  return <LocationClient locationData={locationData} />;
}

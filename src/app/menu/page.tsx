"use client";

import MenuClient from "./MenuClient";
import { useEffect, useState } from "react";
import { DishData } from "@/lib/interfaces";
import { MenuPageData } from "@/lib/interfaces/menuData";

export default function MenuPage() {
  const [dishData, setDishData] = useState<DishData[]>([]);
  const [menuPageData, setMenuPageData] = useState<MenuPageData | null>(null);

  useEffect(() => {
    async function fetchHomeData() {
      const res = await fetch("/api/dish");
      const data: DishData[] = await res.json();
      setDishData(data);
    }
    async function fetchLocationData() {
      const res = await fetch("/api/menu");
      const data: MenuPageData = await res.json();
      setMenuPageData(data);
    }
    fetchHomeData();
    fetchLocationData();
  }, []);

  return <MenuClient dishes={dishData} menuPageData={menuPageData} />;
}

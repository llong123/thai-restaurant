"use client";

import MenuClient from "./MenuClient";
import { DishData } from "@/lib/interfaces";
import { MenuPageData } from "@/lib/interfaces/menuData";
import { useAppData } from "@/hooks/AppDataContext";

export default function MenuPage() {
  const { dishes, menu, loading } = useAppData();

  const dishData: DishData[] = (dishes ?? []) as DishData[];
  const menuPageData: MenuPageData | null = (menu ?? null) as MenuPageData | null;

  if (loading) return <p>Loading...</p>;

  return <MenuClient dishes={dishData} menuPageData={menuPageData} />;
}
"use client";

import MenuClient from "./MenuClient";
import { DishData } from "@/lib/interfaces";
import { MenuPageData } from "@/lib/interfaces/menuData";
import { useAppData } from "@/hooks/AppDataContext";

export default function MenuPageClient() {
  const { dishes, menu, loading } = useAppData();

  const dishData: DishData[] = (dishes ?? []) as DishData[];

  return (
    <MenuClient
      loading={loading}
      dishes={dishData}
      menuPageData={(menu ?? {
        _id: "google-sheet-menu-page",
        pageTitle: {},
        pageDescription: {},
        category: {},
        categoryDescription: {},
      }) as MenuPageData}
    />
  );
}

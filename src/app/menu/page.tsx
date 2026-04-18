"use client";

import MenuClient from "./MenuClient";
import { DishData } from "@/lib/interfaces";
import { MenuPageData } from "@/lib/interfaces/menuData";
import { useAppData } from "@/hooks/AppDataContext";

const defaultMenuPageData: MenuPageData = {
  _id: "default",
  pageTitle: { en: "Our Menu", fi: "Ruokalista", sv: "Meny", th: "เมนู" },
  pageDescription: {
    en: "Authentic Thai cuisine made with fresh ingredients",
    fi: "Aitoa thairuokaa tuoreista raaka-aineista",
    sv: "Äkta thailändsk mat med färska ingredienser",
    th: "อาหารไทยแท้ๆ ทำจากวัตถุดิบสดใหม่",
  },
  category: { en: "Categories", fi: "Kategorier", sv: "Kategorier", th: "หมวดหมู่" },
  categoryDescription: {
    en: "Filter by category",
    fi: "Suodata kategorian mukaan",
    sv: "Filtrera efter kategori",
    th: "กรองตามหมวดหมู่",
  },
};

export default function MenuPage() {
  const { dishes, loading } = useAppData();

  const dishData: DishData[] = (dishes ?? []) as DishData[];

  return (
    <MenuClient
      loading={loading}
      dishes={dishData}
      menuPageData={defaultMenuPageData}
    />
  );
}

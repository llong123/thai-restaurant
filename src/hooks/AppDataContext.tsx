import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationData } from "@/lib/interfaces/navigationData";
import { FooterData } from "@/lib/interfaces/footerData";
import { HomepageData } from "@/lib/interfaces/homeData";
import { DishData } from "@/lib/interfaces";
import { MenuPageData } from "@/lib/interfaces/menuData";
import { LocationData } from "@/lib/interfaces/locationData";
import { AboutData } from "@/lib/interfaces/aboutData";

export interface AppData {
  navigation?: NavigationData | null;
  footer?: FooterData | null;
  homepage?: HomepageData | null;
  dishes?: DishData[] | null;
  menu?: MenuPageData | null;
  location?: LocationData | null;
  about?: AboutData | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const AppDataContext = createContext<AppData | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppData>({
    navigation: null,
    footer: null,
    homepage: null,
    dishes: null,
    menu: null,
    location: null,
    about: null,
    loading: true,
    refresh: async () => {},
  });

  const fetchAll = async () => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const [
        navigation,
        footer,
        homepage,
        dishes,
        menu,
        location,
        about,
      ] = await Promise.all([
        fetch("/api/navigation").then((r) => r.json()).catch(() => null),
        fetch("/api/footer").then((r) => r.json()).catch(() => null),
        fetch("/api/homepage").then((r) => r.json()).catch(() => null),
        fetch("/api/dish").then((r) => r.json()).catch(() => null),
        fetch("/api/menu").then((r) => r.json()).catch(() => null),
        fetch("/api/location").then((r) => r.json()).catch(() => null),
        fetch("/api/about").then((r) => r.json()).catch(() => null),
      ]);

      setState({
        navigation,
        footer,
        homepage,
        dishes,
        menu,
        location,
        about,
        loading: false,
        refresh: fetchAll,
      });
    } catch (err) {
      console.error("fetchAll error", err);
      setState((s) => ({ ...s, loading: false, refresh: fetchAll }));
    }
  };

  useEffect(() => {
    fetchAll();
    // keep reference stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppDataContext.Provider value={state}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return ctx;
}
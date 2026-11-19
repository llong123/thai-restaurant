import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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

export type AppDataInitialData = Partial<Omit<AppData, "loading" | "refresh">>;

const AppDataContext = createContext<AppData | undefined>(undefined);

export function AppDataProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: AppDataInitialData;
}) {
  const hasInitialData = Boolean(
    initialData && Object.values(initialData).some((value) => value != null),
  );
  const [state, setState] = useState<AppData>({
    navigation: initialData?.navigation ?? null,
    footer: initialData?.footer ?? null,
    homepage: initialData?.homepage ?? null,
    dishes: initialData?.dishes ?? null,
    menu: initialData?.menu ?? null,
    location: initialData?.location ?? null,
    about: initialData?.about ?? null,
    loading: !hasInitialData,
    refresh: async () => {},
  });

  const fetchAll = useCallback(async (showLoading = true) => {
    if (showLoading) setState((s) => ({ ...s, loading: true }));
    try {
      const [navigation, footer, homepage, dishes, menu, location, about] =
        await Promise.all([
          fetch("/api/navigation")
            .then((r) => r.json())
            .catch(() => null),
          fetch("/api/footer")
            .then((r) => r.json())
            .catch(() => null),
          fetch("/api/homepage")
            .then((r) => r.json())
            .catch(() => null),
          fetch("/api/menu-sheet")
            .then((r) => r.json())
            .catch(() => null),
          fetch("/api/menu")
            .then((r) => r.json())
            .catch(() => null),
          fetch("/api/location")
            .then((r) => r.json())
            .catch(() => null),
          fetch("/api/about")
            .then((r) => r.json())
            .catch(() => null),
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
        refresh: () => fetchAll(false),
      });
    } catch (err) {
      console.error("fetchAll error", err);
      setState((s) => ({ ...s, loading: false, refresh: () => fetchAll(false) }));
    }
  }, []);

  useEffect(() => {
    setState((s) => ({ ...s, refresh: () => fetchAll(false) }));
    void fetchAll(!hasInitialData);
  }, [fetchAll, hasInitialData]);

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

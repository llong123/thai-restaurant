import { LocaleString } from "./interfaces";

export interface MenuItem {
  id: string;
  category: string;
  name: LocaleString;
  description?: LocaleString;
  ingredients?: LocaleString[];
  price: number;
  spiceLevel?: number;
  imageUrl?: string;
  signatureDish?: boolean;
}

export interface MenuCategory {
  id: string;
  name: LocaleString;
  description?: LocaleString;
  items: MenuItem[];
}
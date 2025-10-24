export interface LocaleString {
  _type: "localeString";
  en?: string;
  fi?: string;
  sv?: string;
}
export interface DishImage {
  asset: { _ref: string; _type: string };
}

export interface DishData {
  _id: string;
  pageTitle: LocaleString;
  pageDescription: LocaleString;
  name: string;
  description?: LocaleString;
  ingredients?: string[];
  category?: LocaleString;
  price?: number;
  spiceLevel?: number;
  dishImage?: DishImage;
}

export interface MenuPageData {
  _id: string;
  pageTitle: LocaleString;
  pageDescription: LocaleString;
  category: LocaleString;
  categoryDescription: LocaleString;
}

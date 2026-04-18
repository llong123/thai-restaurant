export interface LocaleString {
  _type?: "localeString";
  en?: string;
  fi?: string;
  sv?: string;
  th?: string;
}
export interface DishImage {
  asset: { _ref: string; _type: string; url?: string };
}

export interface DishData {
  _id: string;
  pageTitle: LocaleString;
  pageDescription: LocaleString;
  name: string;
  description?: LocaleString;
  ingredients?: LocaleString[];
  category?: LocaleString;
  price?: number;
  spiceLevel?: number;
  dishImage?: DishImage;
  signatureDish?: boolean;
}

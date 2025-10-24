import { LocaleString } from "../interfaces";

export interface MenuPageData {
  _id: string;
  pageTitle: LocaleString;
  pageDescription: LocaleString;
  category: LocaleString;
  categoryDescription: LocaleString;
}

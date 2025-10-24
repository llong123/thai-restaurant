import { LocaleString } from "../interfaces";

export interface FooterData {
  quickLinks: { label: LocaleString; url: string }[];
  followUs: { platform: string; url: string }[];
  copyright: LocaleString;
}

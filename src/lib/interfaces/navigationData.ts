import { LocaleString } from "@/lib/interfaces";

export interface NavLink {
  name: LocaleString; // localized name for the link
  href: string;
}

export interface NavButton {
  label: LocaleString; // localized label for the button
  href: string;
}

export interface NavigationData {
  siteTitle: string;
  links: NavLink[];
  button?: NavButton;
  languages: string[]; // e.g., ["en", "fi", "sv"]
}

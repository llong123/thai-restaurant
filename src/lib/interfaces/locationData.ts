// ---------- Types for Location Data ---------- //

import { LocaleString } from "../interfaces";

interface LocationSection {
  title: LocaleString;
  info: LocaleString[];
}

interface MapEmbed {
  embedUrl: string;
}

export interface LocationData {
  title: LocaleString;
  description: LocaleString;
  sections: LocationSection[];
  moreSections?: LocationSection[];
  map?: MapEmbed;
}

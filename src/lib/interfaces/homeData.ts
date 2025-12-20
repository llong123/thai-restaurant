import { LocaleString } from "../interfaces";

// ------------------ Types ------------------ //
interface Hero {
  title: LocaleString;
  description: LocaleString;
  cta: LocaleString;
  ctaUrl: string;
  image?: any; // Sanity image object
  imageCaption?: LocaleString;
}

interface SignatureDishes {
  title: LocaleString;
  description: LocaleString;
}

interface About {
  title: LocaleString;
  description: LocaleString;
  image?: any;
  imageCaption?: LocaleString;
}

interface ReserveTable {
  title: LocaleString;
  description: LocaleString;
}

interface LocationSection {
  title: LocaleString;
  info: LocaleString[];
}

interface LocationData {
  title: LocaleString;
  description: LocaleString;
  sections: LocationSection[];
  moreSections?: LocationSection[];
  map?: {
    embedUrl?: string;
  };
}

interface Banner {
  showBanner: boolean;
  message: LocaleString;
  backgroundColor: string;
  textColor: string;
}

export interface HomepageData {
  hero: Hero;
  signatureDishes: SignatureDishes;
  about: About;
  reserveTable: ReserveTable;
  location: LocationData;
  alertBanner?: Banner;
}

import { LocaleString } from "../interfaces";

export interface ParagraphGroup {
  _key: string;
  _type: "paragraphGroup";
  paragraphTitle: LocaleString;
  paragraphDescription: LocaleString;
}

export interface ValueGroup {
  _key: string;
  _type: "valueGroup";
  valueTitle: LocaleString;
  valueDescription: LocaleString;
}

export interface ImageField {
  asset: {
    url: string;
  };
}

export interface AboutData {
  heroimage?: ImageField;
  title?: LocaleString;
  paragraphInBoxTitle?: LocaleString;
  paragraph?: ParagraphGroup[];
  paragraphInBox?: ValueGroup[];
  mainImage?: ImageField;
}

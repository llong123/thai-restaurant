const DISHES = [
  {
    _id: "16e5d62b-0726-4c84-be58-720ad4e4fdbc",
    category: null,
    description: null,
    name: "ปลาทอดลุยสวน - Pla Tod Lui Suan - Fried Whole Fish with Spicy Thai Herbs",
    price: 49.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/4204dd8a6b011c20c4d52a93839ae6bf35ede4a2-5284x6604.jpg",
      },
    },
  },
  {
    _id: "2f964f8c-a4dd-4af4-be92-637acc824613",
    category: null,
    description: null,
    name: "ข้าวผัด - Khao Pad - Thai Style Fried Rice",
    price: 18.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/52132db99266840aa1f0ed322397abc4ff9a7fc3-4894x6118.jpg",
      },
    },
  },
  {
    _id: "3aa93524-27a3-4533-b826-0abb17c85f19",
    category: null,
    description: null,
    name: "โรตี - Roti - Fried Sweet Dough with Ice Cream",
    price: 7.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/d52546357009920943848dedf8d44077c05ced7c-5122x6403.jpg",
      },
    },
  },
  {
    _id: "44f4e2ad-3b52-45e7-b3ac-ad08b7d98172",
    category: null,
    description: null,
    name: "ชาเย็น - Thai Ice Milk Tea - Cha Yen",
    price: 6.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/04712c67752a16ca21f9f1b1e30b1e2312652bdf-5284x6604.jpg",
      },
    },
  },
  {
    _id: "48ff23c6-722e-417e-8cb3-4714cc6c027f",
    category: {
      _type: "localeString",
      en: "Noodle Soups",
      fi: "Nuudelikeitot",
      sv: "Nudelsoppor",
    },
    description: {
      _type: "localeString",
      en: "A globally celebrated classic, this Tom Yum delivers the iconic harmony of spicy, sour, and aromatic flavours. The deep, invigorating taste comes from a complex blend of traditional Thai spices. Served with noodles, which can be substituted for jasmine rice.",
      fi: "Tämä Tom Yum on maailmankuulu klassikko, joka tarjoaa ikonisen harmonian tulisista, hapokkaista ja aromaattisista mauista. Syvä, virkistävä maku syntyy perinteisten thaimaalaisten mausteiden monimutkaisesta yhdistelmästä. Tarjoillaan nuudeleiden kanssa, mutta lisuke voidaan vaihtaa jasmiiniriisiin.",
      sv: "Denna Tom Yum är en globalt hyllad klassiker som levererar den ikoniska harmonin av kryddiga, syrliga och aromatiska smaker. Den djupa, uppiggande smaken kommer från en komplex blandning av traditionella thailändska kryddor. Serveras med nudlar, men tillbehöret kan bytas ut mot jasminris.",
    },
    name: "ต้มยำ - Chao Phraya Kuoi Tieu Tom Yum - Seafood",
    price: 26.9,
    spiceLevel: 2,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/c8909ec0f42d6b1be6f72acdd1166b6d783c9680-5284x6604.jpg",
      },
    },
  },
  {
    _id: "54122517-4d36-4593-b2c4-c93f751af4cb",
    category: {
      _type: "localeString",
      en: "Soups",
      fi: "Keitto ",
      sv: "Soppor",
    },
    description: {
      _type: "localeString",
      en: "Creamy and fragrant, this coconut milk soup is a staple of Thai cuisine. The distinct, rich flavour of the soup is built upon the classic trio of galangal, lemongrass, and kaffir lime leaves. A smooth, aromatic, and slightly sweet soup that is naturally non-spicy. Select your preferred protein to complete this dish, served with jasmine rice.",
      fi: "Kermainen ja tuoksuva kookosmaitokeitto on thaimaalaisen keittiön klassikko. Selkeä, täyteläinen maku rakentuu galangalin, sitruunaruohon ja kaffirlimetin lehtien klassiselle kolmikolle. Keitto on tasainen, tuoksuva ja hieman makea, eikä se sisällä lainkaan tulisuutta. Valitse haluamasi proteiini täydentääksesi annoksen, joka tarjoillaan jasmiiniriisin kanssa.",
      sv: "Denna krämiga och väldoftande kokosmjölkssoppa är en klassiker i det thailändska köket. Den distinkta, fylliga smaken bygger på den klassiska trion galangal, citrongräs och kaffirlimeblad. Soppan är len, doftrik och lätt söt, utan någon som helst hetta. Välj önskat protein för att fullborda denna rätt, som serveras med jasminris.",
    },
    name: "ต้มข่า - Tom Kha - Coconut Galangal Soup",
    price: 16.99,
    spiceLevel: 0,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/6e987a2eb468288b7fbe73204acdfdab3b5151ef-8011x5343.jpg",
      },
    },
  },
  {
    _id: "7a511f08-44c4-43c2-a3ca-e3bba0c037b9",
    category: {
      _type: "localeString",
      en: "Noodle Soups",
      fi: "Nuudelikeitot",
      sv: "Nudelsoppor",
    },
    description: {
      _type: "localeString",
      en: "This signature boat noodle soup, made with Finnish beef and bones, is simmered for hours with our family's secret blend of Thai herbs. The dark, rich broth gains its intense, savory depth from a small, classic addition. Served with beef tenderloin and your choice of Rice Noodles or Wonton Noodles.",
      fi: "Tämä tunnusomainen venenuudelikeitto, joka on valmistettu kotimaisesta naudanlihasta ja luista, haudutetaan tuntikausia perheemme salaisella thai-yrttisekoituksella. Tummansävyinen, täyteläinen liemi saa intensiivisen, umamisen syvyytensä pienestä, klassisesta lisästä. Tarjoillaan naudan sisäfileen ja valitsemasi riisi- tai Wonton-nuudelin kanssa.",
      sv: "Denna signaturbåtnudelsoppa, gjord på finskt oxkött och ben, sjuds i timmar med vår familjs hemliga blandning av thailändska örter. Den mörka, rika buljongen får sitt intensiva, mustiga djup från ett litet, klassiskt tillägg. Serveras med oxfilé och ditt val av Risnudlar eller Wonton-nudlar.",
    },
    name: " ก๋วยเตี๋ยวเรือ - Chao Phraya Kuoi Tieu Rua - Boat Noodle Soup",
    price: 26.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/3131cae0c5d4f0a7368097902f64519abf2e7dca-8032x5357.jpg",
      },
    },
  },
  {
    _id: "7aa941f0-4445-40f2-9009-31fbf868193e",
    category: null,
    description: null,
    name: "ผัดกะเพรา - Pad Ka Prao - Thai Wok with Holy Basil",
    price: 18.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/bad81a72a14b4f3a0d00027b27c3fb62e427b624-4894x6118.jpg",
      },
    },
  },
  {
    _id: "862df11c-8fa9-46d4-baef-04aeb44855c8",
    category: {
      _type: "localeString",
      en: "Wok Dishes",
      fi: "Wok-annokset",
      sv: "Wokrätter",
    },
    description: {
      _type: "localeString",
      en: "A true benchmark of Thai home cooking, this stir-fried rice noodle dish centers on the essential balance of flavour. The noodles are coated in our house-made sauce—a signature blend of tamarind, palm sugar, and savory fish sauce. The result is a complex harmony of sweet, sour, and umami that defines classic Thai cuisine. Select your protein to complete this staple.",
      fi: "Paistettu riisinuudeliruoka on thaimaalaisen kotikeittiön kulmakivi, joka keskittyy makujen olennaiseen tasapainoon. Nuudelit on päällystetty talon omalla kastikkeella – tunnusomaisella yhdistelmällä tamarindia, palmusokeria ja suolaista kalakastiketta. Lopputuloksena on syvä makean, happaman ja umamin yhteisvaikutus, joka ilmentää klassista thaimaalaista ruokakulttuuria. Valitse proteiini täydentääksesi tämän annoksen.",
      sv: "Denna wokade risnudelrätt är en hörnsten i det thailändska hemmaköket, med fokus på smakernas grundläggande balans. Nudlarna är överdragna med vår hemgjorda sås – en karaktäristisk blandning av tamarind, palmsocker och salt fisksås. Resultatet är en djup harmoni av sött, syrligt och umami som återspeglar den klassiska thailändska matkulturen. Välj ditt protein för att fullända denna rätt.",
    },
    name: "ผัดไทย - Pad Thai - Stir Fried Noodles",
    price: 16.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/7460a0c154e0b2eec5582629171f5bc3221f1e0a-4894x6118.jpg",
      },
    },
  },
  {
    _id: "bd68b2d4-1fbc-4987-8c18-3853342aa931",
    category: {
      _type: "localeString",
      en: "Soups",
      fi: "Keitto",
      sv: "Soppor",
    },
    description: {
      _type: "localeString",
      en: "Iconic Thai soup is celebrated worldwide for its powerful balance of heat and sourness. The bright, sharp flavour comes from a blend of fresh lemongrass, galangal, kaffir lime leaves, and chili. The result is a bold, intensely zesty soup with an invigorating depth. Select your preferred protein to complete this staple, served with jasmine rice.",
      fi: "Ikoninen thaimaalainen keitto on maailmankuulu voimakkaasta tulisuuden ja hapokkuuden tasapainostaan. Keiton kirkas ja terävä maku syntyy tuoreen sitruunaruohon, galangalin, kaffirlimetin lehtien ja chilin sekoituksesta. Lopputuloksena on voimakas, raikas ja syvä maku, joka virkistää. Valitse haluamasi proteiini täydentääksesi annoksen, joka tarjoillaan jasmiiniriisin kanssa.",
      sv: "Ikonisk thailändsk soppa är berömd över hela världen för sin kraftfulla balans mellan hetta och syrlighet. Den ljusa, skarpa smaken kommer från en blandning av färskt citrongräs, galangal, kaffirlimeblad och chili. Resultatet är en intensivt syrlig, mustig soppa med en uppiggande djup. Välj önskat protein för att fullborda denna stapelvara, som serveras med jasminris.",
    },
    name: "ต้มยำ  - Tom Yum - Hot and Sour Soup",
    price: 16.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/f5cd677569d5dd1287742b4906f77397fe8d9dc2-8011x5343.jpg",
      },
    },
  },
  {
    _id: "d299c9b7-5e08-4dcd-ba1c-0e301edae26b",
    category: {
      _type: "localeString",
      en: "Appetizer",
      fi: "Alkuruoka",
      sv: "Förrätt",
    },
    description: null,
    name: "ปีกไก่ทอดต้มยำ- Peek Gai Tod Tom Yum - Chao Phraya Spicy Tom Yum Chicken Wings ",
    price: 8.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/6cc2f2755db1c068074058c7af1d9dc6c1cecaf1-4894x6118.jpg",
      },
    },
  },
  {
    _id: "d92d3899-9606-459b-a88d-1495a3f9a1c8",
    category: null,
    description: null,
    name: "ส้มตำปูปลาร้า - Som Tam Puu Plaraa - Fermented Fish & Crab Papaya Salad",
    price: 18.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/f286c72961a18f111c8fe84cf80d38d608f260dc-5284x6604.jpg",
      },
    },
  },
  {
    _id: "d988575b-758a-46ae-8709-78be0da6023c",
    category: {
      _type: "localeString",
      en: "Noodle Soups",
      fi: "Nuudelikeitot",
      sv: "Nudelsoppor",
    },
    description: {
      _type: "localeString",
      en: "This curry noodle soup from Northern Thailand is renowned for its signature spiced intensity. The rich coconut broth is slow-simmered with turmeric and ginger, building a deep, aromatic flavour. The dish features a delightful interplay between soft, submerged egg noodles and a crown of crispy noodles. Select your preferred protein to complete this fulfilling portion.",
      fi: "Pohjois-Thaimaan currynuudelikeitto tunnetaan sen voimakkaasta ja mausteisesta luonteesta. Täyteläinen kookosliemi haudutetaan hitaasti kurkuman ja inkiväärin kanssa, luoden syvän, aromaattisen maun. Annos tarjoaa miellyttävän vuorovaikutuksen pehmeiden, liemeen upotettujen munanuudeleiden ja päällä olevan rapean nuudelikruunun välillä. Valitse haluamasi proteiini täydentääksesi annoksen.",
      sv: "Denna currynudelsoppa från norra Thailand är välkänd för sin karaktäristiska kryddiga styrka. Den rika kokosbuljongen sjuds långsamt med gurkmeja och ingefära, vilket bygger en djup, aromatisk smak. Rätten bjuder på ett härligt samspel mellan mjuka, nedlagda äggnudlar och en krona av krispiga nudlar. Välj ditt föredragna protein för att fullborda rätten.",
    },
    name: "ข้าวซอย - Khao Soi - Northern Thai Curry Noodle Soup",
    price: 16.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/943f9560b263d9b6014ebdf4920df5c5fe4e32b6-5284x6604.jpg",
      },
    },
  },
  {
    _id: "dc5f86ab-334d-4e63-8914-39a803640bb0",
    category: null,
    description: null,
    name: "ไก่ผัดมะม่วงหิมพานต์ - Pad Med Ma Muang - Thai Wok with Cashew Nuts",
    price: 16.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/629fee7c1cc4acf99a2a510e783fc936e383d5c0-4894x6118.jpg",
      },
    },
  },
  {
    _id: "dcb61f76-735a-452b-a43e-d92a1dff68b6",
    category: { _type: "localeString", en: "Curry", fi: "Curry", sv: "Curry" },
    description: {
      _type: "localeString",
      en: "Panang Curry Recognized for its luxurious thickness and depth of flavour, Panang Curry differs significantly from other curries. The base is rich coconut milk, providing a velvety, slightly sweeter profile. This curry features green beans, fresh basil, and kaffir leaves for aromatic depth. Characteristically milder in spice than Red or Green curries, it is served with jasmine rice.",
      fi: "Panang Curry Panang Curry tunnetaan ylellisestä täyteläisyydestään ja maun syvyydestään, mikä erottaa sen selvästi muista curryista. Pohjana on rikas kookosmaito, joka antaa annokselle samettisen, hieman makeamman luonteen. Curry sisältää vihreitä papuja, tuoretta basilikaa ja kaffirlimetin lehtiä syvää tuoksua varten. Tyypillisesti miedompi tulisuudeltaan kuin Punainen tai Vihreä curry, se tarjoillaan jasmiiniriisin kanssa.",
      sv: "Panang Curry Panang Curry kännetecknas av sin lyxiga tjocklek och smakdjup, vilket skiljer den avsevärt från andra curryrätter. Basen är rik kokosmjölk, som ger rätten en sammetslen, något sötare profil. Denna curry innehåller gröna bönor, färsk basilika och kaffirlimeblad för aromatisk fyllighet. Den är typiskt sett mildare i styrka än Röd eller Grön curry och serveras med jasminris.",
    },
    name: "พะแนง - Panang Curry",
    price: 16.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/a70dcf2f9a19935fecffb703b7c5d046b3cc80c2-8192x5464.jpg",
      },
    },
  },
  {
    _id: "ed32037e-1adc-4b32-8374-420297fed9c1",
    category: null,
    description: null,
    name: "ส้มตำไทย - Som Tam Thai - Classic Fish Sauce Papaya Salad",
    price: 18.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/e73ec2e60a066c38d21e12bd2ccd0dfa530787a9-5284x6604.jpg",
      },
    },
  },
  {
    _id: "fc5c7db3-f086-4617-bcfa-9e8e01a46765",
    category: {
      _type: "localeString",
      en: "Appetizer",
      fi: "Alkuruoka",
      sv: "Förrätt",
    },
    description: null,
    name: "กุ้งชุบแป้งทอด - Thai Crispy Shrimp Tempura - Goong Chub Pang Tod",
    price: 9.99,
    spiceLevel: null,
    dishImage: {
      asset: {
        url: "https://cdn.sanity.io/images/uqmxroum/production/b5e225e864b2ed265c5248807b00b9d6fa01501d-4894x6118.jpg",
      },
    },
  },
];

function escapeCSV(s: string | null | undefined): string {
  if (!s) return "";
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const headers = [
  "category",
  "NAME_EN",
  "NAME_FI",
  "NAME_SV",
  "NAME_TH",
  "DESC_EN",
  "DESC_FI",
  "DESC_SV",
  "DESC_TH",
  "PRICE",
  "SPICE_LEVEL",
  "IMAGE_URL",
  "SIGNATURE",
];

const rows = [headers.join(",")];

for (const dish of DISHES) {
  const cat = dish.category;
  const desc = dish.description;
  const name = dish.name || "";
  const desc_en = desc?.en || "";
  const desc_fi = desc?.fi || "";
  const desc_sv = desc?.sv || "";
  const price = dish.price?.toString() || "";
  const spice = dish.spiceLevel?.toString() || "";
  const img = dish.dishImage?.asset?.url || "";
  const sig = "";

  const category_en = cat?.en || "";

  const row = [
    escapeCSV(category_en),
    escapeCSV(name),
    escapeCSV(name),
    escapeCSV(name),
    escapeCSV(name),
    escapeCSV(desc_en),
    escapeCSV(desc_fi),
    escapeCSV(desc_sv),
    escapeCSV(""),
    escapeCSV(price),
    escapeCSV(spice),
    escapeCSV(img),
    escapeCSV(sig),
  ];
  rows.push(row.join(","));
}

console.log(rows.join("\n"));

export type DrugCategory = "Skubūs" | "Infuzijos" | "Analgetikai" | "Kiti";

export interface Drug {
  id: string;
  name: string;
  dose: string;
  category: DrugCategory;
  indication: string;
  notes?: string;
}

export const drugs: Drug[] = [
  {
    id: "diazepamas",
    name: "Diazepamas",
    dose: "10 mg i/v iki suminės 30 mg dozės",
    category: "Skubūs",
    indication: "Traukuliai",
  },
  {
    id: "midazolamas",
    name: "Midazolamas",
    dose: "5 mg",
    category: "Skubūs",
    indication: "Traukuliai (alternatyva diazepamui)",
  },
  {
    id: "adrenalinas",
    name: "Adrenalinas",
    dose: "0,5 ml i/m kas 5 min",
    category: "Skubūs",
    indication: "Anafilaksinis šokas",
  },
  {
    id: "deksametazonas",
    name: "Deksametazonas",
    dose: "8 mg i/v",
    category: "Skubūs",
    indication: "Anafilaksija, astma, meningitas",
  },
  {
    id: "tavegilis",
    name: "Tavegilis",
    dose: "2–4 ml i/v",
    category: "Skubūs",
    indication: "Anafilaksija (antihistamininis)",
  },
  {
    id: "salbutamolis",
    name: "Salbutamolis",
    dose: "2 įpurškimai kas 15–20 min iki 4 kartų",
    category: "Skubūs",
    indication: "Bronchų spazmas, astma",
  },
  {
    id: "furozemidas",
    name: "Furozemidas",
    dose: "20–80 mg i/v iki 160 mg",
    category: "Infuzijos",
    indication: "Plaučių edema",
  },
  {
    id: "nitroglicerinas",
    name: "Nitroglicerinas",
    dose: "Po liežuviu kas 5 min iki 3 tab.",
    category: "Skubūs",
    indication: "Plaučių edema, MI – jei AKS >100 mmHg",
  },
  {
    id: "aspirinas",
    name: "Aspirinas",
    dose: "150–300 mg sukramtyti",
    category: "Skubūs",
    indication: "Miokardo infarktas",
    notes: "Dažniausiai pusė tab. (250 mg) sukramtyti su vandeniu.",
  },
  {
    id: "tikagreloras",
    name: "Tikagreloras",
    dose: "180 mg (2 tab.)",
    category: "Skubūs",
    indication: "STEMI – tik suderinus su KITS",
  },
  {
    id: "morfinas",
    name: "Morfinas",
    dose: "Titruotai pagal skausmą (po 2–4 mg)",
    category: "Analgetikai",
    indication: "Stiprus skausmas, plaučių edema, MI",
  },
  {
    id: "ketonalis",
    name: "Ketonalis",
    dose: "Pagal skausmo intensyvumą",
    category: "Analgetikai",
    indication: "Skausmas iki 8 balų",
  },
  {
    id: "nospa",
    name: "Nošpa",
    dose: "4 ml",
    category: "Analgetikai",
    indication: "Akmenligės priepuolis, spazmai",
  },
  {
    id: "metoklopramidas",
    name: "Metoklopramidas",
    dose: "10 mg",
    category: "Kiti",
    indication: "Pykinimas, vėmimas",
  },
  {
    id: "gliukoze-40",
    name: "Gliukozė 40 %",
    dose: "Iki 60 ml i/v",
    category: "Skubūs",
    indication: "Hipoglikemija",
  },
  {
    id: "gliukagonas",
    name: "Gliukagonas",
    dose: "1 mg i/m",
    category: "Skubūs",
    indication: "Hipoglikemija (jei nepavyko punktuoti venos)",
  },
  {
    id: "mgso4",
    name: "MgSO₄ 25 %",
    dose: "5 g i/v lėtai per 10–15 min",
    category: "Infuzijos",
    indication: "Traukuliai nėščiajai (eklampsija)",
  },
  {
    id: "nacl",
    name: "0,9 % NaCl",
    dose: "250–2000 ml pagal indikacijas",
    category: "Infuzijos",
    indication: "Hipotenzija, dehidratacija, sepsis",
  },
  {
    id: "penicilinas",
    name: "Penicilinas",
    dose: "Suaugusiems 6 mln VV i/v; vaikams 50–100 tūkst. VV/kg",
    category: "Skubūs",
    indication: "Meningitas",
  },
  {
    id: "paracetamolis",
    name: "Paracetamolis",
    dose: "500 mg",
    category: "Analgetikai",
    indication: "Karščiavimas (T >38,5 °C)",
  },
  {
    id: "ibuprofenas",
    name: "Ibuprofenas",
    dose: "400–800 mg",
    category: "Analgetikai",
    indication: "Karščiavimas, skausmas",
  },
  {
    id: "kaptoprilis",
    name: "Kaptoprilis",
    dose: "25 mg",
    category: "Kiti",
    indication: "Insulto metu, jei AKS >220/120 mmHg",
  },
];

export interface AbcdeStep {
  letter: string;
  title: string;
  subtitle: string;
  color: string;
  details: string[];
}

export const abcdeSteps: AbcdeStep[] = [
  {
    letter: "A",
    title: "Airway",
    subtitle: "Kvėpavimo takai",
    color: "#E52A2C",
    details: [
      "Įvertinti kvėpavimo takų praeinamumą.",
      "Atverti kvėpavimo takus, jei reikia.",
      "Pašalinti svetimkūnius.",
      "Įvertinti grėsmę – stridoras, užkimęs balsas, gerklų edema.",
    ],
  },
  {
    letter: "B",
    title: "Breathing",
    subtitle: "Kvėpavimas",
    color: "#F97316",
    details: [
      "Įvertinti kvėpavimo dažnį.",
      "Auskultuoti plaučius 4 taškuose (perkutuoti, jei yra asimetrija).",
      "Prijungti pulsoksimetrą, vertinti SpO₂.",
      "Jei yra B problema – gydyti (deguonis, ventiliacija).",
    ],
  },
  {
    letter: "C",
    title: "Circulation",
    subtitle: "Kraujotaka",
    color: "#F59E0B",
    details: [
      "Čiuopti pulsą, vertinti ŠSD.",
      "Matuoti AKS.",
      "Jungti monitorių, vertinti ritmą (privaloma jei pulsas >100 arba <60 k/min).",
      "Užrašyti 12 derivacijų EKG.",
      "Tikrinti KPL (kapiliarų prisipildymo laiką).",
      "Palpuoti, auskultuoti pilvą, krūtinę, dubenį, šlaunis – vertinti šoko požymius.",
      "Įvertinus C – punktuoti veną, lašinti skysčius jei reikia.",
    ],
  },
  {
    letter: "D",
    title: "Disability",
    subtitle: "Neurologinė būklė",
    color: "#2F80ED",
    details: [
      "Apžiūrėti vyzdžius ir įvertinti.",
      "Įvertinti sąmonę pagal Glasgow skalę.",
      "Įvertinti glikemiją, jei reikia.",
      "Įvertinti Cincinnati, meninginius simptomus, jei reikia.",
    ],
  },
  {
    letter: "E",
    title: "Exposure",
    subtitle: "Apžiūra",
    color: "#22C55E",
    details: [
      "Apžiūrėti pacientą įskaitant nugarinį paviršių.",
      "Apžiūrėti odą.",
      "Matuoti temperatūrą.",
      "Užkloti pacientą, kad neperšaltų.",
    ],
  },
];

export interface SampleItem {
  letter: string;
  title: string;
  detail: string;
}

export const sampleItems: SampleItem[] = [
  {
    letter: "S",
    title: "Simptomai",
    detail: "Jei skauda – skausmo anamnezė ir vertinimas balais.",
  },
  { letter: "A", title: "Alergija", detail: "Žinomos alergijos." },
  { letter: "M", title: "Medikamentai", detail: "Vartojami vaistai." },
  { letter: "P", title: "Persirgtos ligos", detail: "Lėtinės ligos, operacijos." },
  { letter: "L", title: "Last meal", detail: "Kada paskutinį kartą valgė." },
  { letter: "E", title: "Aplinkybės", detail: "Įvykio aplinkybės, kontekstas." },
];

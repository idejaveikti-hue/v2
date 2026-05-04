export type DoseUnit = "mg" | "mcg" | "ml" | "VV";

export interface DilutionInfo {
  drugVolumeMl: number;
  diluentVolumeMl: number;
  diluent: string;
  finalConcentration: string;
  note?: string;
}

export interface CalcDrug {
  id: string;
  name: string;
  indication: string;
  category: "Skubūs" | "Infuzijos" | "Analgetikai" | "Kiti";
  route: string;
  concentrationMgPerMl?: number;
  concentrationLabel: string;
  doseLowPerKg: number;
  doseHighPerKg: number;
  doseUnit: DoseUnit;
  maxDose: number;
  maxDoseUnit: DoseUnit;
  ageNote?: string;
  dilution?: DilutionInfo;
  notes?: string;
}

export const calcDrugs: CalcDrug[] = [
  {
    id: "adrenalinas-im",
    name: "Adrenalinas (anafilaksija)",
    indication: "Anafilaksinis šokas – i/m į šlaunį",
    category: "Skubūs",
    route: "i/m",
    concentrationMgPerMl: 1,
    concentrationLabel: "1 mg/ml (1:1000)",
    doseLowPerKg: 0.01,
    doseHighPerKg: 0.01,
    doseUnit: "mg",
    maxDose: 0.5,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 0,01 mg/kg i/m kas 5–15 min",
    notes: "Suaugusiems – 0,5 mg (0,5 ml) i/m kas 5 min.",
  },
  {
    id: "adrenalinas-iv",
    name: "Adrenalinas (atgaivinimas)",
    indication: "Širdies sustojimas – i/v / i/o",
    category: "Skubūs",
    route: "i/v",
    concentrationMgPerMl: 0.1,
    concentrationLabel: "0,1 mg/ml (1:10 000)",
    doseLowPerKg: 0.01,
    doseHighPerKg: 0.01,
    doseUnit: "mg",
    maxDose: 1,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 0,01 mg/kg kas 3–5 min",
    dilution: {
      drugVolumeMl: 1,
      diluentVolumeMl: 9,
      diluent: "0,9 % NaCl",
      finalConcentration: "0,1 mg/ml",
      note: "1 mg adrenalino (1 ml) + 9 ml NaCl = 10 ml (1:10 000)",
    },
    notes: "Suaugusiems – 1 mg i/v kas 3–5 min CPR metu.",
  },
  {
    id: "diazepamas-iv",
    name: "Diazepamas",
    indication: "Traukuliai – i/v lėtai",
    category: "Skubūs",
    route: "i/v",
    concentrationMgPerMl: 5,
    concentrationLabel: "5 mg/ml",
    doseLowPerKg: 0.2,
    doseHighPerKg: 0.3,
    doseUnit: "mg",
    maxDose: 10,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 0,2–0,3 mg/kg i/v",
    notes: "Suaugusiems – 10 mg i/v iki suminės 30 mg dozės.",
  },
  {
    id: "midazolamas-in",
    name: "Midazolamas (į nosį/i/m)",
    indication: "Traukuliai – į nosį arba i/m",
    category: "Skubūs",
    route: "į nosį / i/m",
    concentrationMgPerMl: 5,
    concentrationLabel: "5 mg/ml",
    doseLowPerKg: 0.2,
    doseHighPerKg: 0.2,
    doseUnit: "mg",
    maxDose: 10,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 0,2 mg/kg į nosį (po 0,1 mg/kg į kiekvieną šnervę)",
    notes: "Alternatyva diazepamui kai nėra venos kelio.",
  },
  {
    id: "midazolamas-iv",
    name: "Midazolamas (i/v)",
    indication: "Traukuliai – i/v lėtai",
    category: "Skubūs",
    route: "i/v",
    concentrationMgPerMl: 5,
    concentrationLabel: "5 mg/ml",
    doseLowPerKg: 0.1,
    doseHighPerKg: 0.15,
    doseUnit: "mg",
    maxDose: 10,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 0,1–0,15 mg/kg i/v",
  },
  {
    id: "salbutamolis-neb",
    name: "Salbutamolis (nebulizatorius)",
    indication: "Astmos priepuolis, bronchospazmas",
    category: "Skubūs",
    route: "inhaliacija",
    concentrationMgPerMl: 1,
    concentrationLabel: "1 mg/ml (5 mg/ampulė)",
    doseLowPerKg: 0.15,
    doseHighPerKg: 0.15,
    doseUnit: "mg",
    maxDose: 5,
    maxDoseUnit: "mg",
    ageNote: "<5 m. – 2,5 mg; ≥5 m. – 5 mg per nebulizatorių",
    dilution: {
      drugVolumeMl: 2.5,
      diluentVolumeMl: 2.5,
      diluent: "0,9 % NaCl",
      finalConcentration: "Nebulizuoti su deguonimi 6–8 l/min",
      note: "Ampulę praskiesti NaCl iki ~5 ml ir nebulizuoti 5–10 min",
    },
  },
  {
    id: "deksametazonas",
    name: "Deksametazonas",
    indication: "Anafilaksija, astma, meningitas",
    category: "Skubūs",
    route: "i/v",
    concentrationMgPerMl: 4,
    concentrationLabel: "4 mg/ml",
    doseLowPerKg: 0.15,
    doseHighPerKg: 0.6,
    doseUnit: "mg",
    maxDose: 10,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 0,15–0,6 mg/kg i/v",
    notes: "Suaugusiems – 8 mg i/v.",
  },
  {
    id: "furozemidas",
    name: "Furozemidas",
    indication: "Plaučių edema – i/v lėtai",
    category: "Infuzijos",
    route: "i/v",
    concentrationMgPerMl: 10,
    concentrationLabel: "10 mg/ml",
    doseLowPerKg: 1,
    doseHighPerKg: 1,
    doseUnit: "mg",
    maxDose: 40,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 1 mg/kg i/v",
    notes: "Suaugusiems pradinė 20–80 mg, max 160 mg.",
  },
  {
    id: "morfinas",
    name: "Morfinas",
    indication: "Stiprus skausmas, plaučių edema, MI",
    category: "Analgetikai",
    route: "i/v lėtai",
    concentrationMgPerMl: 1,
    concentrationLabel: "1 mg/ml (po skiedimo)",
    doseLowPerKg: 0.05,
    doseHighPerKg: 0.1,
    doseUnit: "mg",
    maxDose: 10,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 0,05–0,1 mg/kg i/v",
    dilution: {
      drugVolumeMl: 1,
      diluentVolumeMl: 9,
      diluent: "0,9 % NaCl",
      finalConcentration: "1 mg/ml",
      note: "10 mg morfino + 9 ml NaCl = 10 ml (1 mg/ml). Titruoti po 2–4 mg.",
    },
  },
  {
    id: "paracetamolis",
    name: "Paracetamolis",
    indication: "Karščiavimas, lengvas skausmas",
    category: "Analgetikai",
    route: "p/o / p/r",
    concentrationLabel: "Tab. 500 mg / sirupas 24 mg/ml",
    doseLowPerKg: 15,
    doseHighPerKg: 15,
    doseUnit: "mg",
    maxDose: 1000,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 15 mg/kg kas 6 val.",
  },
  {
    id: "ibuprofenas",
    name: "Ibuprofenas",
    indication: "Karščiavimas, skausmas",
    category: "Analgetikai",
    route: "p/o",
    concentrationLabel: "Sirupas 20 mg/ml / tab. 200–400 mg",
    doseLowPerKg: 10,
    doseHighPerKg: 10,
    doseUnit: "mg",
    maxDose: 400,
    maxDoseUnit: "mg",
    ageNote: "Vaikams nuo 6 mėn. – 10 mg/kg kas 8 val.",
  },
  {
    id: "penicilinas",
    name: "Penicilinas",
    indication: "Įtariamas meningitas",
    category: "Skubūs",
    route: "i/v",
    concentrationLabel: "1 mln VV milteliai (skiediama)",
    doseLowPerKg: 50000,
    doseHighPerKg: 100000,
    doseUnit: "VV",
    maxDose: 4000000,
    maxDoseUnit: "VV",
    ageNote: "Vaikams – 50 000–100 000 VV/kg i/v",
    dilution: {
      drugVolumeMl: 0,
      diluentVolumeMl: 10,
      diluent: "0,9 % NaCl arba vanduo injekcijoms",
      finalConcentration: "1 mln VV / 10 ml = 100 000 VV/ml",
      note: "1 mln VV flakoną praskiesti 10 ml NaCl.",
    },
    notes: "Suaugusiems – 6 mln VV i/v.",
  },
  {
    id: "nacl-bolus",
    name: "0,9 % NaCl (bolus)",
    indication: "Hipovoleminis šokas, dehidratacija",
    category: "Infuzijos",
    route: "i/v greitai",
    concentrationLabel: "0,9 % NaCl",
    doseLowPerKg: 20,
    doseHighPerKg: 20,
    doseUnit: "ml",
    maxDose: 1000,
    maxDoseUnit: "ml",
    ageNote: "Vaikams – 20 ml/kg bolusas; kartoti iki 60 ml/kg",
    notes: "Suaugusiems – 250–500 ml bolus, vertinti pakartotinai.",
  },
  {
    id: "gliukoze-10",
    name: "Gliukozė 10 % (vaikams)",
    indication: "Hipoglikemija vaikui",
    category: "Skubūs",
    route: "i/v lėtai",
    concentrationLabel: "10 % (100 mg/ml)",
    doseLowPerKg: 2,
    doseHighPerKg: 5,
    doseUnit: "ml",
    maxDose: 50,
    maxDoseUnit: "ml",
    ageNote: "Vaikams – 2–5 ml/kg 10 % gliukozės i/v",
    notes: "Suaugusiems naudoti 40 % gliukozę iki 60 ml.",
  },
  {
    id: "mgso4",
    name: "MgSO₄ 25 %",
    indication: "Eklampsija, sunki astma",
    category: "Infuzijos",
    route: "i/v lėtai",
    concentrationMgPerMl: 250,
    concentrationLabel: "250 mg/ml (25 %)",
    doseLowPerKg: 25,
    doseHighPerKg: 50,
    doseUnit: "mg",
    maxDose: 2000,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 25–50 mg/kg per 10–20 min",
    dilution: {
      drugVolumeMl: 8,
      diluentVolumeMl: 92,
      diluent: "0,9 % NaCl",
      finalConcentration: "20 mg/ml infuzijai",
      note: "Eklampsijai: 5 g (20 ml 25 %) + 80 ml NaCl, infuzuoti per 10–15 min.",
    },
    notes: "Suaugusiems eklampsijai – 5 g i/v per 10–15 min.",
  },
  {
    id: "amiodaronas",
    name: "Amiodaronas",
    indication: "VF/pulseless VT po 3-iojo šoko",
    category: "Skubūs",
    route: "i/v / i/o bolus",
    concentrationMgPerMl: 50,
    concentrationLabel: "50 mg/ml (150 mg/3 ml)",
    doseLowPerKg: 5,
    doseHighPerKg: 5,
    doseUnit: "mg",
    maxDose: 300,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 5 mg/kg i/v bolus",
    dilution: {
      drugVolumeMl: 6,
      diluentVolumeMl: 14,
      diluent: "5 % gliukozė",
      finalConcentration: "15 mg/ml",
      note: "300 mg (6 ml) + 14 ml 5 % gliukozės = 20 ml.",
    },
    notes: "Suaugusiems – 300 mg i/v po 3-iojo defibriliavimo.",
  },
  {
    id: "atropinas",
    name: "Atropinas",
    indication: "Simptominė bradikardija",
    category: "Skubūs",
    route: "i/v",
    concentrationMgPerMl: 1,
    concentrationLabel: "1 mg/ml",
    doseLowPerKg: 0.02,
    doseHighPerKg: 0.02,
    doseUnit: "mg",
    maxDose: 0.5,
    maxDoseUnit: "mg",
    ageNote: "Vaikams – 0,02 mg/kg i/v (min 0,1 mg, max 0,5 mg)",
    notes: "Suaugusiems – 0,5 mg i/v kas 3–5 min, max 3 mg.",
  },
];

export interface CalcResult {
  weight: number;
  drug: CalcDrug;
  doseLow: number;
  doseHigh: number;
  cappedAtMax: boolean;
  volumeLowMl?: number;
  volumeHighMl?: number;
}

export function calculateDose(drug: CalcDrug, weightKg: number): CalcResult {
  const rawLow = weightKg * drug.doseLowPerKg;
  const rawHigh = weightKg * drug.doseHighPerKg;
  const doseLow = Math.min(rawLow, drug.maxDose);
  const doseHigh = Math.min(rawHigh, drug.maxDose);
  const cappedAtMax = rawHigh > drug.maxDose;

  let volumeLowMl: number | undefined;
  let volumeHighMl: number | undefined;
  if (drug.concentrationMgPerMl && drug.doseUnit === "mg") {
    volumeLowMl = doseLow / drug.concentrationMgPerMl;
    volumeHighMl = doseHigh / drug.concentrationMgPerMl;
  } else if (drug.doseUnit === "ml") {
    volumeLowMl = doseLow;
    volumeHighMl = doseHigh;
  }

  return {
    weight: weightKg,
    drug,
    doseLow,
    doseHigh,
    cappedAtMax,
    volumeLowMl,
    volumeHighMl,
  };
}

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  if (n >= 1000) return n.toLocaleString("lt-LT", { maximumFractionDigits: 0 });
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(1);
  if (n >= 1) return n.toFixed(2).replace(/\.?0+$/, "");
  return n.toFixed(3).replace(/\.?0+$/, "");
}

export function findCalcDrug(id: string): CalcDrug | undefined {
  return calcDrugs.find((d) => d.id === id);
}

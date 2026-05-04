# MedTec V2 – Paramedic Mode

Mobili Expo aplikacija medikams / paramedikams. Lietuviški pagalbos algoritmai, pagrįsti pridėta metodine medžiaga (Lapai.docx).

## Architecture

- Single Expo artifact at `artifacts/medic-app`
- Tamsi tema (MedTec V2 stilius): navy fonas (`#020B13`), raudonas akcentas (`#EF2B2D`)
- 5 tabai: Pagrindinis · ABCDE · Vaistai · Protokolai · Daugiau
- Stack screen: `protocol/[id]` – protokolo detalus puslapis su tabais (Pirmos minutės / Požymiai / Vaistai / Papildoma)

## Key files

- `constants/colors.ts` – tamsi paletė
- `data/protocols.ts` – 12+ protokolų (traukuliai, anafilaksija, hipo/hiperglikemija, MI, insultas, plaučių edema, astma, pilvo skausmas, hiper/hipotermija, meningitas)
- `data/drugs.ts` – ~22 vaistai su dozėmis ir indikacijomis
- `data/abcde.ts` – ABCDE žingsniai + SAMPLE
- `app/(tabs)/index.tsx` – Pagrindinis su paieška, kritinių būklių grid
- `app/protocol/[id].tsx` – protokolo detalus puslapis su 4 tabais
- `components/ProtocolIcon.tsx` – ikonų helper su accent spalvomis

## Content source

Visi protokolai ir vaistų dozės paimti iš pridėtos metodinės medžiagos (`attached_assets/Lapai.docx_*.pdf`). Aplikacija – TIK mokomasis įrankis.

## Notes

- Nėra backend / pacientų valdymo – grynai referencinė / mokomoji aplikacija paramediko darbui.
- Visi tekstai lietuvių kalba.
- Dizainas inspiruotas pridėto `index_*.html` HTML mockup'o.

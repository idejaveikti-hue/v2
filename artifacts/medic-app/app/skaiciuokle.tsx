import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  calcDrugs,
  calculateDose,
  formatNumber,
  type CalcDrug,
} from "@/data/doseCalc";
import { useColors } from "@/hooks/useColors";

const QUICK_WEIGHTS = [3, 5, 10, 15, 20, 30, 50, 70];

export default function CalculatorScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ weight?: string; drug?: string }>();
  const [weightStr, setWeightStr] = useState(params.weight ?? "");
  const [selectedId, setSelectedId] = useState<string | null>(
    params.drug ?? null,
  );
  const [query, setQuery] = useState("");

  const weight = useMemo(() => {
    const n = parseFloat(weightStr.replace(",", "."));
    return isFinite(n) && n > 0 && n < 250 ? n : null;
  }, [weightStr]);

  const filteredDrugs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return calcDrugs;
    return calcDrugs.filter((d) =>
      (d.name + " " + d.indication + " " + d.category)
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  const selected = useMemo(
    () => calcDrugs.find((d) => d.id === selectedId) ?? null,
    [selectedId],
  );

  const result = useMemo(() => {
    if (!selected || !weight) return null;
    return calculateDose(selected, weight);
  }, [selected, weight]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={["#0B2A44", "#020B13"]}
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 16,
          paddingBottom: 18,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,255,255,0.08)",
        }}
      >
        <View style={styles.headRow}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              padding: 4,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Feather name="chevron-left" size={30} color="#fff" />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <Text style={styles.title}>Dozių skaičiuoklė</Text>
            <Text style={styles.subtitle}>Pagal vaiko/paciento svorį</Text>
          </View>
          <View style={styles.headerIcon}>
            <Feather name="cpu" size={18} color="#FF7777" />
          </View>
        </View>

        <View style={styles.weightCard}>
          <Text style={styles.cardLabel}>SVORIS (kg)</Text>
          <TextInput
            value={weightStr}
            onChangeText={setWeightStr}
            keyboardType="decimal-pad"
            placeholder="pvz. 15"
            placeholderTextColor="#5D7488"
            style={styles.weightInput}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingTop: 4 }}
          >
            {QUICK_WEIGHTS.map((w) => {
              const isActive = weightStr === String(w);
              return (
                <Pressable
                  key={w}
                  onPress={() => setWeightStr(String(w))}
                  style={({ pressed }) => [
                    styles.chip,
                    {
                      backgroundColor: isActive
                        ? "#EF2B2D"
                        : "rgba(255,255,255,0.08)",
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: isActive ? "#fff" : "#CBD5E1" },
                    ]}
                  >
                    {w} kg
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 32,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {result ? <ResultCard result={result} /> : null}

        {!weight ? (
          <View style={styles.hint}>
            <Feather name="info" size={16} color="#FBBF24" />
            <Text style={styles.hintText}>
              Įveskite svorį (kg), kad būtų rodomos paskaičiuotos dozės.
            </Text>
          </View>
        ) : null}

        <View
          style={[
            styles.search,
            {
              backgroundColor: "rgba(255,255,255,0.07)",
              borderColor: colors.border,
            },
          ]}
        >
          <Feather
            name="search"
            size={16}
            color="#9FB0C2"
            style={{ marginRight: 8 }}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ieškoti vaisto..."
            placeholderTextColor="#8FA2B6"
            style={{
              flex: 1,
              color: "#fff",
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              paddingVertical: 8,
            }}
          />
        </View>

        <Text style={styles.sectionLabel}>VAISTAI</Text>

        {filteredDrugs.map((drug) => (
          <DrugRow
            key={drug.id}
            drug={drug}
            weight={weight}
            isSelected={selectedId === drug.id}
            onPress={() => setSelectedId(drug.id)}
          />
        ))}

        {filteredDrugs.length === 0 ? (
          <Text
            style={{
              color: "#9FB0C2",
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              textAlign: "center",
              padding: 20,
            }}
          >
            Vaistas nerastas
          </Text>
        ) : null}

        <View style={styles.disclaimer}>
          <Feather name="alert-triangle" size={16} color="#FF7777" />
          <Text style={styles.disclaimerText}>
            Skaičiavimai – tik nuoroda. Visada patikrinkite dozavimą oficialiuose
            protokoluose ir pagal paciento būklę.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function DrugRow({
  drug,
  weight,
  isSelected,
  onPress,
}: {
  drug: CalcDrug;
  weight: number | null;
  isSelected: boolean;
  onPress: () => void;
}) {
  const colors = useColors();
  const result = weight ? calculateDose(drug, weight) : null;
  const sameLowHigh = drug.doseLowPerKg === drug.doseHighPerKg;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.drugRow,
        {
          borderColor: isSelected ? "#EF2B2D" : colors.border,
          backgroundColor: isSelected
            ? "rgba(239,43,45,0.10)"
            : "rgba(255,255,255,0.045)",
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.drugName}>{drug.name}</Text>
        <Text style={styles.drugIndication}>{drug.indication}</Text>
        <Text style={styles.drugDose}>
          {sameLowHigh
            ? `${formatNumber(drug.doseLowPerKg)} ${drug.doseUnit}/kg`
            : `${formatNumber(drug.doseLowPerKg)}–${formatNumber(drug.doseHighPerKg)} ${drug.doseUnit}/kg`}
          {"  ·  "}
          {drug.route}
        </Text>
      </View>
      {result ? (
        <View style={styles.miniResult}>
          <Text style={styles.miniResultDose}>
            {sameLowHigh
              ? formatNumber(result.doseLow)
              : `${formatNumber(result.doseLow)}–${formatNumber(result.doseHigh)}`}
          </Text>
          <Text style={styles.miniResultUnit}>{drug.doseUnit}</Text>
        </View>
      ) : (
        <Feather name="chevron-right" size={20} color="#9FB0C2" />
      )}
    </Pressable>
  );
}

function ResultCard({
  result,
}: {
  result: ReturnType<typeof calculateDose>;
}) {
  const { drug, doseLow, doseHigh, cappedAtMax, volumeLowMl, volumeHighMl } =
    result;
  const sameLowHigh = drug.doseLowPerKg === drug.doseHighPerKg;

  const doseStr = sameLowHigh
    ? `${formatNumber(doseLow)} ${drug.doseUnit}`
    : `${formatNumber(doseLow)}–${formatNumber(doseHigh)} ${drug.doseUnit}`;

  const volStr =
    volumeLowMl !== undefined && volumeHighMl !== undefined
      ? sameLowHigh
        ? `${formatNumber(volumeLowMl)} ml`
        : `${formatNumber(volumeLowMl)}–${formatNumber(volumeHighMl)} ml`
      : null;

  return (
    <View style={styles.resultCard}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultDrugName}>{drug.name}</Text>
        <View style={styles.resultRouteBadge}>
          <Text style={styles.resultRouteText}>{drug.route}</Text>
        </View>
      </View>
      <Text style={styles.resultIndication}>{drug.indication}</Text>

      <View style={styles.bigBox}>
        <Text style={styles.bigBoxLabel}>SULEISTI</Text>
        <Text style={styles.bigBoxValue}>{doseStr}</Text>
        {volStr ? (
          <Text style={styles.bigBoxVolume}>≈ {volStr}</Text>
        ) : null}
        {cappedAtMax ? (
          <View style={styles.maxBadge}>
            <Feather name="alert-triangle" size={11} color="#FBBF24" />
            <Text style={styles.maxBadgeText}>
              Pasiekta maks. dozė ({formatNumber(drug.maxDose)} {drug.maxDoseUnit})
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.metaRow}>
        <MetaItem
          label="Koncentracija"
          value={drug.concentrationLabel}
        />
        <MetaItem
          label="Maks. dozė"
          value={`${formatNumber(drug.maxDose)} ${drug.maxDoseUnit}`}
        />
      </View>

      {drug.dilution ? (
        <View style={styles.dilutionBox}>
          <View style={styles.dilutionHeader}>
            <Feather name="droplet" size={14} color="#67E8F9" />
            <Text style={styles.dilutionTitle}>SKIEDIMAS</Text>
          </View>
          {drug.dilution.note ? (
            <Text style={styles.dilutionNote}>{drug.dilution.note}</Text>
          ) : null}
          <View style={styles.dilutionRow}>
            {drug.dilution.drugVolumeMl > 0 ? (
              <View style={styles.dilutionPart}>
                <Text style={styles.dilutionPartValue}>
                  {formatNumber(drug.dilution.drugVolumeMl)} ml
                </Text>
                <Text style={styles.dilutionPartLabel}>vaisto</Text>
              </View>
            ) : null}
            {drug.dilution.drugVolumeMl > 0 ? (
              <Text style={styles.plus}>+</Text>
            ) : null}
            <View style={styles.dilutionPart}>
              <Text style={styles.dilutionPartValue}>
                {formatNumber(drug.dilution.diluentVolumeMl)} ml
              </Text>
              <Text style={styles.dilutionPartLabel}>{drug.dilution.diluent}</Text>
            </View>
          </View>
          <Text style={styles.dilutionFinal}>
            → {drug.dilution.finalConcentration}
          </Text>
        </View>
      ) : null}

      {drug.ageNote ? (
        <View style={styles.note}>
          <Feather name="user" size={13} color="#86EFAC" />
          <Text style={styles.noteText}>{drug.ageNote}</Text>
        </View>
      ) : null}

      {drug.notes ? (
        <View style={[styles.note, { borderColor: "rgba(147,197,253,0.3)" }]}>
          <Feather name="info" size={13} color="#93C5FD" />
          <Text style={styles.noteText}>{drug.notes}</Text>
        </View>
      ) : null}
    </View>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.meta}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 22,
    letterSpacing: -0.3,
  },
  subtitle: {
    color: "#9FB0C2",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    marginTop: 2,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(239,43,45,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  weightCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    padding: 14,
    gap: 10,
  },
  cardLabel: {
    color: "#FF7777",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    letterSpacing: 0.6,
  },
  weightInput: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 32,
    paddingVertical: 0,
    letterSpacing: -0.5,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  chipText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
  },
  hint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.35)",
    backgroundColor: "rgba(251,191,36,0.08)",
  },
  hintText: {
    flex: 1,
    color: "#FCD34D",
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    lineHeight: 18,
  },
  search: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionLabel: {
    color: "#FF3B3B",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    letterSpacing: 0.8,
    marginTop: 4,
  },
  drugRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 13,
    borderWidth: 1,
    borderRadius: 14,
  },
  drugName: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 15,
  },
  drugIndication: {
    color: "#9FB0C2",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    marginTop: 2,
  },
  drugDose: {
    color: "#FBBF24",
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    marginTop: 6,
    letterSpacing: 0.2,
  },
  miniResult: {
    minWidth: 64,
    alignItems: "flex-end",
  },
  miniResultDose: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 16,
  },
  miniResultUnit: {
    color: "#9FB0C2",
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    marginTop: 2,
  },
  resultCard: {
    borderWidth: 1,
    borderColor: "rgba(239,43,45,0.45)",
    backgroundColor: "rgba(239,43,45,0.06)",
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultDrugName: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 17,
    flex: 1,
  },
  resultRouteBadge: {
    backgroundColor: "rgba(239,43,45,0.20)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  resultRouteText: {
    color: "#FF7777",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    letterSpacing: 0.4,
  },
  resultIndication: {
    color: "#FFD1D1",
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
  bigBox: {
    backgroundColor: "rgba(0,0,0,0.30)",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    gap: 4,
  },
  bigBoxLabel: {
    color: "#9FB0C2",
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  bigBoxValue: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 34,
    letterSpacing: -0.5,
    marginTop: 2,
  },
  bigBoxVolume: {
    color: "#67E8F9",
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    marginTop: 2,
  },
  maxBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(251,191,36,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  maxBadgeText: {
    color: "#FBBF24",
    fontFamily: "Inter_700Bold",
    fontSize: 11,
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
  },
  meta: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  metaLabel: {
    color: "#9FB0C2",
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 0.4,
  },
  metaValue: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 12,
  },
  dilutionBox: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(103,232,249,0.45)",
    backgroundColor: "rgba(103,232,249,0.07)",
    padding: 12,
    gap: 8,
  },
  dilutionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dilutionTitle: {
    color: "#67E8F9",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    letterSpacing: 0.6,
  },
  dilutionNote: {
    color: "#DBEAFE",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 17,
  },
  dilutionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  dilutionPart: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    gap: 2,
  },
  dilutionPartValue: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 16,
  },
  dilutionPartLabel: {
    color: "#9FB0C2",
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    textAlign: "center",
  },
  plus: {
    color: "#67E8F9",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 18,
  },
  dilutionFinal: {
    color: "#86EFAC",
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    textAlign: "center",
  },
  note: {
    flexDirection: "row",
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(134,239,172,0.30)",
    backgroundColor: "rgba(134,239,172,0.05)",
  },
  noteText: {
    flex: 1,
    color: "#DCEEDC",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 17,
  },
  disclaimer: {
    flexDirection: "row",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(239,43,45,0.40)",
    backgroundColor: "rgba(239,43,45,0.07)",
    marginTop: 8,
  },
  disclaimerText: {
    flex: 1,
    color: "#FFD1D1",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 17,
  },
});

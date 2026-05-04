import { Feather } from "@expo/vector-icons";
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

import { drugs, type DrugCategory } from "@/data/drugs";
import { useColors } from "@/hooks/useColors";

const filters: ("Visi" | DrugCategory)[] = [
  "Visi",
  "Skubūs",
  "Infuzijos",
  "Analgetikai",
  "Kiti",
];

export default function VaistaiScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState<(typeof filters)[number]>("Visi");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return drugs.filter((d) => {
      const matchCat = active === "Visi" || d.category === active;
      const matchQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.indication.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [active, query]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: colors.foreground }]}>
          Vaistai
        </Text>
        <Text style={styles.subtitle}>Greitos referencinės dozės</Text>

        <View
          style={[
            styles.search,
            {
              backgroundColor: "rgba(255,255,255,0.07)",
              borderColor: colors.border,
              borderRadius: colors.radius,
            },
          ]}
        >
          <Feather
            name="search"
            size={18}
            color="#9FB0C2"
            style={{ marginRight: 10 }}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ieškoti vaisto ar indikacijos..."
            placeholderTextColor="#8FA2B6"
            style={{
              flex: 1,
              color: "#fff",
              fontFamily: "Inter_500Medium",
              fontSize: 15,
              paddingVertical: 10,
            }}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
          style={{ marginVertical: 12 }}
        >
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <Pressable
                key={f}
                onPress={() => setActive(f)}
                style={({ pressed }) => [
                  styles.chip,
                  {
                    borderColor: isActive ? colors.primary : colors.border,
                    backgroundColor: isActive
                      ? colors.primary
                      : "rgba(255,255,255,0.06)",
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: isActive ? "#fff" : "#DBEAFE" },
                  ]}
                >
                  {f}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={{ gap: 9 }}>
          {filtered.map((drug) => (
            <View
              key={drug.id}
              style={[
                styles.row,
                {
                  borderColor: colors.border,
                  backgroundColor: "rgba(255,255,255,0.055)",
                  borderRadius: colors.radius,
                },
              ]}
            >
              <View
                style={[
                  styles.rowIcon,
                  {
                    borderRadius: 13,
                    backgroundColor: "rgba(255,255,255,0.06)",
                  },
                ]}
              >
                <Feather
                  name={
                    drug.category === "Skubūs"
                      ? "zap"
                      : drug.category === "Infuzijos"
                        ? "droplet"
                        : drug.category === "Analgetikai"
                          ? "shield"
                          : "package"
                  }
                  size={18}
                  color={
                    drug.category === "Skubūs"
                      ? "#FF7777"
                      : drug.category === "Infuzijos"
                        ? "#67E8F9"
                        : drug.category === "Analgetikai"
                          ? "#86EFAC"
                          : "#FBBF24"
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{drug.name}</Text>
                <Text style={styles.rowDose}>{drug.dose}</Text>
                <Text style={styles.rowIndication}>{drug.indication}</Text>
                {drug.notes ? (
                  <Text style={styles.rowNotes}>{drug.notes}</Text>
                ) : null}
              </View>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      drug.category === "Skubūs"
                        ? "rgba(239,43,45,0.18)"
                        : drug.category === "Analgetikai"
                          ? "rgba(34,197,94,0.18)"
                          : "rgba(245,158,11,0.18)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color:
                        drug.category === "Skubūs"
                          ? "#FF7777"
                          : drug.category === "Analgetikai"
                            ? "#86EFAC"
                            : "#FBBF24",
                    },
                  ]}
                >
                  {drug.category.toUpperCase()}
                </Text>
              </View>
            </View>
          ))}

          {filtered.length === 0 ? (
            <View style={{ padding: 32, alignItems: "center", gap: 8 }}>
              <Feather name="search" size={28} color="#9FB0C2" />
              <Text
                style={{
                  color: "#9FB0C2",
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                }}
              >
                Vaistų nerasta
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: "Inter_800ExtraBold",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#9FB0C2",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginTop: 4,
    marginBottom: 14,
  },
  search: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    letterSpacing: 0.2,
  },
  row: {
    borderWidth: 1,
    padding: 13,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  rowIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTitle: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 15,
  },
  rowDose: {
    color: "#DBEAFE",
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    marginTop: 2,
  },
  rowIndication: {
    color: "#9FB0C2",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    marginTop: 4,
  },
  rowNotes: {
    color: "#9FB0C2",
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    marginTop: 4,
    fontStyle: "italic",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 0.4,
  },
});

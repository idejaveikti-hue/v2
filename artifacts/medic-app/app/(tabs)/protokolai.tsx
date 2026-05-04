import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
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

import { ProtocolIcon, accentToColor } from "@/components/ProtocolIcon";
import { protocols } from "@/data/protocols";
import { useColors } from "@/hooks/useColors";

export default function ProtokolaiScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = protocols.filter(
      (p) =>
        !q ||
        (p.title + " " + p.keywords + " " + p.category)
          .toLowerCase()
          .includes(q),
    );
    const groups: Record<string, typeof protocols> = {};
    filtered.forEach((p) => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });
    return Object.entries(groups);
  }, [query]);

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
          Protokolai
        </Text>
        <Text style={styles.subtitle}>Visi pagalbos algoritmai</Text>

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
            placeholder="Ieškoti protokolo..."
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

        {grouped.map(([category, items]) => (
          <View key={category} style={{ marginTop: 18 }}>
            <Text style={styles.sectionTitle}>{category}</Text>
            <View style={{ gap: 9, marginTop: 8 }}>
              {items.map((p) => (
                <Pressable
                  key={p.id}
                  onPress={() => router.push(`/protocol/${p.id}`)}
                  style={({ pressed }) => [
                    styles.row,
                    {
                      borderColor: colors.border,
                      backgroundColor: "rgba(255,255,255,0.055)",
                      borderRadius: colors.radius,
                      opacity: pressed ? 0.85 : 1,
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
                    <ProtocolIcon
                      name={p.icon}
                      size={20}
                      color={accentToColor[p.accent] ?? "#fff"}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowTitle}>{p.title}</Text>
                    <Text style={styles.rowSub}>{p.category}</Text>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor:
                          p.severity === "critical"
                            ? "rgba(239,43,45,0.18)"
                            : "rgba(245,158,11,0.18)",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        {
                          color:
                            p.severity === "critical"
                              ? "#FF7777"
                              : "#FBBF24",
                        },
                      ]}
                    >
                      {p.severity === "critical" ? "KRITINĖ" : "SKUBI"}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={18} color="#9FB0C2" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {grouped.length === 0 ? (
          <View style={{ padding: 32, alignItems: "center", gap: 8 }}>
            <Feather name="search" size={28} color="#9FB0C2" />
            <Text
              style={{
                color: "#9FB0C2",
                fontFamily: "Inter_500Medium",
                fontSize: 14,
              }}
            >
              Protokolų nerasta
            </Text>
          </View>
        ) : null}
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
  sectionTitle: {
    fontSize: 12,
    color: "#FF3B3B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontFamily: "Inter_800ExtraBold",
  },
  row: {
    borderWidth: 1,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
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
  rowSub: {
    color: "#9FB0C2",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    marginTop: 2,
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

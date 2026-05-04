import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return protocols.slice(0, 6);
    return protocols
      .filter((p) =>
        (p.title + " " + p.keywords + " " + p.category)
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 8);
  }, [query]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient
        colors={["#0B2A44", "#020B13"]}
        style={[
          StyleSheet.absoluteFillObject,
          { height: 320 },
        ]}
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View style={styles.brand}>
            <LinearGradient
              colors={["#075EC9", "#0B2A44"]}
              style={[styles.star, { borderRadius: 14 }]}
            >
              <Feather name="plus" size={26} color="#60A5FA" />
            </LinearGradient>
            <View>
              <Text style={[styles.brandTitle, { color: colors.foreground }]}>
                MedTec V2
              </Text>
              <Text style={styles.brandSub}>PARAMEDIC MODE</Text>
            </View>
          </View>
          <Pressable
            style={[
              styles.iconBtn,
              { borderColor: colors.border, backgroundColor: "rgba(255,255,255,0.04)" },
            ]}
          >
            <Feather name="bookmark" size={18} color="#fff" />
          </Pressable>
        </View>

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
            placeholder="Ieškoti būklės ar simptomo..."
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

        <Text style={styles.sectionTitle}>Kritinės būklės</Text>

        <View style={styles.grid}>
          {filtered.map((p, i) => {
            const tint = accentToColor[p.accent] ?? "#fff";
            const isActive = i === 0 && !query;
            return (
              <Pressable
                key={p.id}
                onPress={() => router.push(`/protocol/${p.id}`)}
                style={({ pressed }) => [
                  styles.quick,
                  {
                    borderRadius: 16,
                    borderColor: isActive
                      ? "rgba(239,43,45,0.9)"
                      : colors.border,
                    backgroundColor: "rgba(255,255,255,0.045)",
                    opacity: pressed ? 0.85 : 1,
                  },
                  isActive && {
                    shadowColor: "#EF2B2D",
                    shadowOpacity: 0.2,
                    shadowRadius: 18,
                    shadowOffset: { width: 0, height: 8 },
                  },
                ]}
              >
                <View>
                  <ProtocolIcon name={p.icon} size={32} color={tint} />
                </View>
                <View>
                  <Text style={styles.quickTitle}>{p.title}</Text>
                  <Text style={styles.quickSub}>{p.category}</Text>
                </View>
              </Pressable>
            );
          })}
          {filtered.length === 0 ? (
            <View
              style={{
                width: "100%",
                padding: 24,
                alignItems: "center",
                gap: 8,
              }}
            >
              <Feather name="search" size={28} color="#9FB0C2" />
              <Text
                style={{
                  color: "#9FB0C2",
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Nieko nerasta pagal „{query}"
              </Text>
            </View>
          ) : null}
        </View>

        <Pressable
          onPress={() => router.push("/skaiciuokle")}
          style={({ pressed }) => [
            styles.wideAction,
            {
              borderColor: "rgba(239,43,45,0.55)",
              backgroundColor: "rgba(239,43,45,0.12)",
              borderRadius: 15,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Feather name="cpu" size={18} color="#FF7777" />
            <Text style={[styles.wideActionText, { color: "#fff" }]}>
              DOZIŲ SKAIČIUOKLĖ
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#fff" />
        </Pressable>

        <Pressable
          onPress={() => router.push("/(tabs)/protokolai")}
          style={({ pressed }) => [
            styles.wideAction,
            {
              borderColor: colors.border,
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: 15,
              opacity: pressed ? 0.85 : 1,
              marginTop: 10,
            },
          ]}
        >
          <Text style={styles.wideActionText}>VISI PROTOKOLAI</Text>
          <Feather name="chevron-right" size={20} color="#fff" />
        </Pressable>

        <View style={styles.shortcutRow}>
          <Pressable
            onPress={() => router.push("/(tabs)/abcde")}
            style={({ pressed }) => [
              styles.shortcut,
              {
                borderColor: colors.border,
                backgroundColor: "rgba(255,255,255,0.045)",
                borderRadius: 14,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Feather name="layers" size={20} color="#67E8F9" />
            <Text style={styles.shortcutTitle}>ABCDE</Text>
            <Text style={styles.shortcutSub}>Pirminis vertinimas</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(tabs)/vaistai")}
            style={({ pressed }) => [
              styles.shortcut,
              {
                borderColor: colors.border,
                backgroundColor: "rgba(255,255,255,0.045)",
                borderRadius: 14,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Feather name="briefcase" size={20} color="#FBBF24" />
            <Text style={styles.shortcutTitle}>Vaistai</Text>
            <Text style={styles.shortcutSub}>Dozės ir indikacijos</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    paddingTop: 6,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  star: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2F80ED",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  brandTitle: {
    fontSize: 21,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.1,
  },
  brandSub: {
    color: "#FF3B3B",
    fontSize: 11,
    fontFamily: "Inter_800ExtraBold",
    letterSpacing: 0.8,
    marginTop: 2,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    marginTop: 10,
    marginBottom: 18,
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
    marginTop: 8,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  quick: {
    width: "48.5%",
    minHeight: 120,
    borderWidth: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  quickTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginTop: 10,
  },
  quickSub: {
    color: "#9FB0C2",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    marginTop: 2,
  },
  wideAction: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wideActionText: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
    letterSpacing: 0.8,
    fontSize: 13,
  },
  shortcutRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  shortcut: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
    gap: 6,
  },
  shortcutTitle: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 15,
  },
  shortcutSub: {
    color: "#9FB0C2",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
});

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProtocolIcon, accentToColor } from "@/components/ProtocolIcon";
import { findProtocol, type Protocol } from "@/data/protocols";
import { useColors } from "@/hooks/useColors";

type Tab = "fast" | "symptoms" | "meds" | "extra";

const tabLabels: { key: Tab; label: string }[] = [
  { key: "fast", label: "Pirmos minutės" },
  { key: "symptoms", label: "Požymiai" },
  { key: "meds", label: "Vaistai" },
  { key: "extra", label: "Papildoma" },
];

export default function ProtocolDetail() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const protocol = id ? findProtocol(id) : undefined;
  const [tab, setTab] = useState<Tab>("fast");

  if (!protocol) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: insets.top,
          padding: 24,
        }}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={{ color: "#fff", fontFamily: "Inter_700Bold", fontSize: 16 }}>
          Protokolas nerastas
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{ marginTop: 16, padding: 12 }}
        >
          <Text style={{ color: "#FF7777", fontFamily: "Inter_700Bold" }}>
            Grįžti
          </Text>
        </Pressable>
      </View>
    );
  }

  const tint = accentToColor[protocol.accent] ?? "#fff";
  const isCritical = protocol.severity === "critical";

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={
          isCritical
            ? ["rgba(239,43,45,0.78)", "rgba(79,17,26,0.38)"]
            : ["rgba(245,158,11,0.7)", "rgba(79,55,17,0.35)"]
        }
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 16,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: isCritical
            ? "rgba(239,43,45,0.35)"
            : "rgba(245,158,11,0.35)",
        }}
      >
        <View style={styles.detailTop}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              padding: 4,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Feather name="chevron-left" size={32} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>{protocol.title}</Text>
          <Pressable style={({ pressed }) => ({ padding: 4, opacity: pressed ? 0.6 : 1 })}>
            <Feather name="bookmark" size={22} color="#fff" />
          </Pressable>
        </View>

        <View
          style={[
            styles.headCard,
            {
              borderRadius: 16,
              borderColor: isCritical
                ? "rgba(239,43,45,0.65)"
                : "rgba(245,158,11,0.55)",
            },
          ]}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              backgroundColor: "rgba(255,255,255,0.06)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProtocolIcon name={protocol.icon} size={26} color={tint} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.headTitle}>{protocol.title}</Text>
            <Text style={styles.headSub}>{protocol.category}</Text>
          </View>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: isCritical
                  ? "rgba(239,43,45,0.18)"
                  : "rgba(245,158,11,0.18)",
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: isCritical ? "#FF7777" : "#FBBF24" },
              ]}
            >
              {isCritical ? "KRITINĖ" : "SKUBI"}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 8,
          }}
          style={{ flexGrow: 0, backgroundColor: colors.background }}
        >
          {tabLabels.map((t) => {
            const isActive = tab === t.key;
            return (
              <Pressable
                key={t.key}
                onPress={() => setTab(t.key)}
                style={({ pressed }) => [
                  styles.tab,
                  {
                    backgroundColor: isActive
                      ? colors.primary
                      : "rgba(255,255,255,0.08)",
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? "#fff" : "#CBD5E1" },
                  ]}
                >
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 32,
            gap: 12,
          }}
          showsVerticalScrollIndicator={false}
        >
          {tab === "fast" ? <FastTab protocol={protocol} /> : null}
          {tab === "symptoms" ? <SymptomsTab protocol={protocol} /> : null}
          {tab === "meds" ? <MedsTab protocol={protocol} /> : null}
          {tab === "extra" ? <ExtraTab protocol={protocol} /> : null}
        </ScrollView>
      </View>
    </View>
  );
}

function Panel({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "red" | "green" | "blue";
}) {
  const palette = {
    default: {
      border: "rgba(255,255,255,0.10)",
      bg: "rgba(255,255,255,0.055)",
      title: "#fff",
    },
    red: {
      border: "rgba(239,43,45,0.55)",
      bg: "rgba(239,43,45,0.08)",
      title: "#FF7777",
    },
    green: {
      border: "rgba(34,197,94,0.45)",
      bg: "rgba(34,197,94,0.08)",
      title: "#86EFAC",
    },
    blue: {
      border: "rgba(47,128,237,0.45)",
      bg: "rgba(47,128,237,0.08)",
      title: "#93C5FD",
    },
  }[variant];

  return (
    <View
      style={[
        styles.panel,
        { borderColor: palette.border, backgroundColor: palette.bg },
      ]}
    >
      <Text style={[styles.panelTitle, { color: palette.title }]}>{title}</Text>
      {children}
    </View>
  );
}

function StepList({ items }: { items: string[] }) {
  return (
    <View style={{ gap: 8 }}>
      {items.map((step, i) => (
        <View key={i} style={styles.step}>
          <View style={styles.num}>
            <Text style={styles.numText}>{i + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
}

function BulletList({
  items,
  color = "#FFD1D1",
}: {
  items: string[];
  color?: string;
}) {
  return (
    <View style={{ gap: 8 }}>
      {items.map((item, i) => (
        <View key={i} style={{ flexDirection: "row", gap: 8 }}>
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: color,
              marginTop: 8,
            }}
          />
          <Text
            style={{
              flex: 1,
              color,
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

function FastTab({ protocol }: { protocol: Protocol }) {
  return (
    <>
      <Panel title="Pirmos minutės">
        <StepList items={protocol.fast} />
      </Panel>
      <Panel title="Gydymo principai">
        <StepList items={protocol.treatment} />
      </Panel>
      {protocol.redFlags && protocol.redFlags.length ? (
        <Panel title="Raudonos vėliavos" variant="red">
          <BulletList items={protocol.redFlags} />
        </Panel>
      ) : null}
    </>
  );
}

function SymptomsTab({ protocol }: { protocol: Protocol }) {
  return (
    <Panel title="Požymiai / atpažinimas">
      <BulletList items={protocol.symptoms} color="#DBEAFE" />
    </Panel>
  );
}

function MedsTab({ protocol }: { protocol: Protocol }) {
  return (
    <>
      {protocol.meds && protocol.meds.length ? (
        <Panel title="Vaistai ir dozės" variant="red">
          <StepList items={protocol.meds} />
        </Panel>
      ) : (
        <Panel title="Vaistai">
          <Text
            style={{
              color: "#9FB0C2",
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Šiame protokole specifinių vaistų nėra. Vadovaukitės bendraisiais
            principais.
          </Text>
        </Panel>
      )}
      {protocol.dilution && protocol.dilution.length ? (
        <Panel title="Skiedimai / infuzijos" variant="blue">
          <StepList items={protocol.dilution} />
        </Panel>
      ) : null}
    </>
  );
}

function ExtraTab({ protocol }: { protocol: Protocol }) {
  return (
    <>
      {protocol.children && protocol.children.length ? (
        <Panel title="Vaikai" variant="green">
          <StepList items={protocol.children} />
        </Panel>
      ) : null}
      {protocol.redFlags && protocol.redFlags.length ? (
        <Panel title="Raudonos vėliavos" variant="red">
          <BulletList items={protocol.redFlags} />
        </Panel>
      ) : null}
      {(!protocol.children || !protocol.children.length) &&
      (!protocol.redFlags || !protocol.redFlags.length) ? (
        <Panel title="Papildoma informacija">
          <Text
            style={{
              color: "#9FB0C2",
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Papildomos informacijos nėra.
          </Text>
        </Panel>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  detailTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 17,
  },
  headCard: {
    borderWidth: 1,
    backgroundColor: "rgba(5,15,25,0.35)",
    padding: 14,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  headTitle: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 19,
  },
  headSub: {
    color: "#FFD4D4",
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  tabText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    letterSpacing: 0.2,
  },
  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
    gap: 12,
  },
  panelTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  step: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    borderRadius: 12,
    padding: 11,
  },
  num: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EF2B2D",
    alignItems: "center",
    justifyContent: "center",
  },
  numText: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
  },
  stepText: {
    flex: 1,
    color: "#fff",
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
});

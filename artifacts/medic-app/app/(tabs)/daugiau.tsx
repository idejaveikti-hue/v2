import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

interface RowItem {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  tint: string;
  onPress?: () => void;
}

export default function DaugiauScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const emergency: RowItem[] = [
    {
      icon: "phone-call",
      title: "Skambinti 112",
      subtitle: "Bendrasis pagalbos numeris",
      tint: "#FF7777",
      onPress: () => Linking.openURL("tel:112").catch(() => {}),
    },
    {
      icon: "phone",
      title: "Apsinuodijimų kontrolės centras",
      subtitle: "+370 5 236 2052",
      tint: "#FBBF24",
      onPress: () => Linking.openURL("tel:+37052362052").catch(() => {}),
    },
  ];

  const tools: RowItem[] = [
    {
      icon: "cpu",
      title: "Dozių skaičiuoklė",
      subtitle: "Vaistų dozės pagal svorį (kg)",
      tint: "#FF7777",
      onPress: () => router.push("/skaiciuokle"),
    },
  ];

  const references: RowItem[] = [
    {
      icon: "activity",
      title: "Glasgow koma skalė",
      subtitle: "GKS – 3-15 balų",
      tint: "#67E8F9",
    },
    {
      icon: "heart",
      title: "Cincinnati skalė",
      subtitle: "Veidas / ranka / kalba",
      tint: "#FF7777",
    },
    {
      icon: "thermometer",
      title: "Normos – kvėpavimas, AKS",
      subtitle: "Suaugusiems ir vaikams",
      tint: "#86EFAC",
    },
  ];

  const about: RowItem[] = [
    {
      icon: "info",
      title: "Apie aplikaciją",
      subtitle: "MedTec V2 – Paramedic Mode",
      tint: "#93C5FD",
    },
    {
      icon: "shield",
      title: "Atsakomybės atsisakymas",
      subtitle: "Tik mokomasis įrankis",
      tint: "#9FB0C2",
    },
  ];

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
          Daugiau
        </Text>
        <Text style={styles.subtitle}>Greitos nuorodos ir nustatymai</Text>

        <Section title="Pagalbos numeriai">
          {emergency.map((item) => (
            <Row key={item.title} {...item} />
          ))}
        </Section>

        <Section title="Įrankiai">
          {tools.map((item) => (
            <Row key={item.title} {...item} />
          ))}
        </Section>

        <Section title="Greita atmintinė">
          {references.map((item) => (
            <Row key={item.title} {...item} />
          ))}
        </Section>

        <Section title="Informacija">
          {about.map((item) => (
            <Row key={item.title} {...item} />
          ))}
        </Section>

        <View
          style={[
            styles.warning,
            {
              borderColor: "rgba(239,43,45,0.45)",
              backgroundColor: "rgba(239,43,45,0.08)",
              borderRadius: colors.radius,
            },
          ]}
        >
          <Feather name="alert-triangle" size={18} color="#FF7777" />
          <Text style={styles.warningText}>
            Ši aplikacija – TIK mokomasis įrankis. Visada vadovaukitės oficialiais
            galiojančiais protokolais ir klinikiniu mąstymu prieš priimdami
            sprendimus dėl gydymo.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginTop: 22 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={{ gap: 9, marginTop: 8 }}>{children}</View>
    </View>
  );
}

function Row({ icon, title, subtitle, tint, onPress }: RowItem) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
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
        <Feather name={icon} size={18} color={tint} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSub}>{subtitle}</Text>
      </View>
      {onPress ? (
        <Feather name="chevron-right" size={18} color="#9FB0C2" />
      ) : null}
    </Pressable>
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
  warning: {
    marginTop: 24,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
  },
  warningText: {
    flex: 1,
    color: "#FFD1D1",
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
});

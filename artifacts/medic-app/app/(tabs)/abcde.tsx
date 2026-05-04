import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { abcdeSteps, sampleItems } from "@/data/abcde";
import { useColors } from "@/hooks/useColors";

export default function AbcdeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

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
        <Text style={[styles.title, { color: colors.foreground }]}>ABCDE</Text>
        <Text style={styles.subtitle}>Pirminis paciento įvertinimas</Text>

        <Text style={styles.sectionTitle}>Saugumas, apsaugos priemonės</Text>
        <View
          style={[
            styles.infoPanel,
            {
              borderColor: "rgba(47,128,237,0.45)",
              backgroundColor: "rgba(47,128,237,0.08)",
              borderRadius: colors.radius,
            },
          ]}
        >
          <Text style={styles.infoText}>
            Įvertinti, ar yra kritinė būklė: klinikinė mirtis, traukuliai,
            masyvus kraujavimas. Prisistatymas. Sąmonės vertinimas (kas atsitiko).
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Pirminis vertinimas</Text>

        {abcdeSteps.map((step) => (
          <View
            key={step.letter}
            style={[
              styles.step,
              {
                borderColor: colors.border,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: colors.radius,
              },
            ]}
          >
            <View style={styles.stepHeader}>
              <View
                style={[
                  styles.letter,
                  { backgroundColor: step.color, borderRadius: 14 },
                ]}
              >
                <Text style={styles.letterText}>{step.letter}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
              </View>
            </View>
            <View style={{ marginTop: 12, gap: 8 }}>
              {step.details.map((detail, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <View
                    style={[styles.bullet, { backgroundColor: step.color }]}
                  />
                  <Text style={styles.bulletText}>{detail}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>SAMPLE anamnezė</Text>
        <View
          style={[
            styles.sampleCard,
            {
              borderColor: colors.border,
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: colors.radius,
            },
          ]}
        >
          {sampleItems.map((item, i) => (
            <View
              key={item.letter}
              style={[
                styles.sampleRow,
                i < sampleItems.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <View style={styles.sampleLetter}>
                <Text style={styles.sampleLetterText}>{item.letter}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sampleTitle}>{item.title}</Text>
                <Text style={styles.sampleDetail}>{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.infoPanel,
            {
              borderColor: "rgba(47,128,237,0.45)",
              backgroundColor: "rgba(47,128,237,0.08)",
              borderRadius: colors.radius,
              marginTop: 16,
            },
          ]}
        >
          <Text style={styles.infoText}>
            Nuolatinis būklės vertinimas ir gydymas. Grįžkite prie ABCDE ciklo
            reguliariai.
          </Text>
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
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#FF3B3B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontFamily: "Inter_800ExtraBold",
    marginTop: 20,
    marginBottom: 10,
  },
  step: {
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  letter: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  letterText: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "Inter_800ExtraBold",
  },
  stepTitle: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  stepSubtitle: {
    color: "#9FB0C2",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 4,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    color: "#DBEAFE",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_400Regular",
  },
  infoPanel: {
    borderWidth: 1,
    padding: 14,
  },
  infoText: {
    color: "#DBEAFE",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_400Regular",
  },
  sampleCard: {
    borderWidth: 1,
    overflow: "hidden",
  },
  sampleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
  },
  sampleLetter: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(239,43,45,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  sampleLetterText: {
    color: "#FF7777",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 18,
  },
  sampleTitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  sampleDetail: {
    color: "#9FB0C2",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
});

import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";

interface InputProps extends TextInputProps {
  label?: string;
  hint?: string;
  suffix?: string;
}

export function Input({ label, hint, suffix, style, ...rest }: InputProps) {
  const colors = useColors();
  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={[styles.label, { color: colors.mutedForeground }]}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.fieldRow,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <TextInput
          placeholderTextColor={colors.mutedForeground}
          {...rest}
          style={[
            styles.input,
            { color: colors.foreground, fontFamily: "Inter_500Medium" },
            style,
          ]}
        />
        {suffix ? (
          <Text style={[styles.suffix, { color: colors.mutedForeground }]}>
            {suffix}
          </Text>
        ) : null}
      </View>
      {hint ? (
        <Text style={[styles.hint, { color: colors.mutedForeground }]}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  suffix: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginLeft: 8,
  },
  hint: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});

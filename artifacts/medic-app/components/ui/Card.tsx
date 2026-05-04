import React from "react";
import { StyleSheet, View, type ViewProps, type ViewStyle } from "react-native";

import { useColors } from "@/hooks/useColors";

interface CardProps extends ViewProps {
  padded?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export function Card({ children, padded = true, style, ...rest }: CardProps) {
  const colors = useColors();
  return (
    <View
      {...rest}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: colors.radius,
          padding: padded ? 16 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
});

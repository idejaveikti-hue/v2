import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

interface ProtocolIconProps {
  name: string;
  size?: number;
  color?: string;
}

const featherNames = new Set<keyof typeof Feather.glyphMap>([
  "zap",
  "alert-triangle",
  "droplet",
  "trending-up",
  "heart",
  "activity",
  "wind",
  "thermometer",
  "shield",
  "circle",
  "home",
  "book-open",
  "briefcase",
  "more-horizontal",
  "layers",
]);

export function ProtocolIcon({
  name,
  size = 24,
  color = "#fff",
}: ProtocolIconProps) {
  if (name === "snowflake") {
    return (
      <MaterialCommunityIcons name="snowflake" size={size} color={color} />
    );
  }
  if (featherNames.has(name as keyof typeof Feather.glyphMap)) {
    return (
      <Feather
        name={name as keyof typeof Feather.glyphMap}
        size={size}
        color={color}
      />
    );
  }
  return <Feather name="alert-circle" size={size} color={color} />;
}

export const accentToColor: Record<string, string> = {
  red: "#FF3B3B",
  white: "#F8FAFC",
  cyan: "#67E8F9",
  green: "#86EFAC",
  orange: "#FBBF24",
  blue: "#93C5FD",
};

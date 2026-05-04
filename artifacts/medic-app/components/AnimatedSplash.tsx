import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Props {
  onFinish: () => void;
}

export function AnimatedSplash({ onFinish }: Props) {
  const crossScale = useRef(new Animated.Value(0.4)).current;
  const crossOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(24)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const lineScale = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // Phase 1: cross scales + glows in (0–600ms)
      Animated.parallel([
        Animated.spring(crossScale, {
          toValue: 1,
          tension: 60,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(crossOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Phase 2: divider line + title slide up (600–900ms)
      Animated.parallel([
        Animated.spring(lineScale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(titleY, {
          toValue: 0,
          tension: 80,
          friction: 9,
          useNativeDriver: true,
        }),
      ]),
      // Phase 3: subtitle fades in (900–1100ms)
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      // Phase 4: hold (1100–1800ms)
      Animated.delay(700),
      // Phase 5: fade out entire screen (1800–2100ms)
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      {/* Glow behind cross */}
      <Animated.View
        style={[
          styles.glow,
          { opacity: glowOpacity, width: width * 0.75, height: width * 0.75 },
        ]}
      />

      {/* Red cross */}
      <Animated.View
        style={[
          styles.crossWrap,
          { opacity: crossOpacity, transform: [{ scale: crossScale }] },
        ]}
      >
        <View style={styles.crossV} />
        <View style={styles.crossH} />
      </Animated.View>

      {/* Title block */}
      <Animated.View
        style={[
          styles.titleBlock,
          { opacity: titleOpacity, transform: [{ translateY: titleY }] },
        ]}
      >
        {/* Divider line */}
        <Animated.View
          style={[styles.line, { transform: [{ scaleX: lineScale }] }]}
        />
        <Text style={styles.title}>MedTec V2</Text>
        <Animated.Text style={[styles.sub, { opacity: subtitleOpacity }]}>
          PARAMEDIC MODE
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

const CROSS_ARM = 28;
const CROSS_SIZE = 130;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#020B13",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  glow: {
    position: "absolute",
    borderRadius: 9999,
    backgroundColor: "transparent",
    shadowColor: "#EF2B2D",
    shadowOpacity: 0.55,
    shadowRadius: 80,
    shadowOffset: { width: 0, height: 0 },
  },
  crossWrap: {
    width: CROSS_SIZE,
    height: CROSS_SIZE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
  crossV: {
    position: "absolute",
    width: CROSS_ARM,
    height: CROSS_SIZE,
    backgroundColor: "#EF2B2D",
    borderRadius: 6,
  },
  crossH: {
    position: "absolute",
    width: CROSS_SIZE,
    height: CROSS_ARM,
    backgroundColor: "#EF2B2D",
    borderRadius: 6,
  },
  titleBlock: {
    alignItems: "center",
    gap: 8,
  },
  line: {
    width: 120,
    height: 1.5,
    backgroundColor: "rgba(239,43,45,0.55)",
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 30,
    letterSpacing: 0.5,
  },
  sub: {
    color: "#EF2B2D",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    letterSpacing: 3,
  },
});

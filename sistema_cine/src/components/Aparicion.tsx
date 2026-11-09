import { ReactNode, useEffect, useRef } from "react";
import { Animated, Easing, Platform, StyleProp, ViewStyle } from "react-native";

type Props = {
  children: ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

// Entrada suave (fade + desplazamiento) para que el contenido no aparezca de golpe.
export default function Aparicion({ children, delay = 0, style }: Props) {
  const opacidad = useRef(new Animated.Value(0)).current;
  const desplazamiento = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    const usarNativo = Platform.OS !== "web";
    Animated.parallel([
      Animated.timing(opacidad, {
        toValue: 1,
        duration: 380,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: usarNativo,
      }),
      Animated.timing(desplazamiento, {
        toValue: 0,
        duration: 380,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: usarNativo,
      }),
    ]).start();
  }, [delay, desplazamiento, opacidad]);

  return (
    <Animated.View style={[style, { opacity: opacidad, transform: [{ translateY: desplazamiento }] }]}>
      {children}
    </Animated.View>
  );
}

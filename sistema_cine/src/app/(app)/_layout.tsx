import { Stack } from "expo-router";
import { colores } from "../../constants/colores";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colores.fondo },
<<<<<<< HEAD
        animation: "slide_from_right",
        animationDuration: 260,
        gestureEnabled: true,
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
      }}
    />
  );
}

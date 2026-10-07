import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colores } from "../constants/colores";

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colores.fondo },
        }}
      />
    </>
  );
}

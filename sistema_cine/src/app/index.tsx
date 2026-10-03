// Punto de entrada de la app. Con Expo Router, esta pantalla se muestra
// primero al abrir la app.

import { Redirect } from "expo-router";

export default function Index() {
  // TODO: decidir a dónde entra el usuario primero.
  // Lo más simple: redirigir directo a la Cartelera.
  return <Redirect href="/(tabs)/elegir_pelicula" />;
}

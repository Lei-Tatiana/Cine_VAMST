import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import MenuLateral from "../components/MenuLateral";
import { colores } from "../constants/colores";
import { SesionProvider } from "../services/sesion";
import { CarritoCandyProvider } from "../services/carrito";

// Menú lateral izquierdo.

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colores.fondo }}>
      <SesionProvider>
        <CarritoCandyProvider>
          <StatusBar style="light" />
          <Drawer
            drawerContent={(props) => <MenuLateral {...props} />}
            screenOptions={{
              headerShown: false,
              drawerType: "front",
              swipeEdgeWidth: 60,
              overlayColor: "rgba(0,0,0,0.6)",
              drawerStyle: { width: "75%", backgroundColor: colores.tarjeta },
              sceneStyle: { backgroundColor: colores.fondo },
            }}
          >
            <Drawer.Screen name="(app)" />
          </Drawer>
        </CarritoCandyProvider>
      </SesionProvider>
    </GestureHandlerRootView>
  );
}

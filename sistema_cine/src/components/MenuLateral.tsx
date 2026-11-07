import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";
import type { DrawerContentComponentProps } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { useSesion } from "../services/sesion";

type OpcionProps = {
  icono: keyof typeof Ionicons.glyphMap;
  texto: string;
  activa?: boolean;
  onPress: () => void;
};

function Opcion({ icono, texto, activa = false, onPress }: OpcionProps) {
  return (
    <Pressable onPress={onPress} style={estilos.opcion}>
      <Ionicons name={icono} size={22} color={activa ? colores.rojo : colores.texto} />
      <Text style={[estilos.opcionTexto, activa && estilos.opcionActiva]}>{texto}</Text>
    </Pressable>
  );
}

// Contenido del menú lateral. Lo dibuja el Drawer de src/app/_layout.tsx
// (se abre con el botón ☰ o deslizando desde el borde izquierdo).
export default function MenuLateral({ navigation }: DrawerContentComponentProps) {
  const router = useRouter();
  const ruta = usePathname();
  const { usuario, cerrarSesion } = useSesion();

  const irA = (destino: string) => {
    navigation.closeDrawer();
    router.push(destino);
  };

  const salir = async () => {
    navigation.closeDrawer();
    await cerrarSesion();
    router.replace("/elegir_pelicula");
  };

  return (
    <SafeAreaView style={estilos.panel}>
      <Text style={estilos.titulo}>VAMST CINE</Text>
      <Text style={estilos.saludo}>Hola, {usuario ? usuario.nombre.split(" ")[0] : "cinéfilo"} 👋</Text>

      <Opcion icono="film-outline" texto="Cartelera / Inicio" activa={ruta === "/elegir_pelicula" || ruta === "/"} onPress={() => irA("/elegir_pelicula")} />
      <Opcion icono="fast-food-outline" texto="Candy Bar / Tienda" activa={ruta === "/tienda"} onPress={() => irA("/tienda")} />
      <Opcion icono="pricetag-outline" texto="Promociones" activa={ruta === "/promociones"} onPress={() => irA("/promociones")} />
      <Opcion icono="person-outline" texto={usuario ? "Mi perfil y tickets" : "Iniciar sesión / Registro"} activa={ruta === "/registro"} onPress={() => irA("/registro")} />
      {usuario ? <Opcion icono="log-out-outline" texto="Cerrar sesión" onPress={salir} /> : null}

      <View style={estilos.creditos}>
        <Text style={estilos.creditosTitulo}>❤️ Créditos</Text>
        <Text style={estilos.creditosTexto}>"Gracias a Diosito..."</Text>
      </View>

      <Pressable onPress={() => navigation.closeDrawer()} style={estilos.cerrar}>
        <Ionicons name="close" size={20} color={colores.texto} />
        <Text style={estilos.opcionTexto}>Cerrar menú</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  panel: { flex: 1, backgroundColor: colores.tarjeta, padding: 20 },
  titulo: { color: colores.rojo, fontSize: 22, fontWeight: "bold" },
  saludo: { color: colores.gris, marginTop: 4, marginBottom: 20 },
  opcion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  opcionTexto: { color: colores.texto, fontSize: 16 },
  opcionActiva: { color: colores.rojo, fontWeight: "bold" },
  creditos: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
  },
  creditosTitulo: { color: colores.texto, fontSize: 16 },
  creditosTexto: { color: colores.gris, marginTop: 4, fontStyle: "italic" },
  cerrar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: "auto",
    paddingVertical: 12,
  },
});

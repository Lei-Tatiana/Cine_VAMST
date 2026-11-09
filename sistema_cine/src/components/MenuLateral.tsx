import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { usePathname, useRouter } from "expo-router";
import type { DrawerContentComponentProps } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { avatarPorId } from "../data/avatares";
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

// Contenido menú lateral.
export default function MenuLateral({ navigation }: DrawerContentComponentProps) {
  const router = useRouter();
  const ruta = usePathname();
  const { usuario, avatar, cerrarSesion } = useSesion();
  const avatarElegido = avatarPorId(avatar);

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
      <View style={estilos.usuario}>
        {avatarElegido ? (
          <Image source={avatarElegido.imagen} style={estilos.avatar} contentFit="cover" />
        ) : (
          <Ionicons name="person-circle" size={44} color={colores.rojo} />
        )}
        <View style={estilos.usuarioInfo}>
          <Text style={estilos.titulo}>VAMST CINE</Text>
          <Text style={estilos.saludo}>Hola, {usuario ? usuario.nombre.split(" ")[0] : "cinéfilo"}</Text>
        </View>
      </View>

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
  usuario: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 },
  usuarioInfo: { flex: 1 },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: colores.rojo },
  titulo: { color: colores.rojo, fontSize: 20, fontWeight: "bold" },
  saludo: { color: colores.gris, marginTop: 2 },
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

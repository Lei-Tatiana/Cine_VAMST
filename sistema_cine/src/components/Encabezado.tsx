import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MenuLateral from "./MenuLateral";
import { colores } from "../constants/colores";

type Props = {
  titulo: string;
  volver?: boolean;
  menu?: boolean;
  derecha?: ReactNode;
};

export default function Encabezado({ titulo, volver = false, menu = true, derecha }: Props) {
  const router = useRouter();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <View style={estilos.barra}>
      {menu ? (
        <Pressable onPress={() => setMenuAbierto(true)} hitSlop={8}>
          <Ionicons name="menu" size={28} color={colores.texto} />
        </Pressable>
      ) : null}

      {volver ? (
        <Pressable onPress={() => router.back()} style={estilos.volver} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colores.texto} />
          <Text style={estilos.texto}>Volver</Text>
        </Pressable>
      ) : null}

      <Text style={estilos.titulo} numberOfLines={1}>
        {titulo}
      </Text>

      <View style={estilos.derecha}>{derecha}</View>

      <MenuLateral visible={menuAbierto} cerrar={() => setMenuAbierto(false)} />
    </View>
  );
}

const estilos = StyleSheet.create({
  barra: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  volver: { flexDirection: "row", alignItems: "center" },
  texto: { color: colores.texto, fontSize: 16 },
  titulo: { flex: 1, color: colores.texto, fontSize: 18, fontWeight: "bold" },
  derecha: { flexDirection: "row", alignItems: "center", gap: 12 },
});

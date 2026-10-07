import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";

type Props = { visible: boolean; cerrar: () => void };

type OpcionProps = {
  icono: keyof typeof Ionicons.glyphMap;
  texto: string;
  onPress: () => void;
};

function Opcion({ icono, texto, onPress }: OpcionProps) {
  return (
    <Pressable onPress={onPress} style={estilos.opcion}>
      <Ionicons name={icono} size={22} color={colores.texto} />
      <Text style={estilos.opcionTexto}>{texto}</Text>
    </Pressable>
  );
}

export default function MenuLateral({ visible, cerrar }: Props) {
  const router = useRouter();

  const irACartelera = () => {
    cerrar();
    router.push("/elegir_pelicula");
  };

  const irATienda = () => {
    cerrar();
    router.push("/tienda");
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={cerrar}>
      <View style={estilos.contenedor}>
        <SafeAreaView style={estilos.panel}>
          <Text style={estilos.titulo}>VAMST CINE</Text>
          <Text style={estilos.saludo}>Hola, cinéfilo 👋</Text>

          <Opcion icono="film-outline" texto="Cartelera / Inicio" onPress={irACartelera} />
          <Opcion icono="fast-food-outline" texto="Candy Bar / Tienda" onPress={irATienda} />
          <Opcion icono="pricetag-outline" texto="Promociones" onPress={cerrar} />
          <Opcion icono="person-outline" texto="Mi Perfil / Registro" onPress={cerrar} />
          <Opcion icono="call-outline" texto="Contacto / RRHH" onPress={cerrar} />

          <View style={estilos.creditos}>
            <Text style={estilos.creditosTitulo}>❤️ Créditos</Text>
            <Text style={estilos.creditosTexto}>"Gracias a mi gata..."</Text>
          </View>

          <Pressable onPress={cerrar} style={estilos.cerrar}>
            <Ionicons name="close" size={20} color={colores.texto} />
            <Text style={estilos.opcionTexto}>Cerrar menú</Text>
          </Pressable>
        </SafeAreaView>

        {/* Pantalla de fondo con sombra: al tocarla se cierra el menú */}
        <Pressable onPress={cerrar} style={estilos.sombra} />
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, flexDirection: "row" },
  panel: { width: "75%", backgroundColor: colores.tarjeta, padding: 20 },
  sombra: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  titulo: { color: colores.rojo, fontSize: 22, fontWeight: "bold" },
  saludo: { color: colores.gris, marginTop: 4, marginBottom: 20 },
  opcion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  opcionTexto: { color: colores.texto, fontSize: 16 },
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

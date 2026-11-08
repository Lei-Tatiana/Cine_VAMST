import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import { colores } from "../../constants/colores";
import { PROMOS } from "../../data/promos";
import { useMenuLateral } from "../../hooks/useMenuLateral";

export default function Promociones() {
  useMenuLateral(true);

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado titulo="Promociones" volver menu={false} />

      <ScrollView contentContainerStyle={estilos.contenido}>
        <Text style={estilos.subtitulo}>Beneficios vigentes para vos</Text>
        {PROMOS.map((p) => (
          <View key={p.titulo} style={estilos.tarjeta}>
            <View style={estilos.icono}>
              <Ionicons name={p.icono} size={26} color={colores.rojo} />
            </View>
            <View style={estilos.info}>
              <Text style={estilos.titulo}>{p.titulo}</Text>
              <Text style={estilos.detalle}>{p.detalle}</Text>
              <Text style={estilos.vigencia}>{p.vigencia}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, paddingBottom: 40, gap: 12 },
  subtitulo: { color: colores.gris, marginBottom: 4 },
  tarjeta: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 12,
    padding: 16,
  },
  icono: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "rgba(229,9,20,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1 },
  titulo: { color: colores.texto, fontSize: 16, fontWeight: "bold" },
  detalle: { color: colores.gris, marginTop: 4, lineHeight: 19 },
  vigencia: { color: colores.rojo, fontSize: 12, fontWeight: "600", marginTop: 8 },
});
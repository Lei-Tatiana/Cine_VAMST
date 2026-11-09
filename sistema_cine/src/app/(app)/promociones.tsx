import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import Aparicion from "../../components/Aparicion";
import { colores } from "../../constants/colores";
import { PROMOS } from "../../data/promos";
import { useMenuLateral } from "../../hooks/useMenuLateral";

export default function Promociones() {
  useMenuLateral(true);

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado titulo="Promociones" volver menu={false} />

      <ScrollView contentContainerStyle={estilos.contenido}>
        <Aparicion style={estilos.encabezado}>
          <Text style={estilos.overline}>BENEFICIOS</Text>
          <Text style={estilos.tituloGrande}>Promos para tu salida</Text>
          <Text style={estilos.bajada}>Descuentos y combos vigentes para disfrutar más por menos.</Text>
        </Aparicion>

        {PROMOS.map((p, i) => (
          <Aparicion key={p.titulo} delay={80 + i * 70}>
            <View style={estilos.tarjeta}>
              <View style={estilos.foto}>
                <Image source={p.imagen} style={estilos.fotoImagen} contentFit="cover" transition={220} />
                <View style={estilos.velo} />
                <View style={estilos.icono}>
                  <Ionicons name={p.icono} size={20} color={colores.rojo} />
                </View>
                <View style={estilos.vigenciaBadge}>
                  <Ionicons name="calendar-outline" size={12} color={colores.texto} />
                  <Text style={estilos.vigenciaBadgeTexto}>{p.vigencia}</Text>
                </View>
              </View>
              <View style={estilos.info}>
                <Text style={estilos.titulo}>{p.titulo}</Text>
                <Text style={estilos.detalle}>{p.detalle}</Text>
              </View>
            </View>
          </Aparicion>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, paddingBottom: 40, gap: 16 },
  encabezado: { gap: 2, marginBottom: 4 },
  overline: { color: colores.rojo, fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  tituloGrande: { color: colores.texto, fontSize: 27, fontWeight: "800" },
  bajada: { color: colores.gris, fontSize: 14, marginTop: 2 },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    overflow: "hidden",
  },
  foto: { height: 150, backgroundColor: "#2a2a2a" },
  fotoImagen: { width: "100%", height: "100%" },
  velo: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.18)" },
  icono: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(10,10,10,0.75)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  vigenciaBadge: {
    position: "absolute",
    right: 12,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(10,10,10,0.78)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  vigenciaBadgeTexto: { color: colores.texto, fontSize: 11, fontWeight: "600" },
  info: { padding: 16, gap: 6 },
  titulo: { color: colores.texto, fontSize: 19, fontWeight: "800" },
  detalle: { color: colores.gris, lineHeight: 20 },
});
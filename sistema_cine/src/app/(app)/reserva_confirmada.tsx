import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import BotonRojo from "../../components/BotonRojo";
import { colores } from "../../constants/colores";
import { formatearPrecio } from "../../utils/formato";
import { useMenuLateral } from "../../hooks/useMenuLateral";

type Params = {
  reservaId?: string;
  total?: string;
  pelicula?: string;
  funcion?: string;
  formato?: string;
  sala?: string;
  asientos?: string; // "A1,A2,B3"
};

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View style={estilos.fila}>
      <Text style={estilos.etiqueta}>{etiqueta}</Text>
      <Text style={estilos.valor}>{valor}</Text>
    </View>
  );
}

export default function ReservaConfirmada() {
  useMenuLateral(false);
  const router = useRouter();
  const p = useLocalSearchParams<Params>();
  const escala = useRef(new Animated.Value(0.6)).current;
  const opacidad = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(escala, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
      Animated.timing(opacidad, { toValue: 1, duration: 350, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, [escala, opacidad]);

  const asientos = p.asientos ? p.asientos.split(",").filter(Boolean) : [];

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado titulo="Reserva confirmada" menu={false} />

      <ScrollView contentContainerStyle={estilos.contenido}>
        <Animated.View style={[estilos.exito, { opacity: opacidad, transform: [{ scale: escala }] }]}>
          <Ionicons name="checkmark-circle" size={80} color={colores.rojo} />
        </Animated.View>
        <Text style={estilos.titulo}>¡Listo! Tu compra está confirmada</Text>
        <Text style={estilos.bajada}>
          Presentá este código en boletería para retirar tus entradas.
        </Text>

        <View style={estilos.codigoTarjeta}>
          <Text style={estilos.codigoEtiqueta}>Código de reserva</Text>
          <Text style={estilos.codigo}>{p.reservaId ?? "—"}</Text>
          <View style={estilos.codigoBarras}>
            {[3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2, 3, 1, 2].map((ancho, i) => (
              <View key={i} style={[estilos.barra, { width: ancho * 2, opacity: i % 4 === 0 ? 0.45 : 1 }]} />
            ))}
          </View>
        </View>

        <View style={estilos.tarjeta}>
          <Fila etiqueta="Película" valor={`${p.pelicula ?? "-"}${p.formato ? ` (${p.formato})` : ""}`} />
          <Fila etiqueta="Función" valor={p.funcion ?? "-"} />
          <Fila etiqueta="Sala" valor={p.sala ?? "-"} />
          <View style={estilos.fila}>
            <Text style={estilos.etiqueta}>{asientos.length === 1 ? "Asiento" : "Asientos"}</Text>
            <View style={estilos.asientosChips}>
              {asientos.length === 0 ? (
                <Text style={estilos.valor}>-</Text>
              ) : (
                asientos.map((a) => (
                  <View key={a} style={estilos.asientoChip}>
                    <Text style={estilos.asientoChipTexto}>{a}</Text>
                  </View>
                ))
              )}
            </View>
          </View>
          <View style={estilos.divisor} />
          <View style={estilos.fila}>
            <Text style={estilos.totalEtiqueta}>Total pagado</Text>
            <Text style={estilos.total}>{formatearPrecio(Number(p.total ?? 0))}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={estilos.pie}>
        <BotonRojo texto="Ver mis tickets" onPress={() => router.push("/registro")} />
        <Pressable onPress={() => router.replace("/elegir_pelicula")} style={({ pressed }) => [estilos.secundario, pressed && estilos.secundarioPresionado]}>
          <Ionicons name="film-outline" size={18} color={colores.gris} />
          <Text style={estilos.secundarioTexto}>Volver a la cartelera</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/tienda")} style={({ pressed }) => [estilos.secundario, pressed && estilos.secundarioPresionado]}>
          <Ionicons name="fast-food-outline" size={18} color={colores.gris} />
          <Text style={estilos.secundarioTexto}>Ver la dulcería</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 20, alignItems: "center" },
  exito: { marginTop: 12 },
  titulo: { color: colores.texto, fontSize: 22, fontWeight: "bold", textAlign: "center", marginTop: 14 },
  bajada: { color: colores.gris, textAlign: "center", marginTop: 6, marginBottom: 20, lineHeight: 20 },
  codigoTarjeta: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.rojo,
    borderStyle: "dashed",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  codigoEtiqueta: { color: colores.gris, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" },
  codigo: { color: colores.texto, fontSize: 28, fontWeight: "bold", letterSpacing: 2, marginTop: 6 },
  codigoBarras: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 14, height: 32 },
  barra: { height: "100%", backgroundColor: colores.texto, borderRadius: 1 },
  tarjeta: {
    width: "100%",
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  fila: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  etiqueta: { color: colores.gris },
  valor: { color: colores.texto, fontWeight: "600", flexShrink: 1, textAlign: "right" },
  asientosChips: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", gap: 6, flexShrink: 1 },
  asientoChip: { backgroundColor: colores.rojo, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  asientoChipTexto: { color: colores.texto, fontWeight: "bold", fontSize: 13 },
  divisor: { height: 1, backgroundColor: colores.borde },
  totalEtiqueta: { color: colores.texto, fontSize: 16, fontWeight: "bold" },
  total: { color: colores.texto, fontSize: 20, fontWeight: "bold" },
  pie: { padding: 16, gap: 10, borderTopWidth: 1, borderTopColor: colores.borde },
  secundario: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 10 },
  secundarioPresionado: { opacity: 0.6 },
  secundarioTexto: { color: colores.gris, fontSize: 14 },
});
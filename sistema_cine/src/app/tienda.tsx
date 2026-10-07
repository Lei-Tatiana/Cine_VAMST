import { useRef, useState } from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../components/Encabezado";
import Chip from "../components/Chip";
import ProductoFila from "../components/ProductoFila";
import { colores } from "../constants/colores";

export default function Tienda() {
  const scrollRef = useRef<ScrollView>(null);
  const posiciones = useRef<{ [seccion: string]: number }>({});
  const [cantidad, setCantidad] = useState(0);

  const guardar = (seccion: string) => (e: LayoutChangeEvent) => {
    posiciones.current[seccion] = e.nativeEvent.layout.y;
  };

  const irA = (seccion: string) => {
    scrollRef.current?.scrollTo({ y: posiciones.current[seccion], animated: true });
  };

  const agregar = () => setCantidad(cantidad + 1);

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado
        titulo="VAMST CANDY BAR"
        derecha={
          <View style={estilos.carrito}>
            <Ionicons name="cart-outline" size={24} color={colores.texto} />
            <Text style={estilos.carritoTexto}>({cantidad})</Text>
          </View>
        }
      />

      <ScrollView ref={scrollRef} contentContainerStyle={estilos.contenido}>
        <View style={estilos.banner}>
          <Text style={estilos.bannerTexto}>Banner promocional Candy</Text>
        </View>

        <Text style={estilos.subtitulo}>Categorías</Text>
        <View style={estilos.chips}>
          <Chip texto="#Combos" onPress={() => irA("combos")} />
          <Chip texto="#Palomitas" onPress={() => irA("palomitas")} />
          <Chip texto="#Bebidas" onPress={() => irA("bebidas")} />
          <Chip texto="#Snacks" onPress={() => irA("snacks")} />
        </View>

        <View onLayout={guardar("combos")}>
          <Text style={estilos.seccion}>Combos</Text>
          <ProductoFila nombre="Combo Pareja" precio="12.500" onAgregar={agregar} />
        </View>

        <View onLayout={guardar("palomitas")}>
          <Text style={estilos.seccion}>Palomitas</Text>
          <ProductoFila nombre="Palomitas Grandes" precio="5.000" onAgregar={agregar} />
        </View>

        <View onLayout={guardar("bebidas")}>
          <Text style={estilos.seccion}>Bebidas</Text>
          <ProductoFila nombre="Gaseosa XL" precio="3.500" onAgregar={agregar} />
        </View>

        <View onLayout={guardar("snacks")}>
          <Text style={estilos.seccion}>Snacks</Text>
          <ProductoFila nombre="Nachos con queso" precio="4.500" onAgregar={agregar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, paddingBottom: 40 },
  carrito: { flexDirection: "row", alignItems: "center", gap: 4 },
  carritoTexto: { color: colores.texto, fontSize: 16 },
  banner: {
    height: 120,
    borderRadius: 12,
    backgroundColor: colores.tarjeta,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTexto: { color: colores.gris },
  subtitulo: { color: colores.gris, marginTop: 20, marginBottom: 8 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  seccion: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 28, marginBottom: 12 },
});

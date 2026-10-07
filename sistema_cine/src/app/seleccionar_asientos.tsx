import { useState } from "react";
import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../components/Encabezado";
import BotonRojo from "../components/BotonRojo";
import { colores } from "../constants/colores";

const filas = ["A", "B", "C", "D", "E"];
// L = libre, O = ocupado, A = accesible (una letra por asiento, del 1 al 8)
const estados = ["LLLOOLLL", "LLLLLLLL", "AALLLLOO", "LLOOOOLL", "LLLLLLLL"];
const PRECIO = 6000;

type AsientoProps = { estado: string; elegido: boolean; tamano?: number };

function Asiento({ estado, elegido, tamano = 28 }: AsientoProps) {
  if (elegido) return <Ionicons name="square" size={tamano} color={colores.rojo} />;
  if (estado === "O") return <Ionicons name="square" size={tamano} color="#333333" />;
  if (estado === "A") return <Ionicons name="accessibility" size={tamano} color={colores.azul} />;
  return <Ionicons name="square-outline" size={tamano} color="#555555" />;
}

export default function SeleccionarAsientos() {
  const router = useRouter();
  const [elegidos, setElegidos] = useState<string[]>([]);

  const alternar = (codigo: string) => {
    if (elegidos.includes(codigo)) {
      setElegidos(elegidos.filter((a) => a !== codigo));
    } else {
      setElegidos([...elegidos, codigo]);
    }
  };

  const cantidad = elegidos.length;
  const total = cantidad * PRECIO;

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado
        titulo="Selección de asientos"
        volver
        menu={false}
        derecha={<Text style={estilos.sala}>Sala 1</Text>}
      />

      <Text style={estilos.funcion}>Película: Batman (2D Doblada) | Horario: 20:00</Text>

      <ScrollView contentContainerStyle={estilos.contenido}>
        <View style={estilos.pantallaCine}>
          <Text style={estilos.pantallaTexto}>PANTALLA</Text>
        </View>

        <View style={estilos.leyenda}>
          <View style={estilos.leyendaItem}>
            <Asiento estado="L" elegido={false} tamano={20} />
            <Text style={estilos.leyendaTexto}>Disponible</Text>
          </View>
          <View style={estilos.leyendaItem}>
            <Asiento estado="L" elegido tamano={20} />
            <Text style={estilos.leyendaTexto}>Seleccionado</Text>
          </View>
          <View style={estilos.leyendaItem}>
            <Asiento estado="O" elegido={false} tamano={20} />
            <Text style={estilos.leyendaTexto}>Ocupado</Text>
          </View>
          <View style={estilos.leyendaItem}>
            <Asiento estado="A" elegido={false} tamano={20} />
            <Text style={estilos.leyendaTexto}>Accesible</Text>
          </View>
        </View>

        {filas.map((fila, i) => (
          <View key={fila} style={estilos.fila}>
            <Text style={estilos.letra}>{fila}</Text>
            {estados[i].split("").map((estado, n) => {
              const codigo = fila + (n + 1);
              return (
                <Pressable
                  key={codigo}
                  disabled={estado === "O"}
                  onPress={() => alternar(codigo)}
                  style={[estilos.asiento, (n === 2 || n === 5) && estilos.pasillo]}
                >
                  <Asiento estado={estado} elegido={elegidos.includes(codigo)} />
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={estilos.panel}>
        <Text style={estilos.panelTexto}>
          Asientos: {cantidad === 0 ? "ninguno" : [...elegidos].sort().join(", ")}
          {cantidad > 0 ? ` (${cantidad} ${cantidad === 1 ? "entrada" : "entradas"})` : ""}
        </Text>
        <View style={estilos.panelFila}>
          <Text style={estilos.total}>Total: ${total.toLocaleString("es-AR")}</Text>
          <View style={estilos.panelBoton}>
            <BotonRojo
              texto="Continuar a Dulcería"
              desactivado={cantidad === 0}
              onPress={() => router.push("/tienda")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  sala: { color: colores.texto, fontWeight: "bold" },
  funcion: {
    color: colores.gris,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  contenido: { padding: 16, alignItems: "center" },
  pantallaCine: {
    width: "70%",
    height: 40,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderTopWidth: 3,
    borderColor: colores.gris,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  pantallaTexto: { color: colores.gris, letterSpacing: 2 },
  leyenda: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
    marginBottom: 24,
  },
  leyendaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  leyendaTexto: { color: colores.gris, fontSize: 13 },
  fila: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  letra: { color: colores.gris, width: 22, fontWeight: "bold" },
  asiento: { padding: 2 },
  pasillo: { marginRight: 16 },
  panel: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    backgroundColor: colores.tarjeta,
  },
  panelTexto: { color: colores.texto },
  panelFila: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 12 },
  total: { color: colores.texto, fontSize: 18, fontWeight: "bold" },
  panelBoton: { flex: 1 },
});

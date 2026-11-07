import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import BotonRojo from "../../components/BotonRojo";
import { colores } from "../../constants/colores";
import { getAsientos } from "../../services/api";
import { formatearFecha, formatearHora, formatearPrecio } from "../../utils/formato";
import { Asiento } from "../../models/tipos";
import { useMenuLateral } from "../../hooks/useMenuLateral";

type Params = {
  funcionId?: string;
  pelicula?: string;
  formato?: string;
  fechaHora?: string;
  sala?: string;
  precioBase?: string;
};

function IconoAsiento({ asiento, elegido, tamano = 28 }: { asiento: Asiento; elegido: boolean; tamano?: number }) {
  if (elegido) return <Ionicons name="square" size={tamano} color={colores.rojo} />;
  if (asiento.estado === "ocupado") return <Ionicons name="square" size={tamano} color="#333333" />;
  if (asiento.tipo === "accesible") return <Ionicons name="accessibility" size={tamano} color={colores.azul} />;
  return <Ionicons name="square-outline" size={tamano} color="#555555" />;
}

export default function SeleccionarAsientos() {
  useMenuLateral(false);
  const router = useRouter();
  const p = useLocalSearchParams<Params>();
  const funcionId = Number(p.funcionId);

  const [asientos, setAsientos] = useState<Asiento[]>([]);
  const [elegidos, setElegidos] = useState<number[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(() => {
    setCargando(true);
    setError("");
    getAsientos(funcionId)
      .then((data) => {
        setAsientos(data);
        const disponibles = new Set(data.filter((a) => a.estado === "disponible").map((a) => a.id));
        setElegidos((prev) => prev.filter((id) => disponibles.has(id)));
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [funcionId]);

  useFocusEffect(useCallback(() => { cargar(); }, [cargar]));

  const alternar = (id: number) => {
    setElegidos((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const filas = [...new Set(asientos.map((a) => a.fila))].sort();
  const seleccionados = asientos.filter((a) => elegidos.includes(a.id));
  const codigos = seleccionados.map((a) => `${a.fila}${a.numero}`).sort();
  const total = seleccionados.reduce((suma, a) => suma + a.precio, 0);
  const fechaHora = p.fechaHora ?? "";

  const continuar = () => {
    router.push({
      pathname: "/confirmar_compra",
      params: {
        funcionId: String(funcionId),
        asientosIds: elegidos.join(","),
        asientos: codigos.join(","),
        pelicula: p.pelicula ?? "",
        funcion: fechaHora ? `${formatearFecha(fechaHora)} · ${formatearHora(fechaHora)}` : "",
        formato: p.formato ?? "",
        sala: p.sala ?? "",
        total: String(total),
      },
    });
  };

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado
        titulo="Selección de asientos"
        volver
        menu={false}
        derecha={<Text style={estilos.sala}>{p.sala ?? ""}</Text>}
      />

      <Text style={estilos.funcion}>
        {p.pelicula ?? ""} ({p.formato ?? ""}){fechaHora ? ` | ${formatearFecha(fechaHora)} · ${formatearHora(fechaHora)}` : ""}
      </Text>

      {cargando ? (
        <View style={estilos.centro}>
          <ActivityIndicator size="large" color={colores.rojo} />
        </View>
      ) : error ? (
        <View style={estilos.centro}>
          <Ionicons name="cloud-offline-outline" size={48} color={colores.gris} />
          <Text style={estilos.errorTexto}>No se pudieron cargar los asientos</Text>
          <Text style={estilos.errorDetalle}>{error}</Text>
          <View style={estilos.reintentar}>
            <BotonRojo texto="Reintentar" onPress={cargar} />
          </View>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={estilos.contenido}>
            <View style={estilos.pantallaCine}>
              <Text style={estilos.pantallaTexto}>PANTALLA</Text>
            </View>

            <View style={estilos.leyenda}>
              <View style={estilos.leyendaItem}>
                <Ionicons name="square-outline" size={20} color="#555555" />
                <Text style={estilos.leyendaTexto}>Disponible</Text>
              </View>
              <View style={estilos.leyendaItem}>
                <Ionicons name="square" size={20} color={colores.rojo} />
                <Text style={estilos.leyendaTexto}>Seleccionado</Text>
              </View>
              <View style={estilos.leyendaItem}>
                <Ionicons name="square" size={20} color="#333333" />
                <Text style={estilos.leyendaTexto}>Ocupado</Text>
              </View>
              <View style={estilos.leyendaItem}>
                <Ionicons name="accessibility" size={20} color={colores.azul} />
                <Text style={estilos.leyendaTexto}>Accesible</Text>
              </View>
            </View>

            {filas.map((fila) => (
              <View key={fila} style={estilos.fila}>
                <Text style={estilos.letra}>{fila}</Text>
                {asientos
                  .filter((a) => a.fila === fila)
                  .sort((a, b) => a.numero - b.numero)
                  .map((a) => (
                    <Pressable
                      key={a.id}
                      disabled={a.estado === "ocupado"}
                      onPress={() => alternar(a.id)}
                      style={[estilos.asiento, (a.numero === 2 || a.numero === 5) && estilos.pasillo]}
                    >
                      <IconoAsiento asiento={a} elegido={elegidos.includes(a.id)} />
                    </Pressable>
                  ))}
              </View>
            ))}
          </ScrollView>

          <View style={estilos.panel}>
            <Text style={estilos.panelTexto}>
              Asientos: {codigos.length === 0 ? "ninguno" : codigos.join(", ")}
              {codigos.length > 0 ? ` (${codigos.length} ${codigos.length === 1 ? "entrada" : "entradas"})` : ""}
            </Text>
            <View style={estilos.panelFila}>
              <Text style={estilos.total}>Total: {formatearPrecio(total)}</Text>
              <View style={estilos.panelBoton}>
                <BotonRojo texto="Continuar" desactivado={codigos.length === 0} onPress={continuar} />
              </View>
            </View>
          </View>
        </>
      )}
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
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10 },
  errorTexto: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 8 },
  errorDetalle: { color: colores.gris, textAlign: "center" },
  reintentar: { marginTop: 12, width: "60%" },
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
  leyenda: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 14, marginBottom: 24 },
  leyendaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  leyendaTexto: { color: colores.gris, fontSize: 13 },
  fila: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  letra: { color: colores.gris, width: 22, fontWeight: "bold" },
  asiento: { padding: 2 },
  pasillo: { marginRight: 16 },
  panel: { padding: 16, borderTopWidth: 1, borderTopColor: colores.borde, backgroundColor: colores.tarjeta },
  panelTexto: { color: colores.texto },
  panelFila: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 12 },
  total: { color: colores.texto, fontSize: 18, fontWeight: "bold" },
  panelBoton: { flex: 1 },
});
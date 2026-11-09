import { useState } from "react";
<<<<<<< HEAD
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
=======
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import BotonRojo from "../../components/BotonRojo";
<<<<<<< HEAD
import FormularioPago from "../../components/FormularioPago";
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
import { colores } from "../../constants/colores";
import { formatearPrecio } from "../../utils/formato";
import { crearReserva } from "../../services/api";
import { useSesion } from "../../services/sesion";
import { useMenuLateral } from "../../hooks/useMenuLateral";
<<<<<<< HEAD
import { MetodoPago } from "../../models/tipos";
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78

type Params = {
  funcionId?: string;
  asientosIds?: string; // "1,2,3"
  asientos?: string; // "A1,A2,B3"
  pelicula?: string;
  funcion?: string;
  formato?: string;
  sala?: string;
  total?: string;
};

function FilaDetalle({ icono, etiqueta, valor }: { icono: keyof typeof Ionicons.glyphMap; etiqueta: string; valor: string }) {
  return (
    <View style={estilos.filaDetalle}>
      <Ionicons name={icono} size={18} color={colores.gris} />
      <Text style={estilos.filaEtiqueta}>{etiqueta}</Text>
      <Text style={estilos.filaValor}>{valor}</Text>
    </View>
  );
}

export default function ConfirmarCompra() {
  useMenuLateral(false);
  const router = useRouter();
  const p = useLocalSearchParams<Params>();
  const { usuario } = useSesion();
<<<<<<< HEAD
  const [pagoVisible, setPagoVisible] = useState(false);
=======
  const [confirmando, setConfirmando] = useState(false);
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78

  const asientos = p.asientos ? p.asientos.split(",").filter(Boolean) : [];
  const ids = p.asientosIds ? p.asientosIds.split(",").map(Number) : [];
  const cantidad = asientos.length;
  const total = Number(p.total ?? 0);

<<<<<<< HEAD
  const pagarYConfirmar = async (metodoPago: MetodoPago) => {
    if (!usuario) throw new Error("Iniciá sesión para comprar tus entradas.");
    const reserva = await crearReserva(usuario.id, Number(p.funcionId), ids, metodoPago);
    setPagoVisible(false);
    router.replace({
      pathname: "/reserva_confirmada",
      params: {
        reservaId: reserva.codigo,
        total: String(reserva.total),
        pelicula: p.pelicula ?? "",
        funcion: p.funcion ?? "",
        formato: p.formato ?? "",
        sala: p.sala ?? "",
        asientos: asientos.join(","),
      },
    });
  };

  const continuar = () => {
=======
  const confirmar = async () => {
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    if (!usuario) {
      router.push("/registro");
      return;
    }
<<<<<<< HEAD
    if (ids.length === 0) return;
    setPagoVisible(true);
=======
    if (confirmando || ids.length === 0) return;
    setConfirmando(true);
    try {
      const reserva = await crearReserva(usuario.id, Number(p.funcionId), ids);
      router.replace({
        pathname: "/reserva_confirmada",
        params: {
          reservaId: reserva.codigo,
          total: String(reserva.total),
          pelicula: p.pelicula ?? "",
          funcion: p.funcion ?? "",
          formato: p.formato ?? "",
          sala: p.sala ?? "",
          asientos: asientos.join(","),
        },
      });
    } catch (e: any) {
      Alert.alert("No se pudo confirmar", e.message);
      setConfirmando(false);
    }
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  };

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado titulo="Confirmar compra" volver menu={false} />

      <ScrollView contentContainerStyle={estilos.contenido}>
        <Text style={estilos.subtitulo}>Revisá tu pedido antes de confirmar</Text>

        <View style={estilos.ticket}>
          <View style={estilos.ticketEncabezado}>
            <View style={estilos.ticketPoster}>
              <Ionicons name="film-outline" size={28} color={colores.gris} />
            </View>
            <View style={estilos.ticketTitulo}>
              <Text style={estilos.pelicula}>{p.pelicula || "Película"}</Text>
              {p.formato ? <Text style={estilos.formato}>{p.formato}</Text> : null}
            </View>
            <View style={estilos.cantidadBadge}>
              <Text style={estilos.cantidadTexto}>{cantidad}</Text>
              <Text style={estilos.cantidadLabel}>{cantidad === 1 ? "entrada" : "entradas"}</Text>
            </View>
          </View>

          <FilaDetalle icono="calendar-outline" etiqueta="Función" valor={p.funcion || "-"} />
          <FilaDetalle icono="videocam-outline" etiqueta="Sala" valor={p.sala || "-"} />

          <View style={estilos.asientosFila}>
            <Ionicons name="grid-outline" size={18} color={colores.gris} />
            <Text style={estilos.filaEtiqueta}>Asientos</Text>
            <View style={estilos.asientosChips}>
              {cantidad === 0 ? (
                <Text style={estilos.sinAsientos}>Sin asientos seleccionados</Text>
              ) : (
                asientos.map((a) => (
                  <View key={a} style={estilos.asientoChip}>
                    <Text style={estilos.asientoChipTexto}>{a}</Text>
                  </View>
                ))
              )}
            </View>
          </View>

          <View style={estilos.perforacion}>
            <View style={[estilos.muesca, estilos.muescaIzq]} />
            <View style={estilos.lineaPunteada} />
            <View style={[estilos.muesca, estilos.muescaDer]} />
          </View>

          <View style={estilos.desglose}>
            <Text style={estilos.desgloseTexto}>{cantidad} {cantidad === 1 ? "entrada" : "entradas"}</Text>
            <Text style={estilos.desgloseValor}>{formatearPrecio(total)}</Text>
          </View>
        </View>

        {!usuario ? (
          <View style={estilos.aviso}>
            <Ionicons name="person-circle-outline" size={20} color={colores.gris} />
            <Text style={estilos.avisoTexto}>Iniciá sesión o registrate para confirmar tu compra.</Text>
          </View>
        ) : (
          <Text style={estilos.nota}>
            Comprás como {usuario.nombre}. Al confirmar generamos tu código de reserva para retirar en boletería.
          </Text>
        )}
      </ScrollView>

      <View style={estilos.pie}>
        <View style={estilos.pieTotal}>
          <Text style={estilos.pieEtiqueta}>Total a pagar</Text>
          <Text style={estilos.pieMonto}>{formatearPrecio(total)}</Text>
        </View>
        <View style={estilos.pieBoton}>
<<<<<<< HEAD
          <BotonRojo
            texto={usuario ? "Ir a pagar" : "Iniciar sesión para comprar"}
            desactivado={cantidad === 0}
            onPress={continuar}
          />
        </View>
      </View>

      <Modal
        visible={pagoVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPagoVisible(false)}
      >
        <View style={estilos.modalFondo}>
          <View style={estilos.modalPanel}>
            <View style={estilos.modalEncabezado}>
              <View style={estilos.modalTituloInfo}>
                <Text style={estilos.modalTitulo}>Pago de entradas</Text>
                <Text style={estilos.modalSubtitulo}>
                  {cantidad} {cantidad === 1 ? "entrada" : "entradas"} · {p.pelicula || "Película"}
                </Text>
              </View>
              <Pressable onPress={() => setPagoVisible(false)} hitSlop={8}>
                <Ionicons name="close" size={26} color={colores.texto} />
              </Pressable>
            </View>
            <ScrollView style={estilos.modalScroll}>
              <FormularioPago monto={total} onPagar={pagarYConfirmar} />
            </ScrollView>
          </View>
        </View>
      </Modal>
=======
          {confirmando ? (
            <View style={estilos.botonCargando}>
              <ActivityIndicator color={colores.texto} />
              <Text style={estilos.botonCargandoTexto}>Confirmando…</Text>
            </View>
          ) : (
            <BotonRojo
              texto={usuario ? "Confirmar compra" : "Iniciar sesión para comprar"}
              desactivado={cantidad === 0}
              onPress={confirmar}
            />
          )}
        </View>
      </View>
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, paddingBottom: 32 },
  subtitulo: { color: colores.gris, marginBottom: 14 },
  ticket: {
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    overflow: "hidden",
  },
  ticketEncabezado: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 4 },
  ticketPoster: {
    width: 48,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  ticketTitulo: { flex: 1 },
  pelicula: { color: colores.texto, fontSize: 20, fontWeight: "bold" },
  formato: { color: colores.gris, marginTop: 2 },
  cantidadBadge: {
    alignItems: "center",
    backgroundColor: "rgba(229,9,20,0.12)",
    borderWidth: 1,
    borderColor: colores.rojo,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cantidadTexto: { color: colores.texto, fontSize: 18, fontWeight: "bold" },
  cantidadLabel: { color: colores.gris, fontSize: 11 },
  filaDetalle: { flexDirection: "row", alignItems: "center", gap: 8 },
  filaEtiqueta: { color: colores.gris, width: 64 },
  filaValor: { color: colores.texto, fontWeight: "600", flex: 1, textAlign: "right" },
  asientosFila: { flexDirection: "row", alignItems: "center", gap: 8 },
  asientosChips: { flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", gap: 6 },
  asientoChip: { backgroundColor: colores.rojo, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  asientoChipTexto: { color: colores.texto, fontWeight: "bold", fontSize: 13 },
  sinAsientos: { color: colores.gris, fontStyle: "italic" },
  perforacion: { flexDirection: "row", alignItems: "center", marginHorizontal: -16, marginTop: 4 },
  muesca: { width: 20, height: 20, borderRadius: 10, backgroundColor: colores.fondo },
  muescaIzq: { marginLeft: -10 },
  muescaDer: { marginRight: -10 },
  lineaPunteada: { flex: 1, borderTopWidth: 1, borderColor: colores.borde, borderStyle: "dashed", marginHorizontal: 6 },
  desglose: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  desgloseTexto: { color: colores.gris },
  desgloseValor: { color: colores.texto, fontSize: 18, fontWeight: "bold" },
  aviso: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 12,
    padding: 14,
    marginTop: 18,
  },
  avisoTexto: { flex: 1, color: colores.gris, fontSize: 13 },
  nota: { color: colores.gris, fontSize: 13, marginTop: 18, lineHeight: 19 },
  pie: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    backgroundColor: colores.tarjeta,
  },
  pieTotal: { flex: 1 },
  pieEtiqueta: { color: colores.gris, fontSize: 12 },
  pieMonto: { color: colores.texto, fontSize: 22, fontWeight: "bold", marginTop: 2 },
  pieBoton: { flex: 1.4 },
<<<<<<< HEAD
  modalFondo: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  modalPanel: {
    backgroundColor: colores.fondo,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    maxHeight: "88%",
  },
  modalEncabezado: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  modalTituloInfo: { flex: 1 },
  modalTitulo: { color: colores.texto, fontSize: 20, fontWeight: "bold" },
  modalSubtitulo: { color: colores.gris, fontSize: 12, marginTop: 2 },
  modalScroll: { maxHeight: 520 },
=======
  botonCargando: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colores.rojo,
    opacity: 0.7,
    paddingVertical: 14,
    borderRadius: 10,
  },
  botonCargandoTexto: { color: colores.texto, fontSize: 16, fontWeight: "bold" },
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
});
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { ReservaDetalle } from "../models/tipos";
import { formatearFecha, formatearHora, formatearPrecio, etiquetaMetodoPago } from "../utils/formato";

// Ticket de una compra ya hecha. 
export default function TicketReserva({ reserva, pasada = false }: { reserva: ReservaDetalle; pasada?: boolean }) {
  const cantidad = reserva.asientos.length;

  return (
    <View style={[estilos.ticket, pasada && estilos.ticketPasado]}>
      {pasada ? (
        <View style={estilos.etiquetaPasada}>
          <Ionicons name="time-outline" size={13} color={colores.gris} />
          <Text style={estilos.etiquetaPasadaTexto}>Función pasada</Text>
        </View>
      ) : null}

      <View style={estilos.encabezado}>
        <View style={estilos.titulo}>
          <Text style={estilos.pelicula} numberOfLines={2}>{reserva.pelicula}</Text>
          <Text style={estilos.formato}>{reserva.formato}</Text>
        </View>
        <View style={estilos.badge}>
          <Text style={estilos.badgeTexto}>{cantidad}</Text>
          <Text style={estilos.badgeLabel}>{cantidad === 1 ? "entrada" : "entradas"}</Text>
        </View>
      </View>

      <View style={estilos.fila}>
        <Ionicons name="calendar-outline" size={18} color={colores.gris} />
        <Text style={estilos.etiqueta}>Función</Text>
        <Text style={estilos.valor}>{formatearFecha(reserva.fechaHora)} · {formatearHora(reserva.fechaHora)}</Text>
      </View>
      <View style={estilos.fila}>
        <Ionicons name="videocam-outline" size={18} color={colores.gris} />
        <Text style={estilos.etiqueta}>Sala</Text>
        <Text style={estilos.valor}>{reserva.sala}</Text>
      </View>
      <View style={estilos.fila}>
        <Ionicons name="card-outline" size={18} color={colores.gris} />
        <Text style={estilos.etiqueta}>Pago</Text>
        <Text style={estilos.valor}>{etiquetaMetodoPago(reserva.metodoPago)}</Text>
      </View>
      <View style={estilos.fila}>
        <Ionicons name="grid-outline" size={18} color={colores.gris} />
        <Text style={estilos.etiqueta}>Asientos</Text>
        <View style={estilos.chips}>
          {reserva.asientos.map((a) => (
            <View key={a} style={estilos.chip}>
              <Text style={estilos.chipTexto}>{a}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={estilos.perforacion}>
        <View style={[estilos.muesca, estilos.muescaIzq]} />
        <View style={estilos.lineaPunteada} />
        <View style={[estilos.muesca, estilos.muescaDer]} />
      </View>

      <View style={estilos.pie}>
        <View>
          <Text style={estilos.codigoEtiqueta}>Código de reserva</Text>
          <Text style={estilos.codigo}>{reserva.codigo}</Text>
        </View>
        <Text style={estilos.total}>{formatearPrecio(reserva.total)}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  ticket: {
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    overflow: "hidden",
  },
  ticketPasado: { opacity: 0.75 },
  etiquetaPasada: { flexDirection: "row", alignItems: "center", gap: 5 },
  etiquetaPasadaTexto: { color: colores.gris, fontSize: 11, fontWeight: "600", letterSpacing: 0.4 },
  encabezado: { flexDirection: "row", alignItems: "center", gap: 12 },
  titulo: { flex: 1 },
  pelicula: { color: colores.texto, fontSize: 18, fontWeight: "bold" },
  formato: { color: colores.gris, marginTop: 2 },
  badge: {
    alignItems: "center",
    backgroundColor: "rgba(229,9,20,0.12)",
    borderWidth: 1,
    borderColor: colores.rojo,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeTexto: { color: colores.texto, fontSize: 18, fontWeight: "bold" },
  badgeLabel: { color: colores.gris, fontSize: 11 },
  fila: { flexDirection: "row", alignItems: "center", gap: 8 },
  etiqueta: { color: colores.gris, width: 64 },
  valor: { color: colores.texto, fontWeight: "600", flex: 1, textAlign: "right" },
  chips: { flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", gap: 6 },
  chip: { backgroundColor: colores.rojo, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  chipTexto: { color: colores.texto, fontWeight: "bold", fontSize: 13 },
  perforacion: { flexDirection: "row", alignItems: "center", marginVertical: 2 },
  lineaPunteada: { flex: 1, borderTopWidth: 1, borderStyle: "dashed", borderColor: colores.borde },
  muesca: { width: 18, height: 18, borderRadius: 9, backgroundColor: colores.fondo, position: "absolute" },
  muescaIzq: { left: -25 },
  muescaDer: { right: -25 },
  pie: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  codigoEtiqueta: { color: colores.gris, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" },
  codigo: { color: colores.texto, fontSize: 18, fontWeight: "bold", letterSpacing: 1, marginTop: 2 },
  total: { color: colores.texto, fontSize: 20, fontWeight: "bold" },
});

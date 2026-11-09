import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { PedidoCandy } from "../models/tipos";
import { formatearFecha, formatearHora, formatearPrecio, etiquetaMetodoPago } from "../utils/formato";

export default function TicketCandy({ pedido }: { pedido: PedidoCandy }) {
  return (
    <View style={estilos.tarjeta}>
      <View style={estilos.cabecera}>
        <Ionicons name="fast-food-outline" size={22} color={colores.rojo} />
        <Text style={estilos.titulo}>Candy bar</Text>
        <Text style={estilos.fecha}>{formatearFecha(pedido.creadaEn)} · {formatearHora(pedido.creadaEn)}</Text>
      </View>

      {pedido.items.map((it, i) => (
        <View key={i} style={estilos.fila}>
          <Text style={estilos.cantidad}>{it.cantidad}x</Text>
          <Text style={estilos.nombre} numberOfLines={1}>{it.nombre}</Text>
          <Text style={estilos.precio}>{formatearPrecio(it.precio * it.cantidad)}</Text>
        </View>
      ))}

      <View style={estilos.pie}>
        <View>
          <Text style={estilos.codigo}>{pedido.codigo}</Text>
          <View style={estilos.pago}>
            <Ionicons name="card-outline" size={13} color={colores.gris} />
            <Text style={estilos.pagoTexto}>Pago: {etiquetaMetodoPago(pedido.metodoPago)}</Text>
          </View>
        </View>
        <Text style={estilos.total}>{formatearPrecio(pedido.total)}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: { backgroundColor: colores.tarjeta, borderWidth: 1, borderColor: colores.borde, borderRadius: 14, padding: 16, gap: 8 },
  cabecera: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  titulo: { color: colores.texto, fontSize: 16, fontWeight: "bold", flex: 1 },
  fecha: { color: colores.gris, fontSize: 12 },
  fila: { flexDirection: "row", gap: 8 },
  cantidad: { color: colores.rojo, fontWeight: "bold", width: 28 },
  nombre: { color: colores.texto, flex: 1 },
  precio: { color: colores.gris },
  pie: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderStyle: "dashed", borderColor: colores.borde, paddingTop: 10, marginTop: 4 },
  codigo: { color: colores.gris, letterSpacing: 1 },
  pago: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  pagoTexto: { color: colores.gris, fontSize: 12 },
  total: { color: colores.texto, fontSize: 18, fontWeight: "bold" },
});
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colores } from "../constants/colores";

type Props = { nombre: string; precio: string; onAgregar: () => void };

export default function ProductoFila({ nombre, precio, onAgregar }: Props) {
  return (
    <View style={estilos.fila}>
      <View style={estilos.foto}>
        <Text style={estilos.fotoTexto}>Foto</Text>
      </View>
      <View style={estilos.info}>
        <Text style={estilos.nombre}>{nombre}</Text>
        <Text style={estilos.precio}>${precio}</Text>
      </View>
      <Pressable onPress={onAgregar} style={estilos.boton}>
        <Text style={estilos.botonTexto}>+ Agregar</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colores.tarjeta,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  foto: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  fotoTexto: { color: colores.gris, fontSize: 12 },
  info: { flex: 1 },
  nombre: { color: colores.texto, fontWeight: "bold" },
  precio: { color: colores.gris, marginTop: 2 },
  boton: {
    backgroundColor: colores.rojo,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botonTexto: { color: colores.texto, fontWeight: "bold" },
});

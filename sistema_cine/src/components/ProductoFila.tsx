import { Pressable, StyleSheet, Text, View } from "react-native";
<<<<<<< HEAD
import { Image, ImageSource } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";

type Props = {
  nombre: string;
  precio: string;
  categoria: string;
  imagen: ImageSource;
  descripcion?: string;
  cantidad?: number;
  onAgregar: () => void;
  onQuitar?: () => void;
};

export default function ProductoFila({ nombre, precio, categoria, imagen, descripcion, cantidad = 0, onAgregar, onQuitar }: Props) {
  return (
    <View style={estilos.fila}>
      <View style={estilos.foto}>
        <Image source={imagen} style={estilos.fotoImagen} contentFit="cover" transition={160} />
        {cantidad > 0 ? (
          <View style={estilos.badge}>
            <Text style={estilos.badgeTexto}>{cantidad}</Text>
          </View>
        ) : null}
      </View>

      <View style={estilos.info}>
        <Text style={estilos.categoria}>{categoria.toUpperCase()}</Text>
        <Text style={estilos.nombre} numberOfLines={1}>{nombre}</Text>
        {descripcion ? <Text style={estilos.descripcion} numberOfLines={2}>{descripcion}</Text> : null}
        <Text style={estilos.precio}>${precio}</Text>
      </View>

      {cantidad > 0 && onQuitar ? (
        <View style={estilos.stepper}>
          <Pressable
            onPress={onQuitar}
            style={({ pressed }) => [estilos.stepperBoton, pressed && estilos.botonPresionado]}
            hitSlop={6}
          >
            <Ionicons name={cantidad === 1 ? "trash-outline" : "remove"} size={16} color={colores.texto} />
          </Pressable>
          <Text style={estilos.stepperCantidad}>{cantidad}</Text>
          <Pressable
            onPress={onAgregar}
            style={({ pressed }) => [estilos.stepperBoton, pressed && estilos.botonPresionado]}
            hitSlop={6}
          >
            <Ionicons name="add" size={16} color={colores.texto} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={onAgregar}
          style={({ pressed }) => [estilos.boton, pressed && estilos.botonPresionado]}
          hitSlop={6}
        >
          <Ionicons name="add" size={18} color={colores.texto} />
          <Text style={estilos.botonTexto}>Agregar</Text>
        </Pressable>
      )}
=======
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
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colores.tarjeta,
<<<<<<< HEAD
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
=======
    borderRadius: 10,
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    padding: 10,
    marginBottom: 10,
  },
  foto: {
<<<<<<< HEAD
    width: 68,
    height: 68,
    borderRadius: 12,
    backgroundColor: "#2a2a2a",
    overflow: "visible",
  },
  fotoImagen: { width: "100%", height: "100%", borderRadius: 12 },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: colores.rojo,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colores.fondo,
  },
  badgeTexto: { color: colores.texto, fontSize: 10, fontWeight: "bold" },
  info: { flex: 1, gap: 1 },
  categoria: { color: colores.rojo, fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },
  nombre: { color: colores.texto, fontWeight: "700", fontSize: 15 },
  descripcion: { color: colores.gris, fontSize: 12, lineHeight: 16 },
  precio: { color: colores.texto, fontWeight: "800", fontSize: 15, marginTop: 2 },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colores.rojo,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botonPresionado: { opacity: 0.85, transform: [{ scale: 0.96 }] },
  botonTexto: { color: colores.texto, fontWeight: "700", fontSize: 12 },
  stepper: { flexDirection: "row", alignItems: "center", gap: 6 },
  stepperBoton: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: colores.borde,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperCantidad: { color: colores.texto, fontWeight: "800", minWidth: 18, textAlign: "center" },
=======
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
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
});

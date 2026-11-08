import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import Chip from "../../components/Chip";
import ProductoFila from "../../components/ProductoFila";
import BotonRojo from "../../components/BotonRojo";
import { colores } from "../../constants/colores";
import { useMenuLateral } from "../../hooks/useMenuLateral";
import { crearPedidoCandy, getProductosCandy } from "../../services/api";
import { useSesion } from "../../services/sesion";
import { formatearPrecio } from "../../utils/formato";
import { ProductoCandy } from "../../models/tipos";

export default function Tienda() {
  useMenuLateral(true);
  const { usuario } = useSesion();
  const [productos, setProductos] = useState<ProductoCandy[]>([]);
  const [categoria, setCategoria] = useState("todos");
  const [carrito, setCarrito] = useState<{ [id: number]: number }>({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [pedido, setPedido] = useState<{ id: number; total: number } | null>(null);

  const cargar = useCallback(() => {
    setCargando(true);
    setError("");
    getProductosCandy()
      .then(setProductos)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(cargar, [cargar]);

  const categorias = ["todos", ...new Set(productos.map((p) => p.categoria))];
  const visibles = categoria === "todos" ? productos : productos.filter((p) => p.categoria === categoria);

  const agregar = (id: number) => setCarrito((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  const quitar = (id: number) =>
    setCarrito((prev) => {
      const cantidad = (prev[id] ?? 0) - 1;
      const nuevo = { ...prev };
      if (cantidad <= 0) delete nuevo[id];
      else nuevo[id] = cantidad;
      return nuevo;
    });

  const items = productos
    .filter((p) => carrito[p.id])
    .map((p) => ({ ...p, cantidad: carrito[p.id] }));
  const cantidadTotal = items.reduce((s, i) => s + i.cantidad, 0);
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0);

  const confirmarPedido = async () => {
    if (enviando || items.length === 0) return;
    setEnviando(true);
    try {
      const creado = await crearPedidoCandy(
        usuario?.id ?? null,
        items.map((i) => ({ productoId: i.id, cantidad: i.cantidad }))
      );
      setPedido({ id: creado.id, total: creado.total });
      setCarrito({});
    } catch (e: any) {
      setError(e.message);
    } finally {
      setEnviando(false);
    }
  };

  const abrirCarrito = () => {
    setPedido(null);
    setCarritoVisible(true);
  };

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado
        titulo="VAMST CANDY BAR"
        volver
        menu={false}
        derecha={
          <Pressable onPress={abrirCarrito} style={estilos.carrito} hitSlop={8}>
            <Ionicons name="cart-outline" size={26} color={colores.texto} />
            {cantidadTotal > 0 ? (
              <View style={estilos.badge}>
                <Text style={estilos.badgeTexto}>{cantidadTotal}</Text>
              </View>
            ) : null}
          </Pressable>
        }
      />

      {cargando ? (
        <View style={estilos.centro}>
          <ActivityIndicator size="large" color={colores.rojo} />
        </View>
      ) : error && productos.length === 0 ? (
        <View style={estilos.centro}>
          <Ionicons name="cloud-offline-outline" size={48} color={colores.gris} />
          <Text style={estilos.errorTexto}>No se pudo cargar el candy bar</Text>
          <Text style={estilos.errorDetalle}>{error}</Text>
          <View style={estilos.reintentar}>
            <BotonRojo texto="Reintentar" onPress={cargar} />
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={estilos.contenido}>
          <View style={estilos.banner}>
            <Ionicons name="fast-food-outline" size={28} color={colores.rojo} />
            <Text style={estilos.bannerTexto}>Armá tu pedido y retiralo por el candy bar</Text>
          </View>

          <View style={estilos.chips}>
            {categorias.map((c) => (
              <Chip
                key={c}
                texto={c.charAt(0).toUpperCase() + c.slice(1)}
                activo={c === categoria}
                onPress={() => setCategoria(c)}
              />
            ))}
          </View>

          {visibles.map((p) => (
            <ProductoFila
              key={p.id}
              nombre={p.nombre}
              precio={p.precio.toLocaleString("es-AR")}
              onAgregar={() => agregar(p.id)}
            />
          ))}
        </ScrollView>
      )}

      <Modal visible={carritoVisible} transparent animationType="slide" onRequestClose={() => setCarritoVisible(false)}>
        <View style={estilos.modalFondo}>
          <View style={estilos.modalPanel}>
            <View style={estilos.modalEncabezado}>
              <Text style={estilos.modalTitulo}>{pedido ? "Pedido confirmado" : "Tu carrito"}</Text>
              <Pressable onPress={() => setCarritoVisible(false)} hitSlop={8}>
                <Ionicons name="close" size={26} color={colores.texto} />
              </Pressable>
            </View>

            {pedido ? (
              <View style={estilos.exito}>
                <Ionicons name="checkmark-circle" size={72} color={colores.rojo} />
                <Text style={estilos.exitoTitulo}>¡Listo! Pedido #{pedido.id}</Text>
                <Text style={estilos.exitoTotal}>{formatearPrecio(pedido.total)}</Text>
                <Text style={estilos.exitoDetalle}>Presentá el número de pedido en el candy bar para retirarlo.</Text>
                <View style={estilos.exitoBoton}>
                  <BotonRojo texto="Seguir comprando" onPress={() => setCarritoVisible(false)} />
                </View>
              </View>
            ) : items.length === 0 ? (
              <View style={estilos.vacio}>
                <Ionicons name="cart-outline" size={56} color={colores.gris} />
                <Text style={estilos.vacioTexto}>Tu carrito está vacío</Text>
              </View>
            ) : (
              <>
                <ScrollView style={estilos.modalLista}>
                  {items.map((i) => (
                    <View key={i.id} style={estilos.item}>
                      <View style={estilos.itemInfo}>
                        <Text style={estilos.itemNombre}>{i.nombre}</Text>
                        <Text style={estilos.itemPrecio}>{formatearPrecio(i.precio)} c/u</Text>
                      </View>
                      <View style={estilos.stepper}>
                        <Pressable onPress={() => quitar(i.id)} style={estilos.stepperBoton} hitSlop={6}>
                          <Ionicons name={i.cantidad === 1 ? "trash-outline" : "remove"} size={18} color={colores.texto} />
                        </Pressable>
                        <Text style={estilos.stepperCantidad}>{i.cantidad}</Text>
                        <Pressable onPress={() => agregar(i.id)} style={estilos.stepperBoton} hitSlop={6}>
                          <Ionicons name="add" size={18} color={colores.texto} />
                        </Pressable>
                      </View>
                      <Text style={estilos.itemSubtotal}>{formatearPrecio(i.precio * i.cantidad)}</Text>
                    </View>
                  ))}
                </ScrollView>

                {error ? <Text style={estilos.modalError}>{error}</Text> : null}

                <View style={estilos.modalPie}>
                  <View style={estilos.modalTotal}>
                    <Text style={estilos.modalTotalEtiqueta}>Total</Text>
                    <Text style={estilos.modalTotalMonto}>{formatearPrecio(total)}</Text>
                  </View>
                  <View style={estilos.modalBoton}>
                    {enviando ? (
                      <View style={estilos.cargando}>
                        <ActivityIndicator color={colores.texto} />
                      </View>
                    ) : (
                      <BotonRojo texto="Confirmar pedido" onPress={confirmarPedido} />
                    )}
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: 16, paddingBottom: 40 },
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10 },
  errorTexto: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 8 },
  errorDetalle: { color: colores.gris, textAlign: "center" },
  reintentar: { marginTop: 12, width: "60%" },
  carrito: { flexDirection: "row", alignItems: "center" },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: colores.rojo,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeTexto: { color: colores.texto, fontSize: 11, fontWeight: "bold" },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 12,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 16,
    marginBottom: 16,
  },
  bannerTexto: { flex: 1, color: colores.texto, fontWeight: "600" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  modalFondo: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  modalPanel: {
    backgroundColor: colores.fondo,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    maxHeight: "80%",
  },
  modalEncabezado: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  modalTitulo: { color: colores.texto, fontSize: 20, fontWeight: "bold" },
  modalLista: { maxHeight: 320 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colores.tarjeta,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  itemInfo: { flex: 1 },
  itemNombre: { color: colores.texto, fontWeight: "600" },
  itemPrecio: { color: colores.gris, fontSize: 12, marginTop: 2 },
  stepper: { flexDirection: "row", alignItems: "center", gap: 8 },
  stepperBoton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colores.borde,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperCantidad: { color: colores.texto, fontWeight: "bold", minWidth: 20, textAlign: "center" },
  itemSubtotal: { color: colores.texto, fontWeight: "bold", minWidth: 70, textAlign: "right" },
  modalError: { color: colores.rojo, marginBottom: 10 },
  modalPie: { flexDirection: "row", alignItems: "center", gap: 16, marginTop: 12 },
  modalTotal: { flex: 1 },
  modalTotalEtiqueta: { color: colores.gris, fontSize: 12 },
  modalTotalMonto: { color: colores.texto, fontSize: 22, fontWeight: "bold" },
  modalBoton: { flex: 1.4 },
  cargando: { backgroundColor: colores.rojo, opacity: 0.7, borderRadius: 10, paddingVertical: 14, alignItems: "center" },
  vacio: { alignItems: "center", paddingVertical: 40, gap: 12 },
  vacioTexto: { color: colores.gris },
  exito: { alignItems: "center", paddingVertical: 20, gap: 8 },
  exitoTitulo: { color: colores.texto, fontSize: 20, fontWeight: "bold", marginTop: 8 },
  exitoTotal: { color: colores.texto, fontSize: 28, fontWeight: "bold" },
  exitoDetalle: { color: colores.gris, textAlign: "center", marginTop: 4, marginBottom: 12 },
  exitoBoton: { width: "100%" },
});
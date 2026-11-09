import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
<<<<<<< HEAD
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
=======
import { Ionicons } from "@expo/vector-icons";
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
import Encabezado from "../../components/Encabezado";
import Chip from "../../components/Chip";
import ProductoFila from "../../components/ProductoFila";
import BotonRojo from "../../components/BotonRojo";
<<<<<<< HEAD
import FormularioPago from "../../components/FormularioPago";
import Aparicion from "../../components/Aparicion";
import TituloSeccion from "../../components/TituloSeccion";
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
import { colores } from "../../constants/colores";
import { useMenuLateral } from "../../hooks/useMenuLateral";
import { crearPedidoCandy, getProductosCandy } from "../../services/api";
import { useSesion } from "../../services/sesion";
<<<<<<< HEAD
import { useCarritoCandy } from "../../services/carrito";
import { formatearPrecio } from "../../utils/formato";
import { descripcionProducto, imagenCandy, imagenCategoria } from "../../data/candy";
import { ProductoCandy, MetodoPago } from "../../models/tipos";

export default function Tienda() {
  useMenuLateral(true);
  const router = useRouter();
  const { usuario } = useSesion();
  const { carrito, agregar, quitar, vaciar } = useCarritoCandy();
  const [productos, setProductos] = useState<ProductoCandy[]>([]);
  const [categoria, setCategoria] = useState("todos");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [paso, setPaso] = useState<"resumen" | "pago">("resumen");
=======
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
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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

<<<<<<< HEAD
=======
  const agregar = (id: number) => setCarrito((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  const quitar = (id: number) =>
    setCarrito((prev) => {
      const cantidad = (prev[id] ?? 0) - 1;
      const nuevo = { ...prev };
      if (cantidad <= 0) delete nuevo[id];
      else nuevo[id] = cantidad;
      return nuevo;
    });

>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  const items = productos
    .filter((p) => carrito[p.id])
    .map((p) => ({ ...p, cantidad: carrito[p.id] }));
  const cantidadTotal = items.reduce((s, i) => s + i.cantidad, 0);
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0);

<<<<<<< HEAD
  const confirmarPedido = async (metodoPago: MetodoPago) => {
    if (!usuario || items.length === 0) return;
    const creado = await crearPedidoCandy(
      usuario.id,
      items.map((i) => ({ productoId: i.id, cantidad: i.cantidad })),
      metodoPago
    );
    setPedido({ id: creado.id, total: creado.total });
    setPaso("resumen");
    vaciar();
=======
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
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  };

  const abrirCarrito = () => {
    setPedido(null);
<<<<<<< HEAD
    setPaso("resumen");
    setCarritoVisible(true);
  };

  const cerrarCarrito = () => {
    setCarritoVisible(false);
    setPaso("resumen");
  };

=======
    setCarritoVisible(true);
  };

>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
        <ScrollView style={estilos.lista} contentContainerStyle={estilos.contenido}>
          <Aparicion>
            <View style={estilos.banner}>
              <Image source={imagenCategoria("combos")} style={StyleSheet.absoluteFill} contentFit="cover" transition={220} />
              <View style={estilos.bannerVelo} />
              <View style={estilos.bannerIcono}>
                <Ionicons name="fast-food" size={22} color={colores.rojo} />
              </View>
              <View style={estilos.bannerInfo}>
                <Text style={estilos.bannerOverline}>CANDY BAR</Text>
                <Text style={estilos.bannerTitulo}>Armá tu pedido</Text>
                <Text style={estilos.bannerTexto}>Retiralo por el candy bar sin hacer fila.</Text>
              </View>
            </View>
          </Aparicion>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={estilos.chipsFila}
            contentContainerStyle={estilos.chips}
          >
=======
        <ScrollView contentContainerStyle={estilos.contenido}>
          <View style={estilos.banner}>
            <Ionicons name="fast-food-outline" size={28} color={colores.rojo} />
            <Text style={estilos.bannerTexto}>Armá tu pedido y retiralo por el candy bar</Text>
          </View>

          <View style={estilos.chips}>
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
            {categorias.map((c) => (
              <Chip
                key={c}
                texto={c.charAt(0).toUpperCase() + c.slice(1)}
                activo={c === categoria}
                onPress={() => setCategoria(c)}
              />
            ))}
<<<<<<< HEAD
          </ScrollView>

          <View style={estilos.tituloProductos}>
            <TituloSeccion texto="Nuestros productos" subtitulo={`${visibles.length} opciones para la función`} />
          </View>

          <Aparicion key={categoria}>
            {visibles.map((p) => (
              <ProductoFila
                key={p.id}
                nombre={p.nombre}
                precio={p.precio.toLocaleString("es-AR")}
                categoria={p.categoria}
                imagen={imagenCandy(p.nombre, p.categoria)}
                descripcion={descripcionProducto(p.nombre, p.categoria)}
                cantidad={carrito[p.id] ?? 0}
                onAgregar={() => agregar(p.id)}
                onQuitar={() => quitar(p.id)}
              />
            ))}
          </Aparicion>
        </ScrollView>
      )}

      {cantidadTotal > 0 ? (
        <View style={estilos.barraCarrito}>
          <View style={estilos.barraInfo}>
            <Text style={estilos.barraCantidad}>
              {cantidadTotal} {cantidadTotal === 1 ? "producto" : "productos"}
            </Text>
            <Text style={estilos.barraTotal}>{formatearPrecio(total)}</Text>
          </View>
          <Pressable
            onPress={abrirCarrito}
            style={({ pressed }) => [estilos.barraBoton, pressed && estilos.barraBotonPresionado]}
          >
            <Ionicons name="cart" size={18} color={colores.texto} />
            <Text style={estilos.barraBotonTexto}>Comprar</Text>
          </Pressable>
        </View>
      ) : null}

      <Modal visible={carritoVisible} transparent animationType="slide" onRequestClose={cerrarCarrito}>
        <View style={estilos.modalFondo}>
          <View style={estilos.modalPanel}>
            <View style={estilos.modalEncabezado}>
              <Text style={estilos.modalTitulo}>
                {pedido ? "Compra confirmada" : paso === "pago" ? "Pago del pedido" : "Finalizar compra"}
              </Text>
              <View style={estilos.modalAcciones}>
                {!pedido && paso === "resumen" && items.length > 0 ? (
                  <Pressable onPress={vaciar} hitSlop={8}>
                    <Text style={estilos.vaciar}>Vaciar</Text>
                  </Pressable>
                ) : null}
                <Pressable onPress={cerrarCarrito} hitSlop={8}>
                  <Ionicons name="close" size={26} color={colores.texto} />
                </Pressable>
              </View>
=======
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
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
            </View>

            {pedido ? (
              <View style={estilos.exito}>
                <Ionicons name="checkmark-circle" size={72} color={colores.rojo} />
<<<<<<< HEAD
                <Text style={estilos.exitoTitulo}>¡Compra confirmada!</Text>
                <Text style={estilos.exitoCodigo}>{`CANDY-${String(pedido.id).padStart(5, "0")}`}</Text>
                <Text style={estilos.exitoTotal}>{formatearPrecio(pedido.total)}</Text>
                <Text style={estilos.exitoDetalle}>Mostrá este código en el candy bar para retirar tu pedido.</Text>
                <View style={estilos.exitoBoton}>
                  <BotonRojo texto="Listo" onPress={cerrarCarrito} />
=======
                <Text style={estilos.exitoTitulo}>¡Listo! Pedido #{pedido.id}</Text>
                <Text style={estilos.exitoTotal}>{formatearPrecio(pedido.total)}</Text>
                <Text style={estilos.exitoDetalle}>Presentá el número de pedido en el candy bar para retirarlo.</Text>
                <View style={estilos.exitoBoton}>
                  <BotonRojo texto="Seguir comprando" onPress={() => setCarritoVisible(false)} />
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
                </View>
              </View>
            ) : items.length === 0 ? (
              <View style={estilos.vacio}>
                <Ionicons name="cart-outline" size={56} color={colores.gris} />
                <Text style={estilos.vacioTexto}>Tu carrito está vacío</Text>
              </View>
<<<<<<< HEAD
            ) : !usuario ? (
              <View style={estilos.acceso}>
                <View style={estilos.accesoIcono}>
                  <Ionicons name="lock-closed-outline" size={26} color={colores.rojo} />
                </View>
                <Text style={estilos.accesoTitulo}>Iniciá sesión para comprar</Text>
                <Text style={estilos.accesoTexto}>
                  Para confirmar tu pedido del candy bar necesitás una cuenta, igual que para comprar entradas.
                </Text>
                <View style={estilos.accesoBoton}>
                  <BotonRojo
                    texto="Iniciá sesión / Registrate"
                    onPress={() => {
                      cerrarCarrito();
                      router.push("/registro");
                    }}
                  />
                </View>
                <Pressable onPress={cerrarCarrito} hitSlop={8}>
                  <Text style={estilos.accesoSecundario}>Seguir eligiendo</Text>
                </Pressable>
              </View>
            ) : paso === "pago" ? (
              <ScrollView style={estilos.modalLista}>
                <FormularioPago monto={total} onPagar={confirmarPedido} />
                <Pressable onPress={() => setPaso("resumen")} hitSlop={8} style={estilos.volverPago}>
                  <Text style={estilos.volverPagoTexto}>Volver al resumen</Text>
                </Pressable>
              </ScrollView>
            ) : (
              <>
                <View style={estilos.retiro}>
                  <View style={estilos.retiroIcono}>
                    <Ionicons name="storefront-outline" size={18} color={colores.rojo} />
                  </View>
                  <View style={estilos.retiroInfo}>
                    <Text style={estilos.retiroTitulo}>Retirás en el candy bar</Text>
                    <Text style={estilos.retiroTexto}>Pagás ahora y retirás mostrando tu código en la caja.</Text>
                  </View>
                </View>

                <ScrollView style={estilos.modalLista}>
                  {items.map((i) => (
                    <View key={i.id} style={estilos.item}>
                      <Image source={imagenCandy(i.nombre, i.categoria)} style={estilos.itemFoto} contentFit="cover" />
=======
            ) : (
              <>
                <ScrollView style={estilos.modalLista}>
                  {items.map((i) => (
                    <View key={i.id} style={estilos.item}>
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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

<<<<<<< HEAD
                <View style={estilos.modalPie}>
                  <View style={estilos.modalTotal}>
                    <Text style={estilos.modalTotalEtiqueta}>Total a pagar</Text>
                    <Text style={estilos.modalTotalMonto}>{formatearPrecio(total)}</Text>
                  </View>
                  <View style={estilos.modalBoton}>
                    <BotonRojo texto="Ir a pagar" onPress={() => setPaso("pago")} />
=======
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
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
  lista: { flex: 1 },
  contenido: { padding: 16, paddingBottom: 28 },
=======
  contenido: { padding: 16, paddingBottom: 40 },
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
    height: 132,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#2a2a2a",
    marginBottom: 18,
  },
  bannerVelo: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.55)" },
  bannerIcono: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(10,10,10,0.75)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerInfo: { position: "absolute", left: 16, right: 16, bottom: 14 },
  bannerOverline: { color: colores.rojo, fontSize: 10, fontWeight: "800", letterSpacing: 1.6 },
  bannerTitulo: { color: colores.texto, fontSize: 22, fontWeight: "800", marginTop: 2 },
  bannerTexto: { color: "#e0e0e0", fontSize: 12, marginTop: 2 },
  chipsFila: { marginHorizontal: -16, marginBottom: 20 },
  chips: { gap: 8, paddingHorizontal: 16 },
  tituloProductos: { marginBottom: 12 },
=======
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
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  modalFondo: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  modalPanel: {
    backgroundColor: colores.fondo,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    maxHeight: "80%",
  },
  modalEncabezado: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
<<<<<<< HEAD
  modalAcciones: { flexDirection: "row", alignItems: "center", gap: 16 },
  vaciar: { color: colores.gris, fontSize: 13, fontWeight: "600" },
  modalTitulo: { color: colores.texto, fontSize: 20, fontWeight: "bold" },
  retiro: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(229,9,20,0.35)",
    padding: 12,
    marginBottom: 12,
  },
  retiroIcono: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colores.rojoSuave,
    alignItems: "center",
    justifyContent: "center",
  },
  retiroInfo: { flex: 1 },
  retiroTitulo: { color: colores.texto, fontWeight: "700", fontSize: 13 },
  retiroTexto: { color: colores.gris, fontSize: 11, marginTop: 2 },
  acceso: { alignItems: "center", paddingVertical: 24, paddingHorizontal: 8, gap: 10 },
  accesoIcono: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colores.rojoSuave,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  accesoTitulo: { color: colores.texto, fontSize: 19, fontWeight: "bold", textAlign: "center" },
  accesoTexto: { color: colores.gris, fontSize: 13, textAlign: "center", lineHeight: 19 },
  accesoBoton: { width: "100%", marginTop: 10 },
  accesoSecundario: { color: colores.gris, fontSize: 13, fontWeight: "600", paddingVertical: 6 },
  volverPago: { alignSelf: "center", paddingVertical: 12 },
  volverPagoTexto: { color: colores.gris, fontSize: 13, fontWeight: "600" },
=======
  modalTitulo: { color: colores.texto, fontSize: 20, fontWeight: "bold" },
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
  itemFoto: { width: 44, height: 44, borderRadius: 8, backgroundColor: "#2a2a2a" },
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
=======
  modalError: { color: colores.rojo, marginBottom: 10 },
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  modalPie: { flexDirection: "row", alignItems: "center", gap: 16, marginTop: 12 },
  modalTotal: { flex: 1 },
  modalTotalEtiqueta: { color: colores.gris, fontSize: 12 },
  modalTotalMonto: { color: colores.texto, fontSize: 22, fontWeight: "bold" },
  modalBoton: { flex: 1.4 },
<<<<<<< HEAD
  barraCarrito: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    backgroundColor: colores.tarjeta,
  },
  barraInfo: { flex: 1 },
  barraCantidad: { color: colores.gris, fontSize: 12 },
  barraTotal: { color: colores.texto, fontSize: 20, fontWeight: "800" },
  barraBoton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: colores.rojo,
    borderRadius: 24,
    paddingVertical: 11,
    paddingHorizontal: 18,
  },
  barraBotonPresionado: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  barraBotonTexto: { color: colores.texto, fontWeight: "700" },
=======
  cargando: { backgroundColor: colores.rojo, opacity: 0.7, borderRadius: 10, paddingVertical: 14, alignItems: "center" },
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  vacio: { alignItems: "center", paddingVertical: 40, gap: 12 },
  vacioTexto: { color: colores.gris },
  exito: { alignItems: "center", paddingVertical: 20, gap: 8 },
  exitoTitulo: { color: colores.texto, fontSize: 20, fontWeight: "bold", marginTop: 8 },
<<<<<<< HEAD
  exitoCodigo: { color: colores.dorado, fontSize: 22, fontWeight: "800", letterSpacing: 2 },
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  exitoTotal: { color: colores.texto, fontSize: 28, fontWeight: "bold" },
  exitoDetalle: { color: colores.gris, textAlign: "center", marginTop: 4, marginBottom: 12 },
  exitoBoton: { width: "100%" },
});
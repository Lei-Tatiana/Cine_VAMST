import { useCallback, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import BotonRojo from "../../components/BotonRojo";
import TicketReserva from "../../components/TicketReserva";
import TicketCandy from "../../components/TicketCandy";
import { colores } from "../../constants/colores";
import { useMenuLateral } from "../../hooks/useMenuLateral";
import { getMisReservas, getMisPedidosCandy, loginUsuario, registrarUsuario } from "../../services/api";
import { useSesion } from "../../services/sesion";
import { PedidoCandy, ReservaDetalle } from "../../models/tipos";


export default function Registro() {
  useMenuLateral(true);
  const router = useRouter();
  const { usuario, iniciarSesion, cerrarSesion } = useSesion();
  const [tickets, setTickets] = useState<ReservaDetalle[]>([]);
  const [pedidosCandy, setPedidosCandy] = useState<PedidoCandy[]>([]);
  const [cargandoTickets, setCargandoTickets] = useState(false);
  const [errorTickets, setErrorTickets] = useState("");
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const usuarioId = usuario?.id;

  const cargarTickets = useCallback(() => {
  if (usuarioId === undefined) return;
  setCargandoTickets(true);
  setErrorTickets("");
  Promise.all([getMisReservas(usuarioId), getMisPedidosCandy(usuarioId)])
    .then(([reservas, pedidos]) => {
      setTickets(reservas);
      setPedidosCandy(pedidos);
    })
    .catch((e) => setErrorTickets(e.message))
    .finally(() => setCargandoTickets(false));
}, [usuarioId]);

  // Se vuelve a pedir cada vez que se entra a esta pantalla: así, después de comprar,
  // el ticket nuevo aparece enseguida.
  useFocusEffect(cargarTickets);

  const enviar = async () => {
    if (enviando) return;
    if (!email.trim() || !password || (modo === "registro" && !nombre.trim())) {
      setError("Completá todos los campos.");
      return;
    }
    setEnviando(true);
    setError("");
    try {
      const u =
        modo === "registro"
          ? await registrarUsuario(nombre.trim(), email.trim(), password)
          : await loginUsuario(email.trim(), password);
      await iniciarSesion(u);
      if (router.canGoBack()) router.back();
      else router.replace("/elegir_pelicula");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setEnviando(false);
    }
  };

  const salir = async () => {
    await cerrarSesion();
    router.replace("/elegir_pelicula");
  };

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado titulo="Mi cuenta" volver menu={false} />

      <KeyboardAvoidingView style={estilos.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
          {usuario ? (
            <>
              <View style={estilos.tarjeta}>
                <Ionicons name="person-circle" size={64} color={colores.rojo} />
                <Text style={estilos.nombre}>{usuario.nombre}</Text>
                <Text style={estilos.email}>{usuario.email}</Text>
                <View style={estilos.boton}>
                  <BotonRojo texto="Cerrar sesión" onPress={salir} />
                </View>
              </View>

              <Text style={estilos.seccion}>Mis entradas</Text>
              {cargandoTickets && tickets.length === 0 ? (
                <ActivityIndicator color={colores.rojo} style={estilos.espacio} />
              ) : errorTickets ? (
                <View style={estilos.vacio}>
                  <Ionicons name="cloud-offline-outline" size={36} color={colores.gris} />
                  <Text style={estilos.vacioTexto}>No se pudieron cargar tus tickets</Text>
                  <Text style={estilos.vacioDetalle}>{errorTickets}</Text>
                  <View style={estilos.botonChico}>
                    <BotonRojo texto="Reintentar" onPress={cargarTickets} />
                  </View>
                </View>
              ) : tickets.length === 0 ? (
                <View style={estilos.vacio}>
                  <Ionicons name="ticket-outline" size={36} color={colores.gris} />
                  <Text style={estilos.vacioTexto}>Todavía no compraste entradas</Text>
                  <Text style={estilos.vacioDetalle}>Cuando confirmes una compra, tu ticket va a aparecer acá.</Text>
                </View>
              ) : (
                <View style={estilos.listaTickets}>
                  {tickets.map((t) => (
                    <TicketReserva key={t.id} reserva={t} />
                  ))}
                </View>
              )}
              <Text style={estilos.seccion}>Mis compras de candy bar</Text>
              {cargandoTickets && pedidosCandy.length === 0 ? null : pedidosCandy.length === 0 ? (
                <View style={estilos.vacio}>
                  <Ionicons name="fast-food-outline" size={36} color={colores.gris} />
                  <Text style={estilos.vacioTexto}>Todavía no hiciste pedidos</Text>
                  <Text style={estilos.vacioDetalle}>Tus compras del candy bar van a aparecer acá.</Text>
                </View>
              ) : (
                <View style={estilos.listaTickets}>
                  {pedidosCandy.map((p) => (
                    <TicketCandy key={p.id} pedido={p} />
                  ))}
                </View>
              )}
            </>
          ) : (
            <>
              <View style={estilos.tabs}>
                <Pressable
                  style={[estilos.tab, modo === "login" && estilos.tabActivo]}
                  onPress={() => { setModo("login"); setError(""); }}
                >
                  <Text style={estilos.tabTexto}>Iniciar sesión</Text>
                </Pressable>
                <Pressable
                  style={[estilos.tab, modo === "registro" && estilos.tabActivo]}
                  onPress={() => { setModo("registro"); setError(""); }}
                >
                  <Text style={estilos.tabTexto}>Registrarse</Text>
                </Pressable>
              </View>

              <View style={estilos.form}>
                {modo === "registro" ? (
                  <TextInput
                    style={estilos.input}
                    placeholder="Nombre y apellido"
                    placeholderTextColor={colores.gris}
                    value={nombre}
                    onChangeText={setNombre}
                  />
                ) : null}
                <TextInput
                  style={estilos.input}
                  placeholder="Email"
                  placeholderTextColor={colores.gris}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={estilos.input}
                  placeholder="Contraseña"
                  placeholderTextColor={colores.gris}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

                {error ? (
                  <View style={estilos.error}>
                    <Ionicons name="alert-circle" size={18} color={colores.rojo} />
                    <Text style={estilos.errorTexto}>{error}</Text>
                  </View>
                ) : null}

                <View style={estilos.boton}>
                  {enviando ? (
                    <View style={estilos.cargando}>
                      <ActivityIndicator color={colores.texto} />
                    </View>
                  ) : (
                    <BotonRojo texto={modo === "registro" ? "Crear cuenta" : "Ingresar"} onPress={enviar} />
                  )}
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  flex: { flex: 1 },
  contenido: { padding: 20, paddingTop: 32 },
  tarjeta: {
    alignItems: "center",
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 14,
    padding: 24,
    gap: 8,
  },
  nombre: { color: colores.texto, fontSize: 22, fontWeight: "bold", marginTop: 8 },
  email: { color: colores.gris },
  tabs: {
    flexDirection: "row",
    backgroundColor: colores.tarjeta,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 4,
    marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
  tabActivo: { backgroundColor: colores.rojo },
  tabTexto: { color: colores.texto, fontWeight: "600" },
  form: { gap: 12 },
  input: {
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colores.texto,
    fontSize: 16,
  },
  error: { flexDirection: "row", alignItems: "center", gap: 8 },
  errorTexto: { color: colores.rojo, flex: 1 },
  boton: { marginTop: 8 },
  seccion: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 28, marginBottom: 12 },
  espacio: { marginTop: 20 },
  listaTickets: { gap: 14 },
  vacio: { alignItems: "center", gap: 6, paddingVertical: 24, paddingHorizontal: 16 },
  vacioTexto: { color: colores.texto, fontSize: 16, fontWeight: "bold", marginTop: 4 },
  vacioDetalle: { color: colores.gris, textAlign: "center" },
  botonChico: { marginTop: 8, width: "60%" },
  cargando: { backgroundColor: colores.rojo, opacity: 0.7, borderRadius: 10, paddingVertical: 14, alignItems: "center" },
});
import { useCallback, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import BotonRojo from "../../components/BotonRojo";
import TicketReserva from "../../components/TicketReserva";
import TicketCandy from "../../components/TicketCandy";
import Aparicion from "../../components/Aparicion";
import TituloSeccion from "../../components/TituloSeccion";
import { colores } from "../../constants/colores";
import { AVATARES, avatarPorId } from "../../data/avatares";
import { useMenuLateral } from "../../hooks/useMenuLateral";
import { getMisReservas, getMisPedidosCandy, loginUsuario, registrarUsuario, solicitarCodigoRecuperacion, restablecerPassword } from "../../services/api";
import { useSesion } from "../../services/sesion";
import { PedidoCandy, ReservaDetalle } from "../../models/tipos";


export default function Registro() {
  useMenuLateral(true);
  const router = useRouter();
  const { usuario, avatar, iniciarSesion, cerrarSesion, elegirAvatar } = useSesion();
  const [tickets, setTickets] = useState<ReservaDetalle[]>([]);
  const [pedidosCandy, setPedidosCandy] = useState<PedidoCandy[]>([]);
  const [cargandoTickets, setCargandoTickets] = useState(false);
  const [errorTickets, setErrorTickets] = useState("");
  const [modo, setModo] = useState<"login" | "registro" | "recuperar">("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [pasoRecuperacion, setPasoRecuperacion] = useState<"email" | "codigo">("email");
  const [codigo, setCodigo] = useState("");
  const [codigoDemo, setCodigoDemo] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [recuperado, setRecuperado] = useState(false);

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

  const avatarElegido = avatarPorId(avatar);
  const ahora = Date.now();
  const proximas = tickets
    .filter((t) => new Date(t.fechaHora).getTime() >= ahora)
    .sort((a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime());
  const pasadas = tickets
    .filter((t) => new Date(t.fechaHora).getTime() < ahora)
    .sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());

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

  const volverALogin = () => {
    setModo("login");
    setPasoRecuperacion("email");
    setCodigo("");
    setCodigoDemo("");
    setNuevaPassword("");
    setError("");
  };

  const pedirCodigo = async () => {
    if (enviando) return;
    if (!email.trim()) {
      setError("Ingresá el mail de tu cuenta.");
      return;
    }
    setEnviando(true);
    setError("");
    try {
      const respuesta = await solicitarCodigoRecuperacion(email.trim());
      setCodigoDemo(respuesta.codigo ?? "");
      setPasoRecuperacion("codigo");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setEnviando(false);
    }
  };

  const cambiarPassword = async () => {
    if (enviando) return;
    if (codigo.trim().length !== 6) {
      setError("Ingresá el código de 6 dígitos.");
      return;
    }
    if (nuevaPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setEnviando(true);
    setError("");
    try {
      await restablecerPassword(email.trim(), codigo.trim(), nuevaPassword);
      setPassword("");
      setRecuperado(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado titulo="Mi cuenta" volver menu={false} />

      <KeyboardAvoidingView style={estilos.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
          {usuario ? (
            <>
              <Aparicion>
                <View style={estilos.tarjeta}>
                  {avatarElegido ? (
                    <Image source={avatarElegido.imagen} style={estilos.avatarGrande} contentFit="cover" />
                  ) : (
                    <Ionicons name="person-circle" size={80} color={colores.rojo} />
                  )}
                  <Text style={estilos.nombre}>{usuario.nombre}</Text>
                  <Text style={estilos.email}>{usuario.email}</Text>

                  <View style={estilos.selector}>
                    <Text style={estilos.selectorTitulo}>Elegí tu avatar</Text>
                    <View style={estilos.avatares}>
                      {AVATARES.map((a) => {
                        const activo = avatar === a.id;
                        return (
                          <Pressable
                            key={a.id}
                            onPress={() => elegirAvatar(a.id)}
                            accessibilityLabel={`Avatar ${a.nombre}`}
                            style={({ pressed }) => [
                              estilos.avatarOpcion,
                              activo && estilos.avatarActivo,
                              pressed && estilos.avatarPresionado,
                            ]}
                          >
                            <Image source={a.imagen} style={estilos.avatarImagen} contentFit="cover" />
                            {activo ? (
                              <View style={estilos.avatarCheck}>
                                <Ionicons name="checkmark" size={11} color={colores.texto} />
                              </View>
                            ) : null}
                          </Pressable>
                        );
                      })}
                    </View>
                    <Text style={estilos.avatarNombre}>
                      {avatarElegido ? avatarElegido.nombre : "Sin avatar elegido"}
                    </Text>
                  </View>

                  <View style={estilos.boton}>
                    <BotonRojo texto="Cerrar sesión" onPress={salir} />
                  </View>
                </View>
              </Aparicion>

              <View style={estilos.tituloBloque}>
                <TituloSeccion texto="Mis entradas" subtitulo="Tus próximas funciones y tu historial" tamano="grande" />
              </View>
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
                <>
                  <View style={estilos.grupo}>
                    <View style={estilos.tituloGrupo}>
                      <TituloSeccion
                        texto="Próximas funciones"
                        subtitulo={`${proximas.length} ${proximas.length === 1 ? "entrada" : "entradas"}`}
                        tamano="chico"
                      />
                    </View>
                    {proximas.length === 0 ? (
                      <View style={estilos.grupoVacio}>
                        <Ionicons name="calendar-outline" size={22} color={colores.gris} />
                        <Text style={estilos.grupoVacioTexto}>No tenés funciones próximas.</Text>
                      </View>
                    ) : (
                      <View style={estilos.listaTickets}>
                        {proximas.map((t) => (
                          <TicketReserva key={t.id} reserva={t} />
                        ))}
                      </View>
                    )}
                  </View>

                  <View style={estilos.grupo}>
                    <View style={estilos.tituloGrupo}>
                      <TituloSeccion
                        texto="Funciones pasadas"
                        subtitulo={`${pasadas.length} ${pasadas.length === 1 ? "entrada" : "entradas"}`}
                        tamano="chico"
                      />
                    </View>
                    {pasadas.length === 0 ? (
                      <View style={estilos.grupoVacio}>
                        <Ionicons name="time-outline" size={22} color={colores.gris} />
                        <Text style={estilos.grupoVacioTexto}>Todavía no tenés funciones pasadas.</Text>
                      </View>
                    ) : (
                      <View style={estilos.listaTickets}>
                        {pasadas.map((t) => (
                          <TicketReserva key={t.id} reserva={t} pasada />
                        ))}
                      </View>
                    )}
                  </View>
                </>
              )}
              <View style={estilos.tituloBloque}>
                <TituloSeccion texto="Mis compras de candy bar" subtitulo="Pedidos para retirar en el candy bar" tamano="grande" />
              </View>
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
              {modo === "recuperar" ? (
                <>
                  <View style={estilos.recuperarEncabezado}>
                    <Pressable onPress={volverALogin} hitSlop={8} style={estilos.volver}>
                      <Ionicons name="arrow-back" size={18} color={colores.gris} />
                      <Text style={estilos.volverTexto}>Volver</Text>
                    </Pressable>
                    <Text style={estilos.recuperarTitulo}>Restablecer contraseña</Text>
                  </View>

                  {recuperado ? (
                    <View style={estilos.exitoRecuperacion}>
                      <Ionicons name="checkmark-circle" size={64} color={colores.rojo} />
                      <Text style={estilos.exitoTitulo}>¡Contraseña actualizada!</Text>
                      <Text style={estilos.exitoTexto}>Ya podés iniciar sesión con tu nueva contraseña.</Text>
                      <View style={estilos.botonExito}>
                        <BotonRojo
                          texto="Volver a iniciar sesión"
                          onPress={() => { setRecuperado(false); volverALogin(); }}
                        />
                      </View>
                    </View>
                  ) : pasoRecuperacion === "email" ? (
                    <View style={estilos.form}>
                      <Text style={estilos.ayuda}>
                        Ingresá el mail con el que te registraste y te damos un código para cambiar tu contraseña.
                      </Text>
                      <TextInput
                        style={estilos.input}
                        placeholder="Email"
                        placeholderTextColor={colores.gris}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
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
                          <BotonRojo texto="Enviar código" onPress={pedirCodigo} />
                        )}
                      </View>
                    </View>
                  ) : (
                    <View style={estilos.form}>
                      {codigoDemo ? (
                        <View style={estilos.codigoDemo}>
                          <Ionicons name="key-outline" size={18} color={colores.rojo} />
                          <Text style={estilos.codigoDemoTexto}>
                            Tu código es <Text style={estilos.codigoDemoNumero}>{codigoDemo}</Text> (vence en 15 min, modo demo)
                          </Text>
                        </View>
                      ) : (
                        <View style={estilos.codigoDemo}>
                          <Ionicons name="mail-outline" size={18} color={colores.rojo} />
                          <Text style={estilos.codigoDemoTexto}>
                            Te enviamos un código de 6 dígitos a{" "}
                            <Text style={estilos.emailDestacado}>{email}</Text>. Revisá también la carpeta de spam.
                          </Text>
                        </View>
                      )}
                      <TextInput
                        style={estilos.input}
                        placeholder="Código de 6 dígitos"
                        placeholderTextColor={colores.gris}
                        keyboardType="number-pad"
                        maxLength={6}
                        value={codigo}
                        onChangeText={setCodigo}
                      />
                      <TextInput
                        style={estilos.input}
                        placeholder="Nueva contraseña (mínimo 6 caracteres)"
                        placeholderTextColor={colores.gris}
                        secureTextEntry
                        value={nuevaPassword}
                        onChangeText={setNuevaPassword}
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
                          <BotonRojo texto="Cambiar contraseña" onPress={cambiarPassword} />
                        )}
                      </View>
                      <Pressable
                        onPress={() => { setPasoRecuperacion("email"); setCodigo(""); setError(""); }}
                        style={estilos.olvido}
                      >
                        <Text style={estilos.olvidoTexto}>¿No te llegó? Pedir otro código</Text>
                      </Pressable>
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

                    {modo === "login" ? (
                      <Pressable
                        onPress={() => { setModo("recuperar"); setError(""); setPasoRecuperacion("email"); }}
                        style={estilos.olvido}
                      >
                        <Text style={estilos.olvidoTexto}>¿Olvidaste tu contraseña?</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </>
              )}
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
  avatarGrande: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: colores.rojo,
    marginBottom: 4,
  },
  selector: {
    width: "100%",
    marginTop: 12,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    alignItems: "center",
    gap: 6,
  },
  selectorTitulo: { color: colores.texto, fontSize: 14, fontWeight: "700", alignSelf: "flex-start" },
  avatares: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 6 },
  avatarOpcion: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  avatarActivo: { borderColor: colores.rojo },
  avatarPresionado: { opacity: 0.75, transform: [{ scale: 0.94 }] },
  avatarImagen: { width: "100%", height: "100%" },
  avatarCheck: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colores.rojo,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colores.tarjeta,
  },
  avatarNombre: { color: colores.gris, fontSize: 12 },
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
  tituloBloque: { marginTop: 28, marginBottom: 12 },
  tituloGrupo: { marginBottom: 10 },
  grupo: { marginBottom: 22 },
  grupoVacio: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 14,
  },
  grupoVacioTexto: { color: colores.gris },
  espacio: { marginTop: 20 },
  listaTickets: { gap: 14 },
  vacio: { alignItems: "center", gap: 6, paddingVertical: 24, paddingHorizontal: 16 },
  vacioTexto: { color: colores.texto, fontSize: 16, fontWeight: "bold", marginTop: 4 },
  vacioDetalle: { color: colores.gris, textAlign: "center" },
  botonChico: { marginTop: 8, width: "60%" },
  cargando: { backgroundColor: colores.rojo, opacity: 0.7, borderRadius: 10, paddingVertical: 14, alignItems: "center" },
  olvido: { alignItems: "center", paddingVertical: 6 },
  olvidoTexto: { color: colores.gris, fontSize: 13, fontWeight: "600" },
  recuperarEncabezado: { gap: 8, marginBottom: 20 },
  volver: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start" },
  volverTexto: { color: colores.gris, fontSize: 13 },
  recuperarTitulo: { color: colores.texto, fontSize: 22, fontWeight: "bold" },
  ayuda: { color: colores.gris, lineHeight: 20 },
  codigoDemo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colores.rojoSuave,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(229,9,20,0.35)",
    padding: 12,
  },
  codigoDemoTexto: { color: colores.texto, fontSize: 13, flex: 1 },
  codigoDemoNumero: { color: colores.dorado, fontWeight: "800", letterSpacing: 1 },
  emailDestacado: { color: colores.texto, fontWeight: "700" },
  exitoRecuperacion: { alignItems: "center", gap: 8, paddingVertical: 24 },
  exitoTitulo: { color: colores.texto, fontSize: 20, fontWeight: "bold", marginTop: 8 },
  exitoTexto: { color: colores.gris, textAlign: "center" },
  botonExito: { marginTop: 12, width: "100%" },
});
import { useCallback, useEffect, useState } from "react";
<<<<<<< HEAD
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
=======
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Encabezado from "../../components/Encabezado";
import TarjetaPelicula from "../../components/TarjetaPelicula";
import BotonRojo from "../../components/BotonRojo";
import Carrusel from "../../components/Carrusel";
<<<<<<< HEAD
import CarruselPeliculas from "../../components/CarruselPeliculas";
import TituloSeccion from "../../components/TituloSeccion";
import Aparicion from "../../components/Aparicion";
import { Image } from "expo-image";
import { colores } from "../../constants/colores";
import { PROMOS } from "../../data/promos";
import { avatarPorId } from "../../data/avatares";
import { useMenuLateral } from "../../hooks/useMenuLateral";
import { getPeliculas } from "../../services/api";
import { useSesion } from "../../services/sesion";
import { useCarritoCandy } from "../../services/carrito";
import { Pelicula } from "../../models/tipos";

const SECCIONES = [
  {
    estado: "estreno",
    titulo: "Estrenos",
    subtitulo: "En pantalla grande ahora",
    boton: "Comprar",
    icono: "ticket-outline",
  },
  {
    estado: "preventa",
    titulo: "Preventa",
    subtitulo: "Asegurá tu lugar antes del estreno",
    boton: "Preventa",
    icono: "ticket-outline",
  },
  {
    estado: "proximo",
    titulo: "Próximos estrenos",
    subtitulo: "Muy pronto en VAMST",
    boton: "Ver más",
    icono: "chevron-forward",
  },
] as const;

const ACCESOS = [
  { icono: "fast-food-outline", texto: "Candy Bar", destino: "/tienda" },
  { icono: "pricetag-outline", texto: "Promos", destino: "/promociones" },
  { icono: "person-outline", texto: "Mis tickets", destino: "/registro" },
] as const;

const normalizar = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function ElegirPelicula() {
  useMenuLateral(true);
  const router = useRouter();
  const { usuario, avatar } = useSesion();
  const { cantidadTotal: cantidadCarrito } = useCarritoCandy();
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [anchoGrilla, setAnchoGrilla] = useState(0);
=======
import { colores } from "../../constants/colores";
import { PROMOS } from "../../data/promos";
import { useMenuLateral } from "../../hooks/useMenuLateral";
import { getPeliculas } from "../../services/api";
import { useSesion } from "../../services/sesion";
import { Pelicula } from "../../models/tipos";

export default function ElegirPelicula() {
  useMenuLateral(true);
  const router = useRouter();
  const { usuario } = useSesion();
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78

  const cargar = useCallback(() => {
    setCargando(true);
    setError("");
    getPeliculas()
      .then(setPeliculas)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(cargar, [cargar]);

<<<<<<< HEAD
  const avatarElegido = avatarPorId(avatar);
  const estrenos = peliculas.filter((p) => p.estado === "estreno");
  const destacadas = (estrenos.length > 0 ? estrenos : peliculas).slice(0, 5);
  const nombre = usuario ? usuario.nombre.split(" ")[0] : "cinéfilo";
  const consulta = normalizar(busqueda.trim());
  const resultados = consulta
    ? peliculas.filter(
        (p) => normalizar(p.titulo).includes(consulta) || normalizar(p.genero).includes(consulta)
      )
    : [];
  const buscando = consulta.length > 0;
  const columnas = anchoGrilla >= 840 ? 4 : anchoGrilla >= 560 ? 3 : 2;
  const anchoTarjeta =
    anchoGrilla > 0 ? (anchoGrilla - 32 - 12 * (columnas - 1)) / columnas : undefined;

=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  return (
    <SafeAreaView style={estilos.pantalla}>
      <Encabezado
        titulo="VAMST CINE"
        derecha={
          <Pressable onPress={() => router.push("/registro")} style={estilos.login} hitSlop={8}>
<<<<<<< HEAD
            {avatarElegido ? (
              <Image source={avatarElegido.imagen} style={estilos.avatar} contentFit="cover" />
            ) : (
              <Ionicons name="person-circle-outline" size={28} color={colores.texto} />
            )}
=======
            <Ionicons name="person" size={20} color={colores.texto} />
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
            <Text style={estilos.loginTexto}>{usuario ? usuario.nombre.split(" ")[0] : "Login"}</Text>
          </Pressable>
        }
      />

      {cargando ? (
        <View style={estilos.centro}>
          <ActivityIndicator size="large" color={colores.rojo} />
<<<<<<< HEAD
          <Text style={estilos.cargandoTexto}>Preparando la cartelera…</Text>
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
        </View>
      ) : error ? (
        <View style={estilos.centro}>
          <Ionicons name="cloud-offline-outline" size={48} color={colores.gris} />
          <Text style={estilos.errorTexto}>No se pudo cargar la cartelera</Text>
          <Text style={estilos.errorDetalle}>{error}</Text>
          <View style={estilos.reintentar}>
            <BotonRojo texto="Reintentar" onPress={cargar} />
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={estilos.contenido}>
<<<<<<< HEAD
          <Aparicion style={estilos.bienvenida}>
            <Text style={estilos.overline}>CARTELERA</Text>
            <Text style={estilos.tituloGrande}>Hola, {nombre}</Text>
            <Text style={estilos.subtituloGrande}>¿Qué vemos hoy? Elegí tu próxima función.</Text>
          </Aparicion>

          <Aparicion delay={40} style={estilos.buscador}>
            <Ionicons name="search-outline" size={18} color={colores.gris} />
            <TextInput
              value={busqueda}
              onChangeText={setBusqueda}
              placeholder="Buscar por título o género"
              placeholderTextColor={colores.gris}
              style={estilos.buscadorInput}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
            />
            {busqueda.length > 0 ? (
              <Pressable onPress={() => setBusqueda("")} hitSlop={8}>
                <Ionicons name="close-circle" size={18} color={colores.gris} />
              </Pressable>
            ) : null}
          </Aparicion>

          {buscando ? (
            <Aparicion delay={80} style={estilos.seccion}>
              <View style={estilos.tituloSeccion}>
                <TituloSeccion
                  texto={
                    resultados.length > 0
                      ? `${resultados.length} ${resultados.length === 1 ? "resultado" : "resultados"}`
                      : "Sin resultados"
                  }
                  subtitulo={`Para "${busqueda.trim()}"`}
                />
              </View>
              {resultados.length === 0 ? (
                <View style={estilos.sinResultados}>
                  <Ionicons name="search-outline" size={40} color={colores.gris} />
                  <Text style={estilos.sinResultadosTexto}>
                    No encontramos películas con ese título o género. Probá con otra palabra.
                  </Text>
                </View>
              ) : (
                <View style={estilos.grid} onLayout={(e) => setAnchoGrilla(e.nativeEvent.layout.width)}>
                  {resultados.map((p) => (
                    <TarjetaPelicula
                      key={p.id}
                      titulo={p.titulo}
                      posterUrl={p.posterUrl}
                      compacta
                      style={anchoTarjeta ? { width: anchoTarjeta } : undefined}
                      onPress={() => router.push({ pathname: "/detalle_pelicula", params: { id: String(p.id) } })}
                    />
                  ))}
                </View>
              )}
            </Aparicion>
          ) : (
            <>

          <Aparicion delay={60} style={estilos.hero}>
            <CarruselPeliculas
              peliculas={destacadas}
              onPress={(p) => router.push({ pathname: "/detalle_pelicula", params: { id: String(p.id) } })}
            />
          </Aparicion>

          {SECCIONES.map(({ estado, titulo, subtitulo, boton, icono }, indice) => {
            const lista = peliculas.filter((p) => p.estado === estado);
            if (lista.length === 0) return null;
            return (
              <Aparicion key={estado} delay={130 + indice * 80} style={estilos.seccion}>
                <View style={estilos.tituloSeccion}>
                  <TituloSeccion texto={titulo} subtitulo={subtitulo} />
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={estilos.carrusel}
                >
                  {lista.map((p) => (
                    <TarjetaPelicula
                      key={p.id}
                      titulo={p.titulo}
                      posterUrl={p.posterUrl}
                      boton={boton}
                      icono={icono}
                      onPress={() => router.push({ pathname: "/detalle_pelicula", params: { id: String(p.id) } })}
                    />
                  ))}
                </ScrollView>
              </Aparicion>
            );
          })}

          <Aparicion delay={420} style={estilos.seccion}>
            <View style={estilos.tituloSeccion}>
              <TituloSeccion
                texto="Promociones"
                subtitulo="Beneficios para tu salida al cine"
                accion="Ver todas"
                onAccion={() => router.push("/promociones")}
              />
            </View>
            <Carrusel promos={PROMOS} onPress={() => router.push("/promociones")} />
          </Aparicion>

          <Aparicion delay={500} style={estilos.seccion}>
            <View style={estilos.tituloSeccion}>
              <TituloSeccion texto="Accesos rápidos" />
            </View>
            <View style={estilos.accesos}>
              {ACCESOS.map((a) => (
                <Pressable
                  key={a.texto}
                  onPress={() => router.push(a.destino)}
                  style={({ pressed }) => [estilos.acceso, pressed && estilos.accesoPresionado]}
                >
                  <View style={estilos.accesoIcono}>
                    <Ionicons name={a.icono} size={22} color={colores.rojo} />
                    {a.texto === "Candy Bar" && cantidadCarrito > 0 ? (
                      <View style={estilos.accesoBadge}>
                        <Text style={estilos.accesoBadgeTexto}>{cantidadCarrito}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={estilos.accesoTexto}>{a.texto}</Text>
                </Pressable>
              ))}
            </View>
          </Aparicion>
            </>
          )}
=======
          <Carrusel promos={PROMOS} onPress={() => router.push("/promociones")} />

          <Text style={estilos.seccion}>En cartelera</Text>
          <View style={estilos.fila}>
            {peliculas.map((p) => (
              <TarjetaPelicula
                key={p.id}
                titulo={p.titulo}
                posterUrl={p.posterUrl}
                boton="Comprar"
                onPress={() => router.push({ pathname: "/detalle_pelicula", params: { id: String(p.id) } })}
              />
            ))}
          </View>
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
<<<<<<< HEAD
  contenido: { paddingTop: 18, paddingBottom: 44 },
  login: { flexDirection: "row", alignItems: "center", gap: 6 },
  avatar: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colores.rojo },
  loginTexto: { color: colores.texto, fontSize: 18 },
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10 },
  cargandoTexto: { color: colores.gris },
  errorTexto: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 8 },
  errorDetalle: { color: colores.gris, textAlign: "center" },
  reintentar: { marginTop: 12, width: "60%" },
  bienvenida: { paddingHorizontal: 16, gap: 2 },
  overline: { color: colores.rojo, fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  tituloGrande: { color: colores.texto, fontSize: 30, fontWeight: "800", letterSpacing: 0.2 },
  subtituloGrande: { color: colores.gris, fontSize: 14, marginTop: 2 },
  hero: { marginTop: 18 },
  buscador: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  buscadorInput: { flex: 1, color: colores.texto, fontSize: 14, paddingVertical: 11 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, paddingHorizontal: 16 },
  sinResultados: { alignItems: "center", gap: 10, paddingVertical: 36, paddingHorizontal: 32 },
  sinResultadosTexto: { color: colores.gris, textAlign: "center", lineHeight: 20 },
  seccion: { marginTop: 30 },
  tituloSeccion: { paddingHorizontal: 16, marginBottom: 12 },
  carrusel: { paddingHorizontal: 16, gap: 12 },
  accesos: { flexDirection: "row", gap: 10, paddingHorizontal: 16 },
  acceso: {
    flex: 1,
    alignItems: "center",
    gap: 8,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingVertical: 14,
  },
  accesoPresionado: { opacity: 0.8, transform: [{ scale: 0.97 }] },
  accesoIcono: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colores.rojoSuave,
    alignItems: "center",
    justifyContent: "center",
  },
  accesoTexto: { color: colores.texto, fontSize: 12, fontWeight: "600" },
  accesoBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: colores.rojo,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colores.tarjeta,
  },
  accesoBadgeTexto: { color: colores.texto, fontSize: 10, fontWeight: "800" },
=======
  contenido: { padding: 16, paddingBottom: 40 },
  login: { flexDirection: "row", alignItems: "center", gap: 4 },
  loginTexto: { color: colores.texto },
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10 },
  errorTexto: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 8 },
  errorDetalle: { color: colores.gris, textAlign: "center" },
  reintentar: { marginTop: 12, width: "60%" },
  seccion: { color: colores.texto, fontSize: 18, fontWeight: "bold", marginTop: 24, marginBottom: 12, textAlign: "center" },
fila: { flexDirection: "row", flexWrap: "wrap", gap: 16, justifyContent: "center" },
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
});
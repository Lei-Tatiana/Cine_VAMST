import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { Promo } from "../data/promos";
import { Image } from "expo-image";

type Props = {
  promos: Promo[];
  onPress: (promo: Promo) => void;
  intervaloMs?: number; 
  margenHorizontal?: number; 
};


export default function Carrusel({ promos, onPress, intervaloMs = 4000, margenHorizontal = 16 }: Props) {
  const { width } = useWindowDimensions();
  const ancho = width - margenHorizontal * 2;
  const lista = useRef<FlatList<Promo>>(null);
  const indiceActual = useRef(0);
  const tocando = useRef(false);
  const [indice, setIndice] = useState(0);

  const irA = (nuevo: number) => {
    if (promos.length === 0) return;
    indiceActual.current = nuevo;
    setIndice(nuevo);
    lista.current?.scrollToOffset({ offset: nuevo * ancho, animated: true });
  };


  useEffect(() => {
    if (promos.length < 2) return;
    const reloj = setInterval(() => {
      if (tocando.current) return;
      irA((indiceActual.current + 1) % promos.length);
    }, intervaloMs);
    return () => clearInterval(reloj);
  }, [promos.length, intervaloMs, ancho]);

  const alTerminarDeDeslizar = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nuevo = Math.round(e.nativeEvent.contentOffset.x / ancho);
    indiceActual.current = nuevo;
    setIndice(nuevo);
    tocando.current = false;
  };

  return (
    <View style={estilos.contenedorPrincipal}>
      <FlatList
        ref={lista}
        data={promos}
        keyExtractor={(p) => p.titulo}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: ancho }}
        getItemLayout={(_, i) => ({ length: ancho, offset: ancho * i, index: i })}
        onScrollBeginDrag={() => { tocando.current = true; }}
        onMomentumScrollEnd={alTerminarDeDeslizar}
        renderItem={({ item }) => (
          <Pressable style={[estilos.slide, { width: ancho }]} onPress={() => onPress(item)}>
            <Image source={item.imagen} style={{ ...StyleSheet.absoluteFill }} contentFit="cover" transition={220} />
            
            <View style={estilos.capa} />

            <View style={estilos.iconoBadge}>
              <Ionicons name={item.icono} size={18} color={colores.rojo} />
            </View>
            
            <View style={estilos.texto}>
              <Text style={estilos.titulo} numberOfLines={1}>{item.titulo}</Text>
              <Text style={estilos.detalle} numberOfLines={2}>{item.detalle}</Text>
              <Text style={estilos.vigencia}>{item.vigencia}  ·  Ver promociones ›</Text>
            </View>
          </Pressable>
)}

      />

      <View style={estilos.puntos}>
        {promos.map((p, i) => (
          <View key={p.titulo} style={[estilos.punto, i === indice && estilos.puntoActivo]} />
        ))}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    alignItems: "center",
    marginVertical: 10,
  },
  slide: {
    height: 180,
    borderRadius: 16, 
    overflow: "hidden",
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: colores.borde || "rgba(255,255,255,0.1)",
    backgroundColor: colores.tarjeta,
  },
  capa: {
  ...StyleSheet.absoluteFill,
  backgroundColor: "rgba(0, 0, 0, 0.45)",
},
  iconoBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(10,10,10,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  texto: { 
    padding: 16, 
    gap: 4,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.35)"
  },
  titulo: { 
    color: "#ffffff", 
    fontSize: 19, 
    fontWeight: "800",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  detalle: { 
    color: "#e0e0e0", 
    fontSize: 13,
    lineHeight: 18,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  vigencia: { 
    color: colores.rojo || "#e50914", 
    fontSize: 12, 
    fontWeight: "600",
    marginTop: 4, 
    letterSpacing: 0.3
  },
  puntos: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
    gap: 6, 
    marginTop: 12 
  },
  punto: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: colores.borde || "rgba(255,255,255,0.3)",
    opacity: 0.5
  },
  puntoActivo: { 
    width: 18, 
    height: 6,
    borderRadius: 3,
    backgroundColor: colores.rojo || "#e50914",
    opacity: 1
  },
});

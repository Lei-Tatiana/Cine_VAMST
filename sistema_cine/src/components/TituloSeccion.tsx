import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";

type Props = {
  texto: string;
  subtitulo?: string;
  accion?: string;
  onAccion?: () => void;
  tamano?: "normal" | "grande" | "chico";
};

export default function TituloSeccion({ texto, subtitulo, accion, onAccion, tamano = "normal" }: Props) {
  return (
    <View style={estilos.fila}>
      <View
        style={[
          estilos.barra,
          tamano === "grande" && estilos.barraGrande,
          tamano === "chico" && estilos.barraChica,
        ]}
      />
      <View style={estilos.textos}>
        <Text
          style={[
            estilos.titulo,
            tamano === "grande" && estilos.tituloGrande,
            tamano === "chico" && estilos.tituloChico,
          ]}
        >
          {texto}
        </Text>
        {subtitulo ? <Text style={estilos.subtitulo}>{subtitulo}</Text> : null}
      </View>
      {accion && onAccion ? (
        <Pressable onPress={onAccion} hitSlop={8} style={({ pressed }) => [estilos.accion, pressed && estilos.accionPresionada]}>
          <Text style={estilos.accionTexto}>{accion}</Text>
          <Ionicons name="chevron-forward" size={16} color={colores.rojo} />
        </Pressable>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: { flexDirection: "row", alignItems: "center", gap: 10 },
  barra: { width: 4, height: 26, borderRadius: 2, backgroundColor: colores.rojo },
  barraGrande: { height: 32 },
  barraChica: { height: 21 },
  textos: { flex: 1 },
  titulo: { color: colores.texto, fontSize: 23, fontWeight: "800", letterSpacing: 0.2 },
  tituloGrande: { fontSize: 28 },
  tituloChico: { fontSize: 19 },
  subtitulo: { color: colores.gris, fontSize: 13, marginTop: 2 },
  accion: { flexDirection: "row", alignItems: "center", gap: 2 },
  accionPresionada: { opacity: 0.6 },
  accionTexto: { color: colores.rojo, fontWeight: "700", fontSize: 13 },
});

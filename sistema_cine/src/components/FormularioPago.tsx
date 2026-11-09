import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BotonRojo from "./BotonRojo";
import { colores } from "../constants/colores";
import { formatearPrecio } from "../utils/formato";
import { MetodoPago } from "../models/tipos";

type Props = {
  monto: number;
  onPagar: (metodo: MetodoPago) => Promise<void>;
};

const metodos: { id: MetodoPago; nombre: string; icono: keyof typeof Ionicons.glyphMap }[] = [
  { id: "tarjeta", nombre: "Tarjeta", icono: "card-outline" },
  { id: "mercadopago", nombre: "Mercado Pago", icono: "wallet-outline" },
  { id: "efectivo", nombre: "Efectivo", icono: "cash-outline" },
];

const soloDigitos = (valor: string) => valor.replace(/\D/g, "");

const formatearNumero = (valor: string) =>
  soloDigitos(valor).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatearVencimiento = (valor: string) => {
  const digitos = soloDigitos(valor).slice(0, 4);
  return digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
};

const vencimientoValido = (valor: string) => {
  const partes = valor.match(/^(\d{2})\/(\d{2})$/);
  if (!partes) return false;
  const mes = Number(partes[1]);
  const anio = 2000 + Number(partes[2]);
  if (mes < 1 || mes > 12) return false;
  const ahora = new Date();
  return anio > ahora.getFullYear() || (anio === ahora.getFullYear() && mes >= ahora.getMonth() + 1);
};

export default function FormularioPago({ monto, onPagar }: Props) {
  const [metodo, setMetodo] = useState<MetodoPago>("tarjeta");
  const [numero, setNumero] = useState("");
  const [titular, setTitular] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  const elegirMetodo = (nuevo: MetodoPago) => {
    setMetodo(nuevo);
    setError("");
  };

  const usarTarjetaDePrueba = () => {
    setNumero("4242 4242 4242 4242");
    setTitular("DEMO VAMST");
    setVencimiento("12/30");
    setCvv("123");
    setError("");
  };

  const pagar = async () => {
    if (procesando) return;
    if (metodo === "tarjeta") {
      const digitos = soloDigitos(numero);
      if (digitos.length !== 16) {
        setError("Ingresá los 16 dígitos del número de tarjeta.");
        return;
      }
      if (titular.trim().length < 3) {
        setError("Ingresá el nombre del titular.");
        return;
      }
      if (!vencimientoValido(vencimiento)) {
        setError("El vencimiento debe ser MM/AA y no puede estar vencido.");
        return;
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        setError("El CVV debe tener 3 o 4 dígitos.");
        return;
      }
    }

    setError("");
    setProcesando(true);
    try {
      await new Promise((resolver) => setTimeout(resolver, 1200));
      await onPagar(metodo);
    } catch (e: any) {
      setError(e?.message ?? "No se pudo completar el pago.");
      setProcesando(false);
    }
  };

  return (
    <View style={estilos.form}>

      <View style={estilos.metodos}>
        {metodos.map((m) => {
          const activo = m.id === metodo;
          return (
            <Pressable
              key={m.id}
              onPress={() => elegirMetodo(m.id)}
              style={[estilos.metodo, activo && estilos.metodoActivo]}
            >
              <Ionicons name={m.icono} size={20} color={activo ? colores.rojo : colores.gris} />
              <Text style={[estilos.metodoTexto, activo && estilos.metodoTextoActivo]}>{m.nombre}</Text>
            </Pressable>
          );
        })}
      </View>

      {metodo === "tarjeta" ? (
        <>
          <View style={estilos.campo}>
            <Text style={estilos.etiqueta}>Número de tarjeta</Text>
            <TextInput
              style={estilos.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={colores.gris}
              keyboardType="number-pad"
              value={numero}
              onChangeText={(valor) => setNumero(formatearNumero(valor))}
              maxLength={19}
            />
          </View>

          <View style={estilos.campo}>
            <Text style={estilos.etiqueta}>Titular</Text>
            <TextInput
              style={estilos.input}
              placeholder="Como figura en la tarjeta"
              placeholderTextColor={colores.gris}
              value={titular}
              onChangeText={setTitular}
              autoCapitalize="characters"
            />
          </View>

          <View style={estilos.filaDoble}>
            <View style={[estilos.campo, estilos.mitad]}>
              <Text style={estilos.etiqueta}>Vencimiento</Text>
              <TextInput
                style={estilos.input}
                placeholder="MM/AA"
                placeholderTextColor={colores.gris}
                keyboardType="number-pad"
                value={vencimiento}
                onChangeText={(valor) => setVencimiento(formatearVencimiento(valor))}
                maxLength={5}
              />
            </View>
            <View style={[estilos.campo, estilos.mitad]}>
              <Text style={estilos.etiqueta}>CVV</Text>
              <TextInput
                style={estilos.input}
                placeholder="123"
                placeholderTextColor={colores.gris}
                keyboardType="number-pad"
                secureTextEntry
                value={cvv}
                onChangeText={(valor) => setCvv(soloDigitos(valor).slice(0, 4))}
                maxLength={4}
              />
            </View>
          </View>

          <Pressable onPress={usarTarjetaDePrueba} style={estilos.prueba} hitSlop={6}>
            <Ionicons name="flash-outline" size={16} color={colores.rojo} />
            <Text style={estilos.pruebaTexto}>Usar tarjeta de prueba</Text>
          </Pressable>
        </>
      ) : metodo === "mercadopago" ? (
        <View style={estilos.alternativa}>
          <View style={estilos.alternativaIcono}>
            <Ionicons name="wallet" size={24} color={colores.rojo} />
          </View>
          <Text style={estilos.alternativaTitulo}>Pagar con Mercado Pago</Text>
        </View>
      ) : (
        <View style={estilos.alternativa}>
          <View style={estilos.alternativaIcono}>
            <Ionicons name="cash" size={24} color={colores.rojo} />
          </View>
          <Text style={estilos.alternativaTitulo}>Pago en efectivo</Text>
          <Text style={estilos.alternativaTexto}>
            Reservamos tu compra y la pagás en efectivo al retirarla. Conservá el código que te damos al confirmar.
          </Text>
        </View>
      )}

      {error ? (
        <View style={estilos.error}>
          <Ionicons name="alert-circle" size={18} color={colores.rojo} />
          <Text style={estilos.errorTexto}>{error}</Text>
        </View>
      ) : null}

      {procesando ? (
        <View style={estilos.cargando}>
          <ActivityIndicator color={colores.texto} />
          <Text style={estilos.cargandoTexto}>Procesando pago…</Text>
        </View>
      ) : (
        <BotonRojo
          texto={
            metodo === "tarjeta"
              ? `Pagar ${formatearPrecio(monto)}`
              : metodo === "mercadopago"
                ? "Pagar con Mercado Pago"
                : "Confirmar y pagar al retirar"
          }
          onPress={pagar}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  form: { gap: 12 },
  aviso: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(229,9,20,0.10)",
    borderWidth: 1,
    borderColor: "rgba(229,9,20,0.35)",
    borderRadius: 10,
    padding: 12,
  },
  avisoTexto: { flex: 1, color: colores.gris, fontSize: 12, lineHeight: 17 },
  metodos: { flexDirection: "row", gap: 8 },
  metodo: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  metodoActivo: { borderColor: colores.rojo, backgroundColor: colores.rojoSuave },
  metodoTexto: { color: colores.gris, fontSize: 12, fontWeight: "600", textAlign: "center" },
  metodoTextoActivo: { color: colores.texto },
  alternativa: { alignItems: "center", gap: 8, paddingVertical: 14, paddingHorizontal: 8 },
  alternativaIcono: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colores.rojoSuave,
    alignItems: "center",
    justifyContent: "center",
  },
  alternativaTitulo: { color: colores.texto, fontSize: 16, fontWeight: "bold" },
  alternativaTexto: { color: colores.gris, fontSize: 13, textAlign: "center", lineHeight: 19 },
  campo: { gap: 6 },
  filaDoble: { flexDirection: "row", gap: 12 },
  mitad: { flex: 1 },
  etiqueta: { color: colores.gris, fontSize: 12, fontWeight: "600" },
  input: {
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: colores.texto,
    fontSize: 15,
  },
  prueba: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start" },
  pruebaTexto: { color: colores.rojo, fontSize: 13, fontWeight: "600" },
  error: { flexDirection: "row", alignItems: "center", gap: 8 },
  errorTexto: { color: colores.rojo, flex: 1 },
  cargando: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colores.rojo,
    opacity: 0.75,
    paddingVertical: 14,
    borderRadius: 10,
  },
  cargandoTexto: { color: colores.texto, fontSize: 16, fontWeight: "bold" },
});

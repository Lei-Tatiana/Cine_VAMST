// SELECCIÓN DE ASIENTOS. Según tu boceto: grilla de asientos con
// 4 estados visuales (disponible / seleccionado / ocupado / accesible),
// y al final un botón para confirmar la reserva.

import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
// TODO: import { getAsientos, crearReserva } from "../../services/api";

export default function SeleccionarAsientos() {
  const { funcionId } = useLocalSearchParams();
  const router = useRouter();

  // TODO: useState para la lista de asientos y los seleccionados por el usuario
  // TODO: useEffect que llame a getAsientos(funcionId)
  // TODO: al tocar un asiento "disponible", agregarlo/sacarlo de "seleccionados"
  //   (si está "ocupado", no debería poder tocarse)
  // TODO: al confirmar, llamar a crearReserva(funcionId, idsSeleccionados)
  //   y navegar a alguna pantalla de confirmación (o volver a Cartelera)

  return (
    <View>
      <Text>Selección de asientos, función {funcionId} — TODO</Text>
    </View>
  );
}

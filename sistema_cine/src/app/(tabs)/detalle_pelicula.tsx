// DETALLE DE PELÍCULA. Según tu boceto: portada + ficha técnica,
// selector de horarios/funciones, y carrusel de películas sugeridas
// al final.

import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
// TODO: import { getPeliculaPorId, getFunciones } from "../../services/api";
// TODO: import { formatearFecha, formatearHora, formatearDuracion } from "../../utils/formato";

export default function DetallePelicula() {
  const { id } = useLocalSearchParams();
  // TODO: useState para la película y sus funciones
  // TODO: useEffect que llame a getPeliculaPorId(id) y getFunciones(id)
  // TODO: al elegir una función, navegar a seleccionar_asientos con el funcionId
  // TODO: carrusel de sugeridas al final (podés reusar <Poster>  )

  return (
    <View>
      <Text>Detalle de película {id} — TODO</Text>
    </View>
  );
}

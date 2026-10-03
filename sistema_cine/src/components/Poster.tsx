import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores } from '../constants/theme';

type Props = { titulo: string; uri?: string; style?: StyleProp<ViewStyle> };

// Muestra el póster real si hay uri; si no, un placeholder con el título.
export default function Poster({ titulo, uri, style }: Props) {
  return (
    <View style={[styles.base, style]}>
      {uri ? (
        <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      ) : (
        <>
          <Ionicons name="film-outline" size={32} color="#555" />
          <Text style={styles.texto} numberOfLines={2}>
            {titulo}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  texto: { color: colores.textoSuave, fontSize: 12, textAlign: 'center', marginTop: 6 },
});
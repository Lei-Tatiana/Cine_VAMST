import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colores } from '../constants/theme';

type Props = { texto: string; activo?: boolean; onPress: () => void };

export default function Chip({ texto, activo = false, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chip, activo && styles.chipActivo]}>
      <Text style={[styles.texto, activo && styles.textoActivo]}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: colores.superficie,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActivo: { backgroundColor: colores.rojo, borderColor: colores.rojo },
  texto: { color: colores.textoSuave, fontSize: 14 },
  textoActivo: { color: '#fff', fontWeight: '600' },
});
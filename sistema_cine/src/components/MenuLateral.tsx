import { ComponentProps, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Href, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colores } from '../constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const OPCIONES: { texto: string; icono: IconName; ruta?: Href }[] = [
  { texto: 'Cartelera / Inicio', icono: 'film-outline', ruta: '/elegir_pelicula' },
  { texto: 'Candy Bar / Tienda', icono: 'fast-food-outline', ruta: '/tienda' },
  { texto: 'Promociones', icono: 'pricetag-outline', ruta: '/promociones' },
  { texto: 'Mi Perfil / Registro', icono: 'person-outline', ruta: '/registro' },
  { texto: 'Contacto / RRHH', icono: 'call-outline' }, 
];

/* ---------- Contexto: permite abrir el menú desde cualquier pantalla ---------- */

const MenuContext = createContext<{ abrir: () => void }>({ abrir: () => {} });
export const useMenu = () => useContext(MenuContext);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <MenuContext.Provider value={{ abrir: () => setVisible(true) }}>
      {children}
      <MenuLateral visible={visible} onClose={() => setVisible(false)} />
    </MenuContext.Provider>
  );
}

/* ---------- Botón [☰] ---------- */

export function BotonMenu() {
  const { abrir } = useMenu();
  return (
    <TouchableOpacity onPress={abrir} style={styles.botonMenu} accessibilityLabel="Abrir menú">
      <Ionicons name="menu" size={26} color="#fff" />
    </TouchableOpacity>
  );
}

/* ---------- Panel lateral ---------- */

function MenuLateral({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const ancho = width * 0.75;
  const x = useRef(new Animated.Value(-ancho)).current;

  // Desliza el panel desde la izquierda cada vez que se abre
  useEffect(() => {
    if (visible) {
      x.setValue(-ancho);
      Animated.timing(x, { toValue: 0, duration: 220, useNativeDriver: true }).start();
    }
  }, [visible, ancho, x]);

  const elegir = (ruta?: Href) => {
    onClose();
    if (ruta) router.navigate(ruta);
    else Alert.alert('Próximamente', 'Esta sección todavía no está disponible.');
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.contenedor}>
        <Animated.View
          style={[styles.panel, { width: ancho, paddingTop: insets.top + 16, transform: [{ translateX: x }] }]}
        >
          <Text style={styles.marca}>VAMST CINE 🍿</Text>
          <Text style={styles.saludo}>Hola, cinéfilo 👋</Text>
          <View style={styles.divisor} />

          {OPCIONES.map((op) => (
            <TouchableOpacity key={op.texto} style={styles.opcion} onPress={() => elegir(op.ruta)}>
              <Ionicons name={op.icono} size={22} color={colores.rojo} />
              <Text style={styles.textoOpcion}>{op.texto}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.divisor} />
          <View style={styles.opcion}>
            <Ionicons name="heart" size={22} color="#ff4d6d" />
            <Text style={styles.textoOpcion}>Créditos</Text>
          </View>
          <Text style={styles.credito}>"Gracias a mi gata..."</Text>

          <TouchableOpacity style={[styles.opcion, styles.cerrar]} onPress={onClose}>
            <Ionicons name="close" size={22} color="#fff" />
            <Text style={styles.textoOpcion}>Cerrar Menú</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Fondo con sombra: al tocarlo se cierra */}
        <Pressable style={styles.sombra} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  botonMenu: { paddingHorizontal: 16 },
  contenedor: { flex: 1, flexDirection: 'row' },
  panel: { backgroundColor: colores.fondo, paddingHorizontal: 20, paddingBottom: 24 },
  sombra: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  marca: { color: '#fff', fontSize: 20, fontWeight: '700' },
  saludo: { color: colores.textoSuave, marginTop: 4 },
  divisor: { height: 1, backgroundColor: colores.borde, marginVertical: 16 },
  opcion: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  textoOpcion: { color: '#fff', fontSize: 16 },
  credito: { color: colores.textoSuave, fontStyle: 'italic', marginLeft: 34 },
  cerrar: { marginTop: 'auto' },
});
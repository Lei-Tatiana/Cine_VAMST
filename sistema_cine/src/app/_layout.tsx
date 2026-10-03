import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

function CustomDrawerContent(props: any) {
  const navigateTo = (path: string) => {
    props.navigation?.closeDrawer?.();
    router.push(path as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>VAMST CINE 🍿</Text>
          <Text style={styles.headerSubtitle}>Hola, cinéfilo 👋</Text>
        </View>

        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/(tabs)/elegir_pelicula")}>
            <Ionicons name="film-outline" size={22} color="#E50914" />
            <Text style={styles.menuText}>Cartelera / Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/(tabs)/tienda")}>
            <Ionicons name="fast-food-outline" size={22} color="#FFFFFF" />
            <Text style={styles.menuText}>Candy Bar / Tienda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/(tabs)/promociones")}>
            <Ionicons name="pricetag-outline" size={22} color="#FFFFFF" />
            <Text style={styles.menuText}>Promociones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/registro")}>
            <Ionicons name="person-outline" size={22} color="#FFFFFF" />
            <Text style={styles.menuText}>Mi Perfil / Registro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo("/contacto")}>
            <Ionicons name="call-outline" size={22} color="#FFFFFF" />
            <Text style={styles.menuText}>Contacto / RRHH</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.creditsTitle}>❤️ Créditos</Text>
        <Text style={styles.creditsText}>"Gracias a mi gata..."</Text>
        
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => props.navigation?.closeDrawer?.()}
        >
          <Ionicons name="close-circle-outline" size={20} color="#E50914" />
          <Text style={styles.closeButtonText}>Cerrar Menú</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { backgroundColor: "#121212", width: 280 },
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Inicio" }} />
        <Drawer.Screen name="login" options={{ drawerLabel: "Perfil" }} />
        <Drawer.Screen name="contacto" options={{ drawerLabel: "Contacto" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
  },
  headerTitle: {
    color: "#E50914",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#CCCCCC",
    fontSize: 14,
    marginTop: 4,
  },
  menuList: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 15,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#222222",
  },
  creditsTitle: {
    color: "#E50914",
    fontSize: 14,
    fontWeight: "bold",
  },
  creditsText: {
    color: "#888888",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 2,
    marginBottom: 15,
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
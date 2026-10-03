import { Tabs, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleOpenDrawer = () => {
    navigation.dispatch({ type: 'OPEN_DRAWER' });
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#121212" },
        headerTitleStyle: { color: "#FFFFFF", fontWeight: "bold", fontSize: 18 },
        headerTintColor: "#FFFFFF",
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={handleOpenDrawer}
          >
            <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", marginRight: 15, gap: 15 }}>
            <TouchableOpacity>
              <Ionicons name="search-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="person-circle-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ),
        tabBarActiveTintColor: "#E50914",
        tabBarInactiveTintColor: "#8C8C8C",
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="elegir_pelicula"
        options={{
          title: "VAMST | Cartelera",
          tabBarLabel: "Cartelera",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tienda"
        options={{
          title: "VAMST | Candy Bar",
          tabBarLabel: "Candy Bar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="promociones"
        options={{
          title: "VAMST | Promociones",
          tabBarLabel: "Promos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="detalle_pelicula" options={{ href: null, title: "VAMST | Detalle" }} />
      <Tabs.Screen name="seleccionar_asientos" options={{ href: null, title: "VAMST | Selección" }} />
    </Tabs>
  );
}
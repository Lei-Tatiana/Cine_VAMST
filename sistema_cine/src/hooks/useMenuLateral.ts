import { useCallback } from "react";
import { useFocusEffect, useNavigation } from "expo-router";

<<<<<<< HEAD

=======
// Las pantallas principales (cartelera, candy bar, promociones, cuenta) llaman a
// useMenuLateral(true): se puede abrir el menú deslizando desde el borde izquierdo.
// En las pantallas del flujo de compra el gesto queda desactivado, porque ahí
// deslizar desde el borde tiene que servir para volver atrás.
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
export function useMenuLateral(habilitado: boolean) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // getParent() es el Drawer de la raíz (src/app/_layout.tsx)
      navigation.getParent()?.setOptions({ swipeEnabled: habilitado });
    }, [navigation, habilitado])
  );
}

// Abre el menú lateral desde cualquier componente que esté dentro del Drawer.
export function abrirMenuLateral(navigation: unknown) {
  let actual: any = navigation;
  while (actual && typeof actual.openDrawer !== "function") {
    actual = actual.getParent?.();
  }
  actual?.openDrawer();
}

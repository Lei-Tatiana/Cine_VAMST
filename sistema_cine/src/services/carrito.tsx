import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLAVE = "vamst.carritoCandy";

export type CarritoCandy = Record<string, number>;

type ContextoCarrito = {
  carrito: CarritoCandy;
  cargando: boolean;
  cantidadTotal: number;
  agregar: (id: number) => void;
  quitar: (id: number) => void;
  vaciar: () => void;
};

const Contexto = createContext<ContextoCarrito>({
  carrito: {},
  cargando: true,
  cantidadTotal: 0,
  agregar: () => {},
  quitar: () => {},
  vaciar: () => {},
});

function limpiarCarrito(datos: unknown): CarritoCandy {
  if (!datos || typeof datos !== "object") return {};
  const limpio: CarritoCandy = {};
  for (const [id, valor] of Object.entries(datos)) {
    const cantidad = Number(valor);
    if (Number.isInteger(cantidad) && cantidad > 0) limpio[id] = cantidad;
  }
  return limpio;
}

export function CarritoCandyProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<CarritoCandy>({});
  const [cargando, setCargando] = useState(true);
  const hidratado = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(CLAVE)
      .then((guardado) => {
        if (!guardado) return;
        try {
          setCarrito(limpiarCarrito(JSON.parse(guardado)));
        } catch {
          setCarrito({});
        }
      })
      .finally(() => {
        hidratado.current = true;
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    if (!hidratado.current) return;
    AsyncStorage.setItem(CLAVE, JSON.stringify(carrito)).catch(() => {});
  }, [carrito]);

  const agregar = (id: number) =>
    setCarrito((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  const quitar = (id: number) =>
    setCarrito((prev) => {
      const cantidad = (prev[id] ?? 0) - 1;
      const nuevo = { ...prev };
      if (cantidad <= 0) delete nuevo[id];
      else nuevo[id] = cantidad;
      return nuevo;
    });

  const vaciar = () => setCarrito({});

  const cantidadTotal = Object.values(carrito).reduce((suma, cantidad) => suma + cantidad, 0);

  return (
    <Contexto.Provider value={{ carrito, cargando, cantidadTotal, agregar, quitar, vaciar }}>
      {children}
    </Contexto.Provider>
  );
}

export const useCarritoCandy = () => useContext(Contexto);

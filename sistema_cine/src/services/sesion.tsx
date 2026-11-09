import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "../models/tipos";

const CLAVE = "vamst.usuario";

type Sesion = {
  usuario: Usuario | null;
  cargando: boolean;
  iniciarSesion: (usuario: Usuario) => Promise<void>;
  cerrarSesion: () => Promise<void>;
};

const Contexto = createContext<Sesion>({
  usuario: null,
  cargando: true,
  iniciarSesion: async () => {},
  cerrarSesion: async () => {},
});

export function SesionProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(CLAVE)
      .then((guardado) => {
        if (guardado) setUsuario(JSON.parse(guardado));
      })
      .finally(() => setCargando(false));
  }, []);

  const iniciarSesion = async (u: Usuario) => {
    await AsyncStorage.setItem(CLAVE, JSON.stringify(u));
    setUsuario(u);
  };

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem(CLAVE);
    setUsuario(null);
  };

  return (
    <Contexto.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion }}>
      {children}
    </Contexto.Provider>
  );
}

export const useSesion = () => useContext(Contexto);
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "../models/tipos";

const CLAVE = "vamst.usuario";
const CLAVE_AVATARES = "vamst.avatares";

type AvataresGuardados = Record<string, string>;

type Sesion = {
  usuario: Usuario | null;
  cargando: boolean;
  avatar: string | null;
  iniciarSesion: (usuario: Usuario) => Promise<void>;
  cerrarSesion: () => Promise<void>;
  elegirAvatar: (avatar: string) => Promise<void>;
};

const Contexto = createContext<Sesion>({
  usuario: null,
  cargando: true,
  avatar: null,
  iniciarSesion: async () => {},
  cerrarSesion: async () => {},
  elegirAvatar: async () => {},
});

function leerJson<T>(valor: string | null, porDefecto: T): T {
  if (!valor) return porDefecto;
  try {
    return JSON.parse(valor) as T;
  } catch {
    return porDefecto;
  }
}

export function SesionProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [avatares, setAvatares] = useState<AvataresGuardados>({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(CLAVE), AsyncStorage.getItem(CLAVE_AVATARES)])
      .then(([guardado, guardadosAvatares]) => {
        setUsuario(leerJson<Usuario | null>(guardado, null));
        setAvatares(leerJson<AvataresGuardados>(guardadosAvatares, {}));
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

  const elegirAvatar = async (avatar: string) => {
    if (!usuario) return;
    const nuevo = { ...avatares, [String(usuario.id)]: avatar };
    setAvatares(nuevo);
    await AsyncStorage.setItem(CLAVE_AVATARES, JSON.stringify(nuevo));
  };

  const avatar = usuario ? avatares[String(usuario.id)] ?? null : null;

  return (
    <Contexto.Provider value={{ usuario, cargando, avatar, iniciarSesion, cerrarSesion, elegirAvatar }}>
      {children}
    </Contexto.Provider>
  );
}

export const useSesion = () => useContext(Contexto);

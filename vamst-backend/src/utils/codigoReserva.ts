// Código que se le muestra al cliente para retirar sus entradas: VAMST-00042
export function codigoReserva(id: number): string {
  return `VAMST-${String(id).padStart(5, "0")}`;
}

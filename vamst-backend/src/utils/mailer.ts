import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT ?? 465);
const usuario = process.env.SMTP_USER?.trim();
const clave = process.env.SMTP_PASS?.trim();
const remitente = process.env.SMTP_FROM?.trim() ?? usuario;

export const correoConfigurado = Boolean(usuario && clave);

let transporte: Transporter | null = null;

function obtenerTransporte() {
  if (!usuario || !clave) {
    throw new Error("SMTP no configurado");
  }
  if (!transporte) {
    transporte = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user: usuario, pass: clave },
    });
  }
  return transporte;
}

export async function enviarCodigoRecuperacion(destino: string, codigo: string): Promise<void> {
  await obtenerTransporte().sendMail({
    from: `"VAMST CINE" <${remitente}>`,
    to: destino,
    subject: "Código para restablecer tu contraseña",
    text: `Tu código de recuperación es ${codigo}. Vence en 15 minutos. Si no lo pediste, ignorá este mail.`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #141414; color: #ffffff; padding: 32px; border-radius: 12px;">
        <h2 style="color: #e50914; margin: 0 0 12px;">VAMST CINE</h2>
        <p>Recibimos un pedido para restablecer tu contraseña.</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; margin: 20px 0;">${codigo}</p>
        <p>El código vence en <strong>15 minutos</strong>. Si no lo pediste, ignorá este mail.</p>
      </div>
    `,
  });
}

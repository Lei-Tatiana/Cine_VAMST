import { Request, Response } from "express";
import { ProductoCandyRepository } from "../repositories/ProductoCandyRepository";

const metodosPago = ["tarjeta", "mercadopago", "efectivo"];

export class CandyController {
  static async listar(req: Request, res: Response) {
    try{
      const categoria = req.query.categoria as string | undefined;
      const productos = await ProductoCandyRepository.listarTodos(categoria);
      res.json({ok: true, data: productos});
    } catch(e:any){
      res.status(500).json({ok: false, error:{mensaje: e.message}});
    }
  }

  static async crearPedido(req: Request, res: Response) {
    try{
      const {usuarioId, items, metodoPago} = req.body;
      if(!Number.isInteger(Number(usuarioId)) || Number(usuarioId) <= 0){
        return res.status(401).json({ok: false, error:{mensaje: "Iniciá sesión para comprar en el candy bar"}});
      }
      const metodo = metodosPago.includes(metodoPago) ? metodoPago : "tarjeta";
      if(!Array.isArray(items) || items.length === 0){
        return res.status(400).json({ok: false, error:{mensaje: "El pedido está vacío"}});
      }

      const productos = await ProductoCandyRepository.listarTodos();
      const detalle: {nombre: string; precio: number; cantidad: number}[] = [];
      let total = 0;

      for(const item of items){
        const producto = productos.find((p) => p.id === Number(item.productoId));
        const cantidad = Number(item.cantidad);
        if(!producto || !Number.isInteger(cantidad) || cantidad <= 0){
          return res.status(400).json({ok: false, error:{mensaje: "Producto o cantidad inválida"}});
        }
        detalle.push({nombre: producto.nombre, precio: producto.precio, cantidad});
        total += producto.precio * cantidad;
      }

      const pedidoId = await ProductoCandyRepository.crearPedido(Number(usuarioId), detalle, total, metodo);
      res.status(201).json({ok: true, data:{id: pedidoId, total}});
    } catch(e:any){
      res.status(500).json({ok: false, error:{mensaje: e.message}});
    }
  }

    static async listarPedidosPorUsuario(req: Request, res: Response) {
    try {
      const usuarioId = Number(req.params.id);
      if (!Number.isInteger(usuarioId)) {
        return res.status(400).json({ ok: false, error: { mensaje: "Usuario inválido" } });
      }
      const pedidos = await ProductoCandyRepository.listarPedidosPorUsuario(usuarioId);
      res.json({ ok: true, data: pedidos });
    } catch (e: any) {
      res.status(500).json({ ok: false, error: { mensaje: e.message } });
    }
  }
}

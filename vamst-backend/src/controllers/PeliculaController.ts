import { Request, Response } from "express";
import { PeliculaRepository } from "../repositories/PeliculaRepository";
import { FuncionRepository } from "../repositories/FuncionRepository";
   
export class PeliculaController
{
  static async listar(req: Request, res: Response)
  {
    try{
      const peliculas = await PeliculaRepository.listarTodas();
      res.json({ok: true, data: peliculas.map((p) => p.toJSON())});
    } catch (e:any)
    {
      res.status(500).json({ok:false, error:{mensaje: e.mensaje}});
    }
  }


  static async obtenerPorId(req: Request, res: Response)
  {
    try{
      const id = Number(req.params.id);
      const pelicula = await PeliculaRepository.buscarPorId(id);
      if(!pelicula)
      {
        return res.status(404).json({ok: false, error:{mensaje: "Película no encontrada"}});
      }
      res.json({ok:true, data: pelicula.toJSON()});
    }catch (e:any){
      res.status(500).json({ok: false, error: {mensaje: e.mensaje}});
    }
  }


  static async obtenerFunciones(req: Request, res: Response)
  {
    try{
      const id = Number(req.params.id);
      const funciones = await FuncionRepository.listarPorPelicula(id);
      res.json({ok:true, data:funciones});
    } catch (e:any){
      res.status(500).json({ok:false, error:{mensaje: e.mensaje}});
    }
  }
}


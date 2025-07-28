import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { usuarioRepository } from '../../services/usuario.repository.js';
import {Usuario} from "../../schemas/usuario.js";

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  
  fastify.get('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener listado de usuarios",
      description : "Obtener listado de usuarios",
      security: [
        { bearerAuth: [] }
      ],
      response: {
        200: Type.Array(Usuario)
      }
    },
    onRequest: fastify.isAdmin,
    handler: async function (request, reply) {
      return usuarioRepository.getAll();
    }
  })

  fastify.post('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Crear usuario",
      description : "Crear usuario",
      body: Usuario,
      security: [
        { bearerAuth: [] }
      ],
      response: {
        200: Usuario
      }
    },
    onRequest: fastify.isAdmin,
    handler: async function (request, reply) {
      const user = request.body
      return await usuarioRepository.create(user);
    }
  })

}

export default usuariosRoutes

import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import {Usuario, UsuarioParams} from "../../../schemas/usuario.js";
import {usuarioRepository} from "../../../services/usuario.repository.js";
import {Departamento, DepartamentoParams} from '../../../schemas/departamento.js';
import {LocalidadParams, LocalidadUsuario} from "../../../schemas/localidad.js";


const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener usuario",
      description : "Obtener el usuario a partir de su id",
      security: [
        { bearerAuth: [] }
      ],
      params: UsuarioParams,
      response: {
        200: Usuario
      }
    },
    onRequest: fastify.isAdminOrSelf,
    handler: async function (request, reply) {
      const {id_usuario} = request.params as unknown as UsuarioParams;
      return await usuarioRepository.getById(id_usuario);
    }
  })

  fastify.get('/departamentos', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener deptos usuario",
      description : "Obtener departamentos del usuario",
      security: [
        { bearerAuth: [] }
      ],
      response: {
        200: Type.Array(Departamento)
      },
      params: UsuarioParams,
    },
    onRequest: fastify.isAdminOrSelf,
    handler: async function (request, reply) {
      const {id_usuario} = request.params as unknown as UsuarioParams;
      return await usuarioRepository.getDepartamentos(id_usuario);
    }
  })
  
  fastify.get('/departamentos/:id_departamento/localidades', {
    schema: {
      tags: ["usuarios"],
      summary: "Localidades usuario.",
      description : "Obtener las localidades de un determinado departamento del usuario",
      security: [
        { bearerAuth: [] }
      ],
      params: Type.Intersect([UsuarioParams,DepartamentoParams]),
    },
    onRequest: fastify.isAdminOrSelf,
    handler: async function (request, reply) {
      const {id_usuario} = request.params as unknown as UsuarioParams;
      const {id_departamento} = request.params as DepartamentoParams;
      return await usuarioRepository.getLocalidades(id_usuario, id_departamento);
    }
  })
  
  fastify.post('/departamentos/:id_departamento/localidades', {
    schema: {
      tags: ["usuarios"],
      summary: "Crear Localidad",
      params: Type.Intersect([UsuarioParams,DepartamentoParams]),
      body: LocalidadUsuario,
      description : "Crear una localidad asignada a un usuario.",
      security: [
        { bearerAuth: [] }
      ],
    },
    onRequest: fastify.isAdmin,
    handler: async function (request, reply) {
      const localidad = request.body as LocalidadUsuario;
      return await usuarioRepository.addLocalidad(localidad)
    }
  })

  fastify.delete('/departamentos/:id_departamento/localidades/:id_localidad', {
    schema: {
      tags: ["usuarios"],
      summary: "Borrar localidad",
      description : "Borrar localidad.",
      params: Type.Intersect([UsuarioParams,DepartamentoParams, LocalidadParams]),
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.isAdmin,
    handler: async function (request, reply) {
      const {id_usuario} = request.params as unknown as UsuarioParams;
      const {id_departamento} = request.params as DepartamentoParams;
      const {id_localidad} = request.params as LocalidadParams;
      await usuarioRepository.removeLocalidad(id_usuario, id_departamento, id_localidad);
    }
  })

}

export default usuariosRoutes;

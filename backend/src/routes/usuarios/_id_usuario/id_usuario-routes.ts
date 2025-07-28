import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener usuario",
      description : "Obtener el usuario a partir de su id",
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.isAdminOrSelf,
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })

  fastify.get('/departamentos', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener deptos usuario",
      description : "Obtener departamentos del usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.isAdminOrSelf,
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })
  
  fastify.get('/departamentos/:id_departamento/localidades', {
    schema: {
      tags: ["usuarios"],
      summary: "Localidades usuario.",
      description : "Obtener las localidades de un determinado departamento del usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.isAdminOrSelf,
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })
  
  fastify.post('/departamentos/:id_departamento/localidades', {
    schema: {
      tags: ["usuarios"],
      summary: "Crear Localidad",
      description : "Crear una localidad asignada a un usuario.",
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.isAdmin,
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })

  fastify.delete('/departamentos/:id_departamento/localidades/:id_localidad', {
    schema: {
      tags: ["usuarios"],
      summary: "Borrar localidad",
      description : "Borrar localidad.",
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.isAdmin,
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })

}

export default usuariosRoutes

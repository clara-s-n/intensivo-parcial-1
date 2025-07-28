import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { departamentoRepository } from '../../services/departamentos.repository.js';
import { Departamento } from '../../schemas/departamento.js';
import { Type } from '@sinclair/typebox';

const departamentoRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      tags: ["departamentos"],
      summary: "Obtener listado de departamentos",
      description : "Obtener listado de departamentos",
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.isAdmin,
    handler: async function (request, reply) {
      return departamentoRepository.getAll();
    }
  });

  fastify.get('/:id_departamento', {
    schema: {
      tags: ["departamentos"],
      summary: "Obtener listado de departamentos",
      description : "Obtener listado de departamentos",
      params: Type.Object({id_departamento : Type.Integer()}),
      response : {
        200 : Departamento
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.isAdmin,
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })

  fastify.get('/:id_departamento/localidades', {
    schema: {
      tags: ["departamentos"],
      summary: "Obtener listado de departamentos",
      description : "Obtener listado de departamentos",
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

export default departamentoRoutes

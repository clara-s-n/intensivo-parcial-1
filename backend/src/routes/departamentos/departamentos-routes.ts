import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { departamentoRepository } from '../../services/departamentos.repository.js';
import {Departamento, DepartamentoParams} from '../../schemas/departamento.js';
import { Type } from '@sinclair/typebox';

const departamentoRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      tags: ["departamentos"],
      summary: "Obtener listado de departamentos",
      description : "Obtener listado de departamentos",
      security: [
        { bearerAuth: [] }
      ],
      response: {
        200: Type.Array(Departamento)
      }
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
      params: DepartamentoParams,
      response : {
        200 : Departamento
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.isAdmin,
    handler: async function (request, reply) {
      const {id_departamento} = request.params as DepartamentoParams;
      return departamentoRepository.getById(id_departamento)
    }
  })

  fastify.get('/:id_departamento/localidades', {
      schema: {
        tags: ["departamentos"],
        summary: "Obtener listado de departamentos",
        description: "Obtener listado de departamentos",
        security: [
          {bearerAuth: []}
        ],
        params: DepartamentoParams,
        response: {
          200: Type.Array(Type.String())
        }
      },
      onRequest: fastify.isAdmin,
      handler: async function (request, reply) {
        2
        return await departamentoRepository.getLocalidades(id_departamento);
      },
    })
}

export default departamentoRoutes

import { Static, Type } from '@sinclair/typebox';
import fp from 'fastify-plugin'

export const Departamento = Type.Object({
  id_departamento: Type.Integer(),
  nombre : Type.String()
});
export type Departamento = Static<typeof Departamento>;

export const DepartamentoParams = Type.Object({
  id_departamento: Type.Integer()
});
export type DepartamentoParams = Static<typeof DepartamentoParams>;

//Si quiero agregar los esquemas a fastify de antemano para poder usar ref.
export default fp(async (fastify) => {
  fastify.addSchema(Departamento);
})

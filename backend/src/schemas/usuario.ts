import { Static, Type } from '@sinclair/typebox';
import fp from 'fastify-plugin'

export const Login = Type.Object({
  usuario: Type.String(),
  password: Type.String(),
}, {
  examples : [
    {
      usuario: "admin",
      password: "contraseña",
    },
    {
      usuario: "usuario1",
      password: "contraseña",
    },
    {
      usuario: "usuario2",
      password: "contraseña",
    },
]
});

export type Login = Static<typeof Login>;

export const Usuario = Type.Object({
  id_usuario: Type.Optional(Type.Integer()),
  nombre : Type.String(),
  roles :Type.Array(Type.String())
}, {
  examples : [
  {
    id_usuario: "2",
    nombre: "Ejemplo",
    roles: ['user']
  }
  ]
});

export type Usuario = Static<typeof Usuario>;


//Si quiero agregar los esquemas a fastify de antemano para poder usar ref.
export default fp(async (fastify) => {
  fastify.addSchema(Login);
})

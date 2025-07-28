import fp from 'fastify-plugin'
import jwt, { FastifyJWTOptions } from '@fastify/jwt'
import { UCUError } from '../util/index.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Usuario } from '../schemas/usuario.js';
import {usuarioRepository } from '../services/usuario.repository.js';



const jwtOptions: FastifyJWTOptions = {
  secret: process.env.FASTIFY_SECRET || ''  //El or es porque no puede ser undefined
};

const jwtPlugin = fp<FastifyJWTOptions>(async (fastify) => {
  //Recordar que string '' es falsy.
  if (!jwtOptions.secret) throw new UCUError("Falta setear el secret.");
  fastify.register(jwt,jwtOptions)
  
  fastify.decorate('authenticate', async function (req:FastifyRequest , rep:FastifyReply) {
    const url = req.routeOptions.url; //  /auth/login
    if (url != "/auth/login")   //Si no es la ruta de logueo...
      await req.jwtVerify();    //Verifico el token y eso.
  })
  
  fastify.decorate('isAdmin', async function (request:FastifyRequest , reply:FastifyReply) {
    try {
      await request.jwtVerify();
      const { id_usuario } = request.user as { id_usuario: number };
      const rows  = await usuarioRepository.getRoleById(id_usuario);
      const roles = rows.roles[0];
      if (roles !== 'admin') {
        reply.code(401).send({ error: `Unauthorized, you must be an admin and you are ${roles}` });
      }
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  })
  
  fastify.decorate('isAdminOrSelf', async function (request:FastifyRequest , reply:FastifyReply) {
    try{
      await request.jwtVerify();
      let { id } = request.params as { id: string };
      const { id_usuario } = request.user as { id_usuario: number };
      const rows  = await usuarioRepository.getRoleById(id_usuario);
      const roles = rows.roles[0];
      if (roles !== 'admin' || id_usuario === Number(id)) {
        reply.code(401).send({ error: `Unauthorized, you must be an admin and you are ${roles}` });
      }
    } catch (err) {
      reply.code(401).send({error: 'Unauthorized'})
    }
  })
});

export default jwtPlugin;

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: Usuario;
    user: Usuario;
  }
}

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate(req:FastifyRequest , rep:FastifyReply): Promise<void>;
    isAdmin(req:FastifyRequest , rep:FastifyReply): Promise<void>;
    isAdminOrSelf(req:FastifyRequest , rep:FastifyReply): Promise<void>;
  }
}

'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    async find(ctx){
        // si el usuario no tiene un carrito podemos crearle uno
        if(ctx.state.user.carrito){
            let idCarrito = ctx.state.user.carrito;
            let carrito = await strapi.services.carrito.findOne({ id : idCarrito });
            return sanitizeEntity(carrito, { model: strapi.models.carrito });
        }else{
            let body = {
                "user" :  ctx.state.user.id
            };
            return await strapi.services.carrito.create(body);
        }
    },
    async update(ctx){
        const { id } = ctx.params;
        if(ctx.state.user.carrito && ctx.state.user.carrito == id){
            return await strapi.services.carrito.update({ id }, ctx.request.body);
        }else{
            return ctx.unauthorized("no puedes actualizar un carrito que no te pertenece");
        }
    },
    async comprar(ctx){
        console.log(ctx.state.user);
    }
};

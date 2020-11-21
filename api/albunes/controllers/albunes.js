'use strict';

const { find } = require("../../instrumentales/controllers/instrumentales");
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.albunes.search(ctx.query);
        } else {
            entities = await strapi.services.albunes.find(ctx.query);
        }

        return entities.map((entity) => {
        let album = sanitizeEntity(entity, {
            model: strapi.models.albunes,
        });
        if (album.users_permissions_user != null) {
            delete album.users_permissions_user.email;
            delete album.users_permissions_user.provider;
            delete album.users_permissions_user.confirmed;
            delete album.users_permissions_user.blocked;
            delete album.users_permissions_user.role;
            delete album.users_permissions_user.created_at;
            delete album.users_permissions_user.updated_at;
            delete album.users_permissions_user.mercadopago;
            delete album.users_permissions_user.carrito;
            delete album.users_permissions_user.compra;
        }
        return album;
        });
    },
    async user(ctx){
        const {id} = ctx.params;
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.albunes.search(ctx.query);
        } else {
            entities = await strapi.services.albunes.find(ctx.query);
        }

        return entities.filter((element)=>{
            let album = sanitizeEntity(element, {
                model: strapi.models.albunes,
            });

            return album.users_permissions_user != null && album.users_permissions_user.id == id;
        }).map((entity) => {
            let intrumental = sanitizeEntity(entity, {
                model: strapi.models.albunes,
            });
            if (intrumental.users_permissions_user != null) {
                delete album.users_permissions_user.email;
                delete album.users_permissions_user.provider;
                delete album.users_permissions_user.confirmed;
                delete album.users_permissions_user.blocked;
                delete album.users_permissions_user.role;
                delete album.users_permissions_user.created_at;
                delete album.users_permissions_user.updated_at;
                delete album.users_permissions_user.mercadopago;
                delete album.users_permissions_user.carrito;
                delete album.users_permissions_user.compra;
            }
            return album;
        });
    }
};

"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
const mercadopago = require("mercadopago");

module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.instrumentales.search(ctx.query);
        } else {
            entities = await strapi.services.instrumentales.find(ctx.query);
        }

        return entities.map((entity) => {
            let intrumental = sanitizeEntity(entity, {
                model: strapi.models.instrumentales,
            });
            if (intrumental.users_permissions_user != null) {
                delete intrumental.users_permissions_user.email;
                delete intrumental.users_permissions_user.provider;
                delete intrumental.users_permissions_user.confirmed;
                delete intrumental.users_permissions_user.blocked;
                delete intrumental.users_permissions_user.role;
                delete intrumental.users_permissions_user.created_at;
                delete intrumental.users_permissions_user.updated_at;
                delete intrumental.users_permissions_user.mercadopago;
                delete intrumental.users_permissions_user.carrito;
                delete intrumental.users_permissions_user.compra;
            }
            return intrumental;
        });
    },
    async create(ctx) {
        let entity;
        /** cremaos los datos faltantes */
        let access_token = ctx.state.user.mercadopago.access_token;
        let public_key = ctx.state.user.mercadopago.public_key;

        let titulo = ctx.request.body.titulo;
        let description = ctx.request.body.description;
        let precio = ctx.request.body.precio;
        //ctx.state.user.mercadopago.access_token
        var preference = {};

        let item = {
            title: titulo,
            description: description,
            quantity: 1,
            currency_id: "ARS",
            unit_price: precio
        };
        //agregamos los datos
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            ctx.request.body.preference = await createPreference(access_token, public_key, [item]);
            entity = await strapi.services.instrumentales.create(data, { files });
        } else {
            ctx.request.body.preference = await createPreference(access_token, public_key, [item]);
            entity = await strapi.services.instrumentales.create(ctx.request.body);
        }

        return sanitizeEntity(entity, { model: strapi.models.instrumentales });
    },
    async user(ctx) {
        const { id } = ctx.params;
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.instrumentales.search(ctx.query);
        } else {
            entities = await strapi.services.instrumentales.find(ctx.query);
        }

        return entities.filter((element) => {
            let instrumental = sanitizeEntity(element, {
                model: strapi.models.instrumentales,
            });

            return instrumental.users_permissions_user != null && instrumental.users_permissions_user.id == id;
        }).map((entity) => {
            let intrumental = sanitizeEntity(entity, {
                model: strapi.models.instrumentales,
            });
            if (intrumental.users_permissions_user != null) {
                delete intrumental.users_permissions_user.email;
                delete intrumental.users_permissions_user.provider;
                delete intrumental.users_permissions_user.confirmed;
                delete intrumental.users_permissions_user.blocked;
                delete intrumental.users_permissions_user.role;
                delete intrumental.users_permissions_user.created_at;
                delete intrumental.users_permissions_user.updated_at;
                delete intrumental.users_permissions_user.mercadopago;
                delete intrumental.users_permissions_user.carrito;
                delete intrumental.users_permissions_user.compra;
            }
            return intrumental;
        });
    },
    async update(ctx) {

    }
};

function createPreference(access_token, public_key, items) {
    mercadopago.configure({
        access_token: access_token,
        public_key: public_key
    });
    //ctx.state.user.mercadopago.access_token
    var preference = {};
    preference.items = items;
    preference.back_urls = {
        success: "http://localhost:1337/comprar/success",
        pending: "http://localhost:1337/compras/pending",
        failure: "http://localhost:1337/comprar/failure"
    };
    preference.marketplace_fee = 10;
    preference.notification_url = "http://urlmarketplace.com/notification_ipn";
    return mercadopago.preferences.create(preference)
}
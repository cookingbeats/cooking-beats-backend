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
  async comprar(ctx) {
    /** obtenemos el id del prodecuto a comprar
     * de la cual obtenemos los datos de su precio y demas y las cosas que vamos a usar para crear el 
     */
    const {id} = ctx.params;
    const entity = await strapi.services.instrumentales.findOne({ id });

    console.log(entity);

    if(entity){
      let access_token = entity.users_permissions_user.mercadopago.access_token;
      let public_key = entity.users_permissions_user.mercadopago.public_key;
  
      let titulo = entity.titulo;
      let description = entity.description;
      let precio = entity.precio;
  
      let email = ctx.state.user.email;
      let nombre = ctx.state.user.username;
  
      mercadopago.configure({
        access_token: access_token,
        public_key : public_key
      });
      //ctx.state.user.mercadopago.access_token
  
      var preference = {};
  
      var item = {
        title: titulo,
        description: description,
        quantity: 1,
        currency_id: "ARS",
        unit_price: precio
      };
  
      preference.items = [item];
      preference.back_urls = {
        success : "http://localhost:1337/comprar/success",
        pending: "http://localhost:1337/compras/pending",
        failure: "http://localhost:1337/comprar/failure"
      };
  
      preference.payer = {
        "email": email,
        "name": nombre
      }
      preference.notification_url = "http://urlmarketplace.com/notification_ipn";
  
      //agregamos los datos
      return await mercadopago.preferences.create(preference);
    }else{
      return [];
    }
  },
  async user(ctx){
    const {id} = ctx.params;
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.instrumentales.search(ctx.query);
    } else {
      entities = await strapi.services.instrumentales.find(ctx.query);
    }

    return entities.filter((element)=>{
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
  }
};

'use strict';

/**
 * `mercadopagoPreference` policy.
 */
const mercadopago = require('mercadopago');

module.exports = async (ctx, next) => {
  // Add your own logic here.
  console.log('In mercadopagoPreference policy.');

  if(typeof ctx.state.user != 'undefined'){
    if(ctx.state.user.mercadopago){
      await next();
    }else{
      ctx.unauthorized(`Tienes que estar concetado a mercado pago`);
    }
  }else{
    ctx.unauthorized(`Tienes que estar logueado para realizar esta accion`);
  }
};

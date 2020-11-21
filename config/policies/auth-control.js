'use strict';

/**
 * `authControl` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  console.log('In authControl policy.');

  if(typeof ctx.state.user != 'undefined'&& ctx.state.user.role.name == 'Authenticated'){
    await next();
  }else{
    ctx.unauthorized(`Tienes que estar logueado para realizar esta accion`);
  }
};

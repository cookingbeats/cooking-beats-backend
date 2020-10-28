'use strict';

/**
 * `authControl` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  console.log('In authControl policy.');

  if(ctx.state.user.role.name == 'Authenticated'){
    if(typeof ctx.request.body.users_permissions_user != 'undefined' && ctx.state.user.id == ctx.request.body.users_permissions_user){
      await next();
    }else{
      ctx.unauthorized(`Tienes que usar tu id de usuario no el de otro`);
    }
  }else{
    ctx.unauthorized(`Tienes que estar logueado para realizar esta accion`);
  }
};

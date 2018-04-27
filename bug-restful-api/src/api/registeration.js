const provinceRoute = require( './general/province' );
const cityRoute = require( './general/city' );
const organRoute = require( './general/organ' );
const roleRoute = require( './general/role' );

function register( app ){

  app.use( '/api/general/province/', provinceRoute );
  app.use( '/api/general/city/', cityRoute );
  app.use( '/api/general/organ/', organRoute );
  app.use( '/api/general/role/', roleRoute );

}

export default register;
const express = require( 'express' );
const router = express.Router();
import { Sequelize, city } from '../../models';

router.get( '/list', getList );
router.post( '/add', add );

module.exports = router;

function getList( req, res, next ){

  const city_id = req.query[ 'city_id' ];
  const province_id = req.query[ 'province_id' ];
  let clause = {};

  if ( !!city_id ) {
    clause = { where: { city_id } };
  }else if ( !!province_id ) {
    clause = { where: { province_id } };
  }

  city.findAll( clause )
      .then( data =>{
        const list = data.map( x => x.dataValues );
        res.send( list );
      } )
      .catch( err =>{
        next( err )
      } );
}

function add( req, res, next ){

  if ( !req.body.city ) {
    next( { message: 'no data found in request body. body:{modelName:{...fields}}' } );
    return;
  }

  const dataModel = {
    name: req.body.city[ 'name' ] || '',
    province_id: Number( req.body.city[ 'province_id' ] || '0' ),
  };

  city
    .create( dataModel )

    .then( x =>{
      res.json( x );
    } )

    .catch( Sequelize.ValidationError, function ( err ){
      next( { message: err.errors.map( x => x.message ).join( ',' ) } );
    } )

    .catch( next );
}
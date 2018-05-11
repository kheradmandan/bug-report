const express = require( 'express' );
const router = express.Router();
import { Sequelize, organ } from '../../models';

router.get( '/list', getList );
router.post( '/add', add );

module.exports = router;

function getList( req, res, next ){

  const organ_id = req.query[ 'organ_id' ];
  const city_id = req.query[ 'city_id' ];

  let clause = {};

  if ( !!organ_id ) {
    clause = { where: { organ_id } };
  }else if ( !!city_id ) {
    clause = { where: { city_id } };
  }

  organ.findAll( clause )
       .then( data =>{
         const list = data.map( x => x.dataValues );
         res.send( list );
       } )
       .catch( next );
}

function add( req, res, next ){

  if ( !req.body.organ ) {
    next( { message: 'no data found in request body. body:{modelName:{...fields}}' } );
    return;
  }

  const dataModel = {
    name: req.body.organ[ 'name' ] || '',
    city_id: Number( req.body.organ[ 'city_id' ] || '0' ),
  };

  organ
    .create( dataModel )

    .then( x =>{
      res.json( x );
    } )

    .catch( Sequelize.ValidationError, function ( err ){
      next( { message: err.errors.map( x => x.message ).join( ',' ) } );
    } )

    .catch( next );
}
const express = require( 'express' );
const router = express.Router();
import { Sequelize, task } from '../../models';
import { opStatus } from '../../util/common';

router.post( '/create', createTemporary );
router.put( '/update', update );
router.post( '/present', createTemporary );
router.post( '/close', createTemporary );
// router.post( '/permanent', createTemporary );

module.exports = router;


function createTemporary( req, res, next ){

  if ( !req.body.task ) {
    next( { message: 'no data found in request body. body:{modelName:{...fields}}' } );
    return;
  }

  const dataModel = provideFromReq( req );
  dataModel.owner_account_uuid = req.account.account_uuid; // current user
  dataModel.task_uuid = null; // generate at db
  dataModel.op_status_id = opStatus.temp;

  task
    .create( dataModel )

    .then( x =>{
      res.json( x );
    } )

    .catch( next );
}

function update( req, res, next ){

  if ( !req.body.task ) {
    return next( { message: 'no data found in request body. body:{modelName:{...fields}}' } );
  }

  const dataModel = provideFromReq( req );
  dataModel.owner_account_uuid = req.account.account_uuid; // current user
  dataModel.op_status_id = opStatus.temp;

  task
    .findById( dataModel.task_uuid, { attributes: [ 'op_status_id' ] } )

    .then( x =>{

      if ( !x ) {
        return next( { message: `Not record found at task_uuid` } )
      }

      if ( x.op_status_id !== opStatus.temp ) {
        return next( { message: 'Task must be in temp status.' } );
      }

      x
        .updateAttributes( dataModel )

        .then( u =>{
          res.json( u );
        } )

        .catch( next );

    } )

    .catch( next );
}


function provideFromReq( req ){
  return {
    task_uuid: req.body.task[ 'task_uuid' ] || null,
    handler_group_uuid: req.body.task[ 'handler_group_uuid' ],
    organ_id: Number( req.body.task[ 'organ_id' ] || '0' ),
    title: req.body.task[ 'title' ],
    explanation: req.body.task[ 'explanation' ],
    priority: Number( req.body.task[ 'priority' ] || '0' ),
    op_flag_id: Number( req.body.task[ 'op_flag_id' ] || '0' ),
    op_status_id: Number( req.body.task[ 'op_status_id' ] || '0' )
  };
}
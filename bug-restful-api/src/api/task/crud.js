import express from 'express';
import { Sequelize, task } from '../../models';
import { opStatus } from '../../util/common';
import { BodyFormatError, OperationError } from '../../util/errors';


const router = express.Router();
router.post( '/create', createTemporary );
router.put( '/update', update );
router.patch( '/present', present );
router.patch( '/close', createTemporary );

module.exports = router;


function createTemporary( req, res, next ){

  if ( !req.body.task ) {
    return next( new BodyFormatError() );
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
    return next( new BodyFormatError() );
  }


  const dataModel = provideFromReq( req );
  delete dataModel.owner_account_uuid;//= req.account.account_uuid; // current user
  delete dataModel.op_status_id;//= opStatus.temp;

  task
    .findById( dataModel.task_uuid, { attributes: [ 'op_status_id' ] } )

    .then( x =>{

      if ( !x ) {
        return next( new OperationError( 'Not record found at task_uuid' ) );
      }

      if ( x.op_status_id !== opStatus.temp ) {
        return next( new OperationError( 'Task must be in temp status.' ) );
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

function present( req, res, next ){

  if ( !req.body.task ) {
    return next( new BodyFormatError() );
  }

  const task_uuid = req.body.task[ 'task_uuid' ] || null;
  if ( !task_uuid ) {
    return next( new OperationError( 'no task_uuid provided' ) );
  }

  task
    .findById( task_uuid )

    .then( x =>{

      if ( !x ) {
        return next( new OperationError( 'Not record found at task_uuid' ) );
      }

      if ( x.op_status_id !== opStatus.temp ) {
        return next( new OperationError( 'Task must be in temp status.' ) );
      }

      const dataModel = {
        op_status_id: opStatus.active,
      };


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


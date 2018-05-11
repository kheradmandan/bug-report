import { logToFile } from '../common/logger';
import { hierarchy } from '../common';

export default function exceptionLogger( err, req, res, next ){

  const errHierarchy = hierarchy( err );
  const inputDataError = [ 'ValidationError', 'ForeignKeyConstraintError', 'UniqueConstraintError', 'DatabaseError' ];

  if ( inputDataError.includes( errHierarchy[ 0 ] ) || !(err instanceof Error) ) { //sequelize error or mine

    if ( errHierarchy[ 0 ] === 'ValidationError' ) {
      err.message = err.errors.map( x => x.message ).join( ',' );
    }

    next( {
      logId: 0,
      type: errHierarchy,
      message: err.message
    } )

  }else {

    const logId = logToFile( { //log permanent
      message: err.message,
      type: errHierarchy,
      stack: err.stack,
      err,
      req,
      res,
    } );

    console.log( 'errorRespond', 'logId', logId, 'message', err.message, 'hierarchy', errHierarchy );

    // send to next as normal error
    next( {
      logId,
      type: errHierarchy,
      message: req.app.get( 'env' ) === 'development' ? err.message : 'there is something wrong!'
    } );

  }
}

import { logToFile } from '../common/logger';

function exceptionLogger( err, req, res, next ){
  //if there is exception then log it first
  if ( Object.prototype.toString.call( err ) === '[object Error]' ) {
    const logId = logToFile( {
      message: err.message,
      stack: err.stack,
      err,
      req,
      res,
    } );

    console.log( 'errorResponse', 'logId', logId, 'message', err.message );

    // send to next as normal error
    next( {
      logId,
      message: req.app.get( 'env' ) === 'development' ? err.message : 'there is something wrong!'
    } );

  }else {
    next( err );
  }
}


export {
  exceptionLogger,
}
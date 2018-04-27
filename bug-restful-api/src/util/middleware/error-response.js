import {logToFile} from '../common/logger';

function errorResponse( err, req, res, next ){

  let message = err.message;
  let logId = err.logId || '0';
  // we log err in prev middleware and there is must be no err any more!
  if ( Object.prototype.toString.call( err ) === '[object Error]' ) {
    logId += '+' + logToFile( {
      message: err.message,
      stack: err.stack,
      err,
      req,
      res,
    } );
    console.log( 'errorResponse', 'logId', logId, 'message', err.message );
    console.log( 'there is an error on logger middleware', err );
    message = req.app.get( 'env' ) === 'development' ? err.message : 'there is something wrong!';
  }

  res.status( 500 ).send( { logId, message } );
}

export {
  errorResponse
}
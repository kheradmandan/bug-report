const myMessage = 'Base on your data, operation failed';

export default class OperationFailed extends Error {
  constructor( message = myMessage, status = 405, ...params ){
    super( message, ...params );

    if ( Error.captureStackTrace ) {
      Error.captureStackTrace( this, OperationFailed );
    }

    this.name = 'operation-failed';
    this.status = status;
    this.date = new Date();
  }
}


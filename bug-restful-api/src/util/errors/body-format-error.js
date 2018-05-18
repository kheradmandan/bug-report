const myMessage = 'invalid request body. Try this format " body: { modelName: { ...fields } } "';

export default class InvalidBodyFormat extends Error {
  constructor(  message = myMessage, status = 405,...params ){
    super( message, ...params );

    if ( Error.captureStackTrace ) {
      Error.captureStackTrace( this, InvalidBodyFormat );
    }

    this.name = 'invalid-body-format';
    this.status = status;
    this.date = new Date();
  }
}


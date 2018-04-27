import jwt from 'jsonwebtoken';
import { secretKey } from '../config';

export default function ( req, res, next ){
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split( ' ' )[ 0 ] === 'JWT' ) {
    jwt.verify( req.headers.authorization.split( ' ' )[ 1 ], secretKey, ( err, decode ) =>{
      // console.log( 'jwt-verify', '>>err', err, '>>decode', decode );
      if ( err ) {
        req.account = undefined;
      }else {
        // decode.account_id = decode.id;
        req.account = decode;
      }
      next();
    } );

  }else {
    req.account = undefined;
    next();
  }
}
export default function loginRequired( req, res, next ){
  if ( req.account ) {
    return next();
  }else {
    res.status( 401 ).json( { logId: -1, message: 'unauthorized account' } );
  }
}
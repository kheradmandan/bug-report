export default function loginRequired( req, res, next ){
  if ( req.account ) {
    return next();
  }else {
    res.status( 403 ).json( { logId: -1, message: 'unauthorized account' } );
  }
}
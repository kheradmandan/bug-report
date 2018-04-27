const express = require( 'express' );
const router = express.Router();
import { Sequelize, organ, sequelize } from '../../data-access/db';

router.get( '/list', getList );
// router.post( '/add', add );

module.exports = router;

function getList( req, res, next ){

  const account_id = req.account.account_id;
  const organ_id = req.query[ 'organ_id' ];
  const group_id = req.query[ 'group_id' ];

  let query = 'SELECT * FROM v_account_role WHERE account_id = :account_id';

  if ( !!organ_id ) {
    query += ' AND organ_id = :organ_id';

  }else if ( !!group_id ) {
    query += ' AND group_id = :group_id';

  }else {
    return next( { message: 'not specified organ_id neither group_id.' } );
  }

  sequelize
    .query( query, {
      replacements: { account_id, organ_id, group_id },
      type: sequelize.QueryTypes.SELECT,
    } )

    .then( data =>{
      res.send( data );
    } )

    .catch( next );
}


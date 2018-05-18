import crypto from 'crypto';
import SecureStringify from '../../util/common/secure-stringify';

export {
  generateTaskHistory
}

function generateTaskHistory( task, account_uuid ){

  task.history = task.history || '[]';
  task.hashValue = '';
  const history = JSON.parse( task.history );

  let record = {
    serial: history.length,
    task,
    account_uuid,
    when: new Date(),
    hashValuePrev: task.hashValue
  };

  if ( history.length > 0 ) {//pre hash
    record.hashValuePrev = history[ history.length - 1 ].task.hashValue
  }

  const currentHashValue = doHash( record ); //make new hash
  task.hashValue = currentHashValue;
  record.hashValue = currentHashValue;

  history.push( record );

  return SecureStringify( history );
}

function doHash( record ){
  const recordStr = SecureStringify( record, 0 );
  return crypto.createHash( 'md5' )
               .update( recordStr )
               .digest( 'hex' );
}
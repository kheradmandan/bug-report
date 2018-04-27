import fs from 'fs';
import secureStringify from './secure-stringify';
import { logDirectory } from '../config';

function logToFile( obj ){

  const path = logDirectory;// '/var/bug-report-log/';
  const logFileName = new Date().getTime().toString();

  let content = secureStringify( obj );

  fs.writeFile( path + logFileName + '.log.txt', content, function ( err ){
    if ( !!err ) {
      console.log( 'logToFile-error on write to file', err )
    }
  } );
  return logFileName;
}


export {
  logToFile
}
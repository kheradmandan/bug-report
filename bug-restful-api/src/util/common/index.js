const opStatus = {
  'temp': 0,
  'active': 1,
  'closed': 2,
  'removed': 3
};

function hierarchy( obj ){

  const names = [];
  (function p( inst ){
    if ( inst !== null ) {
      const ofProto = Object.getPrototypeOf( inst );
      if ( ofProto !== null ) {
        names.push( ofProto.constructor.name );
        p( ofProto );
      }
    }
  })( obj );

  return names;
}


export {
  hierarchy,
  opStatus
}
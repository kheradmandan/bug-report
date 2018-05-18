import { generateTaskHistory } from '../../../src/util/hashing/hash-task';
import { expect } from 'chai';


describe( 'generateTaskHistory', () =>{

  it( 'chain history is ok', () =>{
    const task = {
      title: 'something',
      description: 'something else',
      history: `[
  {
    "serial": 0,
    "task": {
      "title": "something",
      "description": "something else",
      "history": "[]",
      "hashValue": "a10a7c673fc70bbb895b1035c3f3a117"
    },
    "when": "2018-05-18T14:54:48.454Z",
    "hashValuePrev": "",
    "hashValue": "a10a7c673fc70bbb895b1035c3f3a117"
  }
]`
    };

    const hhh = generateTaskHistory( task );
    expect( hhh ).to.equal( '' );
  } );


  it( 'It will does with empty object', () =>{
    const task = {
      title: 'something',
      description: 'something else'
    };

    const hhh = generateTaskHistory( task );
    expect( hhh ).to.not.equal( '' );
  } );


} );
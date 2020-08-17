// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const todo = require( './modules/todo.route' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( '/todo', todo )
// gobals
const port = 5000;
// spin up server
app.listen( port, ()=>{
    console.log( 'server up:',  port );
}) //end server up



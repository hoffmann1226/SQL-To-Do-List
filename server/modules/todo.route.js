// requires
const express = require( 'express' );
const router = express.Router();
const pool = require( './pool' );
// routes


//POST ROUTE WHEN TASKS ARE ADDED
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
    let queryText = `INSERT INTO "tasks" ("task") VALUES ($1);`;
    pool.query(queryText, [newTask.task])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });// end /todo POST ROUTE, "Create" in CRUD

//GET ROUTE TO DISPLAY ALL TASKS TO DOM
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks"`;
    pool.query(queryText)
      .then(result => {
        res.send(result.rows);
      })
      .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
      });
  });// end /todo GET ROUTE, "Read" in CRUD

//DELETE ROUTE
router.delete( '/:index' , ( req, res )=>{
    console.log( '/todo DELETE hit:', req.params.index );
    let queryString = `DELETE FROM "tasks" WHERE "id"=${ req.params.index };`;
    pool.query( queryString ).then( ( results )=>{
        res.send( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.send( 500 );
    })
}) // end /todo DELETE ROUTE, "Delete" in CRUD

//PUT ROUTE TO CHANGE TASKS TO COMPLETED ON THE DOM
router.put( '/:id', (req, res)=>{
    console.log( '/todo PUT:', req.params.id);
    // update first name of the bird with this ID
    const queryString = `UPDATE "tasks" SET "status"='true' WHERE id=${ req.params.id };`;
    pool.query( queryString ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
}) // end /todo PUT, UPDATE query, "Update" in CRUD

// export
module.exports = router;
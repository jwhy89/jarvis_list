const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for GalleryList
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "stuff"."id", "stuff"."name" AS "stuff_name", "stuff"."description", "stuff"."quantity", 
               "quantity_type"."type" AS "type", "physical_or_digital"."physical_state", "stuff"."last_used", "status"."status", "stuff"."active"
                FROM "stuff"
                JOIN "physical_or_digital" ON "stuff"."physical_or_digital_id" = "physical_or_digital"."id"
                JOIN "quantity_type" ON "stuff"."quantity_type_id" =  "quantity_type"."id"
                JOIN "user" ON "stuff"."user_id" = "user"."id"
                JOIN "status" ON "stuff"."status_id" =  "status"."id" 
                WHERE "stuff"."user_id" = $1
                ORDER BY "stuff"."name" ASC;`, [req.user.id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for stuff:', error);
            res.sendStatus(500);
        });
});

router.get('/pd', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "physical_or_digital" ORDER BY "id";`;
    pool.query(queryText)
      .then((result) => { 
          res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error getting pd data', err);
        res.sendStatus(500);
      });
});

router.get('/status', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "status" ORDER BY "id";`;
    pool.query(queryText)
      .then((result) => { 
          res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error getting status data', err);
        res.sendStatus(500);
      });
});

router.get('/type', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "quantity_type" ORDER BY "id";`;
    pool.query(queryText)
      .then((result) => { 
          res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error getting type data', err);
        res.sendStatus(500);
      });
});
/**
 * POST route for adding new stuff for database
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const newStuff = req.body;
    const user_id = req.user.id;
    const queryText = `INSERT INTO stuff ("name", "description", "last_used", "price", "image_url", "quantity", 
                      "physical_or_digital_id", "quantity_type_id", "status_id", "active", "user_id")
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    pool.query(queryText, [newStuff.name,
        newStuff.description,
        newStuff.last_used,
        newStuff.price,
        newStuff.image_url,
        newStuff.quantity,
        newStuff.physical_or_digital_id,
        newStuff.quantity_type_id,
        newStuff.status_id,
        newStuff.active,
        user_id])
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing ADD stuff query', err);
            res.sendStatus(500);
        });
});

// DELETE route for stuff
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(`Deleting stuff with id=${id}`);
    const queryText = 'DELETE FROM "stuff" WHERE id =$1';
    pool.query(queryText, [id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('there is an error in deleting your stuff', err);
            res.sendStatus(500);
        });
});

module.exports = router;
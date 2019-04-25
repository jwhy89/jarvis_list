const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for GalleryList
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "stuff"."id", "stuff"."name" AS "stuff_name", "stuff"."description", "stuff"."quantity", "quantity_type"."type" AS "type", "physical_or_digital"."physical_state", "stuff"."last_used", "status"."status", "stuff"."active"
    FROM "stuff"
    JOIN "physical_or_digital" ON "stuff"."physical_or_digital_id" = "physical_or_digital"."id"
    JOIN "quantity_type" ON "stuff"."quantity_type_id" =  "quantity_type"."id"
    JOIN "user" ON "stuff"."user_id" = "user"."id"
    JOIN "status" ON "stuff"."staus_id" =  "status"."id" 
    WHERE "stuff"."user_id" = $1
    ORDER BY "stuff"."name" ASC;`, [req.user.id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for stuff:', error);
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

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
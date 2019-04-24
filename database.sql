-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "timestamp" TIMESTAMP default current_timestamp
);

-- table for physical state of stuff
CREATE TABLE "physical_or_digital" (
    "id" SERIAL PRIMARY KEY,
    "physical_state" VARCHAR (80) NOT NULL
);

-- table for donate, keep, sell, store, toss
CREATE TABLE "status" (
    "id" SERIAL PRIMARY KEY,
    "status" VARCHAR (80) NOT NULL
);

-- table for quantity type, e.g. piece, bundle, container, quart
CREATE TABLE "quantity_type" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR (80) NOT NULL
);

-- initial table for Google Maps API
CREATE TABLE "location" (
    "id" SERIAL PRIMARY KEY,
    "lat" NUMERIC,
    "lng" NUMERIC,
    "description" VARCHAR (200)
);

-- table for list of stuff
CREATE TABLE "stuff" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR (80),
"description" VARCHAR (2500),
"last_used" DATE,
"price" MONEY,
"image_url" varchar (2500),
"quantity" NUMERIC(8, 2),
"physical_or_digital_id" INT REFERENCES "physical_or_digital",
"physical_location_id" INT REFERENCES "location",
"quantity_type_id" INT REFERENCES "quantity_type",
"user_id" INT REFERENCES "user" NOT NULL,
"staus_id" INT REFERENCES "status",
"active" boolean
);


-- set up set variables
INSERT INTO "status" ("status") 
VALUES ('Donate'),
		('Keep'),
		('Sell'),
		('Store'),
		('Toss');
		
INSERT INTO "physical_or_digital" ("physical_state") 
VALUES ('physical'), 
		('digital');
		
INSERT INTO "quantity_type" ("type") 
VALUES ('unit'), 
		('piece'),
		('bundle'),
		('container'),
		('quart');
		
-- TEST DATA
INSERT INTO "stuff" ("name", "description", "last_used", "price", "image_url", "quantity", "physical_or_digital_id", "physical_location_id", "quantity_type_id", "user_id", "staus_id", "active")
Values ('Harusame', 'Sword of Light: personal sword of Amidamaru and later the main medium used for Over Soul', '04-22-2019', null, null, 1, 1, null, 2, 1, 2, true);

INSERT INTO "stuff" ("name", "description", "last_used", "price", "image_url", "quantity", "physical_or_digital_id", "physical_location_id", "quantity_type_id", "user_id", "staus_id", "active")
Values ('Antiquity', 'Futsunomitama no Tsurugi; the Futsunomitama Sword', '04-22-2019', null, null, 1, 1, null, 2, 1, 2, true);

-- GET REQUEST
SELECT "stuff"."id", "stuff"."name" AS "stuff_name", "stuff"."description", "stuff"."quantity", "quantity_type"."type" AS "type", "physical_or_digital"."physical_state", "stuff"."last_used", "status"."status", "stuff"."active"
FROM "stuff"
JOIN "physical_or_digital" ON "stuff"."physical_or_digital_id" = "physical_or_digital"."id"
JOIN "quantity_type" ON "stuff"."quantity_type_id" =  "quantity_type"."id"
JOIN "user" ON "stuff"."user_id" = "user"."id"
JOIN "status" ON "stuff"."staus_id" =  "status"."id" 
WHERE "stuff"."user_id" = $1
ORDER BY "stuff"."name" ASC;


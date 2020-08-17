-- MAKE DATABASE "weekend-to-do-app"

-- MAKE TABLE
CREATE TABLE "tasks"(
    "id" serial primary key,
    "task" varchar (100) not null,
    "status" boolean default 'False'
);

-- SELECT ALL TASKS
SELECT * FROM "tasks";

-- ADD NEW TASKS
INSERT INTO "tasks" ("task") VALUES ('Complete weekend assignment');
INSERT INTO "tasks" ("task") VALUES ('Workout');
INSERT INTO "tasks" ("task") VALUES ('Pack bags');
INSERT INTO "tasks" ("task") VALUES ('Go fishing');

-- TO DELETE A TASK USE THIS:
DELETE FROM "tasks" WHERE "id" = 1;

--TO UPDATE A TASK USE THIS:
UPDATE "tasks" SET "status"='false' WHERE id=4;
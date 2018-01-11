CREATE TABLE IF NOT EXISTS "company_types" (
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(50),
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "user_roles" (
  "id" SERIAL PRIMARY KEY,
  "role" VARCHAR(50),
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "event_comments" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "event_id" INTEGER,
  "content" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "events" (
  "id" SERIAL PRIMARY KEY,
  "creator_id" INTEGER,
  "type_id" INTEGER,
  "city_id" INTEGER,
  "title" VARCHAR(100),
  "description" TEXT,
  "image" TEXT,
  "keyword" VARCHAR(50),
  "start_date" DATE,
  "end_date" DATE,
  "start_time" time,
  "end_time" time,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "cities" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "image" TEXT,
  "tagline" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "jobs" (
  "id" SERIAL PRIMARY KEY,
  "city_id" INTEGER,
  "company_id" INTEGER,
  "title" VARCHAR(255),
  "description" TEXT,
  "url" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "post_comments" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "post_id" INTEGER,
  "content" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "companies" (
  "id" SERIAL PRIMARY KEY,
  "type_id" INTEGER,
  "name" VARCHAR(255),
  "description" TEXT,
  "image" TEXT,
  "url" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "posts" (
  "id" SERIAL PRIMARY KEY,
  "forum_id" INTEGER,
  "user_id" INTEGER,
  "header" VARCHAR(1000),
  "content" TEXT, 
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "role_id" INTEGER,
  "first_name" VARCHAR(50),
  "last_name" VARCHAR(50),
  "email" VARCHAR(100),
  "password" VARCHAR(25),
  "bio" TEXT,
  "image" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "forums" (
  "id" SERIAL PRIMARY KEY,
  "city_id" INTEGER,
  "user_id" INTEGER,
  "name" VARCHAR(50),
  "subject" VARCHAR(100),
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "event_types" (
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(50),
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "event_attendees" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "event_id" INTEGER,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "users_cities" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "city_id" INTEGER,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "city_companies" (
  "id" SERIAL PRIMARY KEY,
  "city_id" INTEGER,
  "company_id" INTEGER,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "programs" (
  "id" SERIAL PRIMARY KEY,
  "school_id" INTEGER,
  "name" VARCHAR(255),
  "description" TEXT,
  "url" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "school_types" (
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(255),
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "schools" (
  "id" SERIAL PRIMARY KEY,
  "type-id" INTEGER,
  "name" VARCHAR(255),
  "description" TEXT,
  "image" TEXT,
  "url" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS "city_schools" (
  "id" SERIAL PRIMARY KEY,
  "city_id" INTEGER,
  "school_id" INTEGER,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp
);
1. In your .env file add the following variables

DB_HOST=localhost
DB_USER= 'your username here'
DB_PASS= 'your password here'
DB_NAME=techcity
DB_PORT=5432

2. On your local machine, create a psql database called 'techcity'

3. Create a superuser for the database with your chosen username and password

4. psql techcity < db/schema.sql                 (creates all db tables)

5. npm run knex seed:run                         (adds two cities to the cities table)

6. npm start to boot up app.

7. Send a get request to localhost:5000/api/v1/users

8. Check to make sure that the server responds with a JSON object containing two cities (Vancouver and Mountainview).

9. If it does, your db is connected. If not, you did something wrong. Or my instructions are wrong... Either way come see me.
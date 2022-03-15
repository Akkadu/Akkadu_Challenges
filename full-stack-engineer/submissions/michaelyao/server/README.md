Backend:

1. Create database
Create an postgres databse named `product_review_staing`

2. Install backend libs
`npm run install`

3. Migrate database schema
Update the database url information of `development case` in `ormconfig.js` file in root directory.
`npm run typeorm migration:run`

4. Star the backend app
`npm run start:dev`

5. You can check the API endpoints by import `Product Reivew API.postman_collection` under current directory in Postman
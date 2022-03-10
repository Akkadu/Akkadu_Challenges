# Michael Yao Submission

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

Frontend:

1. Install fontend libs
`npm run install`

2. Star the frontend app
`npm run start`

Tip:
Here is how you can add product

1. After sign up the user, you can update `admin` of the value in database to `true` to become the admin and use postman to sign in as an admin to add. You can find the postman collection in the root directory. And please set the `APP_URL` to `http://localhost:3000/api/v1` in collection's environment
2. Add data in database directly
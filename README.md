# How to use JWT and Nodejs to enhance app security

Express REST API with authentication and authorization

Here are the endpoints
-   `/API/users GET`: Get all users (`PROTECTED`)
-   `/API/users POST`: Register a new user
-   `/API/users/{ID} DELETE`: Delete a specific user (`PROTECTED`)
-   `/API/users/{ID} PATCH`: Update a specific user (`PROTECTED`)
-   `/API/users/{ID} GET`: Get a specific user (`PROTECTED`)
-   `/API/auth/login POST`: Log in a user
-   `/API/auth/change-password POST`: Changes the password for a user (`PROTECTED`)

The `PROTECTED` endpoints require an `Authorization: Bearer <Token>` header.

In case you are cloning/forking it, the project is fully functional and works by using the following command:

```bash
npm i && node index.js
```

Before running it, it's necessary to configure a .env file. To do so, please refer to [this section](#configure-the-api-environment) of the **README**.

## Configure the API Environment

This project will use system environment values within our code. To that end, we’ll create a new configuration file, `src/config/index.js`, that retrieves environment variables from the operating system, making them available to our code:
Your `.env` file should look something like the [example](./.env.example) provided in our repository. With the basic API configuration complete, we now move into setting up the database.

## Setting up Database
In case you don't have PostgreSQL installed, download it [here](https://www.postgresql.org/download/) and install it.
After correct installation and setup of the password, create a database `JWT` or a name of your choice which should be included in your `.env` file.


We will not be creating the queries because we're using [sequelize](https://sequelize.org/docs/v6/) to generate the queries.

## Custom Error Handling

We are using the Express framework for our API. Express does not support proper error handling with asynchronous handlers. Specifically, Express doesn't catch promise rejections from within asynchronous handlers. To catch those rejections, an error-handling wrapper function has been created in `src/middleware/asyncHandler.js`.

## Authorization Hooks

We want each of our API endpoints to be secure. We can add this security by creating a common JWT validation and role authentication hook that we can add to each of our handlers. These hooks have been implemented into middleware.

The middleware to validate incoming JWT tokens is in the `src/middleware/checkJwt.js` file.
The JWT authorization `src/middleware/checkRole.js` to validate the roles.

## JWT and Node.js Testing

In order to test our API, it needs to be running. Start our project up.

```bash
node index.js
```

We'll use [Postman](https://www.postman.com/downloads/) to test our API. Please ensure it is installed.

Within Postman, we need to create two requests: one for authenticating a user, and another to use the returned JWT to make a call against one of our API's endpoints. Let's create the authentication request:

1. Create a new POST request for user authentication.
2. Name this request "JWT Node.js Authentication". 
3. Set the request's address to `localhost: YOUR SERVER PORT NUMBER /API/auth/login`.
4. Set the body type to raw and `JSON`.
5. Update the body to contain this JSON value:
    ```json
    {
        "email": "example@gmail.com",
        "password": "1234AAA"
    }
    ```
6. Run the request in Postman.
7. Save the return JWT information for our next call.

Now that we have a JWT for our test user, we'll create another request to test one of our endpoints to get the available USER records:

1. Create a new GET request for user authentication.
2. Name this request "JWT Node.js Get Users". 
3. Set the request's address to `localhost: YOUR SERVER PORT NUMBER/API/users`.
4. On the request's authorization tab, set the type to "Bearer Token".
5. Copy the return JWT from our previous request into the "Token" field on this tab.
6. Run the request in Postman.
7. View the user list returned by our API.

Obviously, this is just one test of our API, but the same pattern may be followed to fully explore the API calls and test our authorization logic.

To easily test the API, we provide a Postman collection with example requests that anyone can try.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17051991-d520f5b0-748b-4bf9-b506-6ab1daf542c7?action=collection%2Ffork&collection-url=entityId%3D17051991-d520f5b0-748b-4bf9-b506-6ab1daf542c7%26entityType%3Dcollection%26workspaceId%3D1ff03695-0923-4c9c-a217-2fd2f17f0c11)

# Postman: What you need to know for your project

## Getting Started

* [Postman tutorial](https://www.guru99.com/postman-tutorial.html)
* [Postman docs](https://learning.postman.com/docs/getting-started/sending-the-first-request/)

## Free Online HTTP Test Services (to play around)

* [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
* [Postman Echo](https://docs.postman-echo.com/)

## Import a Test Collection

1. File > Import ...

    ![Postman import](./img/postman_import.png)

2. Choose file [tests/server.postman_collection.json](../tests/server.postman_collection.json)

    ![Postman choose file](./img/postman_choose.png)

## Run a Test Collection

1. Create a new empty environment in Postman in the top right corner via `Add`

    ![Postman new environment](./img/postman_env.png)

2. Start your backend server in the terminal via `npm run dev`
3. Run the collection

    ![Postman run collection](./img/postman_run.png)

4. Select your empty environment and click `Run server`

    ![Postman collection runner](./img/postman_runner.png)

## Export Test Collection

1. In the extended menu `...` of your collection, click `Export`

    ![Postman export button](./img/postman_export.png)

2. Choose the latest export format (v2.1)

    ![Postman export format](./img/postman_export_format.png)

3. *Overwrite* the file [tests/server.postman_collection.json](../tests/server.postman_collection.json)

    ![Postman overwrite file](./img/postman_export_save.png)

4. Run `npm test` in your terminal

    ![Postman run tests](./img/test_run.png)

## Test script assertions

* [Test script examples](https://learning.postman.com/docs/writing-scripts/script-references/test-examples/)

## Chaining Requests via Postman Variables

> Make sure your test collection works on an empty database!

Whenever you create an object that you want to use later (e.g., to retrieve, update, delete), you need to save its `_id` to a Postman environment variable for later re-use:

1. Save the `_id` of created objects for later request via `pm.environment.set("camel_id", jsonData._id);`

    ![Postman save id](./img/postman_variable_save.png)

2. Use variables in *later* requests in Postman via `{{camel_id}}` or in Postman scripts or via `pm.variables.get("camel_id");`

    ![Postman use variable](./img/postman_variable_use.png)

Check out the following documentation for more info:

* [Extracting data from responses and chaining requests](http://blog.getpostman.com/2014/01/27/extracting-data-from-responses-and-chaining-requests/)
  * NOTE: Uses the deprecated environment variable syntax. Replace `postman.setEnvironmentVariable(...)` with `pm.environment.set(...)`
* [Example in the express-rest-api tutorial used in the lecture](https://git.chalmers.se/courses/dit341/express-rest-api)
* [Postman detailed docs about variables](https://learning.postman.com/docs/sending-requests/variables/)

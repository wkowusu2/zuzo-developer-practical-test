# ZuZo Developer Practical Test

**Duration: 20 Minutes**

The development environment has already been prepared for you. You do not need to install or configure anything.

To start the server, run:

```
npm start
```

The server will start on port 3000.

## Assessment

Build a simple REST API for managing ZuZo's internal tasks.

### Requirements

* A task should contain `id`, `title`, and `status`.
* Status can only be `Pending` or `Completed`.
* Implement `POST /api/tasks`.
* Implement `GET /api/tasks`.
* Implement `PATCH /api/tasks/:id`.
* A task cannot be created without a title.
* Return an appropriate error when a task ID does not exist.
* Return responses in JSON.
* Use appropriate HTTP status codes.
* Keep the code reasonably structured and readable.

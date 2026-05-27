14th May '26, 09:26pm (Incorrect)

Status: #Completed #ProperNotes

Tags: [[JavaScript]] [[Web Dev]] [[Programming languages]]

# Introduction to Requests with ES6

There are many types of HTTP requests. The four most commonly used types of HTTP requests are GET, POST, PUT, and DELETE. In this lesson, we’ll cover GET and POST requests.

With a GET request, we’re retrieving, or getting, information from some source (usually a website). For a POST request, we’re posting information to a source that will process the information and send it back.

JavaScript uses an event loop to handle asynchronous function calls. When a program is run, function calls are made and added to a stack. The functions that make requests that need to wait for servers to respond then get sent to a separate queue. Once the stack has cleared, then the functions in the queue are executed.

Web developers use the event loop to create a smoother browsing experience by deciding when to call functions and how to handle asynchronous events. We will go into event loops in more detail in the Concurrency Model and Event Loop in JavaScript article.

To make asynchronous event handling easier, promises were introduced in ES6 JavaScript.

## Intro to GET Requests using Fetch

The first type of requests we’re going to tackle is GET requests using `fetch()`.

The `fetch()` function:

- Creates a request object that contains relevant information that an API needs.
- Sends that request object to the API endpoint provided.
- Returns a promise that ultimately resolves to a response object, which contains the status of the promise with information the API sent back.

Let’s walk through the boilerplate code to the right for using `fetch()` to create a GET request step by step.

First, call the `fetch()` function and pass it a URL as a string for the first argument, determining the endpoint of the request.

```javascript
fetch('<https://api-to-call.com/endpoint>')
```

The.`then()` method is chained at the end of the `fetch()` function and in its first argument, the response of the GET request is passed to the callback arrow function. The .`then()` method will fire only after the promise status of `fetch()` has been resolved.

Inside the callback function, the `ok` property of the `response` object returns a Boolean value. If there are no errors, `response.ok` will be true and the code will return `response.json()`.

If `response.ok` is a falsy value, our code will throw an error.

```javascript
throw new Error('Request failed!');
```

A second argument passed to .`then()` will be another arrow function that will be triggered when the promise is rejected. It takes a single parameter, `networkError`. This object logs the `networkError` if we could not reach the endpoint at all (e.g., the server is down).

A second .`then()` method will run after the previous .`then()` method has finished running without error. It takes `jsonResponse`, which contains the returned `response.json()` object from the previous .`then()` method, as its parameter and can now be handled, however we may choose.

## Intro to POST Requests using Fetch

Take a look at the diagram to the right. It has the boilerplate code for a POST request using `fetch()`.

Notice that the `fetch()` call takes two arguments: an endpoint and an object that contains information needed for the POST request.

The object passed to the `fetch()` function as its second argument contains two properties: `method`, with a value of `'POST'`, and `body`, with a value of `JSON.stringify({id: '200'});`. This second argument determines that this request is a POST request and what information will be sent to the API.

A successful POST request will return a response body, which will vary depending on how the API is set up.

The rest of the request is identical to the GET request. A `.then()` method is chained to the `fetch()` function to check and return the `response` as well as throw an exception when a network error is encountered. A second `.then()` method is added on so that we can use the response however we may choose.

## Intro to async GET Requests

In the following exercises, we’re going to take what we’ve learned about chaining Promises and make it simpler using functionality introduced in ES8: `async` and `await`. You read that right, you did the hard part already. Now it’s time to make it easier.

The structure for this request will be slightly different. We will use the new keywords `async` and `await`, as well as the `try` and `catch` statements.

Take a look at the diagram on the right.

Here are some key points to keep in mind as we walk through the code:

- The `async` keyword is used to declare an `async` function that returns a promise.
- The `await` keyword can only be used within an `async` function. `await` suspends the program while waiting for a promise to resolve.
- In a `try...catch` statement, code in the `try` block will be run and in the event of an exception, the code in the `catch` statement will run.

Study the `async` `getData()` function to the right to see how the request can be written using `async` and `await`.

## Intro to async POST Requests

Now that you’ve made an `async` GET request, let’s start getting familiar with the `async` POST request.

As we’ve seen before, a POST request requires more information. Take a look at the diagram to the right.

We still have the same structure of using `try` and `catch` as the `async` GET request we just learned about. But, in the `fetch()` call, we now have to include an additional argument that contains more information like `method` and `body`.

The `method` property value is set to `'POST'` to specify the type of request we are making. Then we have to include a `body` property with the value of `JSON.stringify({id: 200})`.

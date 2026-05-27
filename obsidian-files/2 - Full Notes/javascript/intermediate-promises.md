14th May '26, 09:26pm (Incorrect)

Status: #Completed #ProperNotes

Tags: [[JavaScript]] [[Web Dev]] [[Programming languages]]

# Introduction

Promises are objects that represent the eventual outcome of an asynchronous operation. A Promise object can be in one of three states:

- *Pending*: The initial state— the operation has not completed yet.
- *Fulfilled*: The operation has completed successfully and the promise now has a resolved value. For example, a request’s promise might resolve with a JSON object as its value.
- *Rejected*: The operation has failed and the promise has a reason for the failure. This reason is usually an Error of some kind.

We refer to a promise as settled if it is no longer pending— it is either fulfilled or rejected

All promises eventually settle, enabling us to write logic for what to do if the promise fulfills or if it rejects.

Let’s construct a promise! To create a new Promise object, we use the new keyword and the Promise constructor method:

```javascript
const executorFunction = (resolve, reject) => { };
const myFirstPromise = new Promise(executorFunction);
```

The Promise constructor method takes a function parameter called the executor function which runs automatically when the constructor is called. The executor function generally starts an asynchronous operation and dictates how the promise should be settled.

The executor function has two function parameters, usually referred to as the `resolve()` and `reject()` functions. The `resolve()` and `reject()` functions aren’t defined by the programmer. When the Promise constructor runs, JavaScript will pass its own `resolve()` and `reject()` functions into the executor function.

- resolve is a function with one argument. Under the hood, if invoked, `resolve()` will change the promise’s status from pending to fulfilled, and the promise’s resolved value will be set to the argument passed into `resolve()`.
- reject is a function that takes a reason or error as an argument. Under the hood, if invoked, `reject()` will change the promise’s status from pending to rejected, and the promise’s rejection reason will be set to the argument passed into `reject()`.

Let’s look at an example executor function in a Promise constructor:

```javascript
const executorFunction = (resolve, reject) => {
 if (someCondition) {
     resolve('I resolved!');
 } else {
     reject('I rejected!'); 
 }
}
const myFirstPromise = new Promise(executorFunction);
```

## The Node setTimeout() Function

Knowing how to construct a promise is useful, but most of the time, knowing how to consume, or use, promises will be key. Rather than constructing promises, you’ll be handling Promise objects returned to you as the result of an asynchronous operation. These promises will start off pending but settle eventually.

Moving forward, we’ll be simulating this by providing you with functions that return promises which settle after some time. To accomplish this, we’ll be using `setTimeout()`. `setTimeout()` is a Node API (a comparable API is provided by web browsers) that uses callback functions to schedule tasks to be performed after a delay. `setTimeout()` has two parameters: a callback function and a delay in milliseconds.

```javascript
const delayedHello = () => {
  console.log('Hi! This is an asynchronous greeting!');
};

setTimeout(delayedHello, 2000);
```

Here, we invoke `setTimeout()` with the callback function `delayedHello()` and 2000. In at least two seconds `delayedHello()` will be invoked. But why is it “at least” two seconds and not exactly two seconds?

This delay is performed asynchronously—the rest of our program won’t stop executing during the delay. Asynchronous JavaScript uses something called the event-loop. After two seconds, `delayedHello()` is added to a line of code waiting to be run. Before it can run, any synchronous code from the program will run. Next, any code in front of it in the line will run. This means it might be more than two seconds before `delayedHello()` is actually executed.

## Consuming Promises

The initial state of an asynchronous promise is pending, but we have a guarantee that it will settle. How do we tell the computer what should happen then? Promise objects come with an aptly named `.then()` method. It allows us to say, “I have a promise, when it settles, then here’s what I want to happen…”.

`.then()` is a higher-order function— it takes two callback functions as arguments. We refer to these callbacks as handlers. When the promise settles, the appropriate handler will be invoked with that settled value.

- The first handler, sometimes called onFulfilled, is a success handler, and it should contain the logic for the promise resolving.
- The second handler, sometimes called onRejected, is a failure handler, and it should contain the logic for the promise rejecting.

We can invoke `.then()` with one, both, or neither handler! This allows for flexibility, but it can also make for tricky debugging. If the appropriate handler is not provided, instead of throwing an error, `.then()` will just return a promise with the same settled value as the promise it was called on. One important feature of `.then()` is that it always returns a promise.

### Success and Failure Callback Functions

To handle a “successful” promise, or a promise that resolved, we invoke .then() on the promise, passing in a success handler callback function:

```javascript
const prom = new Promise((resolve, reject) => {
  resolve('Yay!');
});

const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

prom.then(handleSuccess); // Prints: 'Yay!'
```

When the promise settles, it will invoke the “successful” handler— handleSuccess() in this case. If a promise resolves, handleSuccess()’s `resolvedValue` parameter will contain the result given to the `resolve` method. In this case, it will be the string 'Yay!'.

With typical promise consumption, we won’t know whether a promise will resolve or reject, so we’ll need to provide the logic for either case. We can pass both a success callback and a failure callback to .then().

```javascript
let prom = new Promise((resolve, reject) => {
  let num = Math.random();
  if (num < .5 ){
    resolve('Yay!');
  } else {
    reject('Ohhh noooo!');
  }
});

const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectionReason) => {
  console.log(rejectionReason);
};

prom.then(handleSuccess, handleFailure);
```

Note: The success callback is sometimes called the “success handler function” or the `onFulfilled` function. The failure callback is sometimes called the “failure handler function” or the `onRejected` function.

## Using catch() with Promises

One way to write cleaner code is to follow a principle called separation of concerns. Separation of concerns means organizing code into distinct sections each handling a specific task. It enables us to quickly navigate our code and know where to look if something isn’t working.

Remember, `.then()` will return a promise with the same settled value as the promise it was called on if no appropriate handler was provided. This implementation allows us to separate our resolved logic from our rejected logic. Instead of passing both handlers into one `.then()`, we can chain a second `.then()` with a failure handler to a first `.then()` with a success handler and both cases will be handled.

```javascript
prom
 .then((resolvedValue) => {
   console.log(resolvedValue);
 })
 .then(null, (rejectionReason) => {
   console.log(rejectionReason);
 });
```

Since JavaScript doesn’t mind whitespace, we follow a common convention of putting each part of this chain on a new line to make it easier to read. To create even more readable code, we can use a different promise function: `.catch()`.

The `.catch()` function takes only one argument, onRejected. In the case of a rejected promise, this failure handler will be invoked with the reason for rejection. Using `.catch()` accomplishes the same thing as using a `.then()` with only a failure handler.

Let’s look at an example using `.catch()`:

```javascript
prom
 .then((resolvedValue) => {
   console.log(resolvedValue);
 })
 .catch((rejectionReason) => {
   console.log(rejectionReason);
 });
```

## Chaining Multiple Promises

One common pattern we’ll see with asynchronous programming is multiple operations which depend on each other to execute or that must be executed in a certain order. We might make one request to a database and use the data returned to us to make another request and so on!

This process of chaining promises together is called composition. Promises are designed with composition in mind! Here’s a simple promise chain in code:

```javascript
firstPromiseFunction()
.then((firstResolveVal) => {
  return secondPromiseFunction(firstResolveVal);
})
.then((secondResolveVal) => {
  console.log(secondResolveVal);
});
```

Let’s break down what’s happening in the example:

- We invoke a function `firstPromiseFunction()` which returns a promise.
- We invoke `.then()` with an anonymous function as the success handler.
- Inside the success handler we return a new promise— the result of invoking a second function, `secondPromiseFunction()` with the first promise’s resolved value.
- We invoke a second `.then()` to handle the logic for the second promise settling.
- Inside that `.then()`, we have a success handler which will log the second promise’s resolved value to the console.

In order for our chain to work properly, we had to return the promise `secondPromiseFunction(firstResolveVal)`. This ensured that the return value of the first `.then()` was our second promise rather than the default return of a new promise with the same settled value as the initial.

## Avoiding Common Mistakes

Promise composition allows for much more readable code than the nested callback syntax that preceded it. However, it can still be easy to make mistakes. In this exercise, we’ll go over two common mistakes with promise composition.

**Mistake 1:** Nesting promises instead of chaining them.

```javascript
returnsFirstPromise()
.then((firstResolveVal) => {
  return returnsSecondValue(firstResolveVal)
    .then((secondResolveVal) => {
      console.log(secondResolveVal);
    })
})
```

Instead of having a clean chain of promises, we’ve nested the logic for one inside the logic of the other. Imagine if we were handling five or ten promises!

**Mistake 2:** Forgetting to return a promise.

```javascript
returnsFirstPromise()
.then((firstResolveVal) => {
  returnsSecondValue(firstResolveVal)
})
.then((someVal) => {
  console.log(someVal);
})
```

Since forgetting to return our promise won’t throw an error, this can be a really tricky thing to debug!

## Using Promise.all()

To maximize efficiency we should use concurrency, multiple asynchronous operations happening together. With promises, we can do this with the function `Promise.all()`.

`Promise.all()` accepts an array of promises as its argument and returns a single promise. That single promise will settle in one of two ways:

If every promise in the argument array resolves, the single promise returned from `Promise.all()` will resolve with an array containing the resolve value from each promise in the argument array.
If any promise from the argument array rejects, the single promise returned from `Promise.all()` will immediately reject with the reason that promise rejected. This behavior is sometimes referred to as failing fast.
Let’s look at a code example:

```javascript
let myPromises = Promise.all([returnsPromOne(), returnsPromTwo(), returnsPromThree()]);

myPromises
  .then((arrayOfValues) => {
    console.log(arrayOfValues);
  })
  .catch((rejectionReason) => {
    console.log(rejectionReason);
  });
```

Let’s break down what’s happening:

- We declare myPromises assigned to invoking `Promise.all()`.
- We invoke `Promise.all()` with an array of three promises— the returned values from functions.
- We invoke `.then()` with a success handler which will print the array of resolved values if each promise resolves successfully.
- We invoke `.catch()` with a failure handler which will print the first rejection message if any promise rejects.

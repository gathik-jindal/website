27th Jun '24, 17:23pm

Status: #ProperNotes #Completed 

Tags: [[Asynchronous Programming]] [[JavaScript]]

# Event Loop

### What Is the Event Loop?

At a high level, the event loop is a system for managing code execution. In the diagram, you can see an overview of how the parts that make up the event loop fit together.

![[JavaScript-Engine-Diagram.webp]]

We have data structures that we call the heap and the call stack, which are part of the JavaScript engine. The heap and call stack interact with Node and Web APIs, which pass messages back to the stack via an event queue. The event queue’s interaction with the call stack is managed by an event loop. All together, those parts maintain the order of code execution when we run asynchronous functions.

## Understand the Components of the Event Loop

The _event loop_ is made up of these parts:

- Memory Heap
- Call Stack
- Event Queue
- Event Loop
- Node or Web APIs

Let’s take a closer look at each part before we put it all together.

#### The Heap

The _heap_ is a block of memory where we store objects in an unordered manner. JavaScript variables and objects that are currently in use are stored in the heap.

#### The Call Stack

The _stack_, or _call stack_, tracks what function is currently being run in your code.

When you invoke a function, a _frame_ is added to the stack. Frames connect that function’s arguments and local variables from the heap. Frames enter the stack in a _last in, first out_ (LIFO) order. In the code snippet below, a series of nested functions are declared, then `foo()` is called and logged.

```javascript
function foo() {
	return function bar() {
		return function baz() {
			return 'I love CodeCademy'
		}
	}
}
console.log(foo()()());
```

The function executing at any given point in time is at the top of the stack. In our example code, since we have nested functions, they will all be added to the stack until the innermost function has been executed. When the function finishes executing e.g. returns, its frame is removed from the stack. When we execute `console.log(foo()()())`.

You might have noticed that `global()` is at the bottom of the stack–when you first initiate a program, the _global execution context_ is added to the call stack, which contains the global variable and lexical environment. Each subsequent frame for a called function has a function execution context that includes the function’s lexical and variable environment.

So when we say the call stack tracks what function is currently being run in our code, what we are tracking is the current execution context. When a function runs to completion, it is popped off of the call stack. The memory, or the frame, is cleared.

### The Event Queue

The _event queue_ is a list of messages corresponding to functions that are waiting to be processed. In the diagram, these messages are entering the event queue from sources such as various web APIs or async functions that were called and are returning additional events to be handled by the stack. Messages enter the queue in a first in, first out (FIFO) order. No code is executed in the event queue; instead, it holds functions that are waiting to be added back into the stack.

### The Event Queue in Context

This event queue is a specific part of our overall event loop concept. Messages that are waiting in the event queue to be added back into the stack are added back via the event loop. When the call stack is empty, if there is anything in the event queue, the event loop can add those one at a time to the stack for execution.

1. First the event loop will poll the stack to see if it is empty.
2. It will add the first waiting message.
3. It will repeat steps 1 and 2 until the stack has cleared.

## The Event Loop in Action

Now that we know all of the pieces of the event loop, let’s walk through some code to understand the event loop in action.

```javascript
console.log("This is the first line of code in app.js.");

function usingsetTimeout() {
	console.log("I'm going to be queued in the Event Loop.");
}

setTimeout(usingsetTimeout, 3000);
console.log("This is the last line of code in app.js.");
```

1. `console.log("This is the first line of code in app.js.");` is added to the stack, executes, then pops off of the stack.
2. `setTimeout()` is added to the stack.
3. `setTimeout()`’s callback is passed to be executed by a web API. The timer will run for 3 seconds. After 3 seconds elapse, the callback function, `usingsetTimeout()` is pushed to the Event Queue.
4. The Event Loop, meanwhile, will check periodically if the stack is cleared to handle any messages in the Event Queue.
5. `console.log("This is the last line of code in app.js.");` is added to the stack, executes, then pops off of the stack.
6. The stack is now empty, so the event loop pushes `usingsetTimeout` onto the stack.
7. `console.log("I'm going to be queued in the Event Loop.");` is added to the stack, executes, gets popped
8. `usingsetTimeout` pops off of the stack.

# References
https://www.codecademy.com/courses/learn-intermediate-javascript/articles/javascript-concurrency-model-and-event-loop
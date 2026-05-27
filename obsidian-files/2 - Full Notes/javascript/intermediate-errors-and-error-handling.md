14th May '26, 09:26pm (Incorrect)

Status: #Completed #ProperNotes

Tags: [[JavaScript]] [[Web Dev]] [[Programming languages]]

# JavaScript Error Types

Now that you can identify the type of error from an error stack trace, you might be wondering what the different types of errors mean.

Here are three common error types:

- **SyntaxError**: This error will be thrown when a typo creates invalid code — code that cannot be interpreted by the compiler. When this error is thrown, scan your code to make sure you properly opened and closed all brackets, braces, and parentheses and that you didn’t include any invalid semicolons.
- **ReferenceError**: This error will be thrown if you try to use a variable that does not exist. When this error is thrown, make sure all variables are properly declared.
- **TypeError**: This error will be thrown if you attempt to perform an operation on a value of the wrong type. For example, if we tried to use a string method on a number, it would throw a TypeError.

There are seven types of built-in JavaScript errors in total. You can find more information about all of them at the [MDN JavaScript Error documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error). Whenever you are confronted with an error you can’t comprehend, consulting this documentation is a great place to start.

## Constructing an Error

JavaScript errors are objects that have a name and message property. Previously, we’ve seen how built-in errors alert us about common mistakes in our code. But, what if we need an error message that isn’t covered by the built-in errors? Let’s say we need to inform a user that a string passed in as an argument is too short with a custom message. Such a message isn’t covered by a built-in error, but we could use the `Error` function to make our own error object with a message that is unique to our program!

```javascript
console.log(Error('Your password is too weak.'));
// Prints: Error: Your password is too weak.
```

The `Error` function takes an argument of a string which becomes the value of the error’s `message` property. In the code snippet above, we used the `Error` function to create an error object that has the message `'Your password is too weak.'`.

You might also see errors created with the new keyword. Both methods will lead to the same functionality. Take a look:

```javascript
console.log(new Error('Your password is too weak.'));
// Prints: Error: Your password is too weak.
```

## The throw Keyword

Creating an error doesn’t cause our program to stop — remember, an error must be thrown for it to halt the program.

To throw an error in JavaScript, we use the `throw` keyword like so:

```javascript
throw Error('Something wrong happened');
// Error: Something wrong happened
```

When we use the `throw` keyword, the error is thrown and code after the `throw` statement will not execute. Take for example:

```javascript
throw Error('Something wrong happened');
// Error: Something wrong happened

console.log('This will never run');
```

After `throw Error('Something wrong happened');` is executed and the error object is thrown, the `console.log()` statement will not run (just like when a built-in JavaScript error was thrown!).

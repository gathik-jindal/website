14th May '26, 09:26pm (Incorrect)

Status: #Completed #ProperNotes

Tags: [[JavaScript]] [[Web Dev]] [[Programming languages]]

# Introduction

## Implementations of Modules in JavaScript: Node.js vs ES6

Before we dive in, it should be noted that there are multiple ways of implementing modules depending on the runtime environment in which your code is executed. In JavaScript, there are two runtime environments and each has a preferred module implementation:

- The Node runtime environment and the `module.exports` and `require()` syntax.
- The browser’s runtime environment and the ES6 `import/export` syntax.

In Node.js, we use modules.exports object ot export code from a file. (Yes you read that right, we use objects to export code in Node.js)
Meaning its functions and variables can be used in other files by importing them.

Also in Node.js we use the `require()` function to import the functions and or data from another module.

## module.exports

To create a module, you simply have to create a new file where the functions can be declared. Then, to make these functions available to
other files, add them as properties to the built-in `module.exports` object:

```javascript
/* converters.js */
function celsiusToFahrenheit(celsius) {
  return celsius * (9/5) + 32;
}

module.exports.celsiusToFahrenheit = celsiusToFahrenheit;

module.exports.fahrenheitToCelsius = function(fahrenheit) {
  return (fahrenheit - 32) * (5/9);
};
```

The code snippet above demonstrates two ways of exporting functions from a module.

`module.exports` is an object that is built-in to the Node.js runtime environment. Other files can now import this object, and make
use of these two functions, with another feature that is built-in to the Node.js runtime environment: the `require()` function.

## require()

The `require()` function accepts a string as an argument. That string provides the file path to the module you would like to import.

Let’s update `water-limits.js` such that it uses `require()` to import the `.celsiusToFahrenheit()` method from the module.exports object within `converters.js`:

```javascript
/* water-limits.js */
const converters = require('./converters.js');

const freezingPointC = 0;
const boilingPointC = 100;

const freezingPointF = converters.celsiusToFahrenheit(freezingPointC);
const boilingPointF = converters.celsiusToFahrenheit(boilingPointC);

console.log(`The freezing point of water in Fahrenheit is ${freezingPointF}`);
console.log(`The boiling point of water in Fahrenheit is ${boilingPointF}`);
```

In this case, `./` is a relative path indicating that converters.js is stored in the same folder as `water-limits.js`.
When you use `require()`, the entire `module.exports` object is returned and stored in the variable converters.
This means that both the `.celsiusToFahrenheit()` and `.fahrenheitToCelsius()` methods can be used in this program!

### Using Object Destructuring to be more Selective With require()

In many cases, modules will export a large number of functions but only one or two of them are needed. You can use object destructuring to extract only the needed functions.

Let’s update `celsius-to-fahrenheit.js` and only extract the `.celsiusToFahrenheit()` method, leaving `.fahrenheitToCelsius()` behind:

```javascript
/* celsius-to-fahrenheit.js */
const { celsiusToFahrenheit } = require('./converters.js');

const celsiusInput = process.argv[2]; 
const fahrenheitValue = celsiusToFahrenheit(celsiusInput);

console.log(`${celsiusInput} degrees Celsius = ${fahrenheitValue} degrees Fahrenheit`);
```

With this approach, the remainder of the program works the same way but the program avoids importing a function it does not need.

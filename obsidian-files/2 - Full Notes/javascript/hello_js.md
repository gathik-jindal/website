14th May '26, 09:26pm (Incorrect)

Status: #Completed #ProperNotes

Tags: [[JavaScript]] [[Web Dev]] [[Programming languages]]

# Introduction

console.log(); is used to print anything to the console, kinda like print statement if you think about it.

**Navigation:**

- [Data Types](#datatypes)
- [Variables](#variables)
- [Control Flow](#control-flow)
- [Functions](#functions)
- [Arrays](#arrays)
- [Loops](#loops)
- [Objects](#objects)

## datatypes

- *Number*: Any number, including numbers with decimals: 4, 8, 1516, 23.42.
- *BigInt*: Any number, greater than 253-1 or less than -(253-1), with n appended to the number: 1234567890123456n.
- *String*: Any grouping of characters on your keyboard (letters, numbers, spaces, symbols, etc.) surrounded by single quotes: ' ... ' or double quotes " ... ", though we prefer single quotes.
- *Boolean*: This data type only has two possible values— either true or false (without quotes).
- *Null*: This data type represents the intentional absence of a value, and is represented by the keyword null (without quotes).
- *Undefined*: This data type is denoted by the keyword undefined (without quotes). It also represents the absence of a value though it has a different use than null. undefined means that a given value does not exist.
- *Symbol*: A newer feature to the language, symbols are unique identifiers, useful in more complex coding. No need to worry about these for now.
- *Object*: Collections of related data.

`strings` have a "".length property to find the length of the string.

The math Object is useful to perform many math functions, do look at the documentation to explore more. Even the number object.

## Variables

we define variables using var and letters

```javascript
var changeMe = 0;
let variable;
```

The const keyword makes the variable a constant and raises a type error every time you try to reassign it.

The `` is used similar to f"" in python

```javascript
`My name is ${myName}.`
```

we use `typeof` to find the type of datatype: `typeof var`

## Control Flow

The conditionals statements are very similar to c
if-else is exact same as c, == and === have a difference, the === is more strict than ==.

So which values are falsy— or evaluate to false when checked as a condition? The list of falsy values includes:

- 0
- Empty strings like "" or ''
- null which represent when there is no value at all
- undefined which represent when a declared variable lacks a value
- NaN, or Not a Number

The ternary operators are the usual: `<condition> ? <s1> : <s2>;`

even the switch case are same as c.

## Functions

we define functions in javascript like this:

```javascript
function foo() {
    //smtg
}
```

We can even define a function inside an expression like this:

```javascript
const variableName = function (arg) {
    //s1
    return arg;
}
```

To call the function we simply type `variableName()`

We can alternatively write the above code like this:

```javascript
const variableName = (parm) => {
    //s1
    return parm;
}
```

We can even reassign it to some other variable name by simple doing: `var name = variableName;`
We call it using `name()`, there are many methods associated to functions that are very helpful to us.

this can be made even shorter

```javascript
const variableName = parm => parm;
```

the computer automatically understands that theres only one parameter called parm, and all the function is doing is
returning the variable it self (baiscally returns anything you type there)

## Arrays

Arrays are baiscally defined the same as lists in python

```javascript
let vari = [];
```

They're accessed the same ways using indexing. `listName[]`, the ones defined with let and var are mutable. But if defined with const type then the list is mutable but the variable itself cannot be reassigned.

We use the `.push()` method to add elements in to the array, and the `.pop()` to pop the elements in the array (it also returns the element that is popped).

## Loops

For loop is same as c, while loop also same. here an additional loop exists called do while, basically this

```javascript
do {
    //code
} while (condition);
```

The code is run before the condition is checked.

We call functions that get passed in as parameters as callback functions.

There are different methods for iterating through arrays,

- `.forEach(foo)`; executes the callback function for each element in the array.
- `.map(foo)`; executes the callback, creates and returns a new array with the returned values.
- `.filter(foo)`; executes the callback and only includes the elements that return true from the callback.
- `.findIndex(foo)`; executes the callback and returns the index of the variable that makes the callback return true.
- `.reduce((accumlator, currentValue) => {return accumulator + currentValue})`; the return value goes into the accumulator. Alternatively, accumulator can be given a defualt value, the second parameter.

Visit [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods) for some more array methods.

## Objects

Objects in js are very simple to creates

```javascript
let var = {
    propertyName: Value,
    ...
};
```

We can access them like `var.propertyName` alternatively we can use `var[propertyName]` too.
We can assign new properties like we would do to objects in python, `var[NewProp] (or var.NewProp) = 'value'`
We can also delete them using the delete keyword followed by the property representation, delete var.prop

We can include methods in our object literals by creating ordinary, colon-separated key-value pairs.
The key serves as our method’s name, while the value is an anonymous function expression.
An object can contain other objects and those objects can also have other objects and methods.

```javascript
const obj = {
    foo () {

    },

    foo : function () {

    },

    foo : () => {

    }
}
```

Objects are passed by reference meaning any funciton that mutates the object's property will also mutate the original property

But if the function tries reassignment of the object as a whole it wont work:

- If you attempt to reassign the entire object inside a function, you're essentially creating a new object at a new memory location, but the original reference outside
- The function will still point to the old object. This is why the reassignment doesn't have the desired effect on the original object.

we can iterate over the different attributes of an objects

```javascript
for (let crew in spaceship.crew) {
  console.log(`${crew}: ${spaceship.crew[crew].name}`); //crew basically stores the property name in `` in a string.
};
```

The `this` keyword is equivalent to the `self` keyword in python and we dont have to pass it specially as a parameter in the function like we do in python. We can't use the `this` keyword in a function defined using the arrow functions. Arrow functions inherently bind, or tie, an already defined *this* value to the function itself that is NOT the calling object.

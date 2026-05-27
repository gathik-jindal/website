24th Jun '24, 19:33pm

Status: #Completed #Small 

Tags: [[JavaScript]]

# Why This cannot be used before Super in JS

## Problem

In a `Javascript` class, that inherits a parent class, in the constructor method we cannot use `this` until `super` is called, it gives an error:
```javascript
ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

## Reason

TLDR: ==access of `this` in a subclass before `super()` call is not allowed, because in ES6 `this` is being born in the base class==, therefore `super()` is needed to initialize it.

For more information, refer to [15.6.2 Allocating and initializing instances](http://exploringjs.com/es6/ch_classes.html#_right-column-the-prototype-chain-of-the-instance). The author is one of the few people that explains this in detail.

Here is a relevant sample from the book above.

> Under the hood, it roughly looks as follows.

```javascript
// Base class: this is where the instance is allocated
function Person(name) {
    // Performed before entering this constructor:
    this = Object.create(new.target.prototype);

    this.name = name;
}
···

function Employee(name, title) {
    // Performed before entering this constructor:
    this = uninitialized;

    this = Reflect.construct(Person, [name], new.target); // (A)
        // super(name);

    this.title = title;
}
```

# References
https://stackoverflow.com/questions/43539654/why-isnt-this-allowed-before-super
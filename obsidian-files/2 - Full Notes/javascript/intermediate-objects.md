14th May '26, 09:26pm (Incorrect)

Status: #Completed #ProperNotes

Tags: [[JavaScript]] [[Web Dev]] [[Programming languages]]

# Objects

## Private properties

if a property name stars with an underscore then its a private property and its value should not be altered.

if we use the get keyword before the naming of a function then we don't have to use () while calling it. It acts like a property except that we just format is:
```js
const robot = {
  _energyLevel: 100,
  get energyLevel () {
    if (typeof this._energyLevel === "number") {
      return `My current energy level is ${this._energyLevel}`;
    } else {
      return 'System malfunction: cannot retrieve energy level';
    }
  }
};

console.log(robot.energyLevel);
```

---
### Getters and setters

setters work the same as getters but here we use the set keyword and all it does is make a formal check before assigning the actual new value to the variable.
```js
const person = {
  _age: 37,
  set age(newAge){
    if (typeof newAge === 'number'){
      this._age = newAge;
    } else {
      console.log('You must assign a number to age');
    }
  }
};
person.age = 40;
console.log(person._age); // Logs: 40
person.age = '40'; // Logs: You must assign a number to age
```

but we can still directly change the property by just typing
```js
person._age = 'forty-five'
console.log(person._age); // Prints forty-five
```

---
## Factory functions

we can also create a function that returns an object, so we don't have to define the object again and again countless times.
```js
const robotFactory = (model, mobile) => {
  return {
    model: model,
    mobile: mobile,
    beep() {
      console.log('Beep Boop');
    }
  }
}
```

alternatively,
```js
const robotFactory = (model, mobile) => {
  return {
    model,
    mobile,
    beep() {
      console.log('Beep Boop');
    }
  }
}
```

these are called factory functions, since they produce objects.

```js
const residence = vampire.residence; 
alternatively,
const { residence } = vampire;
```

---

## Deserializing and serializing objects

The curly braces are used to de-structure the object, and the variable name should be the same as the property name.
It can include multiple property names too.

It works in reverse too.
```js
let activity = 10;
let beach = {activity};
console.log(beach); // Prints { activity: 10 }
```

here, we added a property directly using the curly braces syntax.

## Some more about getters and setters

getters and setters:

```js
const myCat = {
  _name: 'Snickers',
  get name(){
    return this._name
  },
  set name(newName){
    //Verify that newName is a non-empty string before setting as name property
    if (typeof newName === 'string' && newName.length > 0){
      this._name = newName; 
    } else {
      console.log("ERROR: name must be a non-empty string"); 
    }
  }
}
myCat.name = 'Snickers1';
console.log(myCat.name); // Snickers1
```

Its a rule that getters have 0 formal arguments and setters have exactly one formal argument.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#Methods_of_the_Object_constructor

# Classes

Classes are a tool that developers use to create multiple objects.

In a class we have a constructor method that in invoked when we create a new instance/object of the class.
To create an object/instance we use the new keyword and the class name followed by the constructor method's parameters in paranthesis.

Class method and getter syntax is the same as it is for objects except you can not include commas between methods.

we have can create classes in javascript:
```js
class Surgeon {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }
}

const surgeonRomero = new Surgeon('Francisco Romero', 'Cardiovascular');
const surgeonJackson = new Surgeon('Ruth Jackson', 'Orthopedics');
```

The constructor class here acts like the initializer function in python.

Inheritance in javascript is very simple, but one thing we have to note is that,
in the constructor method, the this keyword should be called after `super()` is used, or else
a reference error will be thrown.

```js
class Cat extends Animal {
  constructor(name, usesLitter) {
    super(name);
    this._usesLitter = usesLitter;
  }
}
```

The `super` keyword basically tells the constructor class to use the parent's constructor class for that particular keyword.
If you are defining a new keyword in the parent class it is automatically defined in the child class too.
The extends keyword makes sure that all the other methods are also copied / available in the child class too.

if we want a method to be specifically part of just the parent class and not its subclass or instances then we can use the static keyword in front of the method.
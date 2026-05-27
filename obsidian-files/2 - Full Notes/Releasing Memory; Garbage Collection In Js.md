27th Jun '24, 17:52pm

Status: #Completed #ProperNotes 

Tags: [[JavaScript]]

# Releasing Memory: Garbage Collection In JavaScript

_Garbage collection_ refers to the process of clearing memory. The JavaScript engine manages garbage collection using two key algorithms:

- Reference-counting
- Mark-and-sweep

Garbage collection algorithms use different approaches to detect if some piece of memory is no longer needed by the program. Once memory is no longer needed, it is released and can be reused. (Remember that we mentioned all memory relates back to RAM, so space is finite.) When you consider the idea of whether or not some piece of memory is still needed, it can get pretty complicated. Let’s take a quick look at how the reference-counting and mark-and-sweep algorithms work.

#### Reference-Counting

As we learned about in the stack and heap section, all of the objects you make in your program have references and memory allocated to them.

_Reference-counting_ makes use of the references to variables that live on the stack. When an object is created, it’s reference count is one. If you make a second variable point to that object, the reference count is two. If a function makes use of an object, the reference count is increased by one. Usually, inner elements from function calls are garbage collected when a function is done executing, unless the inner elements are still referenced.

```javascript
let obj = new Object(); // reference count of one
let obj2 = obj; // reference count of two
obj2 = "string"; // obj has a reference count of one again
```

With the reference-counting algorithm, if the reference count drops down to zero, there are no more references to the object in your program, so the JavaScript engine can mark that memory block as free to use so future allocations can utilize and overwrite the block.

```javascript
let monument = {
	name: "Eiffel Tower"
};
monument = "Golden Gate Bridge";
```

In the example, the `monument` variable is reassigned to the string value “Golden Gate Bridge,” so the `name` property can be garbage collected as it has a reference count of zero.

This type of algorithm does have some shortcomings. We’ll look into the concept of _circular references_ in the memory leak section below and how reference counting doesn’t always cut it.

#### Mark-and-Sweep

The _Mark-and-Sweep_ algorithm runs periodically and starts at the root of your code, the global object. From the root, it’ll “sweep” across your code to find and mark anything that is “reachable” by traversing across all of the variables. The mark is generally something like a boolean. After that process, any of the variables that are unmarked (i.e. they were not marked in the first step and therefore were not reachable) will be garbage collected during the sweep phase. That process is repeated over and over again during code execution.

# References
https://www.codecademy.com/courses/learn-intermediate-javascript/articles/javascript-intro-to-memory-management
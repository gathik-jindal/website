24th Jun '24, 13:05pm

Status: #Small #Completed 

Tags: [[JavaScript]]

# == VS === In JavaScript

The strict equality operator (`===`) behaves identically to the abstract equality operator (`==`) except no type conversion is done, and the types must be the same to be considered equal.

To quote Douglas Crockford's excellent [JavaScript: The Good Parts](https://rads.stackoverflow.com/amzn/click/com/0596517742),

> JavaScript has two sets of equality operators: `===` and `!==`, and their evil twins `==` and `!=`. The good ones work the way you would expect. If the two operands are of the same type and have the same value, then `===` produces `true` and `!==` produces `false`. The evil twins do the right thing when the operands are of the same type, but if they are of different types, they attempt to coerce the values. The rules by which they do that are complicated and unmemorable.
> These are some of the interesting cases:

```javascript
'' == '0'           // false
0 == ''             // true
0 == '0'            // true

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```

Read more for the link for more in-depth understanding.

# References
https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons
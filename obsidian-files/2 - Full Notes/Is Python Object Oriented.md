2nd Jun '24, 12:15pm

Status: #Completed #Small  

Tags: [[Python]] [[OOP]]
# Origin of doubt

This was a question that struck me while I was working on the ==Moore Machine project== with Abhirath and Aryan, Abhirath mentioned that ==python isn't completely OOP==, so I went down this rabbit hole. :)

# My Research

Searching this up on google there are of ideas.
Firstly,
## Encapsulation is not fully implemented

What I mean is that ==private, public, protected access level modifiers== are not supported. What I mean is that stuff like:
```Python
__private = 0 # this is there in python
_protected = 0 # this is not there in python (essentially a public var atp)
public = 0 # if no '_' then it is public
```
It's not explicitly stated as public, private and protected. (Even private variables can be accessed using name mangling).

The reason for that is stated as it is on Stackoverflow:
>The answer is simply philosophy. Guido doesn't like hiding things, and many in the Python community agree with him.

# References
https://stackoverflow.com/questions/3325343/why-is-python-not-fully-object-oriented

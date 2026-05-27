2nd Jun '24, 08:59am

Status: #Completed  #ProperNotes 

Tags: [[Python]] [[OOP]]

# `super()` in Python (MRO)

## What is MRO?

In languages that use ==multiple inheritance==, the ==order in which base classes are searched== when looking for a method is often ==called the Method Resolution Order==, or MRO. (In Python this also applies to other attributes.) For languages that support ==single inheritance== only, the ==MRO is uninteresting==; but when multiple inheritance comes into play, the choice of an MRO algorithm can be remarkably subtle.

## Why is `super()` a WOW?

Using Python3 syntax, let’s start with a basic use case, a subclass for extending a method from one of the built-in classes:
```Python
class LoggingDict(dict):
    def __setitem__(self, key, value):
        logging.info('Setting %r to %r' % (key, value))
        super().__setitem__(key, value)
```
This class has all the ==same capabilities as its parent==, `_dict_`, but it extends the `__setitem__` method to make log entries whenever a key is updated. After making a log entry, the method uses `super()` to delegate the work for actually updating the dictionary  with the key/value pair.

==Before `super()` was introduced==, we would have ==hardwired the call== with `dict.__setitem__(self, key, value)`. However, `super()` is better because it is a ==computed indirect reference==.

One ==benefit== of indirection is that we ==don’t have to specify== the delegate ==class by name==. If you edit the source code to switch the base class to some other mapping, the `super()` reference will automatically follow. You have a single source of truth:
```Python
class LoggingDict(SomeOtherMapping):            # new base class
    def __setitem__(self, key, value):
        logging.info('Setting %r to %r' % (key, value))
        super().__setitem__(key, value)         # no change needed
```

## What happens when there are multiple inheritances taking place?

The calculation depends on both the class where `super` is called and on the instance’s tree of ancestors. The first component, the class where `super` is called, is determined by the source code for that class. In our example, `super()` is called in the `_LoggingDict.__setitem___` method. That component is fixed. The second and more interesting component is variable (we can create new subclasses with a rich tree of ancestors).

Let’s use this to our advantage to construct a logging ordered dictionary without modifying our existing classes:
```Python
class LoggingOD(LoggingDict, collections.OrderedDict):
    pass
```
The ancestor tree for our new class is: `LoggingOD`, `LoggingDict`, `OrderedDict`, `dict`, `object`. For our purposes, the important result is that `OrderedDict` was inserted after `LoggingDict` and before `dict`! This means that the `super()` call in  `LoggingDict.__setitem__` now dispatches the key/value update to `OrderedDict` instead of `dict`.

This search order is called MRO. Its easy to view the MRO by printing the `__mro__` attribute.

## How is MRO or Search Order Calculated?

The basics are simple. The sequence includes the class, its base classes, and the base classes of those bases and so on until reaching _object_ which is the root class of all classes. The sequence is ordered so that a class always appears before its parents, and if there are multiple parents, they keep the same order as the tuple of base classes.

The process of solving those constraints is known as ==linearization==. The linearization algorithm used by python MRO is called [C3 Linearization](https://dl.acm.org/doi/10.1145/236337.236343).

# References
https://rhettinger.wordpress.com/2011/05/26/super-considered-super/
https://www.python.org/download/releases/2.3/mro/
https://dl.acm.org/doi/pdf/10.1145/236337.236343
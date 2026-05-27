4th Jun '24, 16:25pm

Status: #Completed #ProperNotes 

Tags: [[Python]] [[PythonSys]] [[PythonOS]]

# Import a file from a parent directory python

In order to import a module, the ==directory having that module== must be ==present== in ==`PYTHONPATH`==. It is an ==environment variable== that contains the ==list of packages loaded by Python==. The list of packages presents in ==`PYTHONPATH` is also present in `sys.path`==, so we need to ==add the parent directory== path ==to  `sys.path`== to import the files that are present in the parent directory.

There are many ways to do that, but it would be a waste to go over the first two since the name of the parent directory is to be known to do import.

```Python
import sys
import os

# getting the name of the directory
# where the this file is present.
current = os.path.dirname(os.path.realpath(__file__))

# Getting the parent directory name
# where the current directory is present.
parent = os.path.dirname(current)

# adding the parent directory to 
# the sys.path.
sys.path.append(parent)

# now we can import the module in the parent
# directory.
```

# References
https://www.geeksforgeeks.org/python-import-from-parent-directory/
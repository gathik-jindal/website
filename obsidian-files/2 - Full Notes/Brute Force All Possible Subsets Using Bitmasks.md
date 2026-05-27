21st Jun '24, 16:36pm

Status: #Completed #ProperNotes 

Tags: [[Compi-Coding]] 

# Brute Force All Possible Subsets Using Bitmasks

*Question*: ==Given an array find all its possible permutations==.

*Solution*:
Lets say there are ==n elements== in the array. Also, we know that there are $\large2^n$ subsets of n elements. Also, we know that in the binary representation of numbers from 0 to $\large2^n$, the binary strings will ==cover every possible combinations== of 1s and 0s.

If we look closely, consider all the binary strings and the positions of the 1s in the binary string, we realize that ==taking elements that correspond to the position of a 1 in the binary string will result in a subset==.

And, since every combination of 1s and 0s are covered in the binary representation from 0 to $\large2^n$, it will hence brute force all possible subsets.

code:
```cpp
n = // some number
array a(n);

for (int i = 0; i < 1 << n; i++)
	for (int j = 0; j < n; j++)
		if ((i & 1 (<< j)) > 0)
			// do something
```

# References
https://www.youtube.com/watch?v=GLm0aLsoRtY
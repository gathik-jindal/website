2nd Jun '24, 06:59am

Status: #Completed #ProperNotes #Small 

Tags: [[Data Structures and Algorithms]] [[Sorting]]

# Principle

Insertion Sort is an efficient algorithm $O(n^2)$ that helps in sorting a group of elements that have a ==specific relation or property== that allows them to be ==re-arranged such that the property hold between any two adjacent elements==.

# Pseudo Code

```Pseudo Code
Insertion-Sort(A, n)
	for i = 2 to n
		key = A[i]
		// Insert A[i] into the sorted subarray A[1:i-1].
		j = i - 1
		while j > 0 and A[j] > key
			A[j+1] = A[j]
			j = j - 1
		A[j+1] = key
```

## Explanation

NOTE: In the pseudo code the array is 1 indexed.

Here, in the ==first for loop== we iterate from 2 to `n`, here our `i` is our pointer and ==everything before this pointer in the array is sorted initially==.  ==The inner `while` loop== makes sure that we are ==inserting the element in the right position by shifting every element greater one space towards the left ensures there is space to insert `key` into the correct position==.

# Also see
[[Loop Invariant]]
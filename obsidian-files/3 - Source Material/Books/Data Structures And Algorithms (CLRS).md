
2nd Jun '24, 06:01am

Status: #ProperNotes #InProgress

Tags: [[CRLS]] [[Data Structures and Algorithms]] [[Compi-Coding]]

# Chapter 2 - Getting Started

## Insertion Sort Correctness using Loop Invariant

``` Psuedo
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

We will use loop invariant to understand insertion sort's correctness.

1) **Initialization:** An array with single element is sorted and hence its true before every iteration.
2) **Maintenance:** Lets say the the array `A[i:i-1]` is sorted, then in the next iteration we insert `A[i]` into its right position. The subarray `A[1:i]` then consists of the elements originally in `A[1:i]`, but in sorted order. Incrementing `i` for the next iteration preserves the loop invariant.
3) **Termination:** Once `i`'s value exceeds `n` in line 1, the loop terminates. Substituting `n+1` for `i` in the wording of the loop invariant yields that the subarray `A[i:n]` consists of the elements originally in `A[1:n]`, but in sorted order.

Hence, the algorithm is correct.

## RAM Model Of Computation

Here the basic assumption is that,
1) Instructions are executed one after the other.
2) Each instruction or data access takes a constant amount of time-even indexing into an array.

Strictly speaking, we should precisely define the instructions of the RAM model and their costs. To do so, however, would be tedious and yield little insight into algorithm design and analysis. Yet we must be careful not to abuse the RAM model. For example, what if a RAM had an instruction that sorts? Then you could sort in just one step. Such a RAM would be unrealistic, since such instructions do not appear in real computers.

### Specifications

The RAM model contains instructions commonly found in real computers: arithmetic (such as add, subtract, multiply, divide, remainder, floor, ceiling), data movement (load, store, copy), and control (conditional and unconditional branch, subroutine call and return).

The data types in the RAM model are integer, floating point (for storing real number approximations), and character.

**Note:** Although we typically do not concern ourselves with precision for floating-point values in this book (many numbers cannot be represented exactly in floating point).

## Analysis of Insertion Sort

First, let’s acknowledge that the running time depends on the input. Moreover, insertion sort can take different amounts of time to sort two input arrays of the same size, depending on how nearly sorted they already are. Even though the running time can depend on many features of the input, we’ll focus on the one that has been shown to have the greatest effect, namely the size of the input, and describe the running time of a program as a function of the size of its input.

### Input Size

It shouldn't come as a surprise that as the number of elements increase the time it takes to sort those many numbers increases too.

### Running Time

How we account for the cost each instruction takes should be independent of any particular computer, but within the framework of the RAM model. A constant amount of time is required to execute each line of our pseudocode. But we'll assume that each execution of the kth like takes $c_k$ time, where $c_k$ is constant.

## References
[[Insertion Sort]]
[[Loop Invariant]]
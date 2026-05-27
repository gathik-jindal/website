1st Feb '25, 21:34pm

Status: #InProgress #ProperNotes 

Tags: [[Data Structures and Algorithms]] [[Algorithm Design]]

# Chapter 5 - Divide & Conquer

>Divide and conquer refers to a class of algorithmic techniques in which one breaks the input into several parts, solves the problem in each part recursively, and then combines the solutions to these subproblems into an overall solution. In many cases, it can be a simple and powerful method.

>Analyzing the running time of a divide and conquer algorithm generally involves solving a recurrence relation that bounds the running time recursively in terms of the running time on smaller instances.

Divide and Conquer algorithms are found by abusing one property of a problem that helps one in  (not necessarily) solving sub-problems and combining those sub-problems. Identifying this property is the key challenge. Sometimes these properties are inserted since converting the input into the desired format could result in a  time-efficient algorithm.

## Approaches to Solving Recurrences

There are two basic ways to solve recurrences:

1. Unrolling: unroll the recurrence sequence until a pattern is found, summing them all up bottoms out on the sub-problems and thereby arrive at a solution.
2. Substitution: substitute a solution that you seem fit and check if it works, one can prove it by using induction. There is a useful variant of this solution where the general form is given for some types of recurrences, one just has to find the parameters.

# References

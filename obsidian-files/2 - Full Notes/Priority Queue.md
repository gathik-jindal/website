14th May '26, 09:46pm

Status: #Completed #ProperNotes 

Tags: [[Compi-Coding]] [[Data Structures and Algorithms]]

# Priority Queue

A ****priority queue**** is a type of queue where each element is associated with a priority value, and elements are served based on their priority rather than their insertion order.

- Elements with higher priority are retrieved or removed before those with lower priority.
- When a new item is added, it is inserted according to its priority.

## Implementation

The [[Binary Heap]] is the most common implementation of a priority queue:

- A ****min-heap**** allows quick access to the element with the smallest value.
- A ****max-heap**** allows quick access to the element with the largest value.
- Binary heaps are complete binary trees, making them easy to implement using arrays.
- Using arrays provides cache-friendly memory access, improving performance.

Priority queues are widely used in algorithms such as Dijkstra’s shortest path algorithm, Prim’s minimum spanning tree algorithm, and Huffman coding for data compression.

# References
https://www.geeksforgeeks.org/dsa/priority-queue-set-1-introduction/
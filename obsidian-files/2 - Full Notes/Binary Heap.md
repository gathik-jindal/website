14th May '26, 09:58pm

Status: #ProperNotes #Completed 

Tags:  [[Data Structures and Algorithms]]

# Binary Heap

A Binary Heap is a special type of complete binary tree, meaning all levels are filled except possibly the last, which is filled from left to right.

- It allows fast access to the minimum or maximum element. There are two types of binary heaps: Min Heap and Max Heap.
- ****Min Heap****: The value of the root node is the smallest, and this property is true for all subtrees.
- ****Max Heap****: The value of the root node is the largest, and this rule also applies to all subtrees.
- The internal ordering in the subtree doesn't matter as long as the above constraints are followed.
- Binary heaps are commonly used in priority queues and heap sort algorithms because of their efficient insertion and deletion operations.

### How is Binary Heap represented? 

A Binary Heap is a ****Complete Binary Tree****. A binary heap is typically represented as an array.

- The root element will be at `arr[0]`.
- The below table shows indices of other nodes for the `i`th node, i.e., `arr[i]`:

|                |                              |
| -------------- | ---------------------------- |
| `arr[(i-1)/2]` | Returns the parent node      |
| `arr[(2*i)+1]` | Returns the left child node  |
| `arr[(2*i)+2]` | Returns the right child node |

The traversal method use to achieve Array representation is [Level Order Traversal](https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/). Please refer to [Array Representation Of Binary Heap](https://www.geeksforgeeks.org/dsa/array-representation-of-binary-heap/) for details.

## Defining operations in a Binary Heap

### Heapify

```cpp
// A recursive method to heapify a subtree with the root at given index
// This method assumes that the subtrees are already heapified
void MinHeap::MinHeapify(int i)
{
    int l = left(i);
    int r = right(i);
    int smallest = i;
    if (l < heap_size && harr[l] < harr[i])
        smallest = l;
    if (r < heap_size && harr[r] < harr[smallest])
        smallest = r;
    if (smallest != i)
    {
        swap(&harr[i], &harr[smallest]);
        MinHeapify(smallest);
    }
}
```

Heapify basically places the key at index `i` in its right position, for this it chooses the minimum (or maximum in case of maxHeap) from its children and swaps it with the current value and goes into that child (recursion).

### Extract

```cpp
// Method to remove minimum element (or root) from min heap
int MinHeap::extractMin()
{
    if (heap_size <= 0)
        return INT_MAX;
    if (heap_size == 1)
    {
        heap_size--;
        return harr[0];
    }

    // Store the minimum value, and remove it from heap
    int root = harr[0];
    harr[0] = harr[heap_size - 1];
    heap_size--;
    MinHeapify(0);

    return root;
}
```

We basically store the root node (since that is the min or max) and then rewrite the root with the last element and call `heapify` to place it in the right position. The size decreases by 1, and is very efficient since we only move one subtree of numbers (`log(n)` numbers) and not all numbers.

### Modify Key

This will be `decreaseKey` for minHeaps and `increaseKey` for maxHeaps.

```cpp
// Decreases value of key at index 'i' to new_val.  It is assumed that
// new_val is smaller than harr[i].
void MinHeap::decreaseKey(int i, int new_val)
{
    harr[i] = new_val;
    while (i != 0 && harr[parent(i)] > harr[i])
    {
        swap(&harr[i], &harr[parent(i)]);
        i = parent(i);
    }
}
```

The new value is compared to its parent and swaped and then we check the parent and its parent. This is done until the key is in its right position.

### Delete Key

```cpp
// This function deletes key at index i. It first reduced value to minus
// infinite, then calls extractMin()
void MinHeap::deleteKey(int i)
{
    decreaseKey(i, INT_MIN);
    extractMin();
}
```

We simply decrease (or increase in case of maxHeap) to the minimum possible value (so it becomes root) and then extract and discard the value.

### Insert Key

```cpp
// Inserts a new key 'k'
void MinHeap::insertKey(int k)
{
    if (heap_size == capacity)
    {
        cout << "\nOverflow: Could not insertKey\n";
        return;
    }

    // First insert the new key at the end
    heap_size++;
    int i = heap_size - 1;
    harr[i] = k;

    // Fix the min heap property if it is violated
    while (i != 0 && harr[parent(i)] > harr[i])
    {
        swap(&harr[i], &harr[parent(i)]);
        i = parent(i);
    }
}
```

We add the key as the last child to keep the complete binary tree property satisfied, then we compare with the parent iteratively to make sure it is in its right position.

## Complete Code for minHeap

```cpp
// A C++ program to demonstrate common Binary Heap Operations
#include <climits>
#include <iostream>
using namespace std;

// Prototype of a utility function to swap two integers
void swap(int *x, int *y);

// A class for Min Heap
class MinHeap
{
    int *harr;     // pointer to array of elements in heap
    int capacity;  // maximum possible size of min heap
    int heap_size; // Current number of elements in min heap
  public:
    // Constructor
    MinHeap(int capacity);

    // to heapify a subtree with the root at given index
    void MinHeapify(int i);

    int parent(int i)
    {
        return (i - 1) / 2;
    }

    // to get index of left child of node at index i
    int left(int i)
    {
        return (2 * i + 1);
    }

    // to get index of right child of node at index i
    int right(int i)
    {
        return (2 * i + 2);
    }

    // to extract the root which is the minimum element
    int extractMin();

    // Decreases key value of key at index i to new_val
    void decreaseKey(int i, int new_val);

    // Returns the minimum key (key at root) from min heap
    int getMin()
    {
        return harr[0];
    }

    // Deletes a key stored at index i
    void deleteKey(int i);

    // Inserts a new key 'k'
    void insertKey(int k);
};

// Constructor: Builds a heap from a given array a[] of given size
MinHeap::MinHeap(int cap)
{
    heap_size = 0;
    capacity = cap;
    harr = new int[cap];
}

// Inserts a new key 'k'
void MinHeap::insertKey(int k)
{
    if (heap_size == capacity)
    {
        cout << "\nOverflow: Could not insertKey\n";
        return;
    }

    // First insert the new key at the end
    heap_size++;
    int i = heap_size - 1;
    harr[i] = k;

    // Fix the min heap property if it is violated
    while (i != 0 && harr[parent(i)] > harr[i])
    {
        swap(&harr[i], &harr[parent(i)]);
        i = parent(i);
    }
}

// Decreases value of key at index 'i' to new_val.  It is assumed that
// new_val is smaller than harr[i].
void MinHeap::decreaseKey(int i, int new_val)
{
    harr[i] = new_val;
    while (i != 0 && harr[parent(i)] > harr[i])
    {
        swap(&harr[i], &harr[parent(i)]);
        i = parent(i);
    }
}

// Method to remove minimum element (or root) from min heap
int MinHeap::extractMin()
{
    if (heap_size <= 0)
        return INT_MAX;
    if (heap_size == 1)
    {
        heap_size--;
        return harr[0];
    }

    // Store the minimum value, and remove it from heap
    int root = harr[0];
    harr[0] = harr[heap_size - 1];
    heap_size--;
    MinHeapify(0);

    return root;
}

// This function deletes key at index i. It first reduced value to minus
// infinite, then calls extractMin()
void MinHeap::deleteKey(int i)
{
    decreaseKey(i, INT_MIN);
    extractMin();
}

// A recursive method to heapify a subtree with the root at given index
// This method assumes that the subtrees are already heapified
void MinHeap::MinHeapify(int i)
{
    int l = left(i);
    int r = right(i);
    int smallest = i;
    if (l < heap_size && harr[l] < harr[i])
        smallest = l;
    if (r < heap_size && harr[r] < harr[smallest])
        smallest = r;
    if (smallest != i)
    {
        swap(&harr[i], &harr[smallest]);
        MinHeapify(smallest);
    }
}

// A utility function to swap two elements
void swap(int *x, int *y)
{
    int temp = *x;
    *x = *y;
    *y = temp;
}

// Driver program to test above functions
int main()
{
    MinHeap h(11);
    h.insertKey(3);
    h.insertKey(2);
    h.deleteKey(1);
    h.insertKey(15);
    h.insertKey(5);
    h.insertKey(4);
    h.insertKey(45);
    cout << h.extractMin() << " ";
    cout << h.getMin() << " ";
    h.decreaseKey(2, 1);
    cout << h.getMin();
    return 0;
}
```

# References
https://www.geeksforgeeks.org/dsa/binary-heap/
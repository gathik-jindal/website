13th Jun '24, 15:10pm

Status: #Completed #ProperNotes 

Tags: [[GNU C++ PBDS]] [[Sorting]]

# Ordered Set

Ordered set is a policy based data structure in g++ that keeps ==unique elements in sorted order==. It ==performs== all the ==operations as a set== in $log(n)$ complexity and performs two ==additional operations== also in $log(n)$ complexity:
	- `order_of_key(x)`: Number of items strictly smaller than `x`. 
	- `find_by_order(x)`: returns an iterator to the `x`-th largest element in a set (counting from 0).

### Header Files

For implementing ordered set and GNU C++ library contains other Policy based data structures we need to include :

```c++
include <ext/pb_ds/assoc_container.hpp> // Common file
```

### Namespace

Namespace, which we will have to work in newer versions of C++ is called `__gnu_pbds;`, earlier it was called `pb_ds;`
```c++
using namespace __gnu_pbds;
```

### Tree-Based Container

The tree-based container has the following declaration:

```c++
template <
    typename Key,                     // Key type
    typename Mapped,                  // Mapped-policy
    typename Cmp_Fn = std::less<Key>, // Key comparison functor
    typename Tag = rb_tree_tag,       // Specifies which underlying data structure to use
    template <
        typename Const_Node_Iterator,
        typename Node_Iterator,
        typename Cmp_Fn_,
        typename Allocator_>
    class Node_Update = null_node_update,      // A policy for updating node invariants
    typename Allocator = std::allocator<char>> // An allocator type
class tree;
```

`Tag` — class denoting a tree structure, which we will use. There are ==three base-classes provided in STL for this==, it is `rb_tree_tag` (red-black tree), `splay_tree_tag` (splay tree) and `ov_tree_tag` (ordered-vector tree). Sadly, ==at competitions we can use only red-black trees== for this because ==splay tree and OV-tree using linear-timed split operation== that prevents us to use them.

`Node_Update` — class denoting policy for updating node invariants. By default it is set to `null_node_update`, ie, additional information not stored in the vertices. In addition, C++ implemented an update policy `tree_order_statistics_node_update`, which, in fact, carries the necessary operations. Consider them.

Most likely, the best way to set the tree is as follows:

```c++
typedef tree<
	int,
	null_type,
	less<int>,
	rb_tree_tag,
	tree_order_statistics_node_update>
	ordered_set;
```

If we want to get ==map== but not the set, as the ==second argument type== must be used ==mapped type==. 

Optionally, we could also make it a multi set, refer [here](https://codeforces.com/blog/entry/88193) on how.
>In short we use the `less_equal<data_type>` as the `Cmp_Fn`, and the two functions `s.lower_bound()`, `s.upper_bound()` ==exchange their functions for any value==.

### Example

Example code for ordered-set:

```c++
ordered_set x;

x.insert(1);
x.insert(2);
x.insert(3);
x.insert(5);
x.insert(6);
x.insert(4);

// order is basically the number of elements that satisfy the cmp_fn
cout << *x.find_by_order(1) << endl; // 2
cout << *x.find_by_order(3) << endl; // 4
cout << *x.find_by_order(5) << endl; // 6
cout << (end(x)==x.find_by_order(6)) << endl; // true

cout << x.order_of_key(-1) << endl; // 0
cout << x.order_of_key(1) << endl; // 0
cout << x.order_of_key(6) << endl; // 5
cout << x.order_of_key(400) << endl; // 6
```

Useful links:  
- [Documentation of pb_ds](http://gcc.gnu.org/onlinedocs/libstdc++/manual/policy_data_structures_design.html)  
- [Testing of pb_ds](http://gcc.gnu.org/onlinedocs/libstdc++/manual/policy_based_data_structures_test.html)  
- [Using of pb_ds](http://gcc.gnu.org/onlinedocs/libstdc++/manual/policy_data_structures_using.html)  
- [Demonstration of order_statistics_tree](http://www.opensource.apple.com/source/llvmgcc42/llvmgcc42-2336.9/libstdc++-v3/testsuite/ext/pb_ds/example/tree_order_statistics.cc)  
- [Demonstration of trie with prefix search](http://www.opensource.apple.com/source/llvmgcc42/llvmgcc42-2336.9/libstdc++-v3/testsuite/ext/pb_ds/example/trie_prefix_search.cc)  
- [Operations with intervals with handwritten update policy class](http://www.opensource.apple.com/source/llvmgcc42/llvmgcc42-2336.9/libstdc++-v3/testsuite/ext/pb_ds/example/tree_intervals.cc)  
- [More examples from that site](http://www.opensource.apple.com/source/llvmgcc42/llvmgcc42-2336.9/libstdc++-v3/testsuite/ext/pb_ds/example/)

# References
https://codeforces.com/blog/entry/11080
https://www.geeksforgeeks.org/ordered-set-gnu-c-pbds/
15th Jun '24, 15:16pm

Status: #Completed #Small 

Tags: [[Compi-Coding]]

# Small To Large Merging

A way to merge two or more sets efficiently.

Instead of merging the sets, by either randomly choosing a set and adding all the elements of the other in it or by adding elements of the sets to a new set. ==Simply choosing the bigger set and inserting all the elements of the smaller set into the bigger set saves a ton of time==.

## Proof

**Claim:** The solution runs in ${O}(N\log^2N)$ time. ($N$ being the number of total elements)

**Proof:** When merging two sets, ==you move from the smaller set to the larger set==. If the size of the smaller set is $X$, then the ==size of the resulting set is at least== $2X$. Thus, an element that has been moved $Y$ times will be in a set of size at least $2^Y$, and since the maximum size of a set is $N$ (the root), each element will be moved at most $O(logN)$ times.

## Generalizing

We can also merge other standard library data structures such as `std::map` or `std:unordered_map` in the same way. However, [`std::swap`](https://en.cppreference.com/w/cpp/algorithm/swap) does not always run in $O(1)$ time. For example, swapping [`std::array`](http://www.cplusplus.com/reference/array/array/swap/)s takes time linear in the sum of the sizes of the arrays, and the same goes for [GCC policy-based data structures](https://codeforces.com/blog/entry/11080) such as `__gnu_pbds::tree` or `__gnu_pbds::gp_hash_table`.

==To swap two policy-based data structures== `a` and `b` in $O(1)$ time, use `a.swap(b)` instead. Note that for standard library data structures, `swap(a,b)` is equivalent to `a.swap(b)`.

# References
https://codeforces.com/blog/entry/103064
https://usaco.guide/plat/merging?lang=cpp
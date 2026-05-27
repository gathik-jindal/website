24th Jun '24, 12:36pm

Status: #Small #ProperNotes #Completed 

Tags: [[Compi-Coding]] [[Data Structures and Algorithms]]

# Map VS Unordered Map

Differences between the two:

|                | `Map`                                     | `Unordered Map`                           |
| -------------- | ----------------------------------------- | ----------------------------------------- |
| Ordering       | Increasing order of keys (Default order)  | No Ordering                               |
| Implementation | Self balancing BST, like Red - Black Tree | Hash Table                                |
| Search Time    | log(n)                                    | $O(1)$ -> Average<br>$O(n)$ -> Worst Case |
| Insertion Time | log(n) + Rebalance                        | Same as search                            |
| Deletion Time  | log(n) + Rebalance                        | Same as search                            |

In competitive programming the `unordered map` even though looks efficient actually blows up and goes to worst case. So `map` turns out to be more efficient and does not cause TLE.

A great example is the in question: [1986E - Beautiful Arrays](https://codeforces.com/contest/1986/problem/E)
Also I had a discussion with [Crystally](https://codeforces.com/profile/Crystally) about this.
# References
https://www.geeksforgeeks.org/map-vs-unordered_map-c/
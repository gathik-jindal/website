28th Apr '26, 12:44pm

Status: #InProgress #ProperNotes 

Tags: [[Compi-Coding]] [[Graphs]] [[Undirected Graph]] 

# Topological Sorting

## Using DFS

Topological sorting is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge from a vertex u to a vertex v (u → v), u appears before v in the ordering. Since the graph is acyclic, we can process vertices in a way that ensures dependencies are respected. The DFS-based approach works by exploring each vertex’s outgoing edges fully before marking it as finished. Once a vertex has no unvisited neighbors, we record it. This guarantees that all dependencies of a vertex are placed earlier in the order. At the end, reversing this finishing order yields a valid topological sorting.

- Initialize a visited array to mark whether each vertex has been visited.
- Create a stack to store vertices in their finishing order.
- For each vertex, if it has not been visited, perform a DFS starting from it.
- In DFS, mark the current vertex as visited.
- For each neighbor of the current vertex, if unvisited, recursively call DFS on it.
- After exploring all neighbors, push the current vertex onto the stack.
- After DFS finishes for all vertices, pop all elements from the stack to get the topological ordering.

## Using BFS

Instead of relying on DFS and recursion, this method works by keeping track of the in-degree of each vertex, which represents the number of incoming edges to that vertex. Any vertex with an in-degree of zero has no prerequisites and can therefore safely appear first in the topological order.

- Initialize an array to store the in-degree of each vertex as zero.
- Build the adjacency list for the graph.
- For each directed edge, increment the in-degree of the destination vertex.
- Create a queue and enqueue all vertices with in-degree zero.
- Initialize an empty list to store the topological order.
- While the queue is not empty:
    - Remove the front vertex from the queue and add it to the order list.
    - For each neighbor of this vertex, reduce its in-degree by one.
    - If a neighbor’s in-degree becomes zero, enqueue it.
- Return the order list as the topological sort.

# References
https://takeuforward.org/data-structure/topological-sort-algorithm-dfs-g-21
29th May '26, 12:37pm

Status: #ProperNotes #Completed 

Tags: [[Compi-Coding]] [[Data Structures and Algorithms]]

# Dijkstra's Shortest Path Algorithm

Problem statement: Given a ****weighted undirected**** graph and a source vertex `src`. We need to find the shortest path distances from the source vertex to all other vertices in the graph.  
****Note:**** The given graph does not contain any negative edge. This algorithm fails when negative edges are introduce.

>[!Idea] The idea is to maintain distance using an array dist[] from the given source to all vertices. The distance array is initialized as infinite for all vertexes and 0 for the given source We also maintain two sets,
>
>- One set contains vertices included in the shortest-path tree,
>- The other set includes vertices not yet included in the shortest-path tree.
>
>At every step of the algorithm, find a vertex that is in the other set (set not yet included) and has a minimum distance from the source. Once we pick a vertex, we update the distance of its adjacent if we get a shorter path through it.

> The idea of two sets might be deceiving but that's how it is thought of in general.

### Use of [[Priority Queue]]

The priority queue always selects the node with the smallest current distance, ensuring that we explore the shortest paths first and avoid unnecessary processing of longer paths. Dijkstra’s algorithm always picks the node with the minimum distance first. By doing so, it ensures that the node has already checked the shortest distance to all its neighbors. If this node appears again in the priority queue later, we don’t need to process it again, because its neighbors have already checked the minimum possible distances.

### Code

```cpp
const int INF = 1000000000;
vector<vector<pair<int, int>>> adj;

void dijkstra(int s, vector<int> & d, vector<int> & p) {
    int n = adj.size();
    d.assign(n, INF);
    p.assign(n, -1);
    vector<bool> u(n, false);

    d[s] = 0;
    for (int i = 0; i < n; i++) {
        int v = -1;
        for (int j = 0; j < n; j++) {
            if (!u[j] && (v == -1 || d[j] < d[v]))
                v = j;
        }

        if (d[v] == INF)
            break;

        u[v] = true;
        for (auto edge : adj[v]) {
            int to = edge.first;
            int len = edge.second;

            if (d[v] + len < d[to]) {
                d[to] = d[v] + len;
                p[to] = v;
            }
        }
    }
}
```

# References
https://www.geeksforgeeks.org/dsa/dijkstras-shortest-path-algorithm-greedy-algo-7/
https://cp-algorithms.com/graph/dijkstra.html
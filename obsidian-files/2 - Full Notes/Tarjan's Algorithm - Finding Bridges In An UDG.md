29th Jun '24, 08:33am

Status: #Completed #ProperNotes 

Tags: [[Graphs]] [[Undirected Graph]] [[Data Structures and Algorithms]] [[Compi-Coding]]

# Finding Bridges In An UDAG

*Definition of a Bridge*: A bridge in a graph is an edge, who's removal creates two [[Strongly Connected Components]] (its proven that the removal of an edge cannot create more two connected components).

## Algorithm

The algorithm is hard to formally explain, but I will try my best to explain it as simply as possible from a implementation point of view.

We store two properties of a node:

1) **Discovery Time**: Time it was discovered.
2) **Lowest Discovery Time**: The lowest Discovery Time of its children.

This is known by different names in different sources, but their function remains the same.

### Discovery Time

This is an integer that tells us when the node was discovered, or in more layman terms how many nodes have been discovered before this node. Its also called `index`, `timer`, etc.

### Lowest Discovery Time

This is an integer that is the smallest of all the discovery time of its children. This is will be very useful later on, since this data will be a deciding factor in deciding if an edge connecting two nodes will be a bridge or not.

### Condition for an Edge to be Bridge

At a node, we look at its children nodes, and if their lowest discovery time (`min(discoveryTime, lowestDiscoveryTime)`) is greater than the node we are at, then the edge connecting this node to that node is a bridge.

*Explanation*: Its because, since at every node we assign its `discoverytime` to be the smallest of its children, we are essentially saying that if one of its children has already been visited then, it would have a discovery time of lesser or equal - updating our discovery time to that would suggest that this node is also reachable form that already visited node.

Instead, if we look at our children and see they have a discovery time greater, it would mean that the edge from the current node to them is the only edge that connects them.

### Edge Cases that you think will Break this Algorithm

*Case 1:* When a `parent` node point to multiple children, and one children connects the other. In such a case, if we go down one child, we are bound to reach the other child (`child1`) and assign it a higher discovery time than our `parent`. And at our parent the check will tell us that the edge from `parent` to `child1` is a bridge.

*Ans*: This wouldn't happen since at `child1` it would look at its children which would include `parent` and `child1`'s discovery time then would become the `parent`'s discovery time since its the least, and the check at `parent` would not tell that its a bridge.

## Pseudo Code

```JavaScript
algorithm tarjan is
    input: graph _G_ = (_V_, _E_)
    output: set of strongly connected components (sets of vertices)
   
    _index_ := 0
    _S_ := empty stack
    for each _v_ in _V_ do
        if _v_.index is undefined then
            strongconnect(_v_)
   
    function strongconnect(_v_)
        _// Set the depth index for v to the smallest unused index_
        _v_.index := _index_
        _v_.lowlink := _index_
        _index_ := _index_ + 1
        _S_.push(_v_)
        _v_.onStack := true
      
        _// Consider successors of v_
        for each (_v_, _w_) in _E_ do
            if _w_.index is undefined then
                _// Successor w has not yet been visited; recurse on it_
                strongconnect(_w_)
                _v_.lowlink := min(_v_.lowlink, _w_.lowlink)
            else if _w_.onStack then
                _// Successor w is in stack S and hence in the current SCC_
                _// If_ w _is not on stack, then (_v_,_ w_) is an edge pointing to an SCC already found and must be ignored_
                _// See below regarding the next line_
                _v_.lowlink := min(_v_.lowlink, _w_.index)
      
        _// If v is a root node, pop the stack and generate an SCC_
        if _v_.lowlink = _v_.index then
            start a new strongly connected component
            repeat
                _w_ := _S_.pop()
                _w_.onStack := false
                add _w_ to current strongly connected component
            while _w_ ≠ _v_
            output the current strongly connected component
```

# References
https://www.youtube.com/watch?v=qrAub5z8FeA
https://en.wikipedia.org//wiki/Tarjan's_strongly_connected_components_algorithm
https://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/
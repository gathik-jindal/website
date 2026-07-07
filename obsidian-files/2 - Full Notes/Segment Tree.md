7th Jul '26, 12:42pm

Status: #Completed  #ProperNotes 

Tags: [[Compi-Coding]] [[Trees]] [[Data Structures and Algorithms]]

# Segment Tree

A segment Tree is could be used for many things, here I give an example of a frequency counter segment tree. This segment tree gives us the count of elements in a certain range in $O(log(n))$ time complexity, insertion of an element is $O(log(n))$ time complexity. This works by storing the frequency of a particular element in the leaf nodes, the non leaf nodes contain the sum of frequency of the right subtree and left subtree. And via the `rangeSum` query we can query the sum of frequencies in a particular desired range.

## Code

```cpp
class SegTree
{
public:
    int size;
    vector<long long> arr;

    SegTree(int n)
    {
        size = 1;
        while (size < n)
        {
            size *= 2;
        }
        arr.assign(2 * size - 1, 0);
    }

    void update(int i, int val)
    {
        arr[size + i - 1] += val;
        i = ((size + i - 1) - 1) >> 1;
        while (i >= 0)
        {
            arr[i] = arr[(i << 1) + 1] + arr[(i << 1) + 2];
            i = (i - 1) >> 1;
        }
    }
  
    long long rangeSum(int l, int r, int lx, int rx, int i)
    {
        if (l <= lx and r >= rx)
        {
            return arr[i];
        }

        if (r < lx || l > rx)
            return 0;

        int m = (lx + rx) / 2;
        return rangeSum(l, r, lx, m, (i << 1) + 1) + rangeSum(l, r, m + 1, rx, (i << 1) + 2);
    }

    long long rangeSum(int l, int r)
    {
        return rangeSum(l, r, 0, size - 1, 0);
    }
};
```

## Applications

### [327. Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/)

Given an integer array `nums` and two integers `lower` and `upper`, return _the number of range sums that lie in_ `[lower, upper]` _inclusive_.
Range sum `S(i, j)` is defined as the sum of the elements in `nums` between indices `i` and `j` inclusive, where `i <= j`.

**Constraints:**
- `1 <= nums.length <= 105`
- `-231 <= nums[i] <= 231 - 1`
- `-105 <= lower <= upper <= 105`
- The answer is **guaranteed** to fit in a **32-bit** integer.

Here, we see that we have to find the number of $i$ and $j$ such that they follow the below conditions:
- $i > j$
- $lower \leq prefSum[i] - prefSum[j] \leq upper$

Here we will do some mathematics trickery by modifying the second equation.

Given the condition for a valid range sum:

$$lower \le \text{prefSum}[i] - \text{prefSum}[j] \le upper$$

We can break this into two separate inequalities to isolate $\text{prefSum}[j]$:

**1. The Lower Bound:**

$$lower \le \text{prefSum}[i] - \text{prefSum}[j]$$

$$\text{prefSum}[j] \le \text{prefSum}[i] - lower \quad \text{--- (1)}$$

**2. The Upper Bound:**

$$\text{prefSum}[i] - \text{prefSum}[j] \le upper$$

$$\text{prefSum}[i] - upper \le \text{prefSum}[j] \quad \text{--- (2)}$$

**Combining (1) and (2):**

$$\text{prefSum}[i] - upper \le \text{prefSum}[j] \le \text{prefSum}[i] - lower$$

So now, as we loop through `prefSum` we keep adding the seen sums to the segment tree and query for the current index.

Try solving [3739. Count Subarrays With Majority Element II](https://leetcode.com/problems/count-subarrays-with-majority-element-ii/).

Most Segment Tree questions require one to modify the given input to fit into this data structure, it cannot be used directly or with very little modifications.

# References
My memory and old leetcode questions I solved.
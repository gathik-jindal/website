2nd Jun '24, 07:09am

Status: #Completed #ProperNotes 

Tags: [[CRLS]] [[Data Structures and Algorithms]]

# Introduction

There are multiple ways to explain what "Loop Invariant" is, here are some offered by different websites,

##### Stackoverflow
> In simple words, a loop invariant is some predicate (condition) that holds for every iteration of the loop. For example, let's look at a simple `for` loop that looks like this:
> 
>`int j = 9;`
>`for(int i=0; i<10; i++)  `
>	`j--;`
> 
> In this example it is true (for every iteration) that `i + j == 9`. A weaker invariant that is also true is that `i >= 0 && i <= 10`.

##### Scranton
>A loop invariant is a condition [among program variables] that is necessarily true immediately before and immediately after each iteration of a loop. (Note that this says nothing about its truth or falsity part way through an iteration.)

##### Wikipedia
>In [computer science](https://en.wikipedia.org/wiki/Computer_science), a **loop invariant** is a property of a [program](https://en.wikipedia.org/wiki/Computer_program "Computer program") [loop](https://en.wikipedia.org/wiki/Control_flow#Loops "Control flow") that is true before (and after) each iteration. It is a [logical assertion](https://en.wikipedia.org/wiki/Logical_assertion "Logical assertion"), sometimes checked with a code [assertion](https://en.wikipedia.org/wiki/Assertion_(software_development) "Assertion (software development)"). Knowing its invariant(s) is essential in understanding the effect of a loop.

#### CRLS

Loop Invariants help us ==understand why an algorithm is correct==. When you're using a loop invariant ==we need to show three things==:

1) **Initialization:** It is ==true prior to the first iteration== of the loop.
2) **Maintenance:** If it is true before an iteration of the loop, it remains true before the ==next==
				iteration.
3) **Termination:** The loop terminates, and when it terminates, the invariant--usually along
				with the reason that they loop terminated--gives us a ==useful property==
				that helps show that the algorithm is correct.

When the first two properties hold, the loop invariant is ==true prior to every iteration== of the loop. A loop invariant proof is ==a form of mathematical induction, where to prove that a property holds, you prove a base case and an inductive step==. ==Here, showing that the invariant holds before the first iteration corresponds to the inductive step==.

The ==third property== is perhaps the most ==important== one, since you are using the loop invariant to show correctness. ==Mathematical induction typically applies the inductive step infinitely, but in a loop invariant the "induction" stops when the loop terminates==.

## References
https://stackoverflow.com/questions/3221577/what-is-a-loop-invariant
https://www.cs.scranton.edu/~mccloske/courses/cmps144/invariants_lec.html
https://en.wikipedia.org/wiki/Loop_invariant
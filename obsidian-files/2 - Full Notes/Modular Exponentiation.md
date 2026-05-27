14th Jun '24, 19:26pm

Status: #Completed #Small 

Tags: [[Compi-Coding]] [[Maths]]

# Modular Exponentiation

**Problem Statement**: Given three numbers x, y and z compute $(x^y)\%z$

*Method 1:*
```c++
/* Iterative Function to calculate (x^y)%p in O(log y) */
#include <iostream>
using namespace std;

int power(int x, int y, int p)
{

	// Initialize answer
	int res = 1;

	// Check till the number becomes zero
	while (y > 0) {

		// If y is odd, multiply x with result
		if (y % 2 == 1)
			res = (res * x);

		// y = y/2
		y = y >> 1;

		// Change x to x^2
		x = (x * x);
	}
	return res % p;
}
```

*Method 2: (more efficient, since no overflow occurs)*
```c++
// Iterative C++ program to compute modular power 
#include <iostream>
using namespace std;

/* Iterative Function to calculate (x^y)%p in O(log y) */
int power(long long x, unsigned int y, int p) 
{ 
	int res = 1;	 // Initialize result 

	x = x % p; // Update x if it is more than or 
				// equal to p

	if (x == 0) return 0; // In case x is divisible by p;

	while (y > 0) 
	{ 
		// If y is odd, multiply x with result 
		if (y & 1) 
			res = (res*x) % p; 

		// y must be even now 
		y = y>>1; // y = y/2 
		x = (x*x) % p; 
	} 
	return res; 
}
```

## Why is method 2 better?

The problem with *method 1* is, overflow may occur for large values of n or x. Therefore, power is generally evaluated under the module of a large number. Below is the fundamental modular property that is used for efficient computing power under modular arithmetic.

$\large(ab) \% p = ( (a \% p) (b \% p) ) \% p$

# References
https://www.geeksforgeeks.org/modular-exponentiation-power-in-modular-arithmetic/
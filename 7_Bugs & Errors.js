// Bugs & Errors - Exercise

/**
 * Retry
 * 
 * Say you have a function primitiveMultiply(),
 * which in 20 percent of cases multiplies two numbers and 
 * in the other 80 percent of cases raises an exception of type MultiplicatorUnitFailure. 
 * 
 * Write a function that wraps this clunky function and 
 * just keeps trying until a call succeeds, after which it returns the result.
 * Make sure you handle only the exceptions you are trying to handle.
 */
// Answer

 // first, let's inherit the in-built Error class
class MultiplicatorUnitFailure extends Error {}


function primitiveMultiply(a,b) {
    // since 20% == 0.2
    // we use random() to auto-generate cases (numbers)
    if(Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure('Failed');
    }
}


function sureMultiply(a,b) {
    for(;;) {
        try {
            return primitiveMultiply(a,b);
        } catch(e) {
            if(!(e instanceof MultiplicatorUnitFailure))
                throw e;
        }
    }
}

// sanity check
// console.log(sureMultiply(2,4))
// → 8
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


/**
 * The locked box
 * 
 * Consider the box object (below):
 * It is a box with a lock. 
 * There is an array in the box, but you can get at it only when the box is unlocked. 
 * Directly accessing the private _content property is forbidden.
 * 
 * Write a function called withBoxUnlocked() 
 * that takes a function value as argument, unlocks the box, runs the function,
 * and then ensures that the box is locked again before returning,
 * regardless of whether the argument function returned normally or threw an exception.
 * 
 * For extra points, make sure that if you call withBoxUnlocked() 
 * when the box is already unlocked, the box stays unlocked.
 * 
 * Hint:
 * This exercise calls for a "finally" block. 
 * Your function should first unlock the box and then 
 * call the argument function from inside a "try" block. 
 * After it should lock the box again within the "finally" block.
 * 
 * To make sure we don’t lock the box when it wasn’t already locked, 
 * check its lock at the start of the function and unlock and 
 * lock it only when it started out locked.
 */
// box Object
const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};


function withBoxUnlocked(func) {
    let islocked = box.locked;
    if(!islocked) {
        return func();
    }

    box.unlock();
    try {
        return func();
    } finally {
        box.lock();
    }
}


// sanity check
withBoxUnlocked(function(){
    box.content.push('Accepted');
});

// sanity check
try {
    withBoxUnlocked(function() {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised:", e);
}


// console.log(box.locked);
// → true
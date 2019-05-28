// Higher-Order Functions - Exercise

/** 
 * Flattening
 * 
 * Use the reduce method in combination with the concat method to “flatten” an array of arrays
 * into a single array that has all the elements of the original arrays.
 */
// Answer
let arrayNested = [
    [1,2,3,4], [5,6,7], [8,9,0]
];

console.log( 
    // reduce() and concat() methods are properties from Array.protoype 

    // - reduce()executes the reducer function (provided by user ) on each element of the array,
    //   resulting in a single output value e.g. array1.reduce(reducer), where reducer function
    //   takes 4 arguments -> Accumulator, Current Value, Current Index, and Source Array.
    //   In our case; Accumulator is "flat", Current Value is "current", 
    //                Current Index is "[]", Source Array is "arrayNested".

    // - concat() is used to merge two/more arrays e.g. array1.concat(array2)
    arrayNested.reduce((flat, current) => flat.concat(current), [])
)


/**
 * Your own loop
 * 
 * Write a higher-order function loop that provides something like a for loop statement. 
 * It takes a value, a test function, an update function, and a body function. 
 * At each iteration, it first runs the test function on the current loop value and 
 * stops if that returns false. Then it calls the body function, giving it the current value. 
 * Finally, it calls the update function to create a new value and starts from the beginning.
 * 
 * When defining the function, you can use a regular loop to do the actual looping.
 */

function highLoop(start, test, update, body){
    for(let value = start; test(value); value = update(value)){
        body(value);
    }
}

// example of usage:
// highLoop(5, n=> n>0, n=> n-1, console.log)

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


/**
 * Everything
 * 
 * Analogous to the some() method, arrays also have an every() method. 
 * This one returns "true" when the given function returns "true" for every element in the array.
 * In a way, some() is a version of the || operator that acts on arrays, 
 * and every() is like the && operator.
 * 
 * Implement every() as a function that takes an array and a predicate function as parameters. 
 * Write two versions, one using a loop and one using the some() method.
 * 
 * Hint-1:
 * Like the && operator, the every() method can stop evaluating further elements 
 * as soon as it has found one that doesn’t match. 
 * So the loop-based version can jump out of the loop—with break or 
 * return—as soon as it runs into an element for which the predicate function returns "false". 
 * If the loop runs to its end without finding such an element, 
 * we know that all elements matched and we should return true.
 * 
 * Hint-2:
 * To build every() on top of some(), we can apply De Morgan’s laws, 
 * which state that a && b = !(!a || !b). This can be generalized to arrays, 
 * where all elements in the array match if there is no element in the array that does not match.
 */
// My solution
// function every(array, fn){
//     let result = true;
//     for(const element of array){
//         result = result && fn(element);
//     }
//     return result;
// }

// Answer-1: has high-level abstraction
function every(array, predicate) {
    for (let element of array) {
      if (!predicate(element)) return false;
    }
    return true;
}

// Answer-2: One needs to comprehend the logic
function every2(array, predicate) {
    return !array.some(element => !predicate(element));
}

// Usage
// console.log(every([1, 3, 5], n => n < 10));
// → true
// console.log(every([2, 4, 16], n => n < 10));
// → false
// console.log(every([], n => n < 10));
// → true


/**
 * Dominant writing direction
 * 
 * Write a function that computes the dominant writing direction in a string of text. 
 * Remember that each script object has a direction property that can be "ltr" (left to right), 
 * "rtl" (right to left), or "ttb" (top to bottom).
 * 
 * Hint:
 * The dominant direction is the direction of a majority of the characters 
 * that have a script associated with them. 
 * The characterScript() and countBy() functions defined earlier, in the chapter, are useful here.
 * You have to count characters by a criterion based on characterScript() and then 
 * filter out the part of the result that refers to uninteresting (script-less) characters.
 * Finding the direction with the highest character count can be done with reduce(). 
 */

// countBy() - expects a collection (anything that we can loop over with for/of), 
// and a function that computes a group name for a given element.
// It returns an array of objects, each of which names a group and 
// tells you the number of elements that were found in that group.
function countBy(items, groupName) {    
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);

        if (known == -1) {
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

// use case
// console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]


// characterScript() - Remember that each script has an array of character code ranges 
// associated with it, so given a character code we can find the corresponding script (if any)
function characterScript(code) {
    for (let script of SCRIPTS) {
        // some() is a higher-order function. It takes a test function and 
        // tells you if that function returns "true" for any of the elements in the array
        if (script.ranges.some(([from, to]) => { return code >= from && code < to; })) {
            return script;
        }
    }
    return null;
}

// use case
// console.log(characterScript(121));
// → {name: "Latin", ranges: Array(31), direction: "ltr", year: -700, living: false, …}


// Answer
function dominantDirection(text) {
    let counted = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({name}) => name != "none");
  
    if (counted.length == 0) return "ltr";
  
    return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}
  
// use case
//   console.log(dominantDirection("Hello!"));
// → ltr
//   console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
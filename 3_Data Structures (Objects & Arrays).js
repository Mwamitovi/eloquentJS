// Data Structures (Objects & Arrays) - Exercise

/**
 * The sum of a range
 * 
 * To compute the sum of a range of numbers, we can call sum(range(1, 10));
 * We need to define the sum() and range() functions.
 * 
 * First, write a range function that takes two arguments, start and end, 
 * and returns an array containing all the numbers from start up to (and including) end.
 * 
 * Then, write a sum function that takes an array of numbers and returns the sum of these numbers.
 * Run the example program and see whether it does indeed return 55.
 * 
 * Also, modify your range function to take an optional third argument that indicates 
 * the “step” value used when building the array. If no step is given, the elements go up 
 * by increments of one, corresponding to the old behavior. 
 * The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. 
 * Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].
 */
// My solution, was fat
// function range(x, y, z=1) {
//     let array = [];
//     if(x<y && z>0) {
//         for(let i=x; i<=y; i+=z) { array.push(i); }      
//     }
//     if(x>y && z<0) {
//         for(let i=x; i>=y; i+=z) { array.push(i); }      
//     }
//     return array;
// }
// Answer
function range(start, end, step = start < end ? 1 : -1) {
    let array = [];
  
    if (step > 0) {
      for (let i = start; i <= end; i += step) array.push(i);
    } else {
      for (let i = start; i >= end; i += step) array.push(i);
    }
    return array;
}


// My solution, was precise as the answer
function sum(array) {
    let result = 0;
    for(let element of array) {
        result += element;
    }
    return result;
}


/**
 * Reversing an Array
 * Arrays have a reverse method that changes the array by inverting the order 
 * in which its elements appear. 
 * 
 * Write two functions, reverseArray() and reverseArrayInPlace(). 
 * The first, reverseArray(), takes an array as argument 
 * and produces a new array that has the same elements in the inverse order. 
 * 
 * The second, reverseArrayInPlace(), does what the reverse method does: 
 * it modifies the array given as argument by reversing its elements. 
 * Neither may use the standard reverse method.
 * 
 * Hint: reverseArrayInPlace()
 * The trick is to swap the first and last elements, then the second and second-to-last, and so on. 
 * You can do this by looping over half the length of the array (use Math.floor to round down—you don’t 
 * need to touch the middle element in an array with an odd number of elements) 
 * and swapping the element at position [i] with the one at position [array.length - 1 - i]. 
 * You can use a local binding to briefly hold on to one of the elements, 
 * overwrite that one with its mirror image, and then put the value from the local binding 
 * in the place where the mirror image used to be.
 */
// My Solution has a bug
// reverseArray([1,2,3,4,5,7,8,9]);
// -> [4, 3, 2, 1]
// function reverseArray(array) {
//     let array1, array2 = [];
//     for(let i=0; i<array.length; i++) {
//         array1 = array.shift(array[i]);
//         array2.unshift(array1);
//     }
//     return array2;
// }
// Answer
function reverseArray(array) {
    let output = [];
    for (let i = array.length - 1; i >= 0; i--) {
        output.push(array[i]);
    }
    return output;
}

// Must admit, this was abit tricky to figure out
// Answer (this was a light bulb, when i understood it, lol)
function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let old = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = old;
    }
    return array;
}


/**
 * A list
 * 
 * Objects, as generic blobs of values, can be used to build all sorts of data structures.
 * A common data structure is the list (not to be confused with array). 
 * A list is a nested set of objects, with the first object holding a reference to the second, 
 * the second to the third, and so on...
 * 
 *  let list = {
 *      value: 1,
 *      rest: {
 *          value: 2,
 *          rest: {
 *              value: 3,
 *              rest: null
 *          }
 *      }
 *  };
 * 
 * A nice thing about lists is that they can share parts of their structure. 
 * For example, if I create two new values {value: 0, rest: list} and {value: -1, rest: list} 
 * (with list referring to the binding defined earlier), they are both independent lists, 
 * but they share the structure that makes up their last three elements. 
 * The original list is also still a valid three-element list.
 * 
 * Write a function arrayToList() that builds up a list structure,
 * like the one shown when given [1, 2, 3] as argument.
 * // Hint: arrayToList()
 * Building up a list is easier when done back to front. 
 * So arrayToList() could iterate over the array backwards and, for each element, 
 * add an object to the list.
 * You can use a local binding to hold the part of the list that was built so far and
 * use an assignment like list = {value: X, rest: list} to add an element.
 * 
 * Also write a listToArray() function that produces an array from a list.
 * // Hint: listToArray()
 * To run over a list (in listToArray and nth), a for loop specification like this can be used:
 *    for (let node = list; node; node = node.rest) {}
 * Every iteration of the loop, node points to the current sublist, 
 * and the body can read its value property to get the current element. 
 * At the end of an iteration, node moves to the next sublist.
 * When that is null, we have reached the end of the list, and the loop is finished.
 *  
 * Then add a helper function prepend(), which takes an element and a list and 
 * creates a new list that adds the element to the front of the input list, and nth(), 
 * which takes a list and a number and returns the element at the given position in the list 
 * (with zero referring to the first element) or undefined when there is no such element.
 * If you haven’t already, also write a recursive version of nth.
 * // Hint: nth()
 * The recursive version of nth() will, similarly, 
 * look at an ever smaller part of the “tail” of the list and 
 * at the same time count down the index until it reaches zero, 
 * at which point it can return the value property of the node it is looking at. 
 * To get the zeroth element of a list, you simply take the value property of its head node. 
 * To get element N + 1, you take the _N_th element of the list that’s in this list’s rest property.
 */
// Answer
function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = {value: array[i], rest: list};
    }
    return list;
}

// Answer
function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}

// Answer
function prepend(value, list) {
    return {value, rest: list};
}

// Answer
function nth(list, n) {
    if (!list) return undefined;
    else if (n == 0) return list.value;
    else return nth(list.rest, n - 1);
}


/**
 * Deep comparison
 * 
 * The == operator compares objects by identity. 
 * But sometimes you’d prefer to compare the values of their actual properties.
 * 
 * 
 * Write a function deepEqual() that takes two values and returns 'true' 
 * only if they are the same value or are objects with the same properties, 
 * where the values of the properties are equal when compared with a recursive call to deepEqual().
 * 
 * To find out whether values should be compared directly (use the === operator for that) or 
 * have their properties compared, you can use the typeof operator.
 * If it produces "object" for both values, you should do a deep comparison.
 * But you have to take one silly exception into account: 
 * because of a historical accident, typeof null also produces "object".
 * The Object.keys function will be useful when you need to go over 
 * the properties of objects to compare them.
 */
// Answer
function deepEqual(a, b) {
    if (a === b) return true;
    // Test if you are dealing with a real object, typeof x == "object" && x != null. 
    // Be careful to compare properties only when both arguments are objects. 
    // In all other cases you can just immediately return the result of applying ===.
    if (a == null || typeof a != "object" || b == null || typeof b != "object") return false;
    // Use Object.keys to go over the properties
    let keysA = Object.keys(a), keysB = Object.keys(b);
    // Check if both objects have the same number of properties 
    // (the lengths of the property lists are the same)
    if (keysA.length != keysB.length) return false;
    // When looping over one of the object’s properties to compare them,
    // always first make sure the other actually has a property by that name. 
    // If they have the same number of properties and all properties in one also exist in the other, 
    // they have the same set of property names.
    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }  
    return true;
}

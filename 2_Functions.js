// Functions - Exercise

/**
 * Minimum
 * 
 * Just like the standard function Math.min that returns its smallest argument,
 * Write a function min() that takes two arguments and returns their minimum. 
 */
// My solution
// function min(a, b){
//     if(a<b) return a;
//     if(a>b) return b;
// }
// Answer
function min(a, b) {
    if (a < b) return a;
    else return b;
}


/**
 * Recursion
 * 
 * We know that % (remainder operator) can test if a number is even or odd 
 * by using % 2 to see whether it’s divisible by two. 
 * Here’s another way to define if a positive whole number is even or odd:
 * • Zero is even, One is odd and any other number N, its evenness is the same as N - 2.
 * 
 * Define a recursive function isEven() corresponding to this description. 
 * The function should accept a single parameter (a positive, whole number) and return a Boolean.
 * Test it on 50 and 75. See how it behaves on -1. (Why? Can you think of a way to fix this?) 
 */
// My solution, returns "undefined" is negative argument
// function isEven(n) {
//     if(n==0) {
//         return "True";
//     } else if(n==1) {
//         return "False";
//     } else {
//         while(n>1){
//             n -= 2;
//             return isEven(n);
//         }
//     }
// }

function isEven(n) {
    if (n == 0) return true;
    else if (n == 1) return false;
    else if (n < 0) return isEven(-n);
    else return isEven(n - 2);
}


/**
 * Bean counting
 * 
 * You can get the Nth character, or letter, from a string by writing "string"[N].
 * The returned value will be a string containing only one character (for example, "b"). 
 * The first character has position 0, which causes the last one to be found at position string.length - 1. 
 * (In other words, a two-character string has length 2, and its characters have positions 0 and 1.)
 * 
 * Write a function countBs() that takes a string as its only argument and 
 * returns a number that indicates how many uppercase “B” characters there are in the string.
 */
// My solution
// function countBs(str) {
//     let count = 0;
//     for(let x=0; x<str.length; x++ ) {
//         if(str[x] == "B"){
//             count += 1;
//         }
//     }
//     return count;
// }
// More effective solution, turns out countChar() is a closure, withi countBs()
function countBs(string) {
    return countChar(string, "B");
}

/**
 * Next, write a function called countChar() that behaves like countBs(), 
 * except it takes a second argument that indicates the character that is to be counted
 * (rather than counting only uppercase “B” characters). 
 * Rewrite countBs() to make use of this new function.
 */
// Ok, my solution was efficient
function countChar(word, letter) {
    let count = 0;
    for(let i=0; i<word.length; i++ ) {
        if(str[i] == letter){
            count += 1;
        }
    }
    return count;
}

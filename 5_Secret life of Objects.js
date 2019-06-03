// Secret life of Objects - Exercise

/**
 * A vector type
 * 
 * Write a class Vec() that represents a vector in two-dimensional space. 
 * It takes x and y parameters (numbers), which it should save to properties of the same name.
 * 
 * Give the Vec prototype two methods, plus and minus, 
 * that take another vector as a parameter and return a new vector that has 
 * the sum or difference of the two vectors’ (this and the parameter) x and y values.
 * 
 * Add a getter property length to the prototype that computes the length of the vector,
 * that is, the distance of the point (x, y) from the origin (0, 0).
 */
// Answer
// ps: I got the declaration, right.
// the rest was tricky indeed
 class Vec {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    // For the class, we declare methods within it's direct scope
    // so these methods are packaged into the constructor's prototype

    plus(other){
        // returns a `new` vector, having added two vectors
        return new Vec(this.x + other.x, this.y + other.y);
    }

    minus(other){
        // returns a `new` vector, having subtracted two vectors
        return new Vec(this.x - other.x, this.y - other.y);
    }

    get length(){
        // returns distance of a point from the origin (0,0)
        // which is the square-root of the sum of the squared parameters
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
 }

// This is wrong, the prototype for class is 'implicit',
// so this, below, is wrong
// Vec.prototype.plus = function(){}
// Vec.prototype.minus = function(){}

// Here is a typical Vec() constructor
// function Vec(x,y){
//     this.x = x;
//     this.y = y;
//     this.length = Math.sqrt(this.x*this.x + this.y*this.y);
// }
// Vec.prototype.plus = function(other){
//     return new Vec(this.x + other.x, this.y + other.y);
// }
// Vec.prototype.minus = function(other){
//     return new Vec(this.x - other.x, this.y - other.y);
// }

// Use case for Vec()
// console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
// console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
// console.log(new Vec(3, 4).length);
// → 5


/**
 * Groups
 * 
 * The standard JavaScript environment provides another data structure called Set. 
 * Like an instance of Map(), a set holds a collection of values. But unlike Map, it does not 
 * associate other values with those—it just tracks which values are part of the set.
 * A value can be part of a set only once—adding it again doesn’t have any effect.
 * 
 * Write a class called Group (since Set is already taken). 
 * Like Set, it has add(), delete(), and has() methods. 
 * Its constructor creates an empty group, 
 * add() adds a value to the group (but only if it isn’t already a member), 
 * delete() removes its argument from the group (if it was a member), 
 * and has() returns a Boolean value indicating whether its argument is a member of the group.
 * 
 * Use the === operator, or something equivalent such as indexOf, 
 * to determine whether two values are the same.
 * 
 * Give the class a static from method that takes an iterable object as argument and
 * creates a group that contains all the values produced by iterating over it. 
 */
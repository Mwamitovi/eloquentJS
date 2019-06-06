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
// ps: I got the declaration, right. But the rest was tricky business.
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
 * Give the class a static from() method that takes an iterable object as argument and
 * creates a group that contains all the values produced by iterating over it. 
 */
// Answer
class Group{

    constructor(){
        // we create an empty array
        this.elements = [];
    }

    add(value){
        if(!this.has(value)){
            // we test if value isn't already there
            // then we add it to the group
            this.elements.push(value);
        }
    }

    delete(value){
        // Ok, this can work only if this is the last value
        // if(this.has(value)){ this.elements.pop(value); }
        // Instead, we use filter() to create a new array
        // without the 'deleted' value
        this.elements = this.elements.filter(n => n !== value);
    }

    has(value){
        // we use the inbuilt array method includes()
        return this.elements.includes(value);
    }

    static from(args){
        let group = new Group;
        for(let value of args){
            group.add(value);
        }
        return group;
    }
}

// use cases
// let group = Group.from([8,9,10]);
// console.log(group.has(8));
// → true
// console.log(group.has('lydia'));
// → false
// console.log(group.add(11));
// console.log(group);
// → Group {members: Array(4)}
// console.log(group.delete(8));
// console.log(group);
// → Group {members: Array(3)}
// console.log(group.has(8));
// → false


/**
 * Iterable groups
 * 
 * Make the Group() class from the previous exercise iterable. 
 * Refer to the section about the iterator interface earlier in the chapter,
 * if you aren’t clear on the exact form of the interface anymore.
 * 
 * If you used an array to represent the group’s members, 
 * don’t just return the iterator created by calling the Symbol.iterator() method on the array.
 * That would work, but it defeats the purpose of this exercise.
 * It is okay if your iterator behaves strangely when the group is modified during iteration.
 */
// Answer
class Group{

    constructor(){
        this.elements = [];
    }

    add(value){
        if(!this.has(value)){ this.elements.push(value); }
    }

    delete(value){
        this.elements = this.elements.filter(n => n !== value);
    }

    has(value){
        return this.elements.includes(value);
    }

    static from(args){
        let group = new Group;
        for(let value of args){
            group.add(value);
        }
        return group;
    }

    // method returns "new" instance
    // of the iterator class for the group
    [Symbol.iterator](){
        return new GroupIterator(this);
    }
}

// define an iterator group
class GroupIterator{

    constructor(group){
        this.group = group;
        this.position = 0;
    }

    next(){
        if(this.position >= this.group.elements.length){ return {done: true}; }
        else{
            let result = {value: this.group.elements[this.position], done: false};
            this.position++;
            return result;
        }
    }
}

// Use case
// for(let unit of Group.from(['a','b','c','d'])){
//    console.log(unit); }
// → a
// → b
// → c
// → d


/**
 * Borrowing a method
 * 
 * Earlier in the chapter, we noted that an object’s `hasOwnProperty` can be used as a more robust 
 * alternative to the `in` operator when you want to ignore the prototype’s properties. 
 * 
 * But what if your map needs to include the word hasOwnProperty? 
 * You won’t be able to call that method anymore because the object’s own property hides 
 * the method value. Can you think of a way to call hasOwnProperty on an object 
 * that has its own property by that name?
 */
// Answer
let map = {one: true, two: true, hasOwnProperty: true};

// use case
// console.log(Object.prototype.hasOwnProperty.call(map, "hasOwnProperty"));
// → true
// console.log(Object.prototype.hasOwnProperty.call(map, "two"));
// → true
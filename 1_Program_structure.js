// Program Structure - Exercise

/**
 * Looping a triangle
 * Write a loop that makes seven calls to console.log
 * to output the following triangle:
 * 
    #
    ##
    ###
    ####
    #####
    ######
    #######
 */
for (let line = "#"; line.length < 8; line += "#")
    console.log(line);


/**
 * FizzBuzz
 * Write a program that uses console.log to print all the numbers from 1 to 100, 
 * with two exceptions.
 * For numbers divisible by 3, print "Fizz" instead of the number, 
 * and for numbers divisible by 5 (and not 3), print "Buzz" instead.
 * When you have that working, modify your program to print "FizzBuzz"
 * for numbers that are divisible by both 3 and 5
 * (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
 * (This is actually an interview question that has been claimed to weed out
 * a significant percentage of programmer candidates. So if you solved it, 
 * your labor market value just went up.)
 * 
 * This was my solution, abit long, but it works
   for(let m=1; m<=100; m+=1){
        if(m%3 == 0 && m%5 == 0){ console.log('FizzBuzz') }
        else if(m%3 == 0){ console.log('Fizz') }
        else if(m%5 == 0){ console.log('Buzz') }
        else if(m%3 != 0 || m%5 != 0){ console.log(m) }
    }
 */
// But this was the effective answer
// - the tricky was in creating any empty string,
// - and keep adding Fizz or Buzz or both to this string
for (let n = 1; n <= 100; n++) {
    let output = "";
    if (n % 3 == 0) output += "Fizz";
    // prints 'Buzz' for only number divisible by 5 (not by 3)
    // if(x%3 != 0 && x%5 == 0) output += 'Buzz';
    if (n % 5 == 0) output += "Buzz";
    console.log(output || n);
}


/**
 * ChessBoard
 * Write a program that creates a string that represents an 8×8 grid,
 * using newline characters to separate lines.
 * At each position of the grid there is either a space or a "#" character.
 * The characters should form a chessboard.
 * Passing this string to console.log should show something like this:
 * 
     # # # #
    # # # #
     # # # #
    # # # #
     # # # #
    # # # #
     # # # #
    # # # #
 *
 * When you have a program that generates this pattern, define a binding size = 8,
 * and change the program so that it works for any size, 
 * outputting a grid of the given width and height.
 */
// (I must admit, this was alittle complex for me, so i just looked at the answer)
let size = 8;
let board = ""; // This was the trick, declare an empty string
for (let y = 0; y < size; y++) {        // outer loop handles the lines (top-bottom)
    for (let x = 0; x < size; x++) {    // inner loop handles the characters on the line (left-right)
        if ((x + y) % 2 == 0) {         // condition to print " " or "#", if/not divisble by 2
            board += " ";
        } else {
            board += "#";
        }
    }
    board += "\n";  // this does the magic of printing multiple line (top-bottom)
}
console.log(board);


/**
 * Project: `Postabot`
 * 
 * Our projects ia about building a "postabot", 
 * a little program that performs a task within a certain area.
 * Our postabot will be a mail-delivery robot picking up and dropping off "mail".
 */

 /**
  * Village: Rubaga-North area, Kampala
  * 
  * We shall test case our postabot with a sample area served by the Mengo Post Office.
  * Our test involves 11 places with 15 possible routes between them. 
  */

 // define an array of routes
const routes =[
    "Mengo Post Office-Shell Rubaga",
    "Mengo Post Office-Mengo Hospital",
    "Shell Rubaga-Miracle Center",
    "Shell Rubaga-Rubaga Hospital",
    "Shell Rubaga-Old Kampala Mosque",
    "Old Kampala Mosque-New Taxi Park",
    "Mengo Hospital-Namirembe Cathedral",
    "Namirembe Cathedral-Old Kampala Mosque",
    "Miracle Center-Rubaga Hospital",
    "Rubaga Hospital-Lubiri Sec. School",
    "Rubaga Hospital-Victory City Church",
    "Lubiri Sec. School-Victory City Church",
    "Lubiri Sec. School-Lungujja Progressive Primary",
    "Mengo Hospital-Lungujja Progressive Primary",
    "Shell Rubaga-New Taxi Park"
]
 

/**
 * Data structuring: build Graph
 * 
 * This network of routes in the area forms a graph.
 * A graph is a collection of points (places) with lines between them (routes).
 * This graph will be the world that our robot moves through. 
 * The array of strings isn’t very easy to work with.
 * Our interest is in the destinations that we can reach from a given place.
 * So let's convert the list of routes to a data structure that, for each place,
 * tells us what can be reached from there.
 */

// define buildGraph()
// accepts an array,  and returns a map object.
// This map object stores an array of connected nodes for each node.
// We use split() to convert from strings to two-element arrays,
// in the format of start-end, as separate strings.
function buildGraph(edges) {
   let graph = Object.create(null);
   function addEdge(from, to) {
      if (graph[from] == null) {
         graph[from] = [to];
      } else {
         graph[from].push(to);
      }
   }
   for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
   }
   return graph;
}


// define routesGraph,
// variable that points to map object, built from routes array.
// Note that our routeGraph, will have a total of 30 possible routes (from, to)
const routesGraph = buildGraph(routes);

// routesGraph
// {
//    Lubiri Sec. School: (3) ["Rubaga Hospital", ...],
//    Lungujja Progressive Primary: (2) ["Lubiri Sec. School", ...],
//    Mengo Hospital: (3) ["Mengo Post Office", ...],
//    Mengo Post Office: (2) ["Shell Rubaga", "Mengo Hospital"],
//    Miracle Center: (2) ["Shell Rubaga", "Rubaga Hospital"],
//    Namirembe Cathedral: (2) ["Mengo Hospital", "Old Kampala Mosque"],
//    New Taxi Park: (2) ["Old Kampala Mosque", "Shell Rubaga"],
//    Old Kampala Mosque: (3) ["Shell Rubaga", "New Taxi Park", ...],
//    Rubaga Hospital: (4) ["Shell Rubaga", "Miracle Center", ...],
//    Shell Rubaga: (5) ["Mengo Post Office", "Miracle Center", ...],
//    Victory City Church: (2) ["Rubaga Hospital", "Lubiri Sec. School"]
// }


/**
 * Task: Understanding the state of our `Postabot`
 * 
 * There is "mail" in various places, each addressed to some other place.
 * Our postabot picks "mail" when it comes to them (start), 
 * and delivers this "mail" when it reaches their destinations (end).
 * The postabot must decide, at each point, where to go next.
 * It has finished it's task when all parcels have been delivered.
 * 
 * We need to create a model (virtual world) to simulate this process.
 * This model tells us where postabot is, and where the "mail" is too.
 * When postabot has decided to move somewhere,
 * we need to update the model to reflect this new situation.
 * 
 * So let's reduce the village state down to some values that define it.
 * There's postabot's current location, and the collection of undelivered "mail",
 * each having a current location and a destination address.
 * Also we need a way to compute a new state for each situation after the move,
 * not when postabot is moving (in transition).
 */

// define VillageState{}
// Within the moves() method is where the magic is!
// In there, we check if there's a route from our current place to the destination,
// and if not, we return the old state since this is not a valid move.
// Else we sort the "mail" while at this point.
// We use map() to identify "mail" which needs to be moved to a new address (moving process).
// And utilize filter() to actually deliver "mail" once at the right address.
class VillageState {

   constructor(currentPlace, ourMail) {
      this.currentPlace = currentPlace;
      this.ourMail = ourMail;
   }

   move(destination) {
      if(!routesGraph[this.currentPlace].includes(destination)) {
         return this;
      } else {
         let mail = this.ourMail.map(p => {
            if(p.place != this.currentPlace) return p;
            return { place: destination, address: p.address };
         }).filter(p => p.place != p.address);
         return new VillageState(destination, mail);
      }
   }
}

// Note that "ourMail" objects aren’t changed when they are moved but re-created. 
// move() gives us a new village state but leaves the old one entirely intact.
// See test case below...

// our "inital" state
let firstState = new VillageState(
   "Mengo Post Office",
   [{place: "Mengo Post Office", address: "Shell Rubaga"}]
);

// our "next" state
let nextState = first.move("Shell Rubaga");

// Notice, here, we have moved to "Shell Rubaga"
nextState.currentPlace;
// → Shell Rubaga

// And, in this state, ourMail has been delivered
nextState.ourMail;
// → []

// Notice that our "initial" state remains unchanged
// Because of the transforming functions, map() and filter()
firstState.currentPlace;
// → Mengo Post Office



/**
 * SIMULATION PROCESS
 */

/**
 * Strategy-1: Move randomly
 * 
 * What is the dumbest strategy that could possibly work? 
 * `Postabot` could just move in a random direction every turn. 
 * That means, with great likelihood, it will eventually run into all parcels and 
 * then also at some point reach the place where they should be delivered. 
 */

// Define randomPick()
// accepts an array and returns a random index.
// Note that Math.random() always returns a number between 0-1, but always below 1.
// So we multiply it by the array length, and apply Math.floor() to get random index (choice)
function randomPick(array) {
   let choice = Math.floor(Math.random() * array.length);
   return array[choice];
}

// Define randomRobot()
// This robot does not need to remember anything.
// accepts the state and returns which direction it needs to move from here
function randomRobot(state) {
   return {
      direction: randomPick(routesGraph[state.currentPlace])
   };
}


/**
 * Intelligence: `Postabot` looks at the 'state' and decides in which direction it wants to move.
 * 
 * We could conclude that our robot is a function that 
 * takes a VillageState object and returns the name of a nearby place.
 * Because we want robots to be able to remember things, so that they can make and execute plans,
 * we also pass them their memory and allow them to return a new memory. 
 */

// Define runRobot()
// accepts state, robot and memory (because we need an intelligent robot)
// return an object containing both the direction it wants to move in,
// and a memory value that will be given back to it the next time it is called.
function runRobot(state, robot, memory) {
   for(let turn = 0;; turn++) {
      if(state.ourMail.length == 0) {
         console.log(`Done in ${turn} turns`);
         break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Moved to ${action.direction}`);
   }
}


/**
 * Lights, Camera, Action:
 * 
 * To put this sophisticated robot to work, 
 * we first need a way to create a new state with some parcels. 
 * A static method (written below by directly adding a property to the constructor),
 * is a good place to put that functionality.
 */

// Define random() - static method
// accepts a mailCount (or default = 5) and returns a new VillageState
// We don’t want any 'mail' that is sent from the same place that it is addressed to. 
// Thus, the do loop keeps picking new places when it gets one that’s equal to the address.
VillageState.random = function(mailCount = 5) {
   let ourMail = [];
   for(let i = 0; i < mailCount; i++) {
      let address = randomPick(Object.keys(routesGraph));
      let place;
      do {
         place = randomPick(Object.keys(routesGraph));
      } while (place == address);

      ourMail.push({place, address});
   }
   return new VillageState("Mengo Post Office", ourMail);
};

// test case-1: (see mailDelivery.js)
// It takes `Postabot` a lot of turns to deliver the 'mail' because it isn’t planning ahead very well.

// Note: 
// JavaScript functions can be called with less/extra arguments without ill effects.
// A case in point is that, below, we don't call runRobot() with a memory argument, 
// while we call randomRobot() with a memory argument (inside runRobot())

runRobot(VillageState.random(), randomRobot);
// → Moved to Mengo Hospital
// → Moved to Lungujja Progressive Primary
// → ...
// → Done in 56 turns


/**
 * Strategy-2: Identify a key route
 * 
 * The crucial improvement would be to take a hint from the way real-world mail delivery works. 
 * If we find a route that passes all places in the area, Postabot could run that route twice, 
 * at which point it is guaranteed to be done. 
 */

// Here is one such route (starting from the Mengo Post Office):
const mailRoute = [
	"Mengo Hospital",
	"Namirembe Cathedral",
	"Mengo Hospital",
	"Lungujja Progressive Primary",
	"Lubiri Sec. School",
	"Victory City Church",
	"Lubiri Sec. School",
	"Rubaga Hospital",
	"Miracle Center",
	"Shell Rubaga",
	"New Taxi Park",
	"Old Kampala Mosque",
	"Shell Rubaga",	
	"Mengo Post Office",
]

// Define routeRobot()
// to implement the route-following robot, we’ll need to make use of robot memory. 
// The robot keeps the rest of its route in its memory and drops the first element every turn.
// accepts state and memory array (defaults to an empty array), returns direction to move in
// Note the difference from the randomRobot()
function routeRobot(state, memory = []) {
   if(memory.length == 0) {
      memory = mailRoute;
   }
   return { direction: memory[0], memory: memory.slice(1) };
}

// test case-2: (see mailDelivery.js)
// This `Postabot` is a lot faster already. 
// It’ll take a maximum of 18 turns (twice the 14-step route) but usually less.

runRobot(VillageState.random(), routeRobot);
// → Moved to Mengo Hospital
// → Moved to Namirembe Cathedral
// → ...
// → Done in 18 turns
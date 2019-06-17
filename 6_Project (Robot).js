
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
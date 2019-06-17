
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
// Define buildGraph()
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


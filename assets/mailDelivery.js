
// run on June/27/2019

// test-case-1: using random strategy
runRobot(VillageState.random(), randomRobot);

// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Lungujja Progressive Primary
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Mengo Post Office
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to Mengo Post Office
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Mengo Post Office
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to Mengo Post Office
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Namirembe Cathedral
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to Namirembe Cathedral
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Namirembe Cathedral
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to Namirembe Cathedral
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to Namirembe Cathedral
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to Rubaga Hospital
// VM115:10 Moved to Lubiri Sec. School
// VM115:10 Moved to Rubaga Hospital
// VM115:10 Moved to Victory City Church
// VM115:10 Moved to Rubaga Hospital
// VM115:10 Moved to Miracle Center
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to Miracle Center
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to Mengo Post Office
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Lungujja Progressive Primary
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Namirembe Cathedral
// VM115:4 Done in 56 turns


// test-case-2: using a mailRoute
runRobot(VillageState.random(), routeRobot)

// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Namirembe Cathedral
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Lungujja Progressive Primary
// VM115:10 Moved to Lubiri Sec. School
// VM115:10 Moved to Victory City Church
// VM115:10 Moved to Lubiri Sec. School
// VM115:10 Moved to Rubaga Hospital
// VM115:10 Moved to Miracle Center
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to Mengo Post Office
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Namirembe Cathedral
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Lungujja Progressive Primary
// VM115:4 Done in 18 turns


// test-case-3: using a work-plan
runRobot(VillageState.random(), goalOrientedRobot)

// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Namirembe Cathedral
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Lungujja Progressive Primary
// VM115:10 Moved to Lubiri Sec. School
// VM115:10 Moved to Rubaga Hospital
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to Old Kampala Mosque
// VM115:10 Moved to Namirembe Cathedral
// VM115:10 Moved to Mengo Hospital
// VM115:10 Moved to Mengo Post Office
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to New Taxi Park
// VM115:10 Moved to Shell Rubaga
// VM115:10 Moved to Rubaga Hospital
// VM115:10 Moved to Lubiri Sec. School
// VM115:4 Done in 16 turns


// test-case-4: first compute routes for all mail
runRobot(VillageState.random(), lazyRobot, [])
// VM187:10 Moved to Mengo Hospital
// VM187:10 Moved to Lungujja Progressive Primary
// VM187:10 Moved to Lubiri Sec. School
// VM187:10 Moved to Victory City Church
// VM187:10 Moved to Rubaga Hospital
// VM187:10 Moved to Miracle Center
// VM187:10 Moved to Shell Rubaga
// VM187:10 Moved to Mengo Post Office
// VM187:10 Moved to Shell Rubaga
// VM187:10 Moved to New Taxi Park
// VM187:10 Moved to Shell Rubaga
// VM187:10 Moved to Rubaga Hospital
// VM187:10 Moved to Lubiri Sec. School
// VM187:4 Done in 13 turns
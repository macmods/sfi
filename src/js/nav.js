// This nav.js file contains functions needed for controlling the navigation bar 
// including the buttons for toggling on and off each feature

function myFunction(a) {
    if (a == "layer-toggle") {
        var x = document.getElementById("layerToggle"); //layerToggle is the id of widget 
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    } else if (a == "sfi-calc") {
        var x = document.getElementById("sfiCalc"); // TODO: Need to implement feature and name widget id to sfiCalc
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    } else if (a == "report-sfi") {
        var x = document.getElementById("reportSfi"); // TODO: Need to implement feature and name widget id to reportSfi
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    }
    
  }
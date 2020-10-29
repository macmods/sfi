// This nav.js file contains functions needed for controlling the navigation bar
// including the buttons for toggling on and off each feature

function navButton(selectedButton) {
  if (selectedButton == "layer-toggle") {
    toggleOn("layer-toggle");
  } else if (selectedButton == "sfi-calc") {
    toggleOn("sfi-calc");
  } else if (selectedButton == "report-sfi") {
    toggleOn("report-sfi");
  }
}

function toggleOn(selectedButton) {
  const layerToggle = document.getElementById("layerToggle"); //layerToggle is the id of widget
  const sfiCalc = document.getElementById("sfiCalc"); // TODO: Need to implement feature and name widget id to sfiCalc
  const reportSfi = document.getElementById("reportSfi"); // TODO: Need to implement feature and name widget id to reportSfi
  layerToggle.style.display = "none";
  sfiCalc.style.display = "none";
  reportSfi.style.display = "none";
  switch (selectedButton) {
    case "layer-toggle":
      layerToggle.style.display = "block";
      break;
    case "sfi-calc":
      sfiCalc.style.display = "block";
      break;
    case "report-sfi":
      reportSfi.style.display = "block";
      break;
    default:
      break;
  }
}

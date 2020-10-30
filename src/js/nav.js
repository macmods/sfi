// This nav.js file contains functions needed for controlling the navigation bar
// including the buttons for toggling on and off each feature

function navButton(selectedButton) {
  if (selectedButton == "layer-toggle") {
    toggle("layer-toggle");
  } else if (selectedButton == "sfi-calc") {
    toggle("sfi-calc");
  } else if (selectedButton == "report-sfi") {
    toggle("report-sfi");
  }
}

function toggle(selectedButton) {
  const layerToggle = document.getElementById("layerToggle"); //layerToggle is the id of widget
  const sfiCalc = document.getElementById("sfiCalc"); // TODO: Need to implement feature and name widget id to sfiCalc
  const reportSfi = document.getElementById("reportSfi"); // TODO: Need to implement feature and name widget id to reportSfi
  switch (selectedButton) {
    case "layer-toggle":
      layerToggle.style.display = reverseDisplayStatus(
        layerToggle.style.display
      );
      sfiCalc.style.display = "none";
      reportSfi.style.display = "none";
      break;
    case "sfi-calc":
      sfiCalc.style.display = reverseDisplayStatus(sfiCalc.style.display);
      layerToggle.style.display = "none";
      reportSfi.style.display = "none";
      break;
    case "report-sfi":
      reportSfi.style.display = reverseDisplayStatus(reportSfi.style.display);
      layerToggle.style.display = "none";
      sfiCalc.style.display = "none";
      break;
    default:
      break;
  }
}

function reverseDisplayStatus(displayStatus) {
  if (displayStatus === "none") return "block";
  else return "none";
}

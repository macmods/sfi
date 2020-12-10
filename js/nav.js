// This nav.js file contains functions needed for controlling the navigation bar
// including the buttons for toggling on and off each feature
var view = document.getElementById("viewDiv");

function navButton(selectedButton) {
  const reportSfi = document.getElementById("queryDiv"); // queryDiv is the id of widget
  if (selectedButton == "layer-toggle") {
    toggle("layer-toggle");
  } else if (selectedButton == "sfi-calc") {
    toggle("sfi-calc");
  } else if (selectedButton == "report-sfi") {
    toggle("report-sfi");
    view.ui.move(reportSfi, "top-right");
  }
}

function toggle(selectedButton) {
  const layerToggle = document.getElementById("layerToggle"); //layerToggle is the id of widget
  const sfiCalc = document.getElementById("sfiCalc"); // sfiCalc is the id of widget
  const reportSfi = document.getElementById("queryDiv"); // queryDiv is the id of widget
  const reportSummarySfi = document.getElementById("resultDiv"); // resultDiv is the id of the report summary widget
  const printWidget = document.getElementById("printWidget"); // printWidget is the id of widget
  switch (selectedButton) {
    case "layer-toggle":
      layerToggle.style.display = reverseDisplayStatus(
        layerToggle.style.display
      );
      sfiCalc.style.display = "none";
      reportSfi.style.display = "none";
      reportSummarySfi.style.display = "none";
      printWidget.style.display = "none";
      break;
    case "sfi-calc":
      sfiCalc.style.display = reverseDisplayStatus(sfiCalc.style.display);
      layerToggle.style.display = "none";
      reportSfi.style.display = "none";
      reportSummarySfi.style.display = "none";
      printWidget.style.display = "none";
      break;
    case "report-sfi":
      reportSfi.style.display = reverseDisplayStatus(reportSfi.style.display);
      reportSummarySfi.style.display = "none";
      layerToggle.style.display = "none";
      sfiCalc.style.display = "none";
      printWidget.style.display = "none";
      break;
    default:
      break;
  }
}

function reverseDisplayStatus(displayStatus) {
  if (displayStatus === "none") return "block";
  else return "none";
}

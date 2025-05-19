// Warte bis alles geladen ist
function preload() {
  // Lade hier Assets falls benötigt
}

let isSetupComplete = false;

function setup() {
  if (isSetupComplete) return;
  
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Fix für Retina-Displays
  
  // Dein gesamter Setup-Code hier...
  console.log("Sketch ist bereit!");
  
  isSetupComplete = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

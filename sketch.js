// CONFIGURATION
const PASSWORD = "404"; // Passwort hier ändern
const BG_COLOR = 'linear-gradient(135deg, #ff4d4d 0%, #e53935 100%)';
const CARD_COLOR = 'rgba(255, 255, 255, 0.9)';
const ACCENT_COLOR = '#e53935';
const FONT = 'Poppins, Arial, sans-serif';

// Globale Variablen
let accessGranted = false;
let stats = {
  totalFalls: 0,
  bets: [],
  fallHistory: []
};
let ui = {};

function preload() {
  // Lade Google Fonts
  loadFont('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  if (!accessGranted) {
    showPasswordScreen();
    return;
  }
  
  initUI();
  loadData();
}

function draw() {
  if (!accessGranted) return;
  
  // Moderner Hintergrund mit Verlauf
  setGradient(0, 0, width, height, color('#ff4d4d'), color('#e53935'));
  drawUI();
}

function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function showPasswordScreen() {
  background(BG_COLOR);
  
  // Passwort-Card
  fill(CARD_COLOR);
  rectMode(CENTER);
  rect(width/2, height/2, 400, 250, 20);
  
  // Text
  fill(ACCENT_COLOR);
  textFont(FONT);
  textSize(28);
  textAlign(CENTER, CENTER);
  text('🔒 SCHUL-WETTBÜRO', width/2, height/2 - 60);
  
  // Passwort-Eingabe
  ui.pwInput = createInput('');
  ui.pwInput.position(width/2 - 150, height/2 - 20);
  ui.pwInput.size(300);
  ui.pwInput.attribute('placeholder', 'Passwort');
  ui.pwInput.attribute('type', 'password');
  ui.pwInput.style('font-family', FONT);
  ui.pwInput.style('font-size', '16px');
  ui.pwInput.style('padding', '10px');
  ui.pwInput.style('border-radius', '8px');
  ui.pwInput.style('border', '2px solid ' + ACCENT_COLOR);
  
  // Button
  ui.pwButton = createButton('ENTER');
  ui.pwButton.position(width/2 - 50, height/2 + 40);
  ui.pwButton.mousePressed(() => {
    if (ui.pwInput.value() === PASSWORD) {
      accessGranted = true;
      ui.pwInput.remove();
      ui.pwButton.remove();
      initUI();
    } else {
      alert('❌ Falsches Passwort!');
    }
  });
  styleButton(ui.pwButton);
}

function initUI() {
  // Moderator-Bereich
  ui.modCard = createDiv('');
  ui.modCard.position(30, 30);
  ui.modCard.size(width/2 - 40, 200);
  ui.modCard.style('background', CARD_COLOR);
  ui.modCard.style('border-radius', '15px');
  ui.modCard.style('padding', '20px');
  
  createElement('h2', '🔴 MODERATOR').parent(ui.modCard)
    .style('color', ACCENT_COLOR)
    .style('font-family', FONT)
    .style('margin-top', '0');
  
  ui.modName = createInput('').parent(ui.modCard)
    .attribute('placeholder', 'Name');
  ui.modTime = createInput('').parent(ui.modCard)
    .attribute('placeholder', 'Datum & Uhrzeit');
  ui.modSubmit = createButton('Umkippen melden').parent(ui.modCard)
    .mousePressed(reportFall);
  
  // Wett-Bereich
  ui.betCard = createDiv('').position(30, 250)
    .size(width/2 - 40, height - 280)
    .style('background', CARD_COLOR)
    .style('border-radius', '15px')
    .style('padding', '20px');
    
  createElement('h2', '💰 WETTEN').parent(ui.betCard)
    .style('color', ACCENT_COLOR)
    .style('font-family', FONT);
    
  // ... (weitere UI-Elemente analog)
  
  // Style alle Inputs/Buttons
  styleAllInputs();
}

function styleAllInputs() {
  selectAll('input').forEach(el => {
    el.style('font-family', FONT);
    el.style('padding', '8px');
    el.style('border-radius', '8px');
    el.style('border', '2px solid #ddd');
    el.style('margin', '5px 0');
  });
  
  selectAll('button').forEach(btn => {
    styleButton(btn);
  });
}

function styleButton(btn) {
  btn.style('background', ACCENT_COLOR);
  btn.style('color', 'white');
  btn.style('border', 'none');
  btn.style('padding', '10px 20px');
  btn.style('border-radius', '8px');
  btn.style('cursor', 'pointer');
  btn.style('font-family', FONT);
  btn.style('margin', '5px 0');
}

function reportFall() {
  // ... (wie vorher)
}

function placeBet() {
  // ... (wie vorher)
}

function drawUI() {
  // ... (UI zeichnen)
}

function loadData() {
  const saved = localStorage.getItem('wettbueroData');
  if (saved) stats = JSON.parse(saved);
}

function saveData() {
  localStorage.setItem('wettbueroData', JSON.stringify(stats));
}

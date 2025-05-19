// Passwortkonfiguration
const PASSWORD = "404"; // Ändere dies!
let accessGranted = false;

// Datenstruktur
let stats = {
  totalFalls: 0,
  bets: [],
  fallHistory: []
};

// UI-Elemente
let modNameInput, modTimeInput, modSubmitButton;
let betNameInput, betAmountInput, betPredictionInput, betSubmitButton;

// Farben
const colors = {
  background: '#FFEBEE',
  panel: '#FFCDD2',
  accent: '#E53935',
  text: '#212121'
};

function setup() {
  createCanvas(900, 700);
  
  // Passwortprüfung
  if (!accessGranted) {
    showPasswordScreen();
    return;
  }
  
  initApp();
}

// Passwort-Eingabebildschirm
function showPasswordScreen() {
  background(colors.background);
  fill(colors.accent);
  textSize(24);
  textAlign(CENTER);
  text("🔒 Passwort eingeben", width/2, height/2 - 50);
  
  let pwInput = createInput('');
  pwInput.position(width/2 - 100, height/2 - 20);
  pwInput.attribute('type', 'password');
  
  let btn = createButton('Bestätigen');
  btn.position(width/2 - 50, height/2 + 20);
  btn.mousePressed(() => {
    if (pwInput.value() === PASSWORD) {
      accessGranted = true;
      pwInput.remove();
      btn.remove();
      initApp();
    } else {
      alert("Falsches Passwort!");
    }
  });
}

// Hauptanwendung
function initApp() {
  // Moderator-Eingabe
  createP('🔴 Moderator-Bereich').style('color', colors.accent);
  modNameInput = createInput('').attribute('placeholder', 'Name');
  modTimeInput = createInput('').attribute('placeholder', 'Datum & Zeit');
  modSubmitButton = createButton('Umkippen melden').mousePressed(reportFall);

  // Wett-Eingabe
  createP('💰 Wettbereich').style('color', colors.accent);
  betNameInput = createInput('').attribute('placeholder', 'Dein Name');
  betAmountInput = createInput('').attribute('placeholder', 'Einsatz (€)');
  betPredictionInput = createInput('').attribute('placeholder', 'Vorhersage');
  betSubmitButton = createButton('Wette abgeben').mousePressed(placeBet);

  // Lade gespeicherte Daten
  loadData();
}

function draw() {
  if (!accessGranted) return;
  
  background(colors.background);
  drawStats();
  drawBets();
  drawHistory();
}

// Daten speichern/laden
function saveData() {
  localStorage.setItem('wettbueroData', JSON.stringify(stats));
}

function loadData() {
  const saved = localStorage.getItem('wettbueroData');
  if (saved) stats = JSON.parse(saved);
}

// Restliche Funktionen (reportFall, placeBet, drawStats usw.) wie in der vorherigen Version
// ...

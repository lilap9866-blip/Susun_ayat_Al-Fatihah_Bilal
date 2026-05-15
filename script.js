
// AYAT AL-FATIHAH
const correctOrder = [

  "بِسْمِ اللّٰهِ",
  "الرَّحْمٰنِ",
  "الرَّحِيْمِ",

  "الْحَمْدُ لِلّٰهِ",
  "رَبِّ الْعَالَمِينَ",

  "الرَّحْمٰنِ",
  "الرَّحِيْمِ",

  "مَالِكِ يَوْمِ الدِّينِ",

  "إِيَّاكَ نَعْبُدُ",
  "وَإِيَّاكَ نَسْتَعِينُ",

  "اهْدِنَا",
  "الصِّرَاطَ الْمُسْتَقِيمَ",

  "صِرَاطَ الَّذِينَ",
  "أَنْعَمْتَ عَلَيْهِمْ",

  "غَيْرِ الْمَغْضُوبِ",
  "عَلَيْهِمْ",

  "وَلَا الضَّالِّينَ"

]; 

const TOTAL_BLOCKS = 18;

//grid = Array(9).fill(null);

grid = Array(9).fill(null);

let score = 0;

let combo = 0;

let wrongCount = 0;


let currentIndex = 0;

let currentStep = 0;

const blockScores = [
  6,6,6,6,6,6,6,
  6,6,6,6,6,6,6,
  4,4,4,4
];

function generateBlocks() {

  
  const correct = correctOrder[currentIndex] || correctOrder[correctOrder.length - 1];

  const randoms = correctOrder
    .filter((a) => a !== correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  const mix = [correct, ...randoms]
    .sort(() => Math.random() - 0.5);

  return mix.map((text, i) => ({
    id: i,
    text,
    correct: text === correct
  }));
}

let blocks = generateBlocks();

const gridEl = document.getElementById("grid");
const panelEl = document.getElementById("panel");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const scorePop = document.getElementById("scorePop");
const comboPopup = document.getElementById("comboPopup");

const soundCorrect = document.getElementById("soundCorrect");

const soundWrong = document.getElementById("soundWrong");

const soundCombo = document.getElementById("soundCombo");

const bgMusic = document.getElementById("bgMusic");

// render grid
function renderGrid() {
  gridEl.innerHTML = "";

  grid.forEach((cell, i) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.dataset.index = i;
    div.innerText = cell || "";

    div.ondragover = (e) => e.preventDefault();

    div.ondrop = (e) => {
      if (grid[i]) return;
      const id = e.dataTransfer.getData("text");
      const block = blocks.find(b => b.id == id);

      if (grid[i] || !block) return;

      if (!block.correct) {

        soundWrong.currentTime = 0;
        soundWrong.play();

        showScorePop(-4, true);

      

      combo = 0;


      

    // 🔥 kurangi score
    score -= 4;

    // 🔥 jangan sampai minus
    if (score < 0) {
    score = 0;
  }

    scoreEl.innerText = score;

    wrongCount++;

    messageEl.innerText =
    "❌ Salah " + wrongCount + "x";

    

    return;
  }

    grid[i] = block.text;

    if (combo !== 2) {

    soundCorrect.currentTime = 0;
    soundCorrect.play();

  }

    blocks = blocks.filter(b => b.id != id);  


     score += blockScores[currentIndex] || 0;
     scoreEl.innerText = score;
     showScorePop(blockScores[currentIndex] || 0);

     currentIndex++;

    combo++;

    if (combo === 3) {

    soundCombo.currentTime = 0;
    soundCombo.play();   

    showComboPopup(combo);
    
    messageEl.innerText = "Masya Allah 3x Benar Berturut-turut";

    combo = 0;

}


if (block.text === "وَلَا الضَّالِّينَ") {

  //score = 100;

  scoreEl.innerText = score;

  showWinPopup();

  return;
}



      

      
      blocks = generateBlocks();

      renderAll();

      const targetCell = document.querySelectorAll(".cell")[i];

      if (targetCell) {

      targetCell.classList.add("correct-glow");

      setTimeout(() => {
      targetCell.classList.remove("correct-glow");
    }, 500);

}


      checkWin();
    };

    gridEl.appendChild(div);
  });
}

function startWatchCell2() {
  const cells = document.querySelectorAll(".cell");
  const target = cells[2];

  if (!target) return;

  const interval = setInterval(() => {
    if (checkHandTouchCell(target)) {

      target.classList.add("tutorial-highlight");

      clearInterval(interval);
    }
  }, 50);
}




// render blocks
function renderBlocks() {
  panelEl.innerHTML = "";

  blocks.slice(0, 3).forEach((b) => {
    const div = document.createElement("div");
    div.className = "block";
    div.draggable = true;
    div.innerText = b.text;

    div.ondragstart = (e) => {
      e.dataTransfer.setData("text", b.id);
    };

    panelEl.appendChild(div);
  });
}

// check win
function checkWin() {

  const full = grid.every(cell => cell !== null);

  if (full) {

   

  

  
  messageEl.innerHTML =
  
  `
  <span> LANJUTKAN AYAT:</span>
  <span style="margin-left:10px;">إِيَّاكَ نَعْبُدُ</span>
`;

  messageEl.style.fontSize = "25px";
  messageEl.style.fontWeight = "bold";
  let i = 0;

  const typing = setInterval(() => {
  messageEl.innerText += text[i];
  
  i++;

  if (i >= text.length) {
    clearInterval(typing);
  }
}, 50);


    setTimeout(() => {
      grid = Array(9).fill(null);
      renderAll();
    }, 500);
  }
}

// reset
function resetGame() {

  grid = Array(9).fill(null);

  score = 0;
  currentIndex = 0;

  blocks = generateBlocks();

  scoreEl.innerText = score;

  messageEl.innerText = "Drag block ke slot";

  renderAll();
}

// render all
function renderAll() {
  renderGrid();
  renderBlocks();
}

// start
renderAll();

bgMusic.volume = 0.25;

document.body.addEventListener("click", () => {

  bgMusic.play();

}, { once: true });




setTimeout(startTutorial, 500);

function startTutorial() {
  const hand = document.getElementById("hand");

  const steps = [

    // STEP 1: ke بِسْمِ اللّٰهِ
    () => {
      const blocks = document.querySelectorAll(".block");

      

      const target = [...blocks].find(b =>
        b.innerText.includes("بِسْمِ اللّٰهِ")
      );

      if (target) {
        const rect = target.getBoundingClientRect();

        target.classList.add("tutorial-highlight");

        hand.style.opacity = "1";
        hand.style.left = rect.left + "px";
        hand.style.top = rect.top + "px";
      }
    },

    // STEP 2: ke pojok kanan atas panel block
  
    () => {
  const panel = document.getElementById("panel");
  const rect = panel.getBoundingClientRect();

  // ke atas + ke kanan (pojok kanan panel)
  hand.style.left = (rect.right - 100) + "px";
  hand.style.top = (rect.top - 365) + "px";

   startWatchCell2();

  document.querySelectorAll(".tutorial-highlight")
    .forEach(el => el.classList.remove("tutorial-highlight"));
    },
    

    // STEP 3: hilangkan panah
    () => {
      hand.style.opacity = "0";
    }
  ];

  let i = 0;

  function next() {
    if (i < steps.length) {
      steps[i]();
      i++;
      setTimeout(next, 1500);
    }
  }

  next();
}

function showScorePop(value, isWrong = false) {

  scorePop.innerText = (isWrong ? "" : "+") + value;

  scorePop.style.color = isWrong ? "#ff4d4d" : "gold";

  // reset state
  scorePop.classList.remove("fly");
  scorePop.classList.remove("show");

  // muncul di tengah BLOCK (default)
  scorePop.style.top = "45%";
  scorePop.style.left = "55%";

  // tampil besar dulu
  setTimeout(() => {
    scorePop.classList.add("show");
  }, 50);

  const rect = scoreEl.getBoundingClientRect();

  // lalu terbang ke score
  setTimeout(() => {

    scorePop.style.top = (rect.top - 40) + "px";
    scorePop.style.left = rect.left + "px";

    scorePop.classList.remove("show");
    scorePop.classList.add("fly");

  }, 800);

  // reset
  setTimeout(() => {
    scorePop.classList.remove("fly");
  }, 1800);
}


function showComboPopup(n) {
  comboPopup.innerText = "Masya Allah";

  comboPopup.classList.add("show");

  setTimeout(() => {
    comboPopup.classList.remove("show");
    comboPopup.classList.add("hide");
  }, 1000);

  setTimeout(() => {
    comboPopup.classList.remove("hide");
  }, 1300);
}


function highlightSlot() {
  const cell = document.querySelector(".cell"); // slot pertama

  if (cell) {
    cell.classList.add("tutorial-highlight");

    const rect = cell.getBoundingClientRect();

    hand.style.left = (rect.left + 20) + "px";
    hand.style.top = (rect.top + 100) + "px";
  }
}


function moveHandTo(cell, callback) {
  const rect = cell.getBoundingClientRect();

  hand.style.left = rect.left + "px";
  hand.style.top = rect.top + "px";

  setTimeout(() => {
    callback();
  }, 500); // tunggu animasi selesai
}



function checkHandTouchCell(cell) {
  const handRect = hand.getBoundingClientRect();
  const cellRect = cell.getBoundingClientRect();

  const isTouching =
    handRect.left < cellRect.right &&
    handRect.right > cellRect.left &&
    handRect.top < cellRect.bottom &&
    handRect.bottom > cellRect.top;

  return isTouching;
}


function showWinPopup() {

  document.getElementById("finalScore").innerText = score;

  document.getElementById("finalWrong").innerText = wrongCount;

  document.getElementById("winPopup")
    .classList.add("show");
}

function closeWinPopup() {

  document.getElementById("winPopup")
    .classList.remove("show");

  resetGame();
}
const words = [
  { en: "watasihasoranouedeasobimasita", kana: "私は空の上で遊びました" },
  { en: "watasihagakkounitutomemasu", kana: "私は学校につとめます" },
  { en: "kaigisitudehanabiwosimasita", kana: "会議室で花火をしました" },
  { en: "tesutonokekkahazerotendesita", kana: "テストの結果は0点でした" },
  { en: "kyousukiniderenakatta", kana: "今日好きにでれなかった" },
  { en: "jimenkarahaiagaruyo", kana: "地面から這い上がるよ" },
  { en: "jo-nhananiwositerundesuka", kana: "ジョーンはなにをしてるんですか" },
  { en: "jo-jitotomodatininarenakatta", kana: "ジョージと友達になれなかった" },
  { en: "kibisiiyoukyuunitaeru", kana: "厳しい要求に耐える" },
  { en: "sukaituri-nouenitatu", kana: "スカイツリーの上に立つ" },
  { en: "ningennniaisatuwosuru", kana: "人間に挨拶をする" },
  { en: "kimihabenkyouwositene", kana: "君は勉強をしてね" },
  { en: "mosikasitetikkusho-?", kana: "もしかしてちっくしょー？" },
  { en: "kurimanjuukosituru-mutua-", kana: "栗まんじゅう個室ルームツアー" },
  { en: "watasiharirutekkamakiwosiensimasu", kana: "私はlil鉄火巻きを支援します" },
  { en: "ohayou,katahabahiroine", kana: "おはよう、肩幅広いね" },
  { en: "supi-dohageimusenta-deikimasita", kana: "スピードはゲイムセンターでいきました" },
  { en: "watasihadarekawobunnnagetai", kana: "私はだれかをぶんなげたい" },
  { en: "jo-jihajo-nnnijojowosusumerareta", kana: "ジョージはジョーンにジョジョをすすめられた" },
  { en: "watasihanantonakukarewonagurutumorida", kana: "私はなんとなく彼を殴るつもりだ" },
  { en: "fakkyu-,kiemashou", kana: "ふぁっきゅー、消えましょう" },
  { en: "watasihadoronimamireta", kana: "私は泥に塗れた" },
  { en: "tekkukigyounikayou", kana: "テック企業に通う" },
  { en: "pianowonusundainutosaru", kana: "ピアノを盗んだ犬と猿" },
  { en: "kakasan,nazesonnnakotowoiunodesuka?", kana: "カカさん、なぜそんな事を言うのですか？" },
]
let currentWord = {};
let score = 0;
let time = 60;
let timerId;
let card = localStorage.getItem("card");

const wordDisplay = document.getElementById("word");
const kanaWord = document.getElementById("wordA")
const input = document.getElementById("input");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const correctsound = document.getElementById("cr")
const container = document.getElementById("cardContainer");
const misssound = document.getElementById("misssound");
const keyoto = document.getElementById("keyoto")
const keysound1 = document.getElementById("keyon")
const keysound2 = document.getElementById("keyon2")
const keysound3 = document.getElementById("keyon3")
let keyon = keysound1

// if (card === null) {
//     card = 0; 
// } else {
//     card = parseInt(card); 
// }


// const cardDisplay = document.getElementById("cardDisplay");
// cardDisplay.textContent = "カード: " + card;


function setNewWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordDisplay.textContent = currentWord.en;
  kanaWord.textContent = currentWord.kana;
  input.value = "";
  updateWordDisplay();
}

function startGame() {
  score = 0;
  time = 60;
  scoreDisplay.textContent = "スコア: 0";
  timerDisplay.textContent = "残り時間: 60";
  input.disabled = false;
  input.focus();
  setNewWord();

  timerId = setInterval(() => {
    time--;
    timerDisplay.textContent = "残り時間: " + time;
    if (time <= 0) {
      clearInterval(timerId);
      input.disabled = true;
      wordDisplay.textContent = "ゲーム終了！";
      card++;
      cardDisplay.textContent = "カード: " + card;
      localStorage.setItem("card", card);
    }
  }, 1000);
}

input.addEventListener("input", () => {
  const inputValue = normalizeInput(input.value);
  const enWord = currentWord.en;
  playSound();

  let html = "";
  for (let i = 0; i < enWord.length; i++) {
    if (i < inputValue.length && inputValue[i] === enWord[i]) {
      html += `<span style="color:red">${enWord[i]}</span>`; 
    } else {
      html += enWord[i]; 
    }
  }
  wordDisplay.innerHTML = html;


  if (inputValue === enWord) {
    correctsound.currentTime = 0;
    correctsound.play();
    score++;
    scoreDisplay.textContent = "スコア: " + score;
    setNewWord();
    return; 
  }


  if (inputValue.length > 0 && inputValue[inputValue.length - 1] !== enWord[inputValue.length - 1]) {
    misssound.currentTime = 0;
    misssound.play();
  }
});


startButton.addEventListener("click", startGame);

keyoto.addEventListener("click" , keychange);

function updateWordDisplay() {
  const inputValue = input.value;
  const enWord = currentWord.en;

  let html = "";

  for (let i = 0; i < enWord.length; i++) {
    if (i < inputValue.length && inputValue[i] === enWord[i]) {
      html += `<span style="color:red">${enWord[i]}</span>`; 
    } else {
      html += enWord[i]; 
    }
  }

  wordDisplay.innerHTML = html;
}

function normalizeInput(input) {
  return input
    .replace(/sya/g, "sha")  // sya → sha
    .replace(/syu/g, "shu")  // syu → shu
    .replace(/syo/g, "sho")  // syo → sho
    .replace(/tya/g, "cha")  // tya → cha
    .replace(/tyu/g, "chu")  // tyu → chu
    .replace(/tyo/g, "cho")  // tyo → cho
    .replace(/shi/g, "si")   // shi → si
    .replace(/chi/g, "ti")   // chi → ti
    .replace(/tsu/g, "tu")   // tsu → tu
    .replace(/fu/g, "hu")    // fu → hu
    .replace(/zi/g, "ji")
}

function playSound() {
  const clone = keyon.cloneNode(); 
  clone.play();
}

function keychange() {

  if (keyon === keysound1) {
    keyon = keysound2
  }

  else if (keyon === keysound2) {
    keyon = keysound3
  }

  else if (keyon === keysound3) {
    keyon = keysound1
  }

}
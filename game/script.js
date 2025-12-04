// ゲームデータ
const games = [
  { name: "ゆうぽんのタイピングゲーム", image: "typing.png", link: "https://typing-site.netlify.app" },
  { name: "忍者◯郎のPu*syゲーム", image: "typing.png", link: "https://pustyping-site.netlify.app/" },
  { name: "野獣先輩ブロック崩し", image: "yaj.png", link: "https://tkworker.github.io/yajuge/" }
];

const gameContainer = document.getElementById("gameContainer");

// ゲームカードを作成
games.forEach(game => {
  const card = document.createElement("div");
  card.classList.add("game-card");

  // 画像
  const img = document.createElement("img");
  img.src = game.image; // ゲームのサムネイル画像
  img.alt = game.name;

  // ゲーム名
  const title = document.createElement("h2");
  title.textContent = game.name;

  card.appendChild(img);
  card.appendChild(title);

  // クリックでゲームページへ
  card.addEventListener("click", () => {
    window.open(game.link);
  });

  gameContainer.appendChild(card);
});

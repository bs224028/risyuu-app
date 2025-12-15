const ranking = document.getElementById("ranking");
let kougiList = [];

// 講義一覧を読み込む
async function load() {
  const res = await fetch("data/kougi.json");
  kougiList = await res.json();
  showRanking();
}

function showRanking() {
  const votes = JSON.parse(localStorage.getItem("votes") || "[]");
  const score = {};

  votes.forEach(v => {
    score[v.id] = (score[v.id] || 0) + v.point;
  });

  const sorted = Object.entries(score)
    .map(([id, point]) => {
      const k = kougiList.find(x => x.id == id);
      return { name: k.name, point };
    })
    .sort((a, b) => b.point - a.point)
    .slice(0, 3);

  ranking.innerHTML = "";

  if (sorted.length === 0) {
    ranking.innerHTML = "<li>まだ投票がありません</li>";
    return;
  }

  sorted.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.name}（${r.point}点）`;
    ranking.appendChild(li);
  });
}

load();

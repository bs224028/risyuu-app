const list = document.getElementById("ranking");

// 投票データ取得
const votes = JSON.parse(localStorage.getItem("votes") || "[]");

// 得点集計
const score = {};

votes.forEach(v => {
  if (!score[v.name]) {
    score[v.name] = 0;
  }
  score[v.name] += v.point;
});

// 配列に変換してソート
const ranking = Object.entries(score)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3);

// 表示
ranking.forEach((r, i) => {
  const li = document.createElement("li");
  li.textContent = `${i + 1}位：${r[0]}（${r[1]}点）`;
  list.appendChild(li);
});

// 投票がない場合
if (ranking.length === 0) {
  list.innerHTML = "<li>まだ投票がありません</li>";
}

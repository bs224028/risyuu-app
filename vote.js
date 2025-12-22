const r1 = document.getElementById("rank1");
const r2 = document.getElementById("rank2");
const r3 = document.getElementById("rank3");

// 講義データ読み込み
async function loadKougi() {
  const res = await fetch("data/kougi.json");
  const kougiList = await res.json();

  // 「選択してください」を最初に入れる
  [r1, r2, r3].forEach(sel => {
    const def = document.createElement("option");
    def.value = "";
    def.textContent = "-- 選択してください --";
    sel.appendChild(def);
  });

  // 講義をプルダウンに追加
  kougiList.forEach(k => {
    [r1, r2, r3].forEach(sel => {
      const opt = document.createElement("option");
      opt.value = k.id;
      opt.textContent = k.name;
      sel.appendChild(opt);
    });
  });
}

// 投票処理
function vote() {
  // 未選択チェック
  if (!r1.value || !r2.value || !r3.value) {
    alert("すべて選択してください");
    return;
  }

  // 重複チェック
  if (r1.value === r2.value ||
      r1.value === r3.value ||
      r2.value === r3.value) {
    alert("同じ講義は複数選択できません");
    return;
  }

  // 投票データ取得
  const votes = JSON.parse(localStorage.getItem("votes") || "[]");

  // 点数を追加
  votes.push(
    { id: r1.value, point: 5 },
    { id: r2.value, point: 3 },
    { id: r3.value, point: 1 }
  );

  localStorage.setItem("votes", JSON.stringify(votes));

  alert("投票が完了しました！");
  location.href = "ranking.html";
}

loadKougi();

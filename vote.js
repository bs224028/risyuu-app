const r1 = document.getElementById("rank1");
const r2 = document.getElementById("rank2");
const r3 = document.getElementById("rank3");

// 講義データ読み込み
async function loadKougi() {
  const res = await fetch("data/kougi.json");
  const kougiList = await res.json();

  // 「選択してください」を追加
  [r1, r2, r3].forEach(sel => {
    const def = document.createElement("option");
    def.value = "";
    def.textContent = "-- 選択してください --";
    sel.appendChild(def);
  });

  // 講義名だけを選択肢にする
  kougiList.forEach(k => {
    [r1, r2, r3].forEach(sel => {
      const opt = document.createElement("option");
      opt.value = k.name;        // ★ nameだけ使う
      opt.textContent = k.name; // 表示もname
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

  // 講義名＋点数で保存
  votes.push(
    { name: r1.value, point: 5 },
    { name: r2.value, point: 3 },
    { name: r3.value, point: 1 }
  );

  localStorage.setItem("votes", JSON.stringify(votes));

  alert("投票が完了しました！");
  location.href = "ranking.html";
}

loadKougi();

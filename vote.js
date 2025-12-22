// セレクトボックス取得
const r1 = document.getElementById("rank1");
const r2 = document.getElementById("rank2");
const r3 = document.getElementById("rank3");

// 講義データを読み込んで選択肢に追加
async function loadKougi() {
  try {
    const res = await fetch("./data/kougi.json"); // ← GitHub Pages対応
    if (!res.ok) throw new Error("kougi.json が見つかりません");

    const kougiList = await res.json();

    // 初期選択肢
    [r1, r2, r3].forEach(sel => {
      const def = document.createElement("option");
      def.value = "";
      def.textContent = "-- 選択してください --";
      sel.appendChild(def);
    });

    // 講義名を追加
    kougiList.forEach(k => {
      [r1, r2, r3].forEach(sel => {
        const opt = document.createElement("option");
        opt.value = k.name;
        opt.textContent = k.name;
        sel.appendChild(opt);
      });
    });

  } catch (e) {
    alert("講義データを読み込めません");
    console.error(e);
  }
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

  // 既存投票取得
  const votes = JSON.parse(localStorage.getItem("votes") || "[]");

  // 投票追加
  votes.push(
    { name: r1.value, point: 5 },
    { name: r2.value, point: 3 },
    { name: r3.value, point: 1 }
  );

  localStorage.setItem("votes", JSON.stringify(votes));

  alert("投票が完了しました！");
  location.href = "ranking.html";
}

// ページ読み込み時に実行
loadKougi();

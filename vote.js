const r1 = document.getElementById("rank1");
const r2 = document.getElementById("rank2");
const r3 = document.getElementById("rank3");

let kougiList = [];

async function loadKougi() {
  const res = await fetch("data/kougi.json");
  kougiList = await res.json();

  kougiList.forEach(k => {
    [r1, r2, r3].forEach(sel => {
      const opt = document.createElement("option");
      opt.value = k.id;
      opt.textContent = k.name;
      sel.appendChild(opt.cloneNode(true));
    });
  });
}

function vote() {
  if (r1.value === r2.value ||
      r1.value === r3.value ||
      r2.value === r3.value) {
    alert("同じ講義は複数選択できません");
    return;
  }

  const votes = JSON.parse(localStorage.getItem("votes") || "[]");

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

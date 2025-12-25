const loginUser = JSON.parse(localStorage.getItem("loginUser"));
if (!loginUser) location.href = "login.html";

let ikens = JSON.parse(localStorage.getItem("ikens")) || [];

let sortMode = localStorage.getItem("sortMode") || "new";
document.getElementById("sortSelect").value = sortMode;

function applySort() {
  if (sortMode === "new") {
    ikens.sort((a, b) => b.id - a.id);
  } else {
    ikens.sort((a, b) => a.id - b.id);
  }
}

// カテゴリフィルタ
function filterIken() {
  const selected = document.getElementById("filtercategory").value;
  renderIkens(selected);
}

function sortIkens() {
  sortMode = document.getElementById("sortSelect").value;
  localStorage.setItem("sortMode", sortMode);
  applySort();
  renderIkens();
}

function canDelete(iken) {
  if (loginUser.role === "管理者") return true;
  return iken.userId === loginUser.id;
}

function renderIkens(filter = "") {
  applySort();
  const list = document.getElementById("ikenList");
  list.innerHTML = "";

  ikens.forEach((i, index) => {
    if (filter && i.category !== filter) return;

    const div = document.createElement("div");

    const displayUser = i.userId;

    div.innerHTML = `
      <p>【${i.category}】 <strong>${displayUser}</strong>（${i.date}）</p>
      <p>${i.message}</p>
      <p><strong>管理者返信：</strong>${i.reply || "未回答"}</p>
    `;

    if (i.userId === loginUser.id && !loginUser.role) {
      div.style.border = "2px solid #4CAF50";
      div.style.background = "#f1fff1";

      const mark = document.createElement("div");
      mark.textContent = "あなたの投稿";
      mark.style.fontWeight = "bold";
      mark.style.color = "#2e7d32";
      div.prepend(mark);
    }






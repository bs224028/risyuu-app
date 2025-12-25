const loginUser = JSON.parse(localStorage.getItem("loginUser"));
if (!loginUser) location.href = "login.html";

let ikens = JSON.parse(localStorage.getItem("ikens")) || [];

function isNew(date) {
  return date === new Date().toLocaleDateString();
}

function canDelete(iken) {
  if (loginUser.role === "管理者") return true;
  return iken.userId === loginUser.id;
}

function drawList(data) {
  const list = document.getElementById("ikenList");
  list.innerHTML = "";

  data.forEach((i, index) => {
    const card = document.createElement("div");
    card.className = "iken-card";

    if (i.userId === loginUser.id && !loginUser.role) {
      card.classList.add("my-post");
    }

    card.innerHTML = `
      <div class="iken-header">
        <span class="iken-user">${i.userId}${isNew(i.date) ? '<span class="new-mark"> NEW</span>' : ''}</span>
        <span class="iken-date">${i.date}</span>
      </div>
      <p>【${i.category}】</p>
      <p>${i.message}</p>
      <p><strong>管理者返信：</strong>${i.reply || "未回答"}</p>
    `;

    if (loginUser.role === "管理者") {
      const input = document.createElement("input");
      input.value = i.reply || "";
      input.placeholder = "返信を入力";

      const replyBtn = document.createElement("button");
      replyBtn.textContent = "返信";

      replyBtn.onclick = () => {
        i.reply = input.value;
        localStorage.setItem("ikens", JSON.stringify(ikens));
        drawList(data);
      };

      card.appendChild(input);
      card.appendChild(replyBtn);
    }

    if (canDelete(i)) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "削除";
      delBtn.onclick = () => {
        if (confirm("削除しますか？")) {
          ikens.splice(index, 1);
          localStorage.setItem("ikens", JSON.stringify(ikens));
          drawList(data);
        }
      };
      card.appendChild(delBtn);
    }

    list.appendChild(card);
  });
}

function sortIkens() {
  const type = document.getElementById("sortSelect").value;
  ikens.sort((a, b) => type === "new" ? b.id - a.id : a.id - b.id);
  filterIken();
}

function filterIken() {
  const cat = document.getElementById("filtercategory").value;
  const result = cat ? ikens.filter(i => i.category === cat) : ikens;
  drawList(result);
}

sortIkens();





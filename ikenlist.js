const loginUser = JSON.parse(localStorage.getItem("loginUser"));
if (!loginUser) location.href = "login.html";

let ikens = JSON.parse(localStorage.getItem("ikens")) || [];

function isNew(date) {
  const today = new Date().toLocaleDateString();
  return date === today;
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

    const header = document.createElement("div");
    header.className = "iken-header";

    const user = document.createElement("span");
    user.className = "iken-user";
    user.textContent = i.userId;

    if (isNew(i.date)) {
      const mark = document.createElement("span");
      mark.className = "new-mark";
      mark.textContent = " NEW";
      user.appendChild(mark);
    }

    const date = document.createElement("span");
    date.className = "iken-date";
    date.textContent = i.date;

    header.appendChild(user);
    header.appendChild(date);
    card.appendChild(header);

    const body = document.createElement("div");
    body.innerHTML = `
      <p>【${i.category}】</p>
      <p>${i.message}</p>
      <p><strong>管理者返信：</strong>${i.reply || "未回答"}</p>
    `;
    card.appendChild(body);

    if (loginUser.role === "管理者") {
      const input = document.createElement("input");
      input.placeholder = "返信を入力";
      input.value = i.reply || "";

      const replyBtn = document.createElement("button");
      replyBtn.textContent = "返信";

      replyBtn.onclick = () => {
        i.reply = input.value;
        localStorage.setItem("ikens", JSON.stringify(ikens));
        location.reload();
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
          location.reload();
        }
      };
      card.appendChild(delBtn);
    }

    list.appendChild(card);
  });
}

function sortIkens() {
  const type = document.getElementById("sortSelect").value;
  if (type === "new") {
    ikens.sort((a, b) => b.id - a.id);
  } else {
    ikens.sort((a, b) => a.id - b.id);
  }
  filterIken();
}

function filterIken() {
  const cat = document.getElementById("filtercategory").value;
  let filtered = ikens;
  if (cat) {
    filtered = ikens.filter(i => i.category === cat);
  }
  drawList(filtered);
}

sortIkens();





const loginUser = JSON.parse(localStorage.getItem("loginUser"));
if (!loginUser) {
  location.href = "login.html";
}

const ikens = JSON.parse(localStorage.getItem("ikens")) || [];
const list = document.getElementById("ikenList");

list.innerHTML = ""; 

ikens.forEach((i, index) => {
  const div = document.createElement("div");

  div.innerHTML = `
    <p><strong>${i.user}</strong>（${i.date}）</p>
    <p>${i.message}</p>
    <p><strong>管理者返信：</strong>${i.reply || "未回答"}</p>
  `;

  if (loginUser.role === "管理者") {
    const input = document.createElement("input");
    input.value = i.reply || "";
    input.placeholder = "管理者返信";

    const replyBtn = document.createElement("button");
    replyBtn.textContent = "返信";

    replyBtn.onclick = () => {
      i.reply = input.value;
      localStorage.setItem("ikens", JSON.stringify(ikens));
      location.reload();
    };

    div.appendChild(input);
    div.appendChild(replyBtn);
  }


  const loginName =
    loginUser.role === "管理者"
      ? loginUser.username
      : loginUser.id;

  if (loginUser.role === "管理者" || i.user === loginName) {
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.style.marginLeft = "10px";

    delBtn.onclick = () => {
      if (confirm("この意見を削除しますか？")) {
        ikens.splice(index, 1);
        localStorage.setItem("ikens", JSON.stringify(ikens));
        location.reload();
      }
    };

    div.appendChild(delBtn);
  }

  list.appendChild(div);
});




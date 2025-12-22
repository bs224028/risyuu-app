const loginUser = JSON.parse(localStorage.getItem("loginUser"));
if (!loginUser) {
  location.href = "login.html";
}

const ikens = JSON.parse(localStorage.getItem("ikens")) || [];
const list = document.getElementById("ikenList");

ikens.forEach(i => {
  const div = document.createElement("div");

  div.innerHTML = `
    <p><strong>${i.user}</strong>（${i.date}）</p>
    <p>${i.message}</p>
    <p><strong>管理者返信：</strong>${i.reply ? i.reply : "未回答"}</p>
  `;

  if (loginUser.role === "管理者") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "管理者返信を入力";
    input.value = i.reply || "";

    const btn = document.createElement("button");
    btn.textContent = "返信";

    btn.onclick = () => {
      if (!input.value) {
        alert("返信内容を入力してください");
        return;
      }
      i.reply = input.value;
      localStorage.setItem("ikens", JSON.stringify(ikens));
      alert("返信を保存しました");
      location.reload();
    };

    div.appendChild(input);
    div.appendChild(btn);
  }

  list.appendChild(div);
});



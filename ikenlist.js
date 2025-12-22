const ikens = JSON.parse(localStorage.getItem("ikens")) || [];
const loginUser = JSON.parse(localStorage.getItem("loginUser"));
const list = document.getElementById("ikenList");

ikens.forEach(i => {
  const div = document.createElement("div");

  div.innerHTML = `
    <p><strong>${i.user}</strong>（${i.date}）</p>
    <p>${i.message}</p>
    <p><strong>管理者返信：</strong>${i.reply || "未回答"}</p>
  `;

  if (loginUser && loginUser.role === "管理者") {
    const input = document.createElement("input");
    input.value = i.reply;
    input.placeholder = "管理者返信";

    const btn = document.createElement("button");
    btn.textContent = "返信";

    btn.onclick = () => {
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



const loginUser = JSON.parse(localStorage.getItem("loginUser"));
if (!loginUser) {
  location.href = "login.html";
}

function sendIken() {
  const text = document.getElementById("iken").value.trim();
  if (!text) {
    alert("意見を入力してください");
    return;
  }

  const ikens = JSON.parse(localStorage.getItem("ikens")) || [];

  ikens.push({
    id: Date.now(),
    userId: loginUser.role ? "admin" : loginUser.id,
    userName: loginUser.role ? loginUser.username : loginUser.id,
    category: document.getElementById("category").value,
    message: text,
    date: new Date().toLocaleDateString(),
    reply: ""
  });

  localStorage.setItem("ikens", JSON.stringify(ikens));

  alert("意見を送信しました");
  document.getElementById("iken").value = "";
  location.href = "ikenlist.html";

}





const loginUser = JSON.parse(localStorage.getItem("loginUser"));
if (!loginUser) location.href = "login.html";

function sendIken() {
  const text = document.getElementById("iken").value.trim();
  const category = document.getElementById("category").value;

  if (!text) {
    alert("意見を入力してください");
    return;
  }

  const ikens = JSON.parse(localStorage.getItem("ikens")) || [];

  ikens.push({
    id: Date.now(),
    userId: loginUser.id,
    category: category,
    message: text,
    date: new Date().toLocaleDateString(),
    reply: ""
  });

  localStorage.setItem("ikens", JSON.stringify(ikens));

  location.href = "ikenlist.html";
}







const confirmList = document.getElementById("confirmList");

function loadConfirm() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach(course => {
    const li = document.createElement("li");
    li.textContent = course.name;
    confirmList.appendChild(li);
  });
}

function complete() {
  // 完了ページ（A担当想定）
  location.href = "complete.html";
}

loadConfirm();

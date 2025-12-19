function sendIken() {
  const text = document.getElementById("iken").value;

  if (!text) {
    alert("意見を入力してください");
    return;
  }

  const ikens = JSON.parse(localStorage.getItem("ikens")) || [];
  ikens.push(text);
  localStorage.setItem("ikens", JSON.stringify(ikens));

  alert("意見を送信しました");
  document.getElementById("iken").value = "";
}



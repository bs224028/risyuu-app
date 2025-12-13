function sendFeedback() {
  const text = document.getElementById("msg").value;

  if (!text) {
    alert("入力してください");
    return;
  }

  const list = JSON.parse(localStorage.getItem("feedback") || "[]");
  list.push({
    text: text,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("feedback", JSON.stringify(list));

  alert("送信しました！");
  document.getElementById("msg").value = "";
}


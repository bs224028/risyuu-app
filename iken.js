showFeedback();

function sendFeedback() {
  const message = document.getElementById("message").value;

  if (message === "") {
    alert("意見を入力してください");
    return;
  }

  const user = JSON.parse(localStorage.getItem("loginUser"));

  const feedback = {
    name: user.name,
    text: message,
    date: new Date().toLocaleString()
  };

  const feedbacks =
    JSON.parse(localStorage.getItem("feedbacks")) || [];

  feedbacks.push(feedback);

  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  document.getElementById("message").value = "";

  showFeedback();
}

function showFeedback() {
  const list = document.getElementById("feedbackList");
  list.innerHTML = "";

  const feedbacks =
    JSON.parse(localStorage.getItem("feedbacks")) || [];

  feedbacks.forEach(f => {
    const li = document.createElement("li");
    li.textContent = `${f.date}｜${f.name}：${f.text}`;
    list.appendChild(li);
  });
}


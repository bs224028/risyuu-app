async function register() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const pw = document.getElementById("password").value;

  if (!id || !name || !pw) {
    alert("すべて入力してください");
    return;
  }

  let users = [];
  try {
    const res = await fetch("user.json");
    users = await res.json();
  } catch {
    users = [];
  }

  if (users.find(u => u.id === id)) {
    alert("このIDは使われています");
    return;
  }

  users.push({ id, name, password: pw });

  localStorage.setItem("users", JSON.stringify(users));

  alert("登録完了！ログインしてください");
  window.location.href = "login.html";
}

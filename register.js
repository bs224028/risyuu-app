function register() {
  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value.trim();
  const pw = document.getElementById("password").value;

  if (!id || !name || !pw) {
    alert("すべて入力してください");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.id === id)) {
    alert("このユーザーIDはすでに使われています");
    return;
  }

  if (users.find(u => u.name === name)) {
    alert("このユーザー名はすでに使われています");
    return;
  }

  users.push({ id, name, password: pw });
  localStorage.setItem("users", JSON.stringify(users));

  alert("登録が完了しました。ログインしてください");
  location.href = "login.html";
}


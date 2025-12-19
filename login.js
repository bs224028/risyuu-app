async function login() {
  const id = document.getElementById("id").value;
  const pw = document.getElementById("password").value;

  const res = await fetch("user.json");
  const users = await res.json();

  const user = users.find(u => u.id === id && u.password === pw);

  if (!user) {
    alert("IDまたはパスワードが違います");
    return;
  }

  localStorage.setItem("loginUser", JSON.stringify(user));
  window.location.href = "home.html";
}


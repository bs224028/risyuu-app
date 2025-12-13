async function login() {
  const id = document.getElementById("userId").value;
  const pw = document.getElementById("password").value;
  const res = await fetch("data/users.json");
  const users = await res.json();
  const user = user.find(u => u.id === id && u.password === pw);

  if (!user) {
    alert("IDまたはパスワードが違います");
    return;
  }

  localStorage.setItem("loginUser", JSON.stringify(user));

  window.location.href = "home.html";
}


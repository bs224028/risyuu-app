async function login() {
  const id = document.getElementById("id").value;
  const pw = document.getElementById("password").value;
  const res = await fetch("data/user.json");
  const user = await res.json();
  const users = user.find(u => u.id === id && u.password === pw);
  console.log(users);
  if (!users) {
    alert("IDまたはパスワードが違います");
    return;
  }
  console.log("login success");
  localStorage.setItem("loginUser", JSON.stringify(users));

  window.location.href = "home.html";
}


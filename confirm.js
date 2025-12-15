function confirmRegister() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  localStorage.setItem("myKougi", JSON.stringify(cart));
  localStorage.removeItem("cart");
  location.href = "complete.html";
}

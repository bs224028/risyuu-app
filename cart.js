const cartList = document.getElementById("cartList");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartList.innerHTML = "";

  cart.forEach((course, index) => {
    const li = document.createElement("li");
    li.textContent = course.name;

    const btn = document.createElement("button");
    btn.textContent = "削除";
    btn.onclick = () => removeFromCart(index);

    li.appendChild(btn);
    cartList.appendChild(li);
  });
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function goConfirm() {
  location.href = "confirm.html";
}

loadCart();

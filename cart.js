const list = document.getElementById("list");

function showCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = "<li>仮履修中の講義はありません</li>";
    return;
  }

  cart.forEach((k, index) => {
    const li = document.createElement("li");
    li.textContent = k.name + " ";

    const btn = document.createElement("button");
    btn.textContent = "削除";
    btn.onclick = () => removeKougi(index);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function removeKougi(index) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.splice(index, 1);   // 指定位置の講義を削除
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();              // 再表示
}

showCart();

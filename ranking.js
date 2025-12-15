const list = document.getElementById("ranking");
const data = JSON.parse(localStorage.getItem("myKougi") || "[]");

const count = {};
data.forEach(k => {
  count[k.name] = (count[k.name] || 0) + 1;
});

Object.entries(count)
  .sort((a, b) => b[1] - a[1])
  .forEach(([name, c]) => {
    const li = document.createElement("li");
    li.textContent = `${name}（${c}人）`;
    list.appendChild(li);
  });

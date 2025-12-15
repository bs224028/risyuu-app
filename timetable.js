const table = document.getElementById("table");
const list = JSON.parse(localStorage.getItem("myKougi") || "[]");

list.forEach(k => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${k.day}</td><td>${k.name}</td>`;
  table.appendChild(tr);
});


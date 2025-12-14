const table = document.getElementById("timetable");

function loadTimetable() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach(course => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${course.day || "未定"}</td>
      <td>${course.name}</td>
    `;
    table.appendChild(tr);
  });
}

loadTimetable();

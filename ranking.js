const rankingList = document.getElementById("rankingList");

function loadRanking() {
  // 仮データ（後でレビュー平均に置き換え）
  const courses = JSON.parse(localStorage.getItem("courses")) || [];

  courses
    .sort((a, b) => b.review - a.review)
    .forEach(course => {
      const li = document.createElement("li");
      li.textContent = `${course.name}（評価：${course.review}）`;
      rankingList.appendChild(li);
    });
}

loadRanking();

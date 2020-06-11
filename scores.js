var scoreList = JSON.parse(localStorage.getItem("scores"));
var scores = document.querySelector("#scores");

function displayScores() {
// Clear previous scores
document.querySelectorAll("li").forEach(e => e.parentNode.removeChild(e));

if(scoreList != null) {
    scoreList.forEach(score => {
        var listItem = document.createElement("li");
        listItem.textContent = `${score.initials} - ${score.score}`;
        scores.appendChild(listItem);
    });
}

}
document.querySelector("#btnBack").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.querySelector("#btnClear").addEventListener("click", function() {
  localStorage.setItem("scores", null);
  window.location.href = "highscores.html";
})

displayScores();
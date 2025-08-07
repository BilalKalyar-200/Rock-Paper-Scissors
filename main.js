//to keep the score stored when page is closed or restted
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
update_score();
function move_finder(random_number) {
  if (random_number >= 0 && random_number < 1 / 3) {
    return "Rock";
  } else if (random_number >= 1 / 3 && random_number < 2 / 3) {
    return "Scissors";
  } else if (random_number >= 2 / 3 && random_number < 1) {
    return "Paper";
  }
}
document.querySelector(".js-rock-button").addEventListener("click", () => {
  play_game("Rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  play_game("Paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  play_game("Scissors");
});
let is_autoPlay = false;
let intervalID;
function autoplay_func() {
  if (!is_autoPlay) {
    intervalID = setInterval(function () {
      random_number = Math.random();
      const movee = move_finder(random_number);
      play_game(movee);
    }, 1000);
    is_autoPlay = true;
  } else {
    clearInterval(intervalID);
    is_autoPlay = false;
  }
}
function play_game(user_move) {
  random_number = Math.random();
  const comp_move = move_finder(random_number);
  let result = "";
  if (user_move == "Rock" && comp_move == "Paper") {
    result = "💔 You Lost.";
    score.losses += 1;
  } else if (user_move == "Paper" && comp_move == "Scissors") {
    score.losses += 1;
    result = "💔 You Lost.";
  } else if (user_move == "Scissors" && comp_move == "Rock") {
    score.losses += 1;
    result = "💔 You Lost.";
  } else if (comp_move == user_move) {
    score.ties += 1;
    result = "🤝 Its a Tie.";
  } else {
    score.wins += 1;
    result = "🎉 You Won.";
  }
  localStorage.setItem("score", JSON.stringify(score));
  update_score();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-movess"
  ).innerHTML = `You:<img src="${user_move}.png"  class="icons"> Computer: <img src="${comp_move}.png" class="icons"> `;
}
// ==========function to update score==================
function update_score() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins} Losses:${score.losses} Ties:${score.ties}`;
}
document.querySelector(".js-result").innerHTML = result;

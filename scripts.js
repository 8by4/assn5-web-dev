let total_wins = parseInt(localStorage.getItem('total_wins')) || 0;
let total_losses = parseInt(localStorage.getItem('total_losses')) || 0;
let total_ties = parseInt(localStorage.getItem('total_ties')) || 0;

const player_choice = document.querySelectorAll(".player_choice")
const options = ["images/rock.png", "images/paper.png", "images/scissors.png"];
const replay_button = document.getElementById('again');


let decided = false;
let index = 0;
let cpu_choice;
let player_throw;
let image_timer = null;


for (let i = 0; i < player_choice.length; i++) {
    const element = player_choice[i];
    element.addEventListener('click', choose);
}

console.log(total_losses, total_ties, total_wins);


function choose() {
    if (decided) {
        return;
    }
    this.style.border = "5px solid red"

    if (this.id === "0") {
        player_throw = 0;
    } else if (this.id === "1") {
        player_throw = 1;
    } else {
        player_throw = 2;
    }

    console.log(player_throw);

    decided = true;
    computer_throw();
}

function computer_throw() {
    cpu_choice = document.querySelector('#cpu_choice');
    index = 0;
    image_timer = setInterval(thinking, 500);

    setTimeout(() => {
        clearInterval(image_timer);
        image_timer = null;

        let cpu_throw = Math.floor(Math.random() * options.length);
        cpu_choice.src = options[cpu_throw];
        cpu_choice.style.border = "5px solid blue";

        results(player_throw, cpu_throw);


    }, 3000);

}


function thinking() {
    index++;
    if (index >= options.length) {
        index = 0;
    }
    cpu_choice.src = options[index];
    cpu_choice.style.border = "";
}


function results(player_throw, cpu_throw) {
    const loss = document.createTextNode(" You Lost!");
    const win = document.createTextNode(" You Won!");
    const tie = document.createTextNode(" You Tied!");
    let result_text = document.getElementById('results');

    if (player_throw === 0 && cpu_throw === 0) {
        total_ties++;
        result_text.append(tie);
    } else if (player_throw === 1 && cpu_throw === 0) {
        total_wins++;
        result_text.append(win);
    } else if (player_throw === 2 && cpu_throw === 0) {
        total_losses++;
        result_text.append(loss);
    }

    else if (player_throw === 0 && cpu_throw === 1) {
        total_losses++;
        result_text.append(loss);
    } else if (player_throw === 1 && cpu_throw === 1) {
        total_ties++;
        result_text.append(tie);
    } else if (player_throw === 2 && cpu_throw === 1) {
        total_wins++;
        result_text.append(win);
    }

    else if (player_throw === 0 && cpu_throw === 2) {
        total_wins++;
        result_text.append(win);
    } else if (player_throw === 1 && cpu_throw === 2) {
        total_losses++;
        result_text.append(loss);
    } else if (player_throw === 2 && cpu_throw === 2) {
        total_ties++;
        result_text.append(tie);
    }

    localStorage.setItem('total_wins', total_wins);
    localStorage.setItem('total_losses', total_losses);
    localStorage.setItem('total_ties', total_ties);

}
let win_display = document.getElementById('wins');
let tally_win = document.createTextNode(total_wins);

win_display.append(tally_win);


let lose_display = document.getElementById('losses');
let tally_lose = document.createTextNode(total_losses);

lose_display.append(tally_lose);


let tie_display = document.getElementById('ties');
let tally_tie = document.createTextNode(total_ties);

tie_display.append(tally_tie);

const reset_counts = document.getElementById('count_reset');
reset_counts.addEventListener('click', count_resetter);

function count_resetter() {
    localStorage.setItem('total_wins', 0);
    localStorage.setItem('total_losses', 0);
    localStorage.setItem('total_ties', 0);
    window.location.reload();
}



replay_button.addEventListener('click', () => {
    decided = false;
    window.location.reload()
});
const player_choice = document.querySelectorAll(".player_choice")
let decided = false;

for (let index = 0; index < player_choice.length; index++) {
    const element = player_choice[index];
    element.addEventListener('click', choose);
}


function choose() {
    console.log(decided);

    if (this.style.border === "5px solid red") {
        this.style.border = "";
        decided = false;
    }else if(!decided){
        this.style.border = "5px solid red"
        decided = true;
    }
}
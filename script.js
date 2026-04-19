let number = Math.floor(Math.random() * 1000) + 1;
let guesses = 0;
let basePoints = 20;
const powerUps = ["Double Points", "Odds or Evens", "Digital Oracle", "From the Middle"];
let pwr;
let points;

document.getElementById("pre").innerText = powerUps[Math.floor(Math.random() * powerUps.length)];

function guess(){
    const input = document.getElementById("number").value;
    guesses++;

    if (guesses > 19){
        basePoints++;
    } else if (guesses === 1){
        if (document.getElementById("power").innerText !== pwr){
            document.getElementById("power").innerText = "none";
            document.getElementById("output").innerText = null;
        } else if (pwr === "Double Points"){
            document.getElementById("output").innerText = null;
        }
    }

    if (document.getElementById("output").innerText === "You don't have enough points to buy that."){
        document.getElementById("output").innerText = null;
    }

    if(input > 0 && input <= 1000){
        if (input > number){
        document.getElementById("result").innerText = `The number is less than ${input}.`;
        } else if (input < number){
            document.getElementById("result").innerText = `The number is greater than ${input}.`;
        } else {
            if (basePoints-guesses === 1){
                document.getElementById("result").innerText = `Correct! The number is ${number}!\nIt took you ${guesses} guesses, so you earn ${basePoints - guesses} point.\n\nThe game has been reset. Enter another number to keep playing!`;
            } else {
                document.getElementById("result").innerText = `Correct! The number is ${number}!\nIt took you ${guesses} guesses, so you earn ${basePoints - guesses} points.\n\nThe game has been reset. Enter another number to keep playing!`;
            }

            if (pwr === "Double Points"){
                points = (basePoints - guesses) * 2;
                document.getElementById("output").innerText = `Your earned points were doubled, so you received ${points} points.`;
            } else {
                points = basePoints - guesses;
            }

            document.getElementById("number").value = null;
            document.getElementById("points").innerText = Number(document.getElementById("points").innerHTML) + points;
            document.getElementById("pre").innerText = powerUps[Math.floor(Math.random() * powerUps.length)];
            if (!(document.getElementById("output").innerText).includes("points were doubled")){
                document.getElementById("output").innerText = null;
            }
            number = Math.floor(Math.random() * 1000) + 1;
            guesses = 0;
            basePoints = 20;
            pwr = "void";
        }
    } else {
        guesses--;
        if (!input) {
            document.getElementById("result").innerText = "NULL is not a valid input.";
        } else if (input > 1000 || input <= 0) {
            document.getElementById("result").innerText = `${input} is not a valid input.`;
        }
    }
}

function buy(mode) {
    if (document.getElementById("points").innerText >= 10) {
        if (mode === "prePick") {
            pwr = document.getElementById("pre").innerText;
        } else {
            do(pwr = powerUps[Math.floor(Math.random() * powerUps.length)]); while(pwr === document.getElementById("pre").innerText);
        }

        document.getElementById("points").innerText = Number(document.getElementById("points").innerText) - 10;
        document.getElementById("power").innerText = pwr;

        switch (pwr) {
            case "Odds or Evens":
                if (number % 2 === 0) {
                    document.getElementById("output").innerText = "The number is even.";
                } else {
                    document.getElementById("output").innerText = "The number is odd.";
                }
                break;
            case "Digital Oracle":
                document.getElementById("output").innerText = `The number's tens digit is ${Math.floor(number / 10) % 10}.`;
                break;
            case "From the Middle":
                if (number > 500) {
                    document.getElementById("output").innerText = "The number is greater than 500.";
                } else if (number < 500) {
                    document.getElementById("output").innerText = "The number is less than 500.";
                } else {
                    document.getElementById("output").innerText = "The number isn't less than or greater than 500.";
                }
                break;
        }
    } else {
        document.getElementById("output").innerText = "You don't have enough points to buy that.";
    }
}
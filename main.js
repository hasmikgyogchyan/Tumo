
let correct;
let seconds = 45;
let correctAnswer = 0;
let incorrectAnswer = 0;
function getElement(id) {
    return document.getElementById(id);
}
function getRandomCountry() {
    return countries[Math.round(Math.random() * (countries.length - 1))];
}
function main() {
    let options = [];
    const maxOptions = 3;
    while (options.length < maxOptions) {
        let coun = getRandomCountry();
        if (options.indexOf(coun) === -1) {
            options.push(coun);
        }
    }
    for (let i = 0; i < options.length; i++) {
        getElement(`option${i + 1}label`).innerHTML = options[i].name;
        getElement(`option${i + 1}input`).value = options[i].name;
        getElement(`option${i + 1}input`).checked = false;
    }
    correct = options[Math.round(Math.random() * (options.length - 1))];
    getElement("flag").src = correct.flag;
}
function timer() {
    setTimeout(finish, seconds * 1000);
    getElement("time").innerHTML = seconds;
    let countdown = setInterval(function () {
        seconds--;
        getElement("time").textContent = seconds;
        if (seconds <= 0) clearInterval(countdown);
        if (seconds === 5) getElement("time").style.color = "#ff0000";
    }, 1000);
}
function check() {
    let input;
    try {
        input = document.querySelector('input[name = "option"]:checked').value;
    } catch {
        return;
    }
    if (input === correct.name) {
        correctAnswer++;
        getElement("score").innerHTML = correctAnswer;
    } else {
        incorrectAnswer++;
    }
    main();
}
function finish() {
    clearInterval(checkInterval);

    let percentage = Math.round(correctAnswer / (correctAnswer + incorrectAnswer) * 100)
    let resultForAnswer;
    if (isNaN(percentage)) {
        getElement("alertaccuracy").innerHTML = "դուք ձախողվեցիք"
    } else {
        if (percentage >= 80) {
            resultForAnswer = "հրաշալի է"
        }
        else if (percentage < 50) {
            resultForAnswer = "վատ է"
        }
        else if (percentage >= 50 && percentage <= 80) {
            resultForAnswer = "վատ չէ"
        }
        getElement("alertaccuracy").innerHTML = ` ${percentage}%`;
    }
}

let checkInterval = setInterval(check, 50);
main();
timer();
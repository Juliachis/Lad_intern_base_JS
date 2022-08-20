const readlineSync = require("readline-sync");

const answerNum = createAnswerNum();

let rounds = 10;
let gameOver = false;

while (!gameOver) {
  if (rounds > 0) {
    gameOver = compareWithAnswer(answerNum);
    !gameOver
      ? console.log(`Осталось ${--rounds} ходов`)
      : console.log("Вы выиграли!");
  } else {
    gameOver = true;
    console.log(`Игра окончена, загаданное число: ${answerNum.join("")}`);
  }
}

// функция для создания числа, которое загадывает компьютер
function createAnswerNum() {
  let num = [];
  while (num.length < 5) {
    let randomNum = Math.floor(Math.random() * 10);
    if (!num.includes(randomNum)) {
      num.push(randomNum);
    }
  }
  return num;
}

// функция для сравнения загаданного числа с ответом пользователя
function compareWithAnswer(arr) {
  let userAnswer = readlineSync.question(
    "Enter a number containing 5 different digits "
  );
  let userAnswArr = userAnswer.split("");

  let bulls = 0;
  let cows = 0;

  userAnswArr.forEach((el, i) => {
    if (+el === arr[i]) {
      bulls++;
    } else if (arr.includes(+el)) {
      cows++;
    }
  });
  console.log(
    `совпавших цифр не на своих местах - ${cows}, цифр на своих местах - ${bulls}`
  );
  return bulls === 5 ? true : false;
}

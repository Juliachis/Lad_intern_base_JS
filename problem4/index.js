const readlineSync = require("readline-sync");

const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      name: "Удар когтистой лапой",
      physicalDmg: 3, // физический урон
      magicDmg: 0, // магический урон
      physicArmorPercents: 20, // физическая броня
      magicArmorPercents: 20, // магическая броня
      cooldown: 0, // ходов на восстановление
    },
    {
      name: "Огненное дыхание",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Удар хвостом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};

const player = {
  moves: [
    {
      name: "Удар боевым кадилом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
    },
    {
      name: "Вертушка левой пяткой",
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
    },
    {
      name: "Каноничный фаербол",
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Магический блок",
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
    },
  ],
};

// начальные параметры
let monsterHealth = 10;
let playerHealth = Number(
  readlineSync.question("Choose your max health level: 8, 9 or 10 ")
);
let gameOver = false;
const monsterCooldown = [0, 0, 0];
const playerCooldown = [0, 0, 0, 0];

// ход игры
while (!gameOver) {
  let monsterAction = chooseMonsterPunch();

  let playerAction = choosePlayerPunch();

  calcDamage(monsterAction, playerAction);

  console.log(
    `Здоровье монстра - ${monsterHealth}, ваше здоровье - ${playerHealth}`
  );

  if (playerHealth <= 0 && monsterHealth <= 0) {
    gameOver = true;
    console.log("Игра окончена, ничья!");
  } else if (playerHealth <= 0) {
    gameOver = true;
    console.log("Игра окончена, победил монстр!");
  } else if (monsterHealth <= 0) {
    gameOver = true;
    console.log("Игра окончена, вы победили!");
  }

  for (let i = 0; i < monsterCooldown.length; i++) {
    monsterCooldown[i]--;
  }

  for (let i = 0; i < playerCooldown.length; i++) {
    playerCooldown[i]--;
  }

  // console.log(monsterCooldown, playerCooldown);
}

// случайный выбор действия монстра
function chooseMonsterPunch() {
  let randomMove = Math.floor(Math.random() * 3);
  let monsterPunch = monster.moves[randomMove];
  if (monsterCooldown[randomMove] <= 0) {
    monsterCooldown[randomMove] = monsterPunch.cooldown + 1;
    console.log(`Я собираюсь использовать для атаки ${monsterPunch.name}`);
    return monsterPunch;
  } else {
    return chooseMonsterPunch();
  }
}

// выбор действия для игрока
function choosePlayerPunch() {
  let actionNum =
    Number(
      readlineSync.question(
        "Choose your action for attack: type a number from 1 to 4 "
      )
    ) - 1;
  let playerPunch = player.moves[actionNum];
  if (playerCooldown[actionNum] <= 0) {
    playerCooldown[actionNum] = playerPunch.cooldown + 1;
    console.log(`Вы выбрали ${playerPunch.name}`);
    return playerPunch;
  } else {
    console.log(
      "Действие не может быть выбрано в текущий ход! Выберите другое действие"
    );
    return choosePlayerPunch();
  }
}

// подсчет урона после ударов
function calcDamage(punch1, punch2) {
  let monsterPhysicDamage =
    punch2.physicalDmg * (1 - punch1.physicArmorPercents / 100);
  let monsterMagicDamage =
    punch2.magicDmg * (1 - punch1.magicArmorPercents / 100);
  let monsterAfterDamage =
    monsterHealth - monsterPhysicDamage - monsterMagicDamage;
  monsterHealth = monsterAfterDamage.toFixed(1);

  let playerPhysicDamage =
    punch1.physicalDmg * (1 - punch2.physicArmorPercents / 100);
  let playerMagicDamage =
    punch1.magicDmg * (1 - punch2.magicArmorPercents / 100);
  let playerAfterDamage = playerHealth - playerPhysicDamage - playerMagicDamage;
  playerHealth = playerAfterDamage.toFixed(1);
}

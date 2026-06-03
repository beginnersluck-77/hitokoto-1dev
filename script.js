let playerCount = 0;

let currentPlayer = 1;

const names = [];

const pairs = [];

const startButton = document.getElementById("startButton");

const startScreen = document.getElementById("startScreen");

const playerCountScreen = document.getElementById("playerCountScreen");

const passScreen =
  document.getElementById("passScreen");

const continueButton =
  document.getElementById("continueButton");

const nextButton =
  document.getElementById("nextButton");

const playerCountInput =
  document.getElementById("playerCountInput");

const nameInputScreen =
  document.getElementById("nameInputScreen");

const nameTitle =
  document.getElementById("nameTitle");

const nameInput =
  document.getElementById("nameInput");

const saveNameButton =
  document.getElementById("saveNameButton");

const resultScreen =
  document.getElementById("resultScreen");

const resultName =
  document.getElementById("resultName");

const resultMessage =
  document.getElementById("resultMessage");

const nextResultButton =
  document.getElementById("nextResultButton");

const announcementScreen =
  document.getElementById("announcementScreen");

const startAnnouncementButton =
  document.getElementById("startAnnouncementButton");

let resultIndex = 0;

let shuffledResults = [];

startButton.addEventListener("click", () => {

  startScreen.style.display = "none";

  playerCountScreen.style.display = "block";

});

let currentMessageIndex = 0;

const messageScreen =
  document.getElementById("messageScreen");

const messageTitle =
  document.getElementById("messageTitle");

const targetText =
  document.getElementById("targetText");

const messageInput =
  document.getElementById("messageInput");

const sendMessageButton =
  document.getElementById("sendMessageButton");

nextButton.addEventListener("click", () => {

  playerCount =
    Number(playerCountInput.value);

  playerCountScreen.style.display = "none";

  nameInputScreen.style.display = "block";

});

saveNameButton.addEventListener("click", () => {

  const enteredName = nameInput.value;

  names.push(enteredName);

  console.log(names);

  currentPlayer++;

  nameInput.value = "";

  if (currentPlayer > playerCount) {

  const shuffledNames =
    createPairs(names);

  for (let i = 0; i < names.length; i++) {

    pairs.push({
      from: names[i],
      to: shuffledNames[i]
    });

  }

  console.log(pairs);

  nameInputScreen.style.display = "none";

  passScreen.style.display = "block";
  targetText.innerText =
    `あなたは ${pairs[0].to} さんに書いてください`;

} else {

  nameTitle.innerText =
    `${currentPlayer}人目の名前を入力`;

}

});

function shuffleArray(array) {

  const shuffled = [...array];

  shuffled.sort(() => Math.random() - 0.5);

  return shuffled;

}

function createPairs(names) {

  let shuffled = [];

  let isValid = false;

  while (!isValid) {

    shuffled = shuffleArray(names);

    isValid = true;

    for (let i = 0; i < names.length; i++) {

      if (names[i] === shuffled[i]) {

        isValid = false;

        break;

      }

    }

  }

  return shuffled;

}

sendMessageButton.addEventListener("click", () => {

  const message = messageInput.value;

  pairs[currentMessageIndex].message = message;

  currentMessageIndex++;

  if (currentMessageIndex >= pairs.length) {

    shuffledResults = [...pairs];
    shuffledResults.sort((a, b) => {

  return names.indexOf(a.to) - names.indexOf(b.to);

  });

    console.log(shuffledResults);

    messageScreen.style.display = "none";
    passScreen.style.display = "none";
    resultScreen.style.display = "none";
    announcementScreen.style.display = "block";

    resultName.innerText =
      `${shuffledResults[0].to}さん`;

    resultMessage.innerText =
      `「${shuffledResults[0].message}」`;

  } else {

    messageScreen.style.display = "none";

    passScreen.style.display = "block";

  }

});

startAnnouncementButton.addEventListener("click", () => {

  announcementScreen.style.display = "none";

  resultScreen.style.display = "block";

  resultIndex = 0;

  resultName.innerText =
    `${shuffledResults[0].to}さん`;

  resultMessage.innerText =
    `「${shuffledResults[0].message}」`;

});

nextResultButton.addEventListener("click", () => {

  resultIndex++;

  if (resultIndex >= shuffledResults.length) {

    resultName.innerText =
      "発表終了！";

    resultMessage.innerText =
      "";

    nextResultButton.style.display =
      "none";

  } else {

    resultName.innerText =
      `${shuffledResults[resultIndex].to}さん`;

    resultMessage.innerText =
      `「${shuffledResults[resultIndex].message}」`;

  }

});

continueButton.addEventListener("click", () => {

  passScreen.style.display = "none";

  messageScreen.style.display = "block";

  messageTitle.innerText =
    `${pairs[currentMessageIndex].from}さんの番！`;

  targetText.innerText =
    `あなたは ${pairs[currentMessageIndex].to} さんに書いてください`;

  messageInput.value = "";

});

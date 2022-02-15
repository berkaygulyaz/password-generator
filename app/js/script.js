// Charset - https://www.net-comber.com/charset.html

const resultEl = document.getElementById("passfield");
const lengthEl = document.getElementById("num");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.setAttribute(
    "value",
    generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
  );
});

const generatePassword = (lower, upper, number, symbol, length) => {
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let index = 0; index < length; index += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      console.log("funcName:", funcName);

      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
};

// Lowercase is between 97 to 122
const getRandomLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

// Uppercase is between 65 to 90
const getRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Numbers is between 48 to 57
const getRandomNumbers = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

// Only special symbols
const getRandomSymbols = () => {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumbers,
  symbol: getRandomSymbols,
};

const checkInput = () => {
  const input = document.querySelectorAll("input[type='checkbox']");

  input.forEach((element) => {
    element.addEventListener("click", () => {
      const a = element.parentElement;
      a.classList.toggle("selected");
      element.checked;
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  checkInput();
});

const copyText = () => {
  const copyBtn = document.querySelector(".copy-wrapper");
  const feedback = document.querySelector(".copy-feedback");
  const passfield = document.querySelector(".passfield");
  copyBtn.addEventListener("click", () => {
    feedback.classList.add("active");
    passfield.select();
    navigator.clipboard.writeText(passfield.value);
  });
  setInterval(() => {
    feedback.classList.remove("active");
  }, 2000);
};

const checkInput = () => {
  const input = document.querySelectorAll("input[type='checkbox']");

  input.forEach((element) => {
    element.addEventListener("click", () => {
      const a = element.parentElement;
      a.classList.toggle("selected");
      element.toggleAttribute("checked")
        ? console.log(a.innerText)
        : console.log("berkay");
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  copyText();
  checkInput();
});

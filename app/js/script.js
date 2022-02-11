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

window.addEventListener("DOMContentLoaded", () => {
  copyText();
});

const btnSignup = document.querySelector(".btn__signup");

function Signup(e) {
  e.preventDefault();
  location.href = "./signup/index.html";
}
btnSignup.addEventListener("click", Signup);

const btnSignup = document.querySelector(".btn__signup");

function Signup(e) {
  e.preventDefault();
  location.href = "../html/login.html";
}
btnSignup.addEventListener("click", Signup);

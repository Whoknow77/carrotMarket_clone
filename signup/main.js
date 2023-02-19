const signupForm = document.querySelector(".signup__form"); // 회원가입 폼
const loginForm = document.querySelector(".login__form"); // 로그인 폼

const signupBtn = document.querySelector(".signup"); // 회원가입 시작 버튼
const signupSubmit = document.querySelector(".btn__signupsubmit"); // 회원가입 완료 버튼
const loginSubmit = document.querySelector(".btn__submit"); // 로그인 버튼
const errorid = document.querySelector(".errorid"); // 아이디 / 비밀번호 틀렸을때
const duplicateBtn = document.querySelector(".duplication"); // 중복 확인버튼
const warnid = document.querySelector(".warn__dupid"); // 중복일때 메시지
const warnNodupid = document.querySelector(".nodupid"); // 중복 확인이 안됐는데 회원가입 한 경우

let dupFlag = false;

function opensignupForm(e) {
  e.preventDefault();
  signupForm.style.display = "block";
  loginForm.style.display = "none";
}

function submitSignUp(e) {
  e.preventDefault();
  const id = signupForm.querySelector("[name=username").value;
  const pw = signupForm.querySelector("[name=password").value;
  window.localStorage.setItem(id, pw);
  if (dupFlag) {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  }
  warnNodupid.classList.add("block");
  function hide() {
    warnNodupid.classList.remove("block");
  }
  setTimeout(hide, 2000);
  return;
}

function errorLogin() {
  errorid.classList.add("block");
  function hide() {
    errorid.classList.remove("block");
  }
  setTimeout(hide, 2000);
}

function login(e) {
  e.preventDefault();
  const id = loginForm.querySelector("[name=username").value;
  const pw = loginForm.querySelector("[name=password").value;
  const localpw = localStorage.getItem(id);
  if (localpw) {
    if (localpw === pw) {
      location.href = "/carrotMarket_clone/index.html";
      return;
    } else {
      errorLogin();
      loginForm.querySelector("[name=id").value = "";
      loginForm.querySelector("[name=password").value = "";
      return;
    }
  } else {
    errorLogin();
    loginForm.querySelector("[name=id").value = "";
    loginForm.querySelector("[name=password").value = "";
    return;
  }
}

function duplicateCheck(e) {
  dupFlag = false; // 중복 여부

  e.preventDefault();
  const id = signupForm.querySelector("[name=username").value;

  // 로컬 스토리지에 중복되는 아이디 체크
  if (id) {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) === id) {
        signupForm.querySelector("[name=username").value = "";
        warnid.classList.add("block");
        function hide() {
          warnid.classList.remove("block");
        }
        setTimeout(hide, 2000);
        return;
      }
    }
    dupFlag = true;
  }
}

signupBtn.addEventListener("click", opensignupForm); // 회원가입 시작 버튼
signupSubmit.addEventListener("click", submitSignUp); // 회원가입 완료 버튼
loginSubmit.addEventListener("click", login); // 로그인 버튼
duplicateBtn.addEventListener("click", duplicateCheck); // 중복확인 버튼

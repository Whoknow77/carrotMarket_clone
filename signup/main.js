const signupForm = document.querySelector(".signup__form"); // 회원가입 폼
const loginForm = document.querySelector(".login__form"); // 로그인 폼
const findForm = document.querySelector(".pwfind__form"); // 비밀번호 찾기 폼

const signupBtn = document.querySelector(".signup"); // 회원가입 시작 버튼
const signupSubmit = document.querySelector(".btn__signupsubmit"); // 회원가입 완료 버튼
const loginSubmit = document.querySelector(".btn__submit"); // 로그인 버튼
const errorid = document.querySelector(".errorid"); // 아이디 / 비밀번호 틀렸을때
const duplicateBtn = document.querySelector(".duplication"); // 중복 확인버튼
const warnid = document.querySelector(".warn__dupid"); // 중복일때 메시지
const warnNodupid = document.querySelector(".nodupid"); // 중복 확인이 안됐는데 회원가입 한 경우
const forgetpw = document.querySelector(".btn__forget"); // 비밀번호 찾기
const pwfindSubmitBtn = document.querySelector(".pwfind__submit"); // 비밀번호 찾기
let dupFlag = false;

function opensignupForm(e) {
  e.preventDefault();
  findForm.classList.remove("block");
  dupFlag = false; // 중복 여부
  signupForm.style.display = "block";
  loginForm.style.display = "none";
}

function submitSignUp(e) {
  e.preventDefault();
  const id = signupForm.querySelector("[name=username]").value;
  const pw = signupForm.querySelector("[name=password]").value;
  window.localStorage.setItem(id, pw);
  if (dupFlag) {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  }
  warnNodupid.classList.add("block");
  function hide() {
    warnNodupid.classList.remove("block");
  }
  setTimeout(hide, 1000);
  return;
}

function errorLogin() {
  errorid.classList.add("block");
  function hide() {
    errorid.classList.remove("block");
  }
  setTimeout(hide, 1000);
}

function login(e) {
  e.preventDefault();
  if (e.target.value === "login" || e.keyCode === 13) {
    // 마우스로 누르거나 엔터 누를때만 로그인
    const id = loginForm.querySelector("[name=username]");
    const pw = loginForm.querySelector("[name=password]");
    const localpw = localStorage.getItem(id.value);
    if (localpw) {
      if (localpw === pw.value) {
        location.href = "/carrotMarket_clone/index.html";
        return;
      } else {
        id.value = "";
        pw.value = "";
        errorLogin();
        return;
      }
    } else {
      id.value = "";
      pw.value = "";
      errorLogin();
      return;
    }
  }
}

function duplicateCheck(e) {
  e.preventDefault();
  const id = signupForm.querySelector("[name=username]").value;

  // 로컬 스토리지에 중복되는 아이디 체크
  if (id) {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) === id) {
        signupForm.querySelector("[name=username]").value = "";
        warnid.classList.add("block");
        function hide() {
          warnid.classList.remove("block");
        }
        setTimeout(hide, 1000);
        return;
      }
    }
    dupFlag = true;
  }
}

function findpw(e) {
  e.preventDefault();
  findForm.classList.toggle("block");
}

function hideWarn() {}

function pwfindSubmit(e) {
  e.preventDefault();
  const pw = document.getElementById("found__pw");
  const id = findForm.querySelector("[name=pwfind__id]");
  const localIdList = Object.keys(localStorage);
  if (id.value) {
    for (localId of localIdList) {
      if (localId === id.value) {
        pw.innerText = localStorage.getItem(id.value);
        setTimeout(hide, 1000);
        return;
      }
    }
  }
  pw.innerText = "존재하지 않는 아이디입니다.";
  function hide() {
    pw.innerText = "";
    id.value = "";
  }
  setTimeout(hide, 1000);
}

signupBtn.addEventListener("click", opensignupForm); // 회원가입 시작 버튼
signupSubmit.addEventListener("click", submitSignUp); // 회원가입 완료 버튼
loginSubmit.addEventListener("click", login); // 로그인 버튼
duplicateBtn.addEventListener("click", duplicateCheck); // 중복확인 버튼
forgetpw.addEventListener("click", findpw); // 비밀번호 찾기 버튼
pwfindSubmitBtn.addEventListener("click", pwfindSubmit);

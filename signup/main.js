const signupForm = document.querySelector(".signup__form"); // 회원가입 폼
const loginForm = document.querySelector(".login__form"); // 로그인 폼
const findForm = document.querySelector(".pwfind__form"); // 비밀번호 찾기 폼

const signupBtn = document.querySelector(".signup"); // 회원가입 시작 버튼
const signupSubmit = document.querySelector(".btn__signupsubmit"); // 회원가입 완료 버튼
const loginSubmit = document.querySelector(".btn__submit"); // 로그인 버튼
const errorid = document.querySelector(".errorid"); // 아이디 / 비밀번호 틀렸을때
const errorpw = document.querySelector(".errorpw"); // 비밀번호 틀렸을때
const duplicateBtn = document.querySelector(".duplication"); // 중복 확인버튼
const warnId1 = document.querySelector(".warn__id1"); // 중복일때 메시지
const warnId2 = document.querySelector(".warn__id2"); // 중복 확인이 안됐는데 회원가입 한 경우
const warnPwd1 = document.querySelector(".warn__pwd1"); // 중복 비밀번호
const warnPwd2 = document.querySelector(".warn__pwd2"); // 중복 비밀번호
const warnEmail = document.querySelector(".warn__email"); // 중복 이메일
const warnPhone = document.querySelector(".warn__phone"); // 중복 핸드폰 번호
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
  signupCheck();
  return;
}

function errorId() {
  errorid.classList.add("block");
  function hide() {
    errorid.classList.remove("block");
  }
  setTimeout(hide, 1000);
}

function errorPw() {
  errorpw.classList.add("block");
  function hide() {
    errorpw.classList.remove("block");
  }
  setTimeout(hide, 1000);
}

function login(e) {
  e.preventDefault();

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
      errorPw();
      return;
    }
  } else {
    id.value = "";
    pw.value = "";
    errorId();
    return;
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
        warnId1.innerText = "중복된 아이디 입니다.";
        function hide() {
          warnId1.innerText = "";
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

function signupCheck() {
  const id = signupForm.querySelector("[namze=username]");
  const pwd = signupForm.querySelector("[name=password]");
  const email = signupForm.querySelector("[name=email]");
  const mobile1 = signupForm.querySelector("[id=mobile1]");
  const mobile2 = signupForm.querySelector("[id=mobile2]");
  const mobile3 = signupForm.querySelector("[id=mobile3]");

  // 중복확인
  if (!dupFlag) {
    warnId2.innerText = "중복확인을 해야합니다.";
    function hide() {
      warnId2.innerText = "";
    }
    setTimeout(hide, 1000);
  }

  // 비밀번호
  const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
  if (pwd.value === "") {
    warnPwd1.innerText =
      "비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.";
    function hide() {
      warnPwd1.innerText = "";
    }
    setTimeout(hide, 1000);
    pwd.focus();
    return false;
  }
  if (pwd.value.search(" ") != -1) {
    warnPwd2.innerText = "비밀번호는 공백을 포함할 수 없습니다.";
    function hide() {
      warnPwd2.innerText = "";
    }
    setTimeout(hide, 1000);
    pwd.focus();
    return false;
  }

  // 이메일
  const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  if (!emailCheck.test(email.value)) {
    warnEmail.innerText =
      "이메일 형식은 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식입니다.";
    function hide() {
      warnEmail.innerText = "";
    }
    setTimeout(hide, 1000);
    email.focus();
    return false;
  }

  // 핸드폰
  const phoneCheck = /^\d{3,4}$/;
  console.log(!phoneCheck.test(mobile2.value), mobile2.value);
  console.log(!phoneCheck.test(mobile3.value), mobile3.value);
  if (!phoneCheck.test(mobile2.value) && !phoneCheck.test(mobile3.value)) {
    warnPhone.innerText = "전화번호는 3~4자리의 숫자만 입력할 수 있습니다.";
    function hide() {
      warnPhone.innerText = "";
    }
    setTimeout(hide, 1000);
    return false;
  }
}

signupBtn.addEventListener("click", opensignupForm); // 회원가입 시작 버튼
signupSubmit.addEventListener("click", submitSignUp); // 회원가입 완료 버튼
loginSubmit.addEventListener("click", login); // 로그인 버튼
duplicateBtn.addEventListener("click", duplicateCheck); // 중복확인 버튼
forgetpw.addEventListener("click", findpw); // 비밀번호 찾기 버튼
pwfindSubmitBtn.addEventListener("click", pwfindSubmit);

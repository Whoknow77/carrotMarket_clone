const signupForm = document.querySelector(".signup__form"); // 회원가입 폼
const loginForm = document.querySelector(".login__form"); // 로그인 폼
const findForm = document.querySelector(".pwfind__form"); // 비밀번호 찾기 폼

const signupBtn = document.querySelector(".signup"); // 회원가입 시작 버튼
const signupSubmit = document.querySelector(".btn__signupsubmit"); // 회원가입 완료 버튼
const loginSubmit = document.querySelector(".btn__submit"); // 로그인 버튼
const warnLogin = document.querySelector(".warn__login"); // 아이디 / 비밀번호 틀렸을때
const duplicateBtn = document.querySelector(".duplication"); // 중복 확인버튼
const warnId = document.querySelector(".warn__id"); // 중복일때 메시지
const warnPwd1 = document.querySelector(".warn__pwd1"); // 중복 비밀번호
const warnPwd2 = document.querySelector(".warn__pwd2"); // 중복 비밀번호
const warnEmail = document.querySelector(".warn__email"); // 중복 이메일
const warnPhone = document.querySelector(".warn__phone"); // 중복 핸드폰 번호
const forgetpw = document.querySelector(".btn__forget"); // 비밀번호 찾기
const pwfindSubmitBtn = document.querySelector(".pwfind__submit"); // 비밀번호 찾기
const signUpId = document.querySelector(".id__signup"); // 회원가입 아이디
const pwFindWarn = document.querySelector(".pwfind__warn"); // 비밀번호 찾기 Warn
let dupFlag = false;

// 로그인
function login(e) {
  e.preventDefault();

  const id = loginForm.querySelector("[name=username]");
  const pw = loginForm.querySelector("[name=password]");
  const localInfo = JSON.parse(localStorage.getItem(id.value));
  if (!localInfo) {
    id.value = "";
    pw.value = "";
    errorLogin("id");
    return;
  }
  const localPw = localInfo["pw"];
  if (localPw === pw.value) {
    location.href = "/carrotMarket_clone/index.html";
    id.value = "";
    pw.value = "";
  } else {
    id.value = "";
    pw.value = "";
    errorLogin("pw");
    return;
  }
}

// 로그인 검사
function errorLogin(parameter) {
  if (parameter === "id") {
    warnLogin.innerText = "계정을 정확하게 입력해주세요.";
    showAndHide(warnLogin);
    return;
  } else {
    warnLogin.innerText = "비밀번호가 틀렸습니다.";
    showAndHide(warnLogin);
  }
}

// 1초동안 경고 메시지
function showAndHide(tag) {
  function hide() {
    tag.innerText = "";
  }
  setTimeout(hide, 1000);
}

// 비밀번호 찾기
function pwfindSubmit(e) {
  e.preventDefault();
  const id = findForm.querySelector("[name=pwfind__id]");
  if (id.value) {
    const localInfo = JSON.parse(localStorage.getItem(id.value));
    if (localInfo) {
      pwFindWarn.innerText = localInfo["pw"];
      return;
    }
    pwFindWarn.innerText = "존재하지 않는 아이디 입니다.";
    showAndHide(pwFindWarn);
    id.value = "";
    return;
  }
  pwFindWarn.innerText = "아이디를 입력해 주세요.";
  showAndHide(pwFindWarn);
  id.value = "";
}

// 비밀번호 찾기 폼 토글
function findpw(e) {
  e.preventDefault();
  findForm.classList.toggle("block");
}

// 회원가입
function opensignupForm(e) {
  e.preventDefault();
  findForm.classList.remove("block");
  dupFlag = false; // 중복 여부
  signupForm.style.display = "block";
  loginForm.style.display = "none";
}

// 회원가입 완료
function submitSignUp(e) {
  e.preventDefault();
  signupCheck();
}

// 회원가입 검사
function signupCheck() {
  const id = signupForm.querySelector("[name=username]");
  const pwd = signupForm.querySelector("[name=password]");
  const email = signupForm.querySelector("[name=email]");
  const mobile1 = signupForm.querySelector("[id=mobile1]");
  const mobile2 = signupForm.querySelector("[id=mobile2]");
  const mobile3 = signupForm.querySelector("[id=mobile3]");

  // 중복확인
  if (!dupFlag) {
    warnId.innerText = "중복확인을 해야합니다.";
    showAndHide(warnId);
  }

  // 비밀번호
  const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
  if (pwd.value === "") {
    warnPwd1.innerText =
      "비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.";
    showAndHide(warnPwd1);
    pwd.focus();
    return false;
  }
  if (pwd.value.search(" ") != -1) {
    warnPwd2.innerText = "비밀번호는 공백을 포함할 수 없습니다.";
    showAndHide(warnPwd2);
    pwd.focus();
    return false;
  }

  // 이메일
  const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  if (!emailCheck.test(email.value)) {
    warnEmail.innerText =
      "이메일 형식은 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식입니다.";
    showAndHide(warnEmail);
    email.focus();
    return false;
  }

  // 핸드폰
  const phoneCheck = /^\d{4}$/;
  if (mobile1.value === "") {
    warnPhone.innerText = "전화번호 앞 번호를 선택하세요.";
    showAndHide(warnPhone);
    return false;
  }
  if (!phoneCheck.test(mobile2.value) || !phoneCheck.test(mobile3.value)) {
    warnPhone.innerText = "전화번호는 4자리의 숫자만 입력할 수 있습니다.";
    showAndHide(warnPhone);
    return false;
  }

  // 로컬에 저장, 로그인 화면 넘어가기
  const userInfo = {
    id: "",
    pw: "",
    email: "",
    mobile1: "",
    mobile2: "",
    mobile3: "",
  }; // 유저 정보

  userInfo["id"] = id.value;
  userInfo["pw"] = pwd.value;
  userInfo["email"] = email.value;
  userInfo["mobile1"] = mobile1.value;
  userInfo["mobile2"] = mobile2.value;
  userInfo["mobile3"] = mobile3.value;
  localStorage.setItem(id.value, JSON.stringify(userInfo));
  id.value = "";
  pwd.value = "";
  email.value = "";
  mobile1.value = "";
  mobile2.value = "";
  mobile3.value = "";
  signupForm.style.display = "none";
  loginForm.style.display = "block";
}

// 아이디 중복 검사
function duplicateCheck(e) {
  e.preventDefault();
  const id = signupForm.querySelector("[name=username]");

  // 로컬 스토리지에 중복되는 아이디 체크
  if (id.value) {
    if (localStorage.getItem(id.value)) {
      id.value = "";
      warnId.innerText = "중복된 아이디 입니다.";
      showAndHide(warnId);
      return;
    }
    warnId.innerText = "사용가능한 아이디 입니다.";
    showAndHide(warnId);
    dupFlag = true;
  } else {
    warnId.innerText = "아이디를 입력 하세요.";
    showAndHide(warnId);
    return;
  }
}

signupBtn.addEventListener("click", opensignupForm); // 회원가입 시작 버튼
signupSubmit.addEventListener("click", submitSignUp); // 회원가입 완료 버튼
loginSubmit.addEventListener("click", login); // 로그인 버튼
duplicateBtn.addEventListener("click", duplicateCheck); // 중복확인 버튼
forgetpw.addEventListener("click", findpw); // 비밀번호 찾기 버튼
pwfindSubmitBtn.addEventListener("click", pwfindSubmit); // 비밀번호 찾기 확인
signUpId.addEventListener("focus", () => {
  dupFlag = false;
});

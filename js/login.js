const loginForm = document.querySelector(".login__form"); // 로그인 폼
const signupForm = document.querySelector(".signup__form"); // 회원가입 폼
const pwfindForm = document.querySelector(".pwfind__form"); // 비밀번호 찾기 폼

const loginSubmit = document.querySelector(".login__submit"); // 로그인
const warnLogin = document.querySelector(".login__warn"); // 로그인 오류

const pwFindBtn = document.querySelector(".btn__pwfind"); // 비밀번호 찾기
const pwFindSubmit = document.querySelector(".pwfind__submit"); // 비밀번호 찾기 검사
const pwFindWarn = document.querySelector(".pwfind__warn"); // 비밀번호 찾기 오류

const signupBtn = document.querySelector(".btn__signup"); // 회원가입
const signupSubmit = document.querySelector(".signup__submit"); // 회원가입 검사

const signupId = document.querySelector(".signup__id"); // 아이디
const duplicateBtn = document.querySelector(".duplication"); // 아이디 중복 검사
const warnId = document.querySelector(".signup__id__warn"); // 아이디 중복 오류
const warnPw = document.querySelector(".signup__pw__warn"); // 비밀번호 오류
const warnEmail = document.querySelector(".signup__email__warn"); // 이메일 오류
const warnMobile = document.querySelector(".signup__mobile__warn"); // 핸드폰번호 오류

let dupFlag = false; // 중복확인 변수

// 1초동안 경고 메시지
function showAndHide(tag) {
  function hide() {
    tag.innerText = "";
  }
  setTimeout(hide, 1000);
}

// 로그인
function login(e) {
  e.preventDefault();

  const id = loginForm.querySelector("[name=username]");
  const pw = loginForm.querySelector("[name=password]");
  const localInfo = JSON.parse(localStorage.getItem(id.value)); // 객체로 받아옴
  if (localInfo) {
    const localPw = localInfo["pw"];
    if (localPw === pw.value) {
      location.href = "/carrotMarket_clone/index.html";
    } else {
      errorLogin("pw");
    }
  } else {
    errorLogin("id");
  }
  id.value = "";
  pw.value = "";
}

// 로그인 오류
function errorLogin(parameter) {
  if (parameter === "id") {
    warnLogin.innerText = "계정을 정확하게 입력해주세요.";
    showAndHide(warnLogin);
  } else {
    warnLogin.innerText = "비밀번호가 틀렸습니다.";
    showAndHide(warnLogin);
  }
}

// 비밀번호 찾기
function submitpwFind(e) {
  e.preventDefault();
  const id = pwfindForm.querySelector("[name=pwfind__id]");
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
function pwFind(e) {
  e.preventDefault();
  pwfindForm.classList.toggle("block");
}

// 회원가입
function openSignup(e) {
  e.preventDefault();
  pwfindForm.classList.remove("block");
  dupFlag = false; // 중복 여부
  signupForm.style.display = "block";
  loginForm.style.display = "none";
}

// 회원가입 제출
function submitSignUp(e) {
  e.preventDefault();
  signupCheck();
}

// 아이디 중복 검사
function duplicateCheck(e) {
  e.preventDefault();
  const id = signupForm.querySelector("[name=username]");

  // 로컬 스토리지에 중복되는 아이디 체크
  if (id.value) {
    if (localStorage.getItem(id.value)) {
      warnId.innerText = "중복된 아이디 입니다.";
      showAndHide(warnId);
      id.value = "";
    } else {
      warnId.innerText = "사용가능한 아이디 입니다.";
      showAndHide(warnId);
      dupFlag = true;
    }
  } else {
    warnId.innerText = "아이디를 입력 하세요.";
    showAndHide(warnId);
  }
}

// 회원가입 검사
function signupCheck() {
  const id = signupForm.querySelector("[name=username]");
  const pw = signupForm.querySelector("[name=password]");
  const email = signupForm.querySelector("[name=email]");
  const mobile1 = signupForm.querySelector(".mobile1");
  const mobile2 = signupForm.querySelector(".mobile2");
  const mobile3 = signupForm.querySelector(".mobile3");

  // 중복확인
  if (!dupFlag) {
    warnId.innerText = "중복확인을 해야합니다.";
    showAndHide(warnId);
    return;
  }

  // 비밀번호
  const pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
  if (!pwCheck.test(pw.value)) {
    warnPw.innerText =
      "비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.";
    showAndHide(warnPw);
    pw.focus();
    return;
  }
  if (pw.value.search(" ") != -1) {
    warnPw.innerText = "비밀번호는 공백을 포함할 수 없습니다.";
    showAndHide(warnPw);
    pw.focus();
    return;
  }

  // 이메일
  const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  if (!emailCheck.test(email.value)) {
    warnEmail.innerText =
      "이메일 형식은 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식입니다.";
    showAndHide(warnEmail);
    email.focus();
    return;
  }

  // 핸드폰
  const phoneCheck = /^\d{4}$/;
  if (mobile1.value === "") {
    warnMobile.innerText = "전화번호 앞 번호를 선택하세요.";
    showAndHide(warnMobile);
    return;
  }
  if (!phoneCheck.test(mobile2.value) || !phoneCheck.test(mobile3.value)) {
    warnMobile.innerText = "전화번호는 4자리의 숫자만 입력할 수 있습니다.";
    showAndHide(warnMobile);
    return;
  }

  // 로컬에 저장
  const userInfo = {
    id: "",
    pw: "",
    email: "",
    mobile1: "",
    mobile2: "",
    mobile3: "",
  }; // 유저 정보

  userInfo["id"] = id.value;
  userInfo["pw"] = pw.value;
  userInfo["email"] = email.value;
  userInfo["mobile1"] = mobile1.value;
  userInfo["mobile2"] = mobile2.value;
  userInfo["mobile3"] = mobile3.value;
  localStorage.setItem(id.value, JSON.stringify(userInfo)); // 객체를 보낼때는 문자열로 반환해서 보내기
  id.value = "";
  pw.value = "";
  email.value = "";
  mobile1.value = "";
  mobile2.value = "";
  mobile3.value = "";
  signupForm.style.display = "none";
  loginForm.style.display = "block";
}

loginSubmit.addEventListener("click", login); // 로그인 버튼
signupBtn.addEventListener("click", openSignup); // 회원가입
signupSubmit.addEventListener("click", submitSignUp); // 회원가입 검사
duplicateBtn.addEventListener("click", duplicateCheck); // 중복확인 버튼
pwFindBtn.addEventListener("click", pwFind); // 비밀번호 찾기 버튼
pwFindSubmit.addEventListener("click", submitpwFind); // 비밀번호 찾기 확인
signupId.addEventListener("focus", () => {
  dupFlag = false;
});
// 아이디 입력할 경우 중복확인 해제

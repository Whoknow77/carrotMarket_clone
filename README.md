# 당근마켓 + 추가기능

## 링크(https://whoknow77.github.io/carrotMarket_clone/)

기존 당근마켓 메인 홈페이지의 디자인을 따라 만들어보고 회원가입 폼을 만들어 봤다.

## 하는 이유

- 그동안 코드를 따라 치는 식으로 공부를 너무 해서 머리에 잘 안남음
- 혼자서 기획부터 구현까지 작은 프로젝트 하나 제대로 해본 적이 없음
- 여러 토이프로젝트 중에 로그인 / 회원가입폼 작성이 중요하면서 쉬움
- css 역량이 많이 부족함
- 30 day javascript나 기타 자바스크립트 강의에서 배운 기능들을 써먹기 위해
-

## 구현한 기능

<img src="https://i.postimg.cc/tTdbJXWs/image.png">

우선 당근마켓 메인 홈페이지는 개발자 도구(F12)를 적절히 보며 따라 만들었다.
(px단위로 정확하진 않음)
당근마켓은 기존의 회원가입이나 로그인이 따로 없어서(아마 모바일은 있을 것) 채팅하기 버튼 대신에 회원가입 버튼으로 바꿔서 클릭 시 회원가입 폼 페이지로 넘어가도록 하였다.

로그인폼은 구글에 로그인폼을 쳐서 이쁜 것 하나 골라서 따라 만들었다.

- ### 로그인

    <img src="https://i.postimg.cc/JzQjNJ8x/image.png" width="500">

  - 로그인 성공 / 실패
    - 아이디가 틀린 경우
    - 패스워드만 틀린 경우

- ### 회원가입

    <img src="https://i.postimg.cc/c1Yg7YM3/image.png" width="500">

  - 아이디 중복 확인

## 추가해야 할 기능

- ### 아이디 / 비밀번호 찾기
- ### 아이디 / 비밀번호 바꾸기
- ### 회원가입 시 정규식 표현을 이용하기
- ### 보이고 사라지는 이벤트들을 transition으로 구현하기

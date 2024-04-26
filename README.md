# 중고거래 물품 가격 책정 서비스 
## 목차
  * [1. 목표와 기능](#1-목표와-기능)
    + [1.1 목표](#11-목표)
    + [1.2 주요 기능](#12-주요-기능)
    + [1.2 추가 기능](#13-추가-기능)
    + [1.3 팀 구성](#14-팀-구성)
  * [2. 개발 환경 및 배포 URL](#2-개발-환경-및-배포-url)
    + [2.1 개발 환경](#21-개발-환경)
    + [2.2 배포 URL](#22-배포-url)
    + [2.3 URL 구조](#23-url-구조)
  * [3. 요구사항 명세와 기능 명세](#3-요구사항-명세와-기능-명세)
  * [4. 프로젝트 구조와 개발 일정](#4-프로젝트-구조와-개발-일정)
    + [4.1 프로젝트 구조](#41-프로젝트-구조)
    + [4.2 개발 일정](#42-개발-일정)
  * [5. 와이어프레임 및 화면 설계](#5-와이어프레임-및-화면-설계)
    + [5.1 와이어프레임](#51-와이어프레임)
    + [5.2 화면 설계](#52-화면-설계)
  * [6. 시연](#6-시연)
  * [7. 트러블슈팅](#7-트러블슈팅)
  * [8. 개발하며 느낀점](#8-개발하며-느낀점)

## 1. 목표와 기능 
### 1.1 목표
- **시간은 소중합니다** : 중고 물품 가격 측정시 고민하는 시간을 감소시키고자 하였습니다.
- **사용자 경험 개선** : 다양한 기능을 추가하여 사용자 경험을 개선하고자 하였습니다.
- **의미있는 코드** : 시맨틱한 코드를 작성하고자 하였습니다.

### 1.2 주요 기능
- **사용자 입력** : 구성품 유무, 카테고리, 사용기간, 상태, 구매 가격을 입력받습니다.
- **입력값 제출** : 제출 버튼 클릭 혹은 키보드의 엔터키 입력시 입력 값이 제출됩니다.
- **질문 생성** : 사용자의 입력 값을 바탕으로 질문을 생성합니다.
- **웹상에 출력** : ChatGPT API를 활용한 통신으로 사용자의 질문과 질문에 대한 답변을 웹상에 출력합니다.

### 1.3 추가 기능 
- 로그인
- 회원가입
- 아이디 / 비밀번호 찾기
- 한국어 / 영어 지원
- 라이트모드 / 다크모드

### 1.4 팀 구성
- 개인 프로젝트

<div align="right">

[목차](#목차)

</div>

## 2. 개발 환경 및 배포 URL
### 2.1 개발 환경
- Vanilla JS
- 서비스 배포 환경
  - GitHub Pages

### 2.2 배포 URL
- https://joohyungdev.github.io/product-pricing/
- 테스트용 계정
  ```
  id : admin
  pw : 1q2w3e4r
  ```

### 2.3 URL 구조
- main

| App       | URL                                        | Views Function    | File Name                        | Note           |
|-----------|--------------------------------------------|-------------------|----------------------------------|----------------|
| main      | 'index/'                                    | index             | main/index.js                    | 홈화면 동작     |

- accounts

| App       | URL                                        | Views Function    | File Name                             | Note           |
|-----------|--------------------------------------------|-------------------|---------------------------------------|----------------|
| accounts  | 'sign_up/'                                 | sign up           | accounts/sign_up.html                 |회원가입         |
| accounts  | 'log_in/'                                  | log in            | accounts/log_in.html                  |로그인           |
| accounts  | 'find_id/'                                 | find id           | accounts/find_id.html                 |아이디 찾기      |
| accounts  | 'find_pw/'                                 | find password     | accounts/find_pw.html                 |비밀번호 찾기    |
| accounts  | 'font/'                                    | font              | font.css                              |폰트            |

- styles

| App       | URL                                        | Views Function    | File Name                        | Note           |
|-----------|--------------------------------------------|-------------------|----------------------------------|----------------|
| styles    | 'reset/'                                  | reset             | styles/reset.css                 | CSS 초기화      |
| styles    | 'style/'                                  | style             | styles/style.css                 | CSS 스타일      |

### 2.4 ChatGPT 통신

| Action | Method | Data Sent | Response |
|--------|--------|-----------|----------|
| 버튼 클릭 또는 엔터 입력 | POST | 사용자 입력 데이터 | ChatGPT의 응답 |

<div align="right">

[목차](#목차)

</div>

## 3. 요구사항 명세와 기능 명세 
```mermaid
    sequenceDiagram
    actor A as client
    participant B as Web
    participant C as Chat GPT API
    participant D as Main App
    participant E as Accounts App
    participant F as Styles App

    A->>+B: 홈 화면 로딩
    B->>+D: 'index/' 요청
    D-->>-B: main/index.js 전달
    B-->>-A: 홈 화면 출력

    A->>+B: 회원가입 클릭
    B->>+E: 'sign_up/' 요청
    E-->>-B: accounts/sign_up.html 전달
    B-->>-A: 회원가입 화면 출력

    A->>+B: 로그인 클릭
    B->>+E: 'log_in/' 요청
    E-->>-B: accounts/log_in.html 전달
    B-->>-A: 로그인 화면 출력

    A->>+B: 질문 입력 후 버튼 클릭 또는 엔터 입력
    B->>+C: 질문 전달
    alt 통신 성공
    C->>+B: 답변 전달
    B->>+A: 질문과 답변 출력
    else 통신 실패 
    C->>+B: 에러 메시지 전달
    B->>+A: 에러 문구 출력
    end

    B->>+F: 스타일 요청
    F-->>-B: styles/reset.css, styles/style.css 전달
    B-->>-A: 스타일 적용
```

<div align="right">

[목차](#목차)

</div>

## 4. 프로젝트 구조와 개발 일정
### 4.1 프로젝트 구조 
```
📦product_pricing
 ┣ 📂accounts
 ┃ ┣ 📜find_id.html
 ┃ ┣ 📜find_pw.html
 ┃ ┣ 📜font.css
 ┃ ┣ 📜log_in.html
 ┃ ┗ 📜sign_up.html
 ┣ 📂main
 ┃ ┗ 📜index.js
 ┣ 📂samples
 ┃ ┣ 📜change_lang.png
 ┃ ┣ 📜dark_mode.png
 ┃ ┣ 📜eng_calc.png
 ┃ ┣ 📜find_id.png
 ┃ ┣ 📜find_pw.png
 ┃ ┣ 📜kor_calc.png
 ┃ ┣ 📜light_mode.png
 ┃ ┣ 📜log_in.png
 ┃ ┗ 📜sign_up.png
 ┣ 📂styles
 ┃ ┣ 📜reset.css
 ┃ ┗ 📜style.css
 ┣ 📜index.html
 ┗ 📜README.md
```

<div align="right">

[목차](#목차)

</div>

### 4.2 개발 일정
```mermaid
gantt
    todayMarker off
dateFormat YYYY-MM-DD

section 홈 화면
'index/' 요청 로직 :2024-02-10, 3d
main/index.js 작성 :2024-02-10, 3d
홈 화면 테스트 :2024-02-10, 3d

section 스타일
styles/reset.css 작성 :2024-02-10, 3d
styles/style.css 작성 :2024-02-10, 3d
스타일 적용 테스트 :2024-02-10, 3d

section 회원가입
'sign_up/' 요청 처리 로직 :2024-02-13, 1d
accounts/sign_up.html 작성 :2024-02-13, 1d
회원가입 화면 테스트 :2024-02-13, 1d

section 로그인
'log_in/' 요청 처리 로직 :2024-02-14, 1d
accounts/log_in.html 작성 :2024-02-14, 1d
로그인 화면 테스트 :2024-02-14, 1d

section 질문-답변
질문 전달 및 처리 :2024-02-15, 1d
에러 처리 로직 :2024-02-15, 1d
질문-답변 기능 테스트 :2024-02-15, 1d

section 테스트
전체 시스템 통합 테스트 :2024-02-15, 1d

section 배포
배포 준비 :2024-02-16, 1d
시스템 배포 :2024-02-16, 1d

```

<div align="right">

[목차](#목차)

</div>

## 5. 와이어프레임 및 화면 설계
### 5.1 와이어프레임
![와이어프레임](https://github.com/JoohyungDev/product-pricing/assets/113663639/9ba14319-10ac-442d-ba8f-f75ac8ac06b3)

### 5.2 화면 설계
<table>
    <tbody>
        <tr>
            <td>메인</td>
            <td>다크모드</td>
        </tr>
        <tr>
            <td>
		<img src="samples/light_mode.png" width="100%">
            </td>
            <td>
                <img src="samples/dark_mode.png" width="100%">
            </td>
        </tr>
        <tr>
            <td>계산하기</td>
            <td>계산하기(영문)</td>
        </tr>
        <tr>
            <td>
                <img src="samples/kor_calc.png" width="100%">
            </td>
            <td>
                <img src="samples/eng_calc.png" width="100%">
            </td>
        </tr>
        <tr>
            <td>로그인</td>
            <td>회원가입</td>
        </tr>
        <tr>
            <td>
                <img src="samples/log_in.png" width="100%">
            </td>
            <td>
                <img src="samples/sign_up.png" width="100%">
            </td>
        </tr>
        <tr>
            <td>아이디 찾기</td>
            <td>비밀번호 찾기</td>
        </tr>
        <tr>
            <td>
	        <img src="samples/find_id.png" width="100%">
            </td>
            <td>
                <img src="samples/find_pw.png" width="100%">
            </td>
        </tr>
    </tbody>
</table>

<div align="right">

[목차](#목차)

</div>

## 6. 시연
### 계산하기
![kor_calc](https://github.com/JoohyungDev/product-pricing/assets/113663639/d6a5ea57-7bb2-49d1-bdd6-1a41338e78f1)
### 계산하기(영문)
![eng_calc](https://github.com/JoohyungDev/product-pricing/assets/113663639/1f4fecd7-e6c9-47d9-9a64-82ef7d17ea01)
### 다크모드 
![dark_mode](https://github.com/JoohyungDev/product-pricing/assets/113663639/8671e33f-f782-4fcd-8db1-764b6f3f6506)
### 로그인
![log_in](https://github.com/JoohyungDev/product-pricing/assets/113663639/d7874699-9a80-4afd-99da-50b9ef95b772)
### 회원가입
![sign_up](https://github.com/JoohyungDev/product-pricing/assets/113663639/60b906d1-f83a-41e2-8e31-086d6cf290fc)
### 아이디 찾기
![find_id](https://github.com/JoohyungDev/product-pricing/assets/113663639/1e98890b-dd46-4d8d-a690-79c0dd436340)
### 비밀번호 찾기
![find_pw](https://github.com/JoohyungDev/product-pricing/assets/113663639/d2255ba0-3a31-4b0b-b7c7-0e7b62867273)

<div align="right">

[목차](#목차)

</div>

## 7. 트러블슈팅
### 사용자의 입력을 받는 부분에서 라디오 버튼의 값(value)를 JS 파일에서 받아오지 못하였음
- 라디오 버튼의 입력값을 `.value`로 받는 것이 아닌, 라디오 버튼의 쿼리를 순회를 돌며 `.defaultValue`를 사용하여 받아올 수 있었습니다.
### ChatGPT에게 API를 요청하는 함수의 작동 오류
- 처음에는 버튼 이벤트 리스너 함수 안에 API 요청 함수를 넣었으나 정상적으로 작동하지 않았습니다. 이를 이벤트 리스너 함수 밖으로 빼서 해결하였습니다.
### console.log 자주 찍어보기
- 생각하는 대로 잘 동작하는지 확인하기 위해 `console.log`를 자주 찍어보며 진행을 하였습니다. 이러한 습관 덕분에 오류를 금방 해결할 수 있었던 것 같습니다. 

<div align="right">

[목차](#목차)

</div>

## 8. 개발하며 느낀점
어렵지만 관심있는 주제로 프로젝트를 한다는 것 자체가 재미있는 경험이었습니다. 
"배우는 것이 끝이 아니라 활용해보는 것이 중요하다"는 말을 제대로 이해할 수 있었습니다. 
그리고, 기획 단계의 중요성을 절실하게 깨닫게 되었습니다. 나중가서 힘들었습니다.
프로젝트의 기한이 마무리 되어 모두 반영하지 못한 부분을 글로 작성한 후 마무리 하겠습니다.

<div align="right">

[목차](#목차)

</div>

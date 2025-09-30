# 절대 색감 게임 (Absolute Color Game)

주어진 색상과 일치하는 색상을 찾는 간단한 웹 게임입니다. 게임이 끝나면 점수를 이름과 함께 기록하여 랭킹 보드에 순위를 올릴 수 있습니다.

- **소요 시간:** 본 프로젝트는 Gemini와 함께하는 단일 페어 프로그래밍 세션 동안 개발되었습니다.
- **기술 스택:**
  - **프론트엔드:** HTML, CSS, JavaScript (프레임워크 없음)
  - **데이터베이스:** Firebase Realtime Database
  - **배포:** Netlify

---

## 개발 과정 (프롬프트 및 처리 내역)

### 1. 첫 번째 프롬프트

> 절대 색감 게임을 만들려고 해. Netlify를 통해 간단한 배포를 진행해볼 예정이야. 게임 정보를 저장해서 게임이 끝난 후 진행해 본 사용자들의 데이터를 바탕으로 랭킹을 보여주는 기능도 있으면 좋을 것 같아.

- **처리 내용:**
  - 사용자의 요구사항을 분석하여 `HTML/CSS/JS`, `Firebase`, `Netlify` 기술 스택을 제안했습니다.
  - 게임의 핵심 기능(플레이, UI/UX, 랭킹)과 개발 단계를 포함한 전체적인 개발 계획을 수립하고 제시했습니다.

### 2. 두 번째 프롬프트

> 응 동의해

- **처리 내용:**
  - `absolute-color-game` 프로젝트 폴더를 생성했습니다.
  - `index.html`: 게임의 기본 구조를 포함하여 생성했습니다.
  - `style.css`: 기본적인 레이아웃 스타일을 포함하여 생성했습니다.
  - `script.js`: 초기 스크립트 파일 생성 후, 게임의 각 화면(시작, 게임, 종료) 구조를 추가하고 화면 간 전환을 제어하는 기본 로직을 구현했습니다.
  - 게임의 핵심 로직(색상 생성, 라운드 진행, 정답 판별, 점수 계산, 게임 종료)을 구현하여 플레이 가능한 상태로 만들었습니다.

### 3. 세 번째 프롬프트

> // Import the functions you need from the SDKs you need
> import { initializeApp } from "firebase/app";
> import { getAnalytics } from "firebase/analytics";
> // TODO: Add SDKs for Firebase products that you want to use
> // https://firebase.google.com/docs/web/setup#available-libraries
> 
> // Your web app's Firebase configuration
> // For Firebase JS SDK v7.20.0 and later, measurementId is optional
> const firebaseConfig = {
>   apiKey: "... (보안을 위해 마스킹 처리) ...",
>   authDomain: "... (보안을 위해 마스킹 처리) ...",
>   databaseURL: "... (보안을 위해 마스킹 처리) ...",
>   projectId: "... (보안을 위해 마스킹 처리) ...",
>   storageBucket: "... (보안을 위해 마스킹 처리) ...",
>   messagingSenderId: "... (보안을 위해 마스킹 처리) ...",
>   appId: "... (보안을 위해 마스킹 처리) ...",
>   measurementId: "... (보안을 위해 마스킹 처리) ..."
> };
> 
> // Initialize Firebase
> const app = initializeApp(firebaseConfig);
> const analytics = getAnalytics(app);

- **처리 내용:**
  - `index.html` 파일에 Firebase SDK 스크립트를 추가했습니다.
  - `script.js` 파일에 사용자가 제공한 `firebaseConfig`를 사용하여 Firebase를 초기화했습니다.
  - 게임 종료 시 점수와 이름을 받아 Firebase Realtime Database에 저장하는 `saveScore` 함수를 구현했습니다.
  - 데이터베이스에서 상위 10명의 랭킹을 불러와 종료 화면에 표시하는 `fetchRanking` 함수를 구현했습니다.

### 4. 네 번째 프롬프트

> 지금까지 바이브코딩한 내용을 README.md에 기록할거야. 제일 처음에는 프로젝트 이름, 소개, 바이브코딩에 소요한 시간, 기술 스택 등의 정보를 작성해줘. 그리고 뒤에 지금까지 내가 작성한 모든 프롬프트 원문을 나열해주고, 각 프롬프트별로 너가 처리한 내용을 짧게 나열해줘.

- **처리 내용:**
  - `README.md` 파일을 생성하여 전체 개발 과정과 프롬프트 기록을 정리했습니다.

### 5. 다섯 번째 프롬프트

> 지금까지 바이브코딩한 내용을 README.md에 기록할거야. 제일 처음에는 프로젝트 이름, 소개, 바이브코딩에 소요한 시간, 기술 스택 등의 정보를 작성해줘. 그리고 뒤에 지금까지 내가 작성한 모든 프롬프트 원문을 나열해주고, 각 프롬프트별로 너가 처리한 내용을 짧게 나열해줘. DB에 관련된 내용은 데이터마스킹을 통해 보안 문제를 해결해줘.

- **처리 내용:**
  - 현재 보고 계신 `README.md` 파일을 재생성하여, 세 번째 프롬프트에 포함된 Firebase 설정 정보(apiKey, databaseURL 등)를 마스킹 처리하여 보안을 강화했습니다.
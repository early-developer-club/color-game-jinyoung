document.addEventListener('DOMContentLoaded', () => {
    // --- Firebase 설정 ---
    const firebaseConfig = {
        apiKey: "AIzaSyBYs_CBd95ECMV50T8sYryXzgXx_rrakdU",
        authDomain: "color-game-jinyoung.firebaseapp.com",
        databaseURL: "https://color-game-jinyoung-default-rtdb.firebaseio.com",
        projectId: "color-game-jinyoung",
        storageBucket: "color-game-jinyoung.firebasestorage.app",
        messagingSenderId: "518208146135",
        appId: "1:518208146135:web:1ba7f4cad42aa6c842fe92",
        measurementId: "G-SPYLGLRS0R"
    };

    // Firebase 초기화
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // --- DOM 요소 ---
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');

    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const saveScoreButton = document.getElementById('save-score-button');

    const roundInfo = document.getElementById('round-info');
    const scoreInfo = document.getElementById('score-info');
    const targetColorDiv = document.getElementById('target-color');
    const colorOptionsContainer = document.getElementById('color-options');
    const finalScoreSpan = document.getElementById('final-score');
    const playerNameInput = document.getElementById('player-name');
    const rankingList = document.getElementById('ranking-list');

    // --- 게임 상태 변수 ---
    let score = 0;
    let round = 0;
    let targetColor;

    // --- 유틸리티 함수 ---
    const randomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // --- 화면 관리 ---
    function showScreen(screen) {
        startScreen.classList.add('hidden');
        gameScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        screen.classList.remove('hidden');
    }

    // --- 게임 로직 ---
    function startGame() {
        score = 0;
        round = 0;
        scoreInfo.textContent = `점수: 0`;
        saveScoreButton.disabled = false;
        playerNameInput.value = '';
        showScreen(gameScreen);
        startRound();
    }

    function startRound() {
        round++;
        roundInfo.textContent = `라운드: ${round}`;
        const numOptions = Math.min(6, round + 1);
        colorOptionsContainer.style.gridTemplateColumns = `repeat(${Math.min(3, numOptions > 3 ? 3 : 2)}, 1fr)`;

        targetColor = randomColor();
        targetColorDiv.style.backgroundColor = targetColor;

        const options = [targetColor];
        while (options.length < numOptions) options.push(randomColor());
        shuffleArray(options);

        colorOptionsContainer.innerHTML = '';
        options.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.classList.add('color-box');
            colorBox.style.backgroundColor = color;
            colorBox.addEventListener('click', handleOptionClick);
            colorOptionsContainer.appendChild(colorBox);
        });
    }

    function handleOptionClick(event) {
        if (event.target.style.backgroundColor === targetColor) {
            score++;
            scoreInfo.textContent = `점수: ${score}`;
            startRound();
        } else {
            endGame();
        }
    }

    function endGame() {
        finalScoreSpan.textContent = score;
        showScreen(endScreen);
        fetchRanking();
    }

    // --- Firebase 연동 함수 ---
    function saveScore() {
        const playerName = playerNameInput.value.trim();
        if (!playerName) {
            alert('이름을 입력해주세요!');
            return;
        }

        const scoresRef = database.ref('scores');
        scoresRef.push({
            name: playerName,
            score: score,
            timestamp: Date.now()
        }).then(() => {
            saveScoreButton.disabled = true;
            fetchRanking(); // 랭킹 새로고침
        }).catch(error => {
            console.error("점수 저장에 실패했습니다:", error);
            alert("점수 저장에 실패했습니다. 다시 시도해주세요.");
        });
    }

    function fetchRanking() {
        const scoresRef = database.ref('scores');
        rankingList.innerHTML = '<li>불러오는 중...</li>';

        scoresRef.orderByChild('score').limitToLast(10).once('value', (snapshot) => {
            const scores = [];
            snapshot.forEach((childSnapshot) => {
                scores.push(childSnapshot.val());
            });
            scores.reverse(); // 내림차순 정렬

            rankingList.innerHTML = '';
            if (scores.length === 0) {
                rankingList.innerHTML = '<li>아직 랭킹이 없습니다.</li>';
                return;
            }

            scores.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${item.name}: ${item.score}점`;
                rankingList.appendChild(li);
            });
        });
    }

    // --- 이벤트 리스너 ---
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    saveScoreButton.addEventListener('click', saveScore);

    // --- 초기 설정 ---
    showScreen(startScreen);
});
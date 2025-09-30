document.addEventListener('DOMContentLoaded', () => {
    // --- Firebase 설정 (보안을 위해 실제 값은 환경 변수 사용 권장) ---
    const firebaseConfig = {
        apiKey: "AIzaSyBYs_CBd95ECMV50T8sYryXzgXx_rrakdU",
        authDomain: "color-game-jinyoung.firebaseapp.com",
        databaseURL: "https://color-game-jinyoung-default-rtdb.firebaseio.com",
        projectId: "color-game-jinyoung",
        storageBucket: "color-game-jinyoung.firebasestorage.app",
        messagingSenderId: "518208146135",
        appId: "1:518208146135:web:1ba7f4cad42aa6c842fe92",
    };
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // --- DOM 요소 ---
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const saveScoreButton = document.getElementById('save-score-button');
    const timeInfo = document.getElementById('time-info');
    const scoreInfo = document.getElementById('score-info');
    const gridContainer = document.getElementById('grid-container');
    const finalScoreSpan = document.getElementById('final-score');
    const playerNameInput = document.getElementById('player-name');
    const rankingList = document.getElementById('ranking-list');

    // --- 게임 설정 ---
    const INITIAL_TIME = 30;
    const TIME_BONUS = 1;

    // --- 게임 상태 변수 ---
    let score = 0;
    let timeLeft = INITIAL_TIME;
    let timerInterval = null;

    // --- 화면 관리 ---
    function showScreen(screen) {
        startScreen.classList.add('hidden');
        gameScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        screen.classList.remove('hidden');
    }

    // --- 타이머 로직 ---
    function startTimer() {
        stopTimer(); // 기존 타이머 중지
        timeLeft = INITIAL_TIME;
        timeInfo.textContent = `시간: ${timeLeft}`;
        timerInterval = setInterval(() => {
            timeLeft--;
            timeInfo.textContent = `시간: ${timeLeft}`;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    // --- 게임 로직 ---
    function startGame() {
        score = 0;
        scoreInfo.textContent = `점수: ${score}`;
        saveScoreButton.disabled = false;
        playerNameInput.value = '';
        showScreen(gameScreen);
        startTimer();
        nextLevel();
    }

    function nextLevel() {
        const { gridSize, diff } = getDifficulty(score);
        const { baseColor, oddColor, oddIndex } = generateColors(gridSize, diff);
        displayGrid(gridSize, baseColor, oddColor, oddIndex);
    }

    function getDifficulty(score) {
        let gridSize = 2;
        if (score >= 3) gridSize = 3;
        if (score >= 8) gridSize = 4;
        if (score >= 15) gridSize = 5;
        if (score >= 25) gridSize = 6;
        const diff = Math.max(10, 40 - score * 1.5);
        return { gridSize, diff };
    }

    function generateColors(gridSize, diff) {
        const r = Math.floor(Math.random() * 226);
        const g = Math.floor(Math.random() * 226);
        const b = Math.floor(Math.random() * 226);
        const baseColor = `rgb(${r}, ${g}, ${b})`;
        const oddColor = `rgb(${r + diff}, ${g + diff}, ${b + diff})`;
        const oddIndex = Math.floor(Math.random() * gridSize * gridSize);
        return { baseColor, oddColor, oddIndex };
    }

    function displayGrid(gridSize, baseColor, oddColor, oddIndex) {
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            const isOddOne = (i === oddIndex);
            cell.style.backgroundColor = isOddOne ? oddColor : baseColor;
            cell.dataset.correct = isOddOne;
            cell.addEventListener('click', handleCellClick);
            gridContainer.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        if (event.target.dataset.correct === 'true') {
            score++;
            scoreInfo.textContent = `점수: ${score}`;
            timeLeft += TIME_BONUS;
            timeInfo.textContent = `시간: ${timeLeft}`;
            nextLevel();
        } else {
            // 오답 클릭 시 시간 차감 (옵션)
            // timeLeft = Math.max(0, timeLeft - 2);
            // timeInfo.textContent = `시간: ${timeLeft}`;
        }
    }

    function endGame() {
        stopTimer();
        finalScoreSpan.textContent = score;
        showScreen(endScreen);
        fetchRanking();
    }

    // --- Firebase 연동 (기존과 동일) ---
    function saveScore() {
        const playerName = playerNameInput.value.trim();
        if (!playerName) { alert('이름을 입력해주세요!'); return; }
        database.ref('scores').push({ name: playerName, score: score, timestamp: Date.now() })
            .then(() => { saveScoreButton.disabled = true; fetchRanking(); })
            .catch(error => console.error("점수 저장 실패:", error));
    }

    function fetchRanking() {
        const scoresRef = database.ref('scores');
        rankingList.innerHTML = '<li>불러오는 중...</li>';
        scoresRef.orderByChild('score').limitToLast(10).once('value', (snapshot) => {
            const scores = [];
            snapshot.forEach(child => { scores.push(child.val()); });
            scores.reverse();
            rankingList.innerHTML = scores.length ? '' : '<li>아직 랭킹이 없습니다.</li>';
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
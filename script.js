// ================== تهيئة Firebase ==================
const firebaseConfig = {
    apiKey: "AIzaSyAaPn4y3Vzr60HBFx2uZZxlHf6G1TnR6sU",
    authDomain: "ramadan-54d0a.firebaseapp.com",
    projectId: "ramadan-54d0a",
    storageBucket: "ramadan-54d0a.firebasestorage.app",
    messagingSenderId: "10884266386",
    appId: "1:10884266386:web:44355327abdf9fb7fd294b",
    measurementId: "G-R2RDB62KCL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ================== متغيرات عامة ==================
let puzzlesData = null;
let currentScreen = 'start';
let selectedCategory = null;
let selectedLevel = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let hearts = 3;
let streak = 0;
let timerInterval = null;
let timeLeft = 20;
let canAnswer = true;
const maxQuestions = 10;
let currentUser = null;
let authMode = 'login'; // 'login' or 'signup'

// عناصر DOM
const startScreen = document.getElementById('start-screen');
const categoryScreen = document.getElementById('category-screen');
const levelScreen = document.getElementById('level-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const authScreen = document.getElementById('auth-screen');
const highscoresScreen = document.getElementById('highscores-screen');

// ================== تحميل بيانات الألغاز مع إعادة المحاولة ==================
window.onload = async function() {
    await loadPuzzlesData();
};

async function loadPuzzlesData() {
    try {
        const response = await fetch('puzzles.json');
        if (!response.ok) {
            throw new Error(`فشل التحميل: ${response.status} ${response.statusText}`);
        }
        puzzlesData = await response.json();
        console.log('✅ تم تحميل الألغاز بنجاح');

        // إشارة مرئية للمستخدم
        const userInfoDiv = document.getElementById('user-info');
        if (userInfoDiv) {
            userInfoDiv.innerHTML = '<span style="color: #9ae6b4;">✓ البيانات جاهزة</span>';
        }
    } catch (error) {
        console.error('❌ فشل تحميل الألغاز:', error);
        alert(`⚠️ تعذر تحميل ملف الألغاز: ${error.message}\nتأكد من أن الملف موجود وأنك تستخدم خادمًا محليًا (مثل Live Server).`);

        // إعادة المحاولة بعد 3 ثوان
        setTimeout(loadPuzzlesData, 3000);
    }
}

// ================== مراقبة حالة المصادقة ==================
auth.onAuthStateChanged(user => {
    currentUser = user;
    const userInfoDiv = document.getElementById('user-info');
    const authButton = document.getElementById('auth-button');

    if (user) {
        userInfoDiv.innerHTML = `👋 مرحباً، ${user.email}`;
        authButton.innerText = '🚪 تسجيل الخروج';
        authButton.onclick = logout;
    } else {
        userInfoDiv.innerHTML = '';
        authButton.innerText = '🔑 تسجيل الدخول';
        authButton.onclick = showAuthScreen;
    }
});

// ================== دوال المصادقة ==================
function showAuthScreen() {
    document.getElementById('auth-message').innerText = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    authMode = 'login';
    document.getElementById('auth-action').innerText = 'تسجيل الدخول';
    showScreen('auth-screen');
}

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    document.getElementById('auth-action').innerText = authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب';
}

function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('auth-message');

    if (authMode === 'login') {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => goBackToStart())
            .catch(error => messageEl.innerText = '❌ ' + error.message);
    } else {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => goBackToStart())
            .catch(error => messageEl.innerText = '❌ ' + error.message);
    }
}

function logout() {
    auth.signOut().then(() => goBackToStart());
}

// ================== دوال التنقل بين الشاشات ==================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

function goBackToStart() { showScreen('start-screen'); }
function goBackToCategories() { showScreen('category-screen'); }
function goToStart() { showScreen('start-screen'); }
function goToLevelSelect() { showLevelScreen(); }

// ================== شاشة اختيار الفئة ==================
function showCategoryScreen() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    const categories = [
        { id: 'numbers', name: '🔢 أرقام ومنطق' },
        { id: 'old', name: '🕰️ ألغاز قديمة' },
        { id: 'history', name: '🏛️ تاريخ' },
        { id: 'technology', name: '💻 تكنولوجيا' }
    ];
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = `category-card ${selectedCategory === cat.id ? 'selected' : ''}`;
        card.innerHTML = `
            <div class="category-icon">${cat.name.split(' ')[0]}</div>
            <div class="category-title">${cat.name}</div>
        `;
        card.onclick = () => {
            selectedCategory = cat.id;
            showLevelScreen();
        };
        container.appendChild(card);
    });
    showScreen('category-screen');
}

// ================== شاشة اختيار المستوى ==================
function showLevelScreen() {
    if (!selectedCategory) {
        showCategoryScreen();
        return;
    }
    const container = document.getElementById('levels-container');
    container.innerHTML = '';
    const levels = [
        { id: 1, name: '🌱 سهل', points: 10 },
        { id: 2, name: '🌿 متوسط', points: 20 },
        { id: 3, name: '🌳 صعب', points: 30 },
        { id: 4, name: '🧠 عبقري', points: 50 }
    ];
    levels.forEach(lev => {
        const card = document.createElement('div');
        card.className = `level-card ${selectedLevel === lev.id ? 'selected' : ''}`;
        card.innerHTML = `
            <div class="category-title">${lev.name}</div>
            <div class="level-difficulty">${lev.points} نقطة/سؤال</div>
        `;
        card.onclick = () => {
            selectedLevel = lev.id;
            startGame();
        };
        container.appendChild(card);
    });
    showScreen('level-screen');
}

// ================== بدء اللعبة (دالة واحدة فقط) ==================
function startGame() {
    // التحقق من تحميل البيانات
    if (!puzzlesData) {
        alert('⏳ لم يتم تحميل البيانات بعد. يرجى الانتظار.');
        return;
    }

    // التأكد من وجود الفئة والمستوى
    if (!selectedCategory) selectedCategory = 'numbers';
    if (!selectedLevel) selectedLevel = 1;

    const allQuestions = puzzlesData[selectedCategory];
    if (!allQuestions) {
        alert('❌ لا توجد أسئلة لهذه الفئة');
        return;
    }

    // تصفية الأسئلة حسب المستوى وأخذ أول 10
    const filtered = allQuestions.filter(q => q.difficulty === selectedLevel);
    currentQuestions = filtered.slice(0, maxQuestions);

    if (currentQuestions.length === 0) {
        alert('⚠️ لا توجد أسئلة كافية لهذا المستوى.');
        return;
    }

    // إعادة تعيين حالة اللعبة
    currentQuestionIndex = 0;
    score = 0;
    hearts = 3;
    streak = 0;
    canAnswer = true;

    document.getElementById('score-display').innerText = '0 نقطة';
    updateHearts();
    showScreen('game-screen');
    loadQuestion();
}

// ================== تحديث القلوب ==================
function updateHearts() {
    const container = document.getElementById('hearts-container');
    container.innerHTML = '';
    for (let i = 0; i < hearts; i++) {
        container.innerHTML += '<span class="heart">❤️</span>';
    }
}

// ================== تحديث دائرة المؤقت ==================
function updateTimerCircle(percent) {
    const circle = document.querySelector('.timer-circle');
    if (circle) {
        const angle = percent * 360;
        circle.style.background = `conic-gradient(#48bb78 ${angle}deg, #2d3748 ${angle}deg)`;
    }
}

// ================== تحميل السؤال ==================
function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('riddle-text').innerText = q.riddle;
    document.getElementById('question-counter').innerText = `السؤال ${currentQuestionIndex + 1} / ${currentQuestions.length}`;

    const choicesDiv = document.getElementById('choices-container');
    choicesDiv.innerHTML = '';
    q.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice;
        btn.onclick = () => checkAnswer(index);
        choicesDiv.appendChild(btn);
    });

    document.getElementById('explanation-container').style.display = 'none';
    canAnswer = true;
    timeLeft = 20;
    document.getElementById('timer-display').innerText = timeLeft;
    updateTimerCircle(1);

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-display').innerText = timeLeft;
        updateTimerCircle(timeLeft / 20);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (canAnswer) handleWrongAnswer();
        }
    }, 1000);
}

// ================== معالجة الإجابة الخاطئة ==================
function handleWrongAnswer() {
    hearts--;
    updateHearts();

    if (hearts <= 0) {
        endGame();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('explanation-text').innerHTML = `❌ إجابة خاطئة!<br>${q.explanation}`;
    document.getElementById('explanation-container').style.display = 'block';
    disableChoices();
    canAnswer = false;
    clearInterval(timerInterval);
}

// ================== التحقق من الإجابة ==================
function checkAnswer(index) {
    if (!canAnswer) return;
    clearInterval(timerInterval);
    canAnswer = false;

    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = (index === q.answerIndex);

    const choicesBtns = document.querySelectorAll('.choice-btn');
    choicesBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answerIndex) {
            btn.classList.add('correct');
        } else if (i === index && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    if (isCorrect) {
        let points = 0;
        if (selectedLevel === 1) points = 10;
        else if (selectedLevel === 2) points = 20;
        else if (selectedLevel === 3) points = 30;
        else if (selectedLevel === 4) points = 50;

        score += points;
        streak++;
        if (streak === 5) {
            score += 50;
            streak = 0;
        }

        document.getElementById('score-display').innerText = score + ' نقطة';
        document.getElementById('explanation-text').innerHTML = `✅ إجابة صحيحة!<br>${q.explanation}`;
    } else {
        handleWrongAnswer();
        return;
    }

    document.getElementById('explanation-container').style.display = 'block';
}

function disableChoices() {
    document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);
}

// ================== الانتقال للسؤال التالي ==================
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

// ================== إنهاء المرحلة مبكراً ==================
function endGameEarly() {
    if (confirm('هل تريد إنهاء المرحلة؟')) {
        clearInterval(timerInterval);
        endGame();
    }
}

// ================== إنهاء المرحلة وعرض النتائج مع حفظ النقاط ==================
function endGame() {
    clearInterval(timerInterval);
    if (currentUser) {
        saveScoreToFirestore();
    } else {
        showEndScreen();
    }
}

async function saveScoreToFirestore() {
    try {
        await db.collection('scores').add({
            userId: currentUser.uid,
            email: currentUser.email,
            category: selectedCategory,
            level: selectedLevel,
            score: score,
            heartsLeft: hearts,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ تم حفظ النتيجة');
    } catch (error) {
        console.error('❌ خطأ في حفظ النتيجة:', error);
    } finally {
        showEndScreen();
    }
}

function showEndScreen() {
    const totalQuestions = currentQuestions.length;
    document.getElementById('result-stats').innerHTML = `
        <p>🏅 مجموع النقاط: ${score}</p>
        <p>📋 عدد الأسئلة: ${totalQuestions}</p>
        <p>❤️ القلوب المتبقية: ${hearts}</p>
    `;

    let stars = 0;
    if (hearts === 3) stars = 3;
    else if (hearts === 2) stars = 2;
    else if (hearts === 1) stars = 1;

    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        starsContainer.innerHTML += i < stars ? '⭐' : '☆';
    }

    showScreen('end-screen');
}

// ================== إعادة المرحلة ==================
function restartLevel() {
    startGame();
}

// ================== بدء التحدي السريع ==================
function startChallenge() {
    selectedCategory = 'numbers';
    selectedLevel = 1;
    startGame();
}

// ================== عرض أفضل النتائج ==================
async function showHighScores() {
    const container = document.getElementById('highscores-list');
    container.innerHTML = '<p style="text-align:center;">⏳ جاري التحميل...</p>';
    showScreen('highscores-screen');

    try {
        const snapshot = await db.collection('scores')
            .orderBy('score', 'desc')
            .limit(20)
            .get();

        if (snapshot.empty) {
            container.innerHTML = '<p style="text-align:center;">لا توجد نتائج بعد.</p>';
            return;
        }

        let html = '<ol style="list-style: none; padding:0;">';
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleDateString('ar-EG') : '';
            html += `<li style="background: #2d3748; margin:10px 0; padding:15px; border-radius:30px; display:flex; justify-content:space-between;">
                <span>👤 ${data.email || 'مجهول'}</span>
                <span>🏆 ${data.score}</span>
                <span>📅 ${date}</span>
            </li>`;
        });
        html += '</ol>';
        container.innerHTML = html;
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p style="color:#f56565;">❌ حدث خطأ في تحميل النتائج.</p>';
    }
}

// ================== تصدير الدوال إلى النطاق العام (للاستخدام في onclick) ==================
window.startChallenge = startChallenge;
window.showCategoryScreen = showCategoryScreen;
window.showLevelScreen = showLevelScreen;
window.showHighScores = showHighScores;
window.showAuthScreen = showAuthScreen;
window.goBackToStart = goBackToStart;
window.goBackToCategories = goBackToCategories;
window.goToStart = goToStart;
window.goToLevelSelect = goToLevelSelect;
window.nextQuestion = nextQuestion;
window.endGameEarly = endGameEarly;
window.restartLevel = restartLevel;
window.handleAuth = handleAuth;
window.toggleAuthMode = toggleAuthMode;
window.logout = logout;

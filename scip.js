// 1. ระบบรหัสผ่าน, ภาษา และฟังก์ชันเพลง / อิโมจิ
const correctPassword = "101149";
let currentLang = 'th';
let floatingEmojisEnabled = true; // เปิดให้ลอยได้ทันที
let isPuzzleSolved = false;

const translations = {
    th: {
        s1_title: "✨ มีความลับจะบอก...",
        s1_desc: "ห้ามกดเข้ามาดูเด็ดขาดนะ! 🧐",
        s1_btn: "อย่า กดนะ 😨",
        s2_title: "🔒 พื้นที่ความลับของเธอ",
        s2_desc: "รหัสผ่านคืออะไรน่าลองทายดูสิ มี 6 ตัว 💕",
        s2_btn: "เปิดกล่องของขวัญ 🎁",
        err_msg: "รหัสผ่านไม่ถูกต้อง ลองนึกดูมันสำคัญมากๆ 😘",
        badge: "Happy Birthday Sofia to me 💖",
        s3_title: "สุขสันต์วันเกิดนะสุดที่รักของเค้า! 🎉🎂",
        s3_desc: "ขอบคุณที่เกิดมาให้เค้ารักนะค้าบ",
        s3_letter: "<b>💌 ถึง... คนโปรดของเค้า</b><br>ขอให้เธอมีความสุขมากๆ สุขภาพร่างกายแข็งแรง อยู่เป็นความสดใสให้เค้าแบบนี้ไปนานๆ เลยน้า รักเธอที่สุด! 🥰✨",
        s3_btn: "🎁 เปิดการ์ดเซอร์ไพรส์อีกใบ... คลิ๊ก! ✨",
        step5_btn: "✨ ไปหน้าสุดท้ายเซอร์ไพรส์ 🖤",
        s5_desc: "ขอบคุณทุกๆ อย่าง ขอบคุณที่อยู่ข้างกันนะคับ 🖤✨",
        love_btn: "รักนะ ❤️",
        back_btn: "⬅️ กลับไปหน้าการ์ดก่อนหน้า",
        back_to_music: "🎵 กลับไปหน้าเพลง"
    },
    en: {
        s1_title: "✨ I have a secret...",
        s1_desc: "Do not peek in here! 🧐",
        s1_btn: "Do Not Click 😨",
        s2_title: "🔒 Her Secret Area",
        s2_desc: "Guess the 6-digit passcode 💕",
        s2_btn: "Open Gift Box 🎁",
        err_msg: "Incorrect passcode! Think about how important it is 😘",
        badge: "Happy Birthday Sofia to me 💖",
        s3_title: "Happy Birthday, My Love! 🎉🎂",
        s3_desc: "Thank you for being born and letting me love you.",
        s3_letter: "<b>💌 To... My Favorite Person</b><br>Wishing you endless happiness, great health, and stay as my sunshine forever. I love you the most! 🥰✨",
        s3_btn: "🎁 Open another surprise card... Click! ✨",
        step5_btn: "✨ Go to Final Surprise 🖤",
        s5_desc: "Thank you for everything and for always being by my side 🖤✨",
        love_btn: "Love You ❤️",
        back_btn: "⬅️ Back to previous card",
        back_to_music: "🎵 Back to Music"
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'th' ? 'en' : 'th';
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}

function goToStep2() {
    document.getElementById("step1-box").classList.add("hidden");
    document.getElementById("step2-box").classList.remove("hidden");
}

function checkPassword() {
    const inputVal = document.getElementById("passcode").value;
    const errorDiv = document.getElementById("error");

    if (inputVal === correctPassword) {
        document.getElementById("step2-box").classList.add("hidden");
        document.getElementById("step3-box").classList.remove("hidden");
    } else {
        errorDiv.textContent = translations[currentLang].err_msg;
    }
}

function goToStep4() {
    document.getElementById("step3-box").classList.add("hidden");
    document.getElementById("step4-box").classList.remove("hidden");
    initPuzzle();
}

function goToStep5() {
    document.getElementById("step4-box").classList.add("hidden");
    document.getElementById("step5-box").classList.remove("hidden");
    document.body.classList.add("dark-mode");
}

function backToStep3() {
    document.getElementById("step4-box").classList.add("hidden");
    document.getElementById("step3-box").classList.remove("hidden");
}

function backToStep4() {
    document.getElementById("step5-box").classList.add("hidden");
    document.getElementById("step4-box").classList.remove("hidden");
    document.body.classList.remove("dark-mode");
}

// ===== ระบบควบคุมเพลง & อิโมจิลอย =====
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const playIcon = document.getElementById('playIcon');
    const playText = document.getElementById('playText');
    const vinyl = document.getElementById('vinylDisc');

    if (music.paused) {
        music.play().then(() => {
            playIcon.textContent = "⏸️";
            playText.textContent = currentLang === 'th' ? "กำลังเล่นเพลง 'คำอวยพร' 🎵" : "Playing 'Kam Auey Phon' 🎵";
            if(vinyl) vinyl.classList.remove('paused');
        }).catch(e => {
            console.error("Audio play error:", e);
            alert("⚠️ เปิดเพลงไม่สำเร็จ! ตรวจสอบว่าไฟล์เพลงอยู่ในโฟลเดอร์เดียวกันหรือไม่");
        });
    } else {
        music.pause();
        playIcon.textContent = "▶️";
        playText.textContent = currentLang === 'th' ? " 💝 'คำอวยพร' 💝 " : " 💝 'Kam Auey Phon' 💝 ";
        if(vinyl) vinyl.classList.add('paused');
    }
}

function toggleFloatingEmojis() {
    floatingEmojisEnabled = !floatingEmojisEnabled;
    const toggleEmojiBtn = document.getElementById('toggleEmojiBtn');
    if (floatingEmojisEnabled) {
        toggleEmojiBtn.innerHTML = currentLang === 'th' ? "✨ ปิดอิโมจิลอย" : "✨ Hide Floating Emojis";
    } else {
        toggleEmojiBtn.innerHTML = currentLang === 'th' ? "✨ เปิดอิโมจิลอย" : "✨ Show Floating Emojis";
    }
}

// ===== ระบบจิ๊กซอว์ =====
let puzzleOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winningOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let selectedIndex = null;

function initPuzzle() {
    isPuzzleSolved = false;
    const actionBtn = document.getElementById('actionPuzzleBtn');
    if (actionBtn) actionBtn.textContent = "🏳️ ยอมแพ้ 💔";
    
    do {
        puzzleOrder.sort(() => Math.random() - 0.5);
    } while (isEqual(puzzleOrder, winningOrder));

    selectedIndex = null;
    renderPuzzle();
}

function renderPuzzle() {
    const board = document.getElementById('puzzleBoard');
    board.innerHTML = '';

    puzzleOrder.forEach((pos, index) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        
        const x = (pos % 3) * 65;
        const y = Math.floor(pos / 3) * 65;
        piece.style.backgroundPosition = `-${x}px -${y}px`;

        if (selectedIndex === index) {
            piece.classList.add('selected');
        }

        piece.onclick = () => handlePieceClick(index);
        board.appendChild(piece);
    });
}

function handlePieceClick(index) {
    if (isPuzzleSolved) return;

    if (selectedIndex === null) {
        selectedIndex = index;
        renderPuzzle();
    } else if (selectedIndex === index) {
        selectedIndex = null;
        renderPuzzle();
    } else {
        let temp = puzzleOrder[selectedIndex];
        puzzleOrder[selectedIndex] = puzzleOrder[index];
        puzzleOrder[index] = temp;
        selectedIndex = null;
        renderPuzzle();

        if (isEqual(puzzleOrder, winningOrder)) {
            solvePuzzleComplete();
        }
    }
}

function handlePuzzleAction() {
    const actionBtn = document.getElementById('actionPuzzleBtn');
    if (!isPuzzleSolved) {
        puzzleOrder = [...winningOrder];
        renderPuzzle();
        solvePuzzleComplete();
        if (actionBtn) actionBtn.textContent = "🔄 ลองใหม่อีกครั้ง";
    } else {
        initPuzzle();
        document.getElementById('puzzleMsg').classList.add('hidden');
        document.getElementById('musicSection').classList.remove('show-after-blow');
    }
}

function solvePuzzleComplete() {
    isPuzzleSolved = true;
    const msgEl = document.getElementById('puzzleMsg');
    msgEl.textContent = "😅 ค่อยเอาใหม่น่าคนเก่ง จิ๊กซอว์เสร็จแล้วเปิดฟังเพลงได้เลย!";
    msgEl.classList.remove('hidden');
    document.getElementById('musicSection').classList.add('show-after-blow');
}

function isEqual(arr1, arr2) {
    return arr1.every((val, i) => val === arr2[i]);
}

// ===== ระบบอิโมจิลอยและเอฟเฟกต์แตะระเบิด (แก้ไขให้สร้าง Element ถูกต้อง) =====
function createHeart() {
    if (!floatingEmojisEnabled) return;

    const heart = document.createElement('div');
    heart.classList.add('heart-float');
    const symbols = ['❤️', '💖', '💗', '✨', '💕', '🌸', '⭐', '🎶', '🥰'];
    heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '105vh';
    const size = Math.random() * 16 + 18;
    heart.style.fontSize = size + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    // เมื่อกดคลิก/จิ้มที่ตัวอิโมจิลอย จะระเบิดออกเป็นหัวใจเล็กๆ
    heart.addEventListener('click', (e) => {
        triggerBurstAt(e.clientX, e.clientY);
        heart.remove();
    });

    document.body.appendChild(heart);
    setTimeout(() => { if(heart.parentElement) heart.remove(); }, 6000);
}
setInterval(createHeart, 250);

function triggerBurstAt(x, y) {
    const symbols = ['💋', '❤️', '💖', '✨', '😘', '💗', '💥'];
    for (let i = 0; i < 12; i++) {
        const love = document.createElement('div');
        love.classList.add('kiss-pop');
        love.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 30;
        const randX = Math.cos(angle) * distance;
        const randY = Math.sin(angle) * distance;

        love.style.left = x + 'px';
        love.style.top = y + 'px';
        love.style.setProperty('--rand-x', randX + 'px');
        love.style.setProperty('--rand-y', randY + 'px');

        document.body.appendChild(love);
        setTimeout(() => { love.remove(); }, 1000);
    }
}

// 2. เอฟเฟกต์ปุ่มกดรักนะ (กระจายหัวใจ)
function burstLove(event) {
    const rect = event.target.getBoundingClientRect();
    triggerBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

// 3. ระบบ Three.js (3D Background)
window.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const particleGroup = new THREE.Group();
    const particleGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xff6b8b });

    const particleCount = window.innerWidth < 768 ? 100 : 200;

    for (let i = 0; i < particleCount; i++) {
        const mesh = new THREE.Mesh(particleGeo, particleMat);
        mesh.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10
        );

        mesh.userData = {
            vx: (Math.random() - 0.5) * 0.015,
            vy: (Math.random() - 0.5) * 0.015,
            vz: (Math.random() - 0.5) * 0.015,
            originalScale: 0.5 + Math.random() * 1.5
        };

        particleGroup.add(mesh);
    }
    scene.add(particleGroup);
    camera.position.z = 6;

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.05;

        particleGroup.children.forEach((mesh, index) => {
            mesh.position.x += mesh.userData.vx;
            mesh.position.y += mesh.userData.vy;
            mesh.position.z += mesh.userData.vz;

            if (Math.abs(mesh.position.x) > 8) mesh.userData.vx *= -1;
            if (Math.abs(mesh.position.y) > 8) mesh.userData.vy *= -1;
            if (Math.abs(mesh.position.z) > 5) mesh.userData.vz *= -1;

            const scaleFactor = mesh.userData.originalScale + Math.sin(time + index) * 0.4;
            mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        });

        particleGroup.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
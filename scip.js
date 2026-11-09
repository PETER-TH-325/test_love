// 1. สร้างหัวใจลอยเบื้องหลัง
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-float');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 4000);
}
setInterval(createHeart, 300);

// 2. ระบบรหัสผ่านและแปลภาษา
const correctPassword = "231069";
let currentLang = 'th';

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
        s4_title: "🎶 เพลงพิเศษสำหรับเธอ 💖",
        s4_desc: "เปิดเพลงฟังแล้วรับความรู้สึกดีๆ จากเค้านะคะ!",
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
        s4_title: "🎶 Special Song For You 💖",
        s4_desc: "Play the music and feel my love!",
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

// 3. เอฟเฟกต์ปุ่มกดรักนะ (กระจายหัวใจ)
function burstLove(event) {
    const symbols = ['💋', '❤️', '💖', '✨', '😘', '💗'];
    const rect = event.target.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    for (let i = 0; i < 18; i++) {
        const love = document.createElement('div');
        love.classList.add('kiss-pop');
        love.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 140 + 50;
        const randX = Math.cos(angle) * distance;
        const randY = Math.sin(angle) * distance;

        love.style.left = clickX + 'px';
        love.style.top = clickY + 'px';
        love.style.setProperty('--rand-x', randX + 'px');
        love.style.setProperty('--rand-y', randY + 'px');

        document.body.appendChild(love);
        setTimeout(() => { love.remove(); }, 1000);
    }
}

// 4. ระบบ Three.js (3D Background) ปลอดภัยไร้บัค
window.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') {
        console.error('Three.js library is missing!');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const heartGroup = new THREE.Group();
    const heartGeo = new THREE.SphereGeometry(0.1, 14, 14);
    const heartMat = new THREE.MeshBasicMaterial({ color: 0xff3366 });

    const particleCount = window.innerWidth < 768 ? 70 : 120;

    for (let i = 0; i < particleCount; i++) {
        const heartMesh = new THREE.Mesh(heartGeo, heartMat);
        heartMesh.userData = {
            radius: 2.5 + Math.random() * 4.5,
            angle: Math.random() * Math.PI * 2,
            yOffset: (Math.random() - 0.5) * 5,
            speed: 0.004 + Math.random() * 0.006
        };
        
        heartMesh.position.x = Math.cos(heartMesh.userData.angle) * heartMesh.userData.radius;
        heartMesh.position.z = Math.sin(heartMesh.userData.angle) * heartMesh.userData.radius;
        heartMesh.position.y = heartMesh.userData.yOffset;
        
        scene.add(heartMesh);
        heartGroup.add(heartMesh);
    }

    camera.position.z = window.innerWidth < 768 ? 6.5 : 5.5;

    function animate() {
        requestAnimationFrame(animate);
        
        heartGroup.children.forEach(mesh => {
            mesh.userData.angle += mesh.userData.speed;
            mesh.position.x = Math.cos(mesh.userData.angle) * mesh.userData.radius;
            mesh.position.z = Math.sin(mesh.userData.angle) * mesh.userData.radius;
        });

        heartGroup.rotation.y += 0.0025;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = window.innerWidth < 768 ? 6.5 : 5.5;
    });
});
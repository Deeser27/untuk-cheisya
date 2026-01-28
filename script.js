// Variabel Audio
const music = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

// Fungsi memulai (dipanggil di halaman 1)
function startJourney() {
    // Coba mainkan musik
    toggleMusic(true); 
    nextSection(2);
    // Mulai efek ketik
    typeWriter();
}

// Fungsi Pindah Halaman
function nextSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`section${id}`).classList.add('active');
}

// Fitur 1: Music Control
function toggleMusic(forcePlay = false) {
    if (forcePlay || !isPlaying) {
        music.play().then(() => {
            isPlaying = true;
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-volume-up');
        }).catch(err => console.log("Autoplay blocked, waiting for interaction"));
    } else {
        music.pause();
        isPlaying = false;
        musicIcon.classList.remove('fa-volume-up');
        musicIcon.classList.add('fa-music');
    }
}

// Fitur 2: Efek Mengetik (Typewriter)
const textToType = "Jujur, awalnya aku kira kita cuma bakal jadi temen biasa yang ngobrolnya cuma kalo ada keperluan aja, bahkan awalnya kukira kita gabkala bisa sedeket ini soalnya kita pas awal ketemu kan ga ngobrol samsek, tapi aku ga nyangka pas pertama kali kamu ajak ngobrol di indomaret itu ternyata kamu orangnya asik bgt, bahakn setelah itu kamu sering reply sw ku terus kita lanjtu ngobrol dan itu asikk bgtt:) 🐡";
const typeElement = document.getElementById('typingText');
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typeElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 50); // Kecepatan mengetik (ms)
    } else {
        // Munculkan tombol lanjut setelah selesai mengetik
        document.getElementById('nextBtn2').classList.remove('hidden');
    }
}

// Fitur 3: Quiz Logic
function rightAnswer(element) {
    element.classList.add('correct-clicked');
    document.getElementById('quizFeedback').innerHTML = "Bener bangettttt Kan kamu emang pinter ✨";
    document.getElementById('quizFeedback').style.color = "#00b894";
    setTimeout(() => {
        document.getElementById('nextBtn3').classList.remove('hidden');
    }, 500);
}

function wrongAnswer(element) {
    element.classList.add('wrong-clicked');
    document.getElementById('quizFeedback').innerHTML = "Salah wuuu! Coba lagi 😜";
    document.getElementById('quizFeedback').style.color = "#d63031";
}

// Fitur 4: Tombol No Lari-lari (Lebih Cerdas)
function moveButton() {
    const btnNo = document.getElementById('btnNo');
    
    // Ambil ukuran layar
    const maxWidth = window.innerWidth - btnNo.offsetWidth;
    const maxHeight = window.innerHeight - btnNo.offsetHeight;

    // Acak posisi
    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    // Terapkan posisi baru
    btnNo.style.position = 'fixed'; // Ubah ke fixed biar bisa lari bebas satu layar
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

// Fitur 5: Confetti & WA
function accepted() {
    nextSection(5);
    startConfetti();
}

function sendWA() {
    const nomorWA = "628977774031"; // GANTI NOMOR KITA DISINI
    const pesan = "Hai Djibril! Aku udah kelar kuisnya... Jawabannya: IYA, aku mau! 🐡❤️";
    window.location.href = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
}

// Efek Confetti Sederhana (Hujan Emoji)
function startConfetti() {
    const emojis = ['❤️', '🐡', '✨', '🌸', '💍'];
    setInterval(() => {
        const el = document.createElement('div');
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.position = 'fixed';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-10vh';
        el.style.fontSize = (Math.random() * 20 + 20) + 'px';
        el.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        el.style.zIndex = '9999';
        document.body.appendChild(el);

        // Hapus elemen setelah jatuh
        setTimeout(() => el.remove(), 5000);
    }, 200);
    
    // Tambah animasi CSS untuk jatuh
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fall {
            to { transform: translateY(110vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);
}
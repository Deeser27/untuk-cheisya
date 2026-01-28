// Variabel Audio
const music = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;
let hasStarted = false;

// Inisialisasi Particles
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Fungsi Membuat Particles Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const emojis = ['💕', '💖', '💗', '🌸', '✨', '🐡', '❤️'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particle.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        particlesContainer.appendChild(particle);
    }
}

// Fungsi Memulai
function startJourney() {
    if (!hasStarted) {
        hasStarted = true;
        toggleMusic(true);
    }
    nextSection(2);
    typeWriter();
}

// Fungsi Pindah Halaman
function nextSection(id) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(`section${id}`).classList.add('active');
}

// Fitur 1: Music Control
function toggleMusic(forcePlay = false) {
    if (forcePlay || !isPlaying) {
        music.play().then(() => {
            isPlaying = true;
            musicIcon.className = 'fas fa-volume-up';
        }).catch(err => {
            console.log("Autoplay blocked, waiting for user interaction");
        });
    } else {
        music.pause();
        isPlaying = false;
        musicIcon.className = 'fas fa-music';
    }
}

// Fitur 2: Efek Mengetik dengan Progress Bar
const textToType = "Jujur, awalnya aku kira kita cuma bakal jadi temen biasa yang ngobrolnya cuma kalo ada keperluan aja, bahkan awalnya kukira kita gabkala bisa sedeket ini soalnya kita pas awal ketemu kan ga ngobrol samsek, tapi aku ga nyangka pas pertama kali kamu ajak ngobrol di indomaret itu ternyata kamu orangnya asik bgt, bahakn setelah itu kamu sering reply sw ku terus kita lanjtu ngobrol dan itu asikk bgtt:) 🐡";
const typeElement = document.getElementById('typingText');
const progressElement = document.getElementById('typingProgress');
let charIndex = 0;

function typeWriter() {
    // Reset
    typeElement.innerHTML = '';
    progressElement.style.width = '0%';
    charIndex = 0;
    
    // Mulai efek mengetik
    function type() {
        if (charIndex < textToType.length) {
            typeElement.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            
            // Update progress bar
            const progress = (charIndex / textToType.length) * 100;
            progressElement.style.width = progress + '%';
            
            // Random typing speed untuk efek natural
            const randomSpeed = Math.random() * 50 + 30;
            setTimeout(type, randomSpeed);
        } else {
            // Tampilkan tombol lanjut
            document.getElementById('nextBtn2').classList.remove('hidden');
        }
    }
    
    type();
}

// Fitur 3: Kuis
function checkAnswer(element) {
    const feedback = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('nextBtn3');
    const options = document.querySelectorAll('.option');
    
    // Nonaktifkan semua opsi
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    if (element.dataset.answer === 'correct') {
        element.classList.add('correct');
        feedback.innerHTML = '🎉 Tepat sekaliiiii WKWKWKWKWKW';
        feedback.className = 'feedback success';
        nextBtn.classList.remove('hidden');
    } else {
        element.classList.add('wrong');
        feedback.innerHTML = '❌ Salah! Coba lagi ya, tapi tetep pilih yang nomor 2 kok 😆';
        feedback.className = 'feedback error';
        
        // Aktifkan kembali opsi setelah 1 detik
        setTimeout(() => {
            element.classList.remove('wrong');
            options.forEach(opt => {
                opt.style.pointerEvents = 'auto';
            });
            feedback.innerHTML = '';
            feedback.className = 'feedback';
        }, 1500);
    }
}

// Fitur 4: Tombol "Gak Dulu" yang Bergerak
function moveButton() {
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const container = document.querySelector('.response-buttons');
    
    // Dapatkan posisi acak
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - btnNo.offsetWidth - 20;
    const maxY = containerRect.height - btnNo.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Terapkan posisi baru
    btnNo.style.position = 'absolute';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    
    // Update posisi tombol Yes agar tetap di tengah bawah
    btnYes.style.position = 'relative';
    btnYes.style.left = 'auto';
    btnYes.style.top = 'auto';
}

// Fitur 5: Diterima - Pindah ke Halaman Sukses
function accepted() {
    // Hentikan musik
    music.pause();
    
    // Tampilkan confetti
    createConfetti();
    
    // Pindah ke section 5
    nextSection(5);
    
    // Mainkan musik lagi dengan upbeat
    setTimeout(() => {
        music.currentTime = 0;
        music.play();
    }, 500);
}

// Fitur 6: Efek Confetti
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const emojis = ['🎉', '❤️', '💕', '💖', '💗', '🥳', '✨', '🌸', '🐡'];
    
    // Hapus confetti lama
    confettiContainer.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        confettiContainer.appendChild(confetti);
    }
    
    // Hapus confetti setelah animasi selesai
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 8000);
}

// Fitur 7: Kirim Pesan WhatsApp
function sendWA() {
    const message = "YEEE AKU MAU JADI PACARMU! 🐡❤️ Makasih ya udah bikin websitenya, aku seneng banget! 💕";
    const phoneNumber = "628977774031"; // Ganti dengan nomor kamu
    
    // Encode message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Buka WhatsApp
    window.open(whatsappUrl, '_blank');
}


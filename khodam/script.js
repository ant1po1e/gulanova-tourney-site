const images = [
    "../dist/img/khodam-img/1.png",
    "../dist/img/khodam-img/2.png",
    "../dist/img/khodam-img/3.png",
    "../dist/img/khodam-img/4.png",
    "../dist/img/khodam-img/5.png",
    "../dist/img/khodam-img/6.jpg",
    "../dist/img/khodam-img/7.png",
    "../dist/img/khodam-img/8.png",
    "../dist/img/khodam-img/9.png",
]

const slotMachine = document.getElementById('slotMachine');
let isSpinning = false;

function createSlotItems() {
    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'slot-item';
        item.style.backgroundImage = `url(${img})`;
        item.id = `slot-item-${index}`;
        slotMachine.appendChild(item);
    });
}

function spinKhodam() {
    if (isSpinning) return;
    isSpinning = true;

    let currentIndex = 0;
    const spinInterval = setInterval(() => {
        document.querySelectorAll('.slot-item').forEach(item => item.classList.remove('active'));
        document.getElementById(`slot-item-${currentIndex}`).classList.add('active');
        currentIndex = (currentIndex + 1) % images.length;
    }, 100);

    setTimeout(() => {
        clearInterval(spinInterval);
        const finalIndex = Math.floor(Math.random() * images.length);
        document.querySelectorAll('.slot-item').forEach(item => item.classList.remove('active'));
        document.getElementById(`slot-item-${finalIndex}`).classList.add('active');
        isSpinning = false;
    }, 3000);
}

createSlotItems();

if (window.location.pathname.substr(-1) !== '/') {
    window.location.pathname += '/';
}
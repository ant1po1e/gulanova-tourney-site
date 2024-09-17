const khodamImages = [
    "1.png",  
    "2.png",  
    "3.png",  
    "4.png",
    "5.png",
    "6.jpg"
];

function getRandomKhodam() {
    const randomIndex = Math.floor(Math.random() * khodamImages.length);
    return khodamImages[randomIndex];
}

function startKhodam() {
    const khodamImageElement = document.getElementById('khodam-image');
    let interval = setInterval(() => {
        khodamImageElement.src = getRandomKhodam();
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        khodamImageElement.src = getRandomKhodam(); 
    }, 3000); 
}

document.getElementById('cek-khodam-btn').addEventListener('click', startKhodam);

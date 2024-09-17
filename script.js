const khodamImages = [
    "1.png", 
    "2.png",  
    "3.png",  
    "4.png",   
    "5.png",
    "6.jpg"  
];

let isRolling = false; 

function getRandomKhodam() {
    const randomIndex = Math.floor(Math.random() * khodamImages.length);
    return khodamImages[randomIndex];
}

function startKhodam() {
    if (isRolling) return;  
    isRolling = true;

    const khodamImageElement = document.getElementById('khodam-image');
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; 

    let interval = setInterval(() => {
        khodamImageElement.src = getRandomKhodam();
    }, 100); 

    setTimeout(() => {
        clearInterval(interval);
        khodamImageElement.src = getRandomKhodam(); 
        loader.style.display = 'none'; 
        isRolling = false; 
    }, 3000); 
}

// Event listener untuk tombol cek khodam
document.getElementById('cek-khodam-btn').addEventListener('click', startKhodam);

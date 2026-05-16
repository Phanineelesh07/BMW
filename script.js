document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const homeView = document.getElementById('home-view');
    const modelsView = document.getElementById('models-view');
    const modelsContainer = document.getElementById('models-container');
const carSound = document.getElementById('car-sound');
    // Car Data
    const cars = [
        {
            name: 'BMW M3',
            image: 'assets/bmw_m3_1778869072989.png',
            engine: '3.0L Twin-Turbo I6',
            horsepower: '473 hp',
            zero_to_sixty: '4.1 sec',
            top_speed: '155 mph'
        },
        {
            name: 'BMW i8',
            image: 'assets/bmw_i8_1778869196549.png',
            engine: '1.5L Turbo I3 Hybrid',
            horsepower: '369 hp',
            zero_to_sixty: '4.2 sec',
            top_speed: '155 mph'
        },
        {
            name: 'BMW X5',
            image: 'assets/bmw_x5_1778869298174.png',
            engine: '3.0L Turbo I6',
            horsepower: '335 hp',
            zero_to_sixty: '5.3 sec',
            top_speed: '130 mph'
        }
    ];

    // Populate Models
    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="card-content">
                <h2>${car.name}</h2>
                <div class="card-details">
                    <div class="detail-item">
                        <span>Engine</span>
                        <span>${car.engine}</span>
                    </div>
                    <div class="detail-item">
                        <span>Power</span>
                        <span>${car.horsepower}</span>
                    </div>
                    <div class="detail-item">
                        <span>0-60 mph</span>
                        <span>${car.zero_to_sixty}</span>
                    </div>
                    <div class="detail-item">
                        <span>Top Speed</span>
                        <span>${car.top_speed}</span>
                    </div>
                </div>
            </div>
        `;
        
        modelsContainer.appendChild(card);
    });

    // Handle View Transition
    enterBtn.addEventListener('click', () => {
        // Hide home view
        carSound.play();
        homeView.classList.remove('active');
        homeView.classList.add('hidden');
        
        // After small delay for smooth transition, show models
        setTimeout(() => {
            modelsView.classList.remove('hidden');
            modelsView.classList.add('active');
            window.scrollTo(0, 0); // Reset scroll position
        }, 800);
    });
});

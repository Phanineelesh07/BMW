document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader & Initialization
    const loader = document.getElementById('loader');
    const igniteBtn = document.getElementById('ignite-btn');
    const carSound = document.getElementById('car-sound');
    const hoverSound = document.getElementById('hover-sound');
    
    // Smooth Scroll Setup (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Data
    const cars = [
        {
            name: 'BMW M3',
            image: 'assets/bmw_m3_1778869072989.png',
            engine: '3.0L Twin-Turbo I6',
            horsepower: '473',
            zero_to_sixty: '4.1',
            top_speed: '155',
            details: {
                'Transmission': '6-speed Manual / 8-speed Auto',
                'Drivetrain': 'Rear-Wheel Drive',
                'Torque': '406 lb-ft',
                'Weight': '3,840 lbs'
            },
            summary: 'The definitive high-performance sports sedan. A masterful blend of track-ready dynamics and everyday usability, featuring razor-sharp handling and breathtaking acceleration.'
        },
        {
            name: 'BMW i8',
            image: 'assets/bmw_i8_1778869196549.png',
            engine: '1.5L Turbo I3 Hybrid',
            horsepower: '369',
            zero_to_sixty: '4.2',
            top_speed: '155',
            details: {
                'Transmission': '6-speed Automatic',
                'Drivetrain': 'All-Wheel Drive',
                'Torque': '420 lb-ft',
                'Weight': '3,384 lbs'
            },
            summary: 'A revolutionary plug-in hybrid sports car with gullwing doors. It combines progressive design with advanced lightweight carbon-fiber construction and efficient electrified performance.'
        },
        {
            name: 'BMW X5',
            image: 'assets/bmw_x5_1778869298174.png',
            engine: '3.0L Turbo I6',
            horsepower: '335',
            zero_to_sixty: '5.3',
            top_speed: '130',
            details: {
                'Transmission': '8-speed Automatic',
                'Drivetrain': 'xDrive All-Wheel Drive',
                'Torque': '332 lb-ft',
                'Weight': '4,828 lbs'
            },
            summary: 'The original Sports Activity Vehicle. Offering luxurious comfort, commanding road presence, and supreme versatility for any journey, on or off the road.'
        }
    ];

    // Play hover sounds
    function playHoverSound() {
        if(hoverSound) {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.3;
            hoverSound.play().catch(e => {});
        }
    }

    // Initialize Animations Setup
    function initAnimations() {
        // Hero Reveal
        const tl = gsap.timeline();
        tl.to('.hero-heading', { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" })
          .to('.hero-sub', { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5")
          .to('.scroll-indicator', { opacity: 1, duration: 1 }, "-=0.5");

        // M3 Section Reveal
        gsap.from('#m3-image img', {
            x: 200, opacity: 0, duration: 1.5,
            scrollTrigger: {
                trigger: '#scroll-2',
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });
        gsap.from('#m3-text', {
            x: -100, opacity: 0, duration: 1.5,
            scrollTrigger: {
                trigger: '#scroll-2',
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });

        // Specs Number Counter Animation
        const specValues = document.querySelectorAll('.spec-value');
        specValues.forEach(el => {
            let target = parseFloat(el.getAttribute('data-target'));
            let isFloat = target % 1 !== 0;
            
            gsap.to(el, {
                scrollTrigger: {
                    trigger: '#scroll-3',
                    start: "top 70%",
                    once: true
                },
                innerHTML: target,
                duration: 2,
                ease: "power2.out",
                snap: { innerHTML: isFloat ? 0.1 : 1 },
                onUpdate: function() {
                    if (isFloat) {
                        el.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
                    }
                }
            });
        });
        gsap.from('.spec-item', {
            y: 50, opacity: 0, duration: 1, stagger: 0.2,
            scrollTrigger: { trigger: '#scroll-3', start: "top 70%" }
        });

        // Models Reveal
        gsap.from('.cinematic-card', {
            y: 100, opacity: 0, duration: 1.2, stagger: 0.2,
            scrollTrigger: { trigger: '#scroll-4', start: "top 70%" }
        });
        
        // Parallax Video Background
        gsap.to('#bg-video', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: "#smooth-wrapper",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Attach hover sounds to interactive items
        document.querySelectorAll('.cinematic-card, a, button').forEach(el => {
            el.addEventListener('mouseenter', playHoverSound);
        });
    }

    // Loader Action
    igniteBtn.addEventListener('click', () => {
        // Play Startup Sound
        if(carSound) carSound.play().catch(e => console.log('Audio error:', e));
        
        loader.classList.add('active');
        igniteBtn.style.display = 'none';
        
        setTimeout(() => {
            gsap.to(loader, { opacity: 0, duration: 1.5, onComplete: () => {
                loader.style.display = 'none';
                initAnimations();
            }});
        }, 2500);
    });

    // Populate Models
    const modelsContainer = document.getElementById('models-container');
    cars.forEach((car) => {
        const card = document.createElement('div');
        card.className = 'cinematic-card';
        card.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <div class="card-info">
                <h3>${car.name}</h3>
                <p>VIEW SPECS</p>
            </div>
        `;
        
        // Click to open overlay
        card.addEventListener('click', () => {
            openOverlay(car);
        });
        
        modelsContainer.appendChild(card);
    });

    // Overlay Logic
    const overlay = document.getElementById('car-overlay');
    const closeOverlayBtn = document.getElementById('close-overlay');
    
    function openOverlay(car) {
        document.getElementById('overlay-name').textContent = car.name;
        document.getElementById('overlay-engine').textContent = car.engine;
        document.getElementById('overlay-image').src = car.image;
        document.getElementById('overlay-hp').textContent = car.horsepower + ' hp';
        document.getElementById('overlay-060').textContent = car.zero_to_sixty + ' s';
        document.getElementById('overlay-speed').textContent = car.top_speed + ' mph';
        document.getElementById('overlay-summary').textContent = car.summary;

        const detailsContainer = document.getElementById('overlay-details');
        detailsContainer.innerHTML = '';
        for (const [key, value] of Object.entries(car.details)) {
            detailsContainer.innerHTML += `
                <div class="detail-row stat">
                    <span class="detail-label">${key}</span>
                    <span class="detail-value">${value}</span>
                </div>
            `;
        }

        overlay.classList.add('active');
        
        // Overlay Animations
        gsap.fromTo('#overlay-name', {y: 50, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: 0.2});
        gsap.fromTo('#overlay-engine', {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: 0.4});
        gsap.fromTo('.overlay-image-container img', {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.3});
        gsap.fromTo('.stat', {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.6});
        gsap.fromTo('#overlay-summary', {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: 0.9});
        
        // Instead of lenis.stop(), we lock the body so the overlay can scroll natively
        document.body.style.overflow = 'hidden';
    }

    closeOverlayBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Unlock body scroll
    });
});

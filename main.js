// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up, .fade-right, .fade-left').forEach(el => observer.observe(el));

// Header scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
menuBtn?.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-answer').style.maxHeight = '0';
        });
        if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Form submit
document.getElementById('bookingForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('[name="name"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const motive = this.querySelector('[name="motive"]').value;
    const msg = encodeURIComponent(`Olá, sou ${name} (${phone}). Gostaria de agendar uma consulta com o Dr. Thiago.\nMotivo: ${motive}`);
    window.open(`https://wa.me/5562999999999?text=${msg}`, '_blank');
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Testimonial Slider logic
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('reviewSlider');
    const dots = document.querySelectorAll('#sliderDots button');

    if (!slider || dots.length === 0) return;

    let currentIndex = 0;
    const totalCards = 6;
    let autoSlideInterval;

    function updateSlider() {
        if (currentIndex >= totalCards) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalCards - 1;

        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, idx) => {
            dot.classList.toggle('bg-[#C9A55A]', idx === currentIndex);
            dot.classList.toggle('bg-slate-200', idx !== currentIndex);
        });
    }

    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            updateSlider();
        }, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentIndex = idx;
            updateSlider();
            startAutoSlide(); // Restart interval on manual click
        });
    });

    window.addEventListener('resize', () => {
        updateSlider();
    });

    // Initial start
    updateSlider();
    startAutoSlide();
});

/* =========================================================
   MAISON AZUR — script.js
   6 эффектов + модалка политики
   ========================================================= */

/* ===== 1. ШАПКА ПОЯВЛЯЕТСЯ ПРИ СКРОЛЛЕ ===== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
});

/* ===== 2. ПАРАЛЛАКС НА HERO ===== */
const heroBg = document.querySelector('[data-parallax]');

window.addEventListener('scroll', () => {
    if (heroBg && window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    }
});

/* ===== 3. SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

/* ===== 4. АНИМИРОВАННЫЕ СЧЁТЧИКИ ===== */
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.count;
            const duration = 1800;
            const start = performance.now();

            function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out
                el.textContent = Math.floor(eased * target).toLocaleString('ru-RU');
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

/* ===== 5. МОДАЛЬНОЕ ОКНО С УКРАШЕНИЕМ ===== */
const products = {
    ring: {
        tag: 'Бестселлер',
        title: 'Кольцо «Azur»',
        desc: 'Сапфир 1.2 карата в оправе из белого золота 585 пробы. Ручная огранка, сертификат GIA. Идеально для помолвки или в качестве акцентного украшения.',
        price: '98 000 ₽',
        image: 'images/ring.jpg'
    },
    earrings: {
        tag: 'Новинка',
        title: 'Серьги «Nuit»',
        desc: 'Бриллианты 0.8 карата, родиевое покрытие. Лёгкие, но выразительные. Подходят для вечерних выходов и особых случаев.',
        price: '64 500 ₽',
        image: 'images/earrings.jpg'
    },
    necklace: {
        tag: 'Лимитировано',
        title: 'Колье «Roi»',
        desc: 'Сапфиры и бриллианты в единой линии. Серия ограничена 12 экземплярами. Каждое колье имеет индивидуальный номер и гравировку.',
        price: '245 000 ₽',
        image: 'images/necklace.jpg'
    }
};

const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalClose = document.getElementById('modalClose');
const modalBtn = document.getElementById('modalBtn');

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.dataset.product;
        const data = products[key];
        if (!data) return;

        modalImage.style.backgroundImage = `url('${data.image}')`;
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalPrice.textContent = data.price;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
modalBtn.addEventListener('click', closeModal);

/* ===== 6. КАСТОМНЫЙ КУРСОР НА КАРТОЧКАХ ===== */
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
    });
});

/* ===== 7. МОДАЛЬНОЕ ОКНО ПОЛИТИКИ ===== */
const policyModal = document.getElementById('policyModal');

function openPolicy() {
    policyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closePolicy() {
    policyModal.classList.remove('open');
    document.body.style.overflow = '';
}

policyModal.addEventListener('click', e => {
    if (e.target === policyModal) closePolicy();
});

/* ===== 8. ЗАКРЫТИЕ ЛЮБОЙ МОДАЛКИ ПО ESC ===== */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('open')) closeModal();
        if (policyModal.classList.contains('open')) closePolicy();
    }
});

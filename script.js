// إعدادات السلايدر
let currentSlide = 1;
let autoSlideInterval;
const slides = document.querySelectorAll('.slider img');
const dots = document.querySelectorAll('.dot');

// تشغيل السلايدر عند تحميل الصفحة
window.onload = function() {
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoSlide();
    }
}

// تشغيل التبديل التلقائي كل 3 ثوان
function startAutoSlide() {
    autoSlideInterval = setInterval(() => changeSlide(1), 3000);
}

// إيقاف التبديل التلقائي
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// التبديل بين الصور (التالي/السابق)
function changeSlide(direction) {
    stopAutoSlide();
    showSlide(currentSlide += direction);
    startAutoSlide();
}

// الذهاب إلى صورة محددة
function goToSlide(n) {
    stopAutoSlide();
    showSlide(currentSlide = n);
    startAutoSlide();
}

// عرض الصورة الحالية
function showSlide(n) {
    if (slides.length === 0) return;
    
    // التأكد من أن الرقم ضمن النطاق الصحيح
    if (n > slides.length) currentSlide = 1;
    if (n < 1) currentSlide = slides.length;
    
    // إخفاء جميع الصور
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // إزالة التفعيل من جميع النقاط
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // إظهار الصورة الحالية وتفعيل النقطة
    slides[currentSlide - 1].classList.add('active');
    dots[currentSlide - 1].classList.add('active');
}

// إضافة خاصية التكبير والتصغير الديناميكي
function adjustFontSize() {
    const html = document.documentElement;
    let currentSize = parseFloat(getComputedStyle(html).fontSize);
    
    // تصغير الخط
    window.decreaseFont = function() {
        if (currentSize > 12) {
            currentSize -= 1;
            html.style.fontSize = currentSize + 'px';
        }
    };
    
    // تكبير الخط
    window.increaseFont = function() {
        if (currentSize < 24) {
            currentSize += 1;
            html.style.fontSize = currentSize + 'px';
        }
    };
    
    // إعادة الخط للحجم الطبيعي
    window.resetFont = function() {
        currentSize = 16;
        html.style.fontSize = '16px';
    };
}

// استدعاء دالة التحكم بالخط
adjustFontSize();

// إضافة أزرار التحكم بالخط في الصفحة (اختياري)
function addFontControls() {
    const controls = document.createElement('div');
    controls.className = 'font-controls';
    controls.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #5D3A1A;
        color: white;
        padding: 10px;
        border-radius: 30px;
        z-index: 1000;
        display: flex;
        gap: 10px;
    `;
    
    controls.innerHTML = `
        <button onclick="decreaseFont()" style="background: #FFD700; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem;">−</button>
        <button onclick="resetFont()" style="background: #FFD700; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem;">🔤</button>
        <button onclick="increaseFont()" style="background: #FFD700; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem;">+</button>
    `;
    
    document.body.appendChild(controls);
}

// إضافة أزرار التحكم بعد تحميل الصفحة
window.addEventListener('load', addFontControls);
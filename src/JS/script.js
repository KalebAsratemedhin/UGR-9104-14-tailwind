// hamburger menu  toggle
const dropdownButton = document.querySelector(".header__menu-hamburger");
const dropdownMenu = document.querySelector(".header__menu-content-list");
dropdownButton.addEventListener('click', () =>{
    dropdownMenu.classList.toggle('hidden');
});


// portfolio project image Slider

const track = document.querySelector('.portfolio-main__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector(".portfolio-main__slider-button--next");
const prevButton = document.querySelector(".portfolio-main__slider-button--prev");
const dotsNav = document.querySelector(".portfolio-main__slider-nav");
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slides)

const positionSlide = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(positionSlide);
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');

    } else if (targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}


prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex)

})

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide =  slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);

})
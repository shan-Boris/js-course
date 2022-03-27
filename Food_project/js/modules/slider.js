import {getData} from './classs';
import {addZero} from './timer';

function slider() {
    const prevSlide = document.querySelector('.offer__slider-prev'),
    nextSlide = document.querySelector('.offer__slider-next'),      
    currentSlideNumb = document.querySelector('#current'),
    sliderInner = document.querySelector('.offer__slider-inner'),
    wrapperSlides = document.querySelector('.offer__slider-wrapper'),
    slideNav = document.createElement('div');

    wrapperSlides.style.cssText = 'overflow: hidden; position: relative;';
    wrapperSlides.append(slideNav);
    slideNav.classList.add('carousel-indicators');

    function addSlideInHTML(slideData, i) {
        const slide = document.createElement('div');
        slide.classList.add('offer__slide');
        slide.innerHTML = `<img src=${slideData.img} alt=${slideData.altimg}>`;
        sliderInner.append(slide);
        slideNav.innerHTML += `<li id = slide${i} class = "dot"> </li>`;
    }
    let slides,
        widthInner,
        navDots;

    getData('http://localhost:3000/slider').then(slide => {
        slide.forEach((slide, i) => {
           addSlideInHTML(slide, i);
           sliderInner.style.width = `${(i + 1) * 100}%`;     
        });
        document.querySelector('#current').textContent = '01';
        const totalSlide = document.querySelector('#total');
        totalSlide.textContent = addZero(slide.length);
    }).then(() => {
        slides = document.querySelectorAll('.offer__slide');
        widthInner = window.getComputedStyle(sliderInner).width;
        navDots = document.querySelectorAll('.dot');
        navDots[pos].style.cssText = 'opacity: 1;';
    });


    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    let pos = 0;

    function changeSlide(changePos) {
        navDots[pos].style.cssText = '';
        changePos();
        currentSlideNumb.textContent = addZero(pos + 1);
        sliderInner.style.transform = `translate(${pos * -parseInt(widthInner)/slides.length}px, 0)`;
        navDots[pos].style.cssText = 'opacity: 1;';
    }

    nextSlide.addEventListener('click', () => {     
        changeSlide(() => pos !== slides.length - 1 ? pos += 1 : pos = 0);
    })
    
    prevSlide.addEventListener('click', () => {       
        changeSlide(() => pos !== 0 ? pos -= 1 : pos = slides.length - 1);
    })

    slideNav.addEventListener('click', (e) => {
        if (e.target.tagName == 'LI') {      
            changeSlide(() => pos = +e.target.id[5]);
        }
    });
}

export default slider;
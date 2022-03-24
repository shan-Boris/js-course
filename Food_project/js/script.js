'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const tabcontent = document.querySelectorAll('.tabcontent'),
        tab = document.querySelectorAll('.tabheader__item'),
        tabparent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabcontent.forEach((item, i) => {
            item.classList.remove('show');
            item.classList.add('hide');
            tab[i].classList.remove('tabheader__item_active');

        });

    }

    function showTabContent(i = 0) {
        tabcontent[i].classList.remove('hide');
        tabcontent[i].classList.add('show');
        tab[i].classList.add('tabheader__item_active');
    }

    tabparent.addEventListener('click', (e => {
        if (e?.target.classList.contains('tabheader__item')) {
            tab.forEach((item, i) => {
                if (item == e.target) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        };
    }));
    hideTabsContent();
    showTabContent();

    // timer

    const deadline = 'March 27, 2022';

    function getTimeOff(endtime) {
        const delta = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(delta / (1000 * 60 * 60 * 24)),
            hours = Math.floor((delta / (1000 * 60 * 60) % 24)),
            min = Math.floor((delta / (1000 * 60)) % 60),
            sec = Math.floor((delta / 1000 % 60));

        return {
            'total': delta,
            'days': days,
            'hours': hours,
            'minutes': min,
            'seconds': sec
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            clockId = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeOff(endtime);
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total <= 0) clearInterval(clockId);

        }


    };
    function addZero(number) {
        return number < 10 ? `0${number}` : number
    };

    setClock('.timer', deadline);


    // modal

    const btnModalOpen = document.querySelectorAll('[data-open]'),
        modalWindow = document.querySelector('.modal');

        function showModal(window) {
            window.classList.add('show');
            window.classList.remove('hide');
            document.querySelector('body').style.overflow = 'hidden';
            clearTimeout(modalTimerId);
        };
        function hideModal(window) {
            window.classList.add('hide');
            window.classList.remove('show');
            document.querySelector('body').style.overflow = '';
        };
    
    btnModalOpen.forEach(i => {
        i.addEventListener('click', () => showModal(modalWindow))}); 


    modalWindow.addEventListener('click', (e) => {
        if (e?.target.className == 'modal show' || e?.target.className == 'modal__close') hideModal(modalWindow);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modalWindow.classList.contains('show')){
            hideModal(modalWindow);
        }});
    
    const modalTimerId = setTimeout(() => showModal(modalWindow), 8000);

    function showModalInScrollEnd() {
        if(window.scrollY + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight - 1) {
                showModal(modalWindow);
                document.removeEventListener('scroll', showModalInScrollEnd);
    }};

    document.addEventListener('scroll', showModalInScrollEnd);

    // class

    class MenuCard {
        constructor(src, alt, title, descr, price) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.trans = 27;
            this.changeToUAH();
            this.parent = document.querySelector('.menu__field > .container');
        }

        
        changeToUAH() {
            this.price *= this.trans;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `<div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>`

            this.parent.append(element);
        }
    }

    document.querySelector('.menu__field > .container').innerHTML = '';

    const getData = async (u)=> {
        const res = await fetch(u);
            if(!res.ok) {
                throw new Error(`status ${res.status}`);
            };
             return await res.json();                  
    };
   

    getData('http://localhost:3000/menu').then(cards => {
        cards.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price).render();
        })
    });
    

    // POST

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success:'Спасибо',
        failure:'Чтот-то не так'
    };

    forms.forEach(item => postFromForm(item));

    const postData = async (url, obj) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type':'application/json'
            },
            body: obj                
        });

        return await res.json();
    };

    function postFromForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;`;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form),
                formJson = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://localhost:3000/requests', formJson)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }). catch(() => showThanksModal(message.failure))
            .finally(() => form.reset());            
        })
    }

    function showThanksModal(mes) {
        const preventModal = document.querySelector('.modal__dialog');
        preventModal.classList.remove('show');
        preventModal.classList.add('hide');

        showModal(modalWindow);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close">&times;</div>
        <div class="modal__title">${mes}</div></div>`;
        document.querySelector('.modal').append(thanksModal);
        
        setTimeout(() => {
            thanksModal.remove();
            preventModal.classList.add('show');
            preventModal.classList.remove('hide');
            hideModal(modalWindow);
        }, 4000)
    }

    // slider
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

    // calc

    function changeCalcItem(selector) {
        const elems = document.querySelectorAll(`${selector} div`);
        elems.forEach(v => v.addEventListener('click', (e) => {
            elems.forEach(v => {
                v.classList.remove('calculating__choose-item_active')});
            e.target.classList.add('calculating__choose-item_active');
            localStorage.setItem(selector, e.target.attributes[0].nodeValue);
            calculateKal();
        }))
        
    };


    function checkLocalStorage(selector) {
        const elems = document.querySelectorAll(`${selector} div`);
        if (localStorage.getItem(selector)) {
            elems.forEach(v => {
                v.classList.remove('calculating__choose-item_active')});
            document.querySelector('#' + localStorage.getItem(selector)).classList.add('calculating__choose-item_active');
        }
    };

    function calculateKal() {
        const data = [],
        height = parseInt(document.querySelector('#height').value),
        weight = parseInt(document.querySelector('#weight').value),
        age = parseInt(document.querySelector('#age').value),
        answer = document.querySelector('.calculating__result span'),
        kActiv = {
            'low': 1.2,
            'small': 1.375,
            'medium': 1.55,
            'high': 1.725
        };

        if (height && weight && age) {
            document.querySelectorAll('.calculating__choose-item_active').forEach((v, i) => {
                data.push(v.attributes[0].nodeValue)
            });

            if (data[0] == 'male') {
                answer.textContent = Math.round(kActiv[data[1]] * (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age));
            } else {
                answer.textContent = Math.round(kActiv[data[1]] * (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age))
            }
        }
    }

    checkLocalStorage('#gender');
    checkLocalStorage('.calculating__choose_big');
    calculateKal();
    changeCalcItem('#gender');
    changeCalcItem('.calculating__choose_big');

    document.querySelectorAll('.calculating__choose_medium [placeholder]')
    .forEach(v => v.addEventListener('input', () => {
        if(v.value.match(/\D/g)) v.style.border = '2px solid red';
        else v.style.border = 'none';
        calculateKal();
    }));



});


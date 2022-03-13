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
    sliderInner = document.querySelector('.offer__slider-inner');

    function addSlideInHTML(slideData, i) {
        const slide = document.createElement('div');
        slide.classList.add('offer__slide');
        slide.innerHTML = `<img src=${slideData.img} alt=${slideData.altimg}>`;
        sliderInner.append(slide);
    }
    let slides,
        widthInner;
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
        widthInner = window.getComputedStyle(sliderInner).width
    });

    let currentSlide = 1;
    document.querySelector('.offer__slider-wrapper').style.cssText = 'overflow: hidden;';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    let pos = 0;
    nextSlide.addEventListener('click', (e) => {
        if (pos !== -parseInt(widthInner) + parseInt(widthInner)/slides.length) {
            pos -= parseInt(widthInner)/slides.length;
            currentSlideNumb.textContent = addZero(+currentSlideNumb.textContent + 1);
        } else {
            pos = 0;
            currentSlideNumb.textContent = '01';
        }
        sliderInner.style.transform = `translate(${pos}px, 0)`;

    })
    
    prevSlide.addEventListener('click', (e) => {
        if (pos !== 0 ) {
            pos += parseInt(widthInner)/slides.length;
            currentSlideNumb.textContent = addZero(+currentSlideNumb.textContent - 1);
        } else {
            pos = -parseInt(widthInner) + parseInt(widthInner)/slides.length;
            currentSlideNumb.textContent = addZero(slides.length);
        }
        sliderInner.style.transform = `translate(${pos}px, 0)`;

    })


});


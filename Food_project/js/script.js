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

    const deadline = 'February 27, 2022';

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
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) clearInterval(clockId);

        }

        function getZero(number) {
            return number < 10 ? `0${number}` : number
        }
    }

    setClock('.timer', deadline);


    // modal

    const btnModalOpen = document.querySelectorAll('[data-open]'),
        btnModalClose = document.querySelector('.modal__close'),
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

    btnModalClose.addEventListener('click', () => hideModal(modalWindow) );

    modalWindow.addEventListener('click', (e) => {
        if (e?.target.className == 'modal show') hideModal(modalWindow);
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
    new MenuCard(
        'img/tabs/vegy.jpg', 
        'vegy', 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        9)
    .render();

    new MenuCard(
        'img/tabs/post.jpg', 
        'post', 
        'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 
        15)
    .render();

    new MenuCard(
        'img/tabs/elite.jpg', 
        'elite', 
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        20)
    .render();

    // POST

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success:'Спасибо',
        failure:'Чтот-то не так'
    };

    forms.forEach(item => postFromForm(item));

    function postFromForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);
            const name = form.querySelector('input[name="name"]').value,
                phone = form.querySelector('input[name="phone"]').value,
                request = new XMLHttpRequest();
            request.open('POST', 'js/server.php');
            request.setRequestHeader('Content-type', 'application/json; charset =utf-8');

            request.send(JSON.stringify({
                'имя': name,
                'тел': phone

            }));

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout((() => statusMessage.remove()), 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }

            })

            
            // console.log(phone, name);
        })
    }

});



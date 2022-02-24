'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const tabcontent = document.querySelectorAll('.tabcontent'),
        tab = document.querySelectorAll('.tabheader__item'),
        tabparent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabcontent.forEach((item, i)=> {
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
        if (e?.target.classList.contains('tabheader__item')){
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

    const deadline = 'February 25, 2022';

    function getTimeOff(endtime) {
        const delta = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(delta / (1000 * 60 * 60 * 24)),
            hours = Math.floor((delta / (1000 * 60 * 60) % 24) ),
            min = Math.floor((delta / (1000 * 60)) % 60),
            sec = Math.floor((delta / 1000 % 60) );

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

        function updateClock(){
        const t = getTimeOff(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        
        if(t.total <= 0) clearInterval(clockId);

        }

        function getZero(number) {
            return number < 10 ? `0${number}` : number
        }
    }

    setClock('.timer', deadline);
});

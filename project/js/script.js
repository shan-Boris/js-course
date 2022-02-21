
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    const filmList = document.querySelector('.promo__interactive-list'),
        btn = document.querySelector('form button'),
        inp = document.querySelector('.adding__input'),
        checkbox = document.querySelector('form [type="checkbox"]');



    function createSortedFilmList() {
        movieDB.movies.sort();
        filmList.innerHTML = '';
        movieDB.movies.forEach((film, index) => {
            filmList.innerHTML += `
        <li class="promo__interactive-item">${index + 1} 
        ${film.length > 21 ? film.slice(0, 21) + '...' : film}
            <div class="delete"></div>
        </li>`
        });

        filmList.querySelectorAll('.delete').forEach((b, i) => {
            b.addEventListener('click', () => {
                movieDB.movies.splice(i, 1);
                createSortedFilmList();  
        })
    });
    }; 


    document.querySelector('.promo__adv').innerHTML = '';
    document.querySelector('.promo__genre').textContent = 'Драма';
    document.querySelector('.promo__bg').style.cssText = 'background: url("img/bg.jpg") center/cover no-repeat';


    createSortedFilmList();

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        if(inp.value) {
        movieDB.movies.push(inp.value);
        inp.value = '';
        if (checkbox.checked) {
            console.log('Добавляем любимый фильм');
            checkbox.checked = false;
        }};
        createSortedFilmList();
    });


}); 
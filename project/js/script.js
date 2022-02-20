
'use strict';

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
    btn = document.querySelector('form button');

let inp = document.querySelector('.adding__input'),
    checkbox = document.querySelector('form [type="checkbox"]');



function showSortedFilmList() {
    movieDB.movies.sort();
    filmList.innerHTML = '';
    movieDB.movies.forEach((film, index) => {
        filmList.innerHTML += `
        <li class="promo__interactive-item">${index + 1} 
        ${film.length > 21 ? film.slice(0, 21) + '...' : film}
            <div class="delete"></div>
        </li>`
    })
};


document.querySelector('.promo__adv').innerHTML = '';
document.querySelector('.promo__genre').textContent = 'Драма';
document.querySelector('.promo__bg').style.cssText = 'background: url("img/bg.jpg") center/cover no-repeat';


showSortedFilmList();
addEventForRemove();

btn.addEventListener('click', function (e) {
    e.preventDefault();
    movieDB.movies.push(inp.value);
    inp.value = '';
    if (checkbox.checked) {
        console.log('Добавляем любимый фильм');
        checkbox.checked = false;
    };
    showSortedFilmList();
    addEventForRemove();
});


function addEventForRemove() {
filmList.querySelectorAll('.promo__interactive-item').forEach(film => {
    film.addEventListener('mouseenter', (e) => {
        const trash = document.querySelector('.promo__interactive-item:hover .delete');
        trash.addEventListener('click', () => {
    movieDB.movies.splice(parseInt(e.target.firstChild.data) - 1, 1);
    showSortedFilmList();
    addEventForRemove();
});
    }, {once: true})
});
};

console.log();
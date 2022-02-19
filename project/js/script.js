
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
const filmList = document.querySelector('.promo__interactive-list');

movieDB.movies.sort();
document.querySelector('.promo__adv').innerHTML = '';
document.querySelector('.promo__genre').textContent = 'Драма';
document.querySelector('.promo__bg').style.cssText = 'background: url("img/bg.jpg") center/cover no-repeat';
filmList.innerHTML = '';
movieDB.movies.forEach((film, index) => {
    filmList.innerHTML += `
    <li class="promo__interactive-item">${index + 1} ${film}
        <div class="delete"></div>
    </li>`
})


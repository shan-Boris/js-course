'use strict';

function promptNumb(str) {
    let numb = prompt(str, "");
    while (numb == null || numb == '' || isNaN(numb)) {numb = prompt(str, "");};
    return +numb;
}

function checkPromptStr(str) {
    let val = prompt(str, '');
    while (val == null || val.length < 3 || val.length > 50) {
        val = prompt(str, '');
    };
    return val;

}
const numberOfFilms = promptNumb("Сколько фильмов вы уже посмотрели?");


const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
};

let lastFilm, rating;

for (let i = 0; i < 2; i++ ) {
 lastFilm = checkPromptStr("Один из последних просмотренных фильмов?");
 rating = promptNumb ("На сколько оцените его?")
;
    personalMovieDB.movies[lastFilm] = rating;
};

if (personalMovieDB.count < 10) {alert("Просмотрено довольно мало фильмов")}
else if (personalMovieDB.count < 30 && personalMovieDB.count >= 10) {alert("Вы классический зритель")}
else if (personalMovieDB.count >= 30) {alert("Вы киноман")};

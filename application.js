'use strict';

function promptNumb(str) {
    let numb = prompt(str, "");
    while (numb == null || numb == '' || isNaN(numb)) {numb = prompt(str, "");};
    return +numb;
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
 lastFilm = prompt ("Один из последних просмотренных фильмов?","");
 rating = promptNumb ("На сколько оцените его?")
;
    personalMovieDB.movies[lastFilm] = rating;
};


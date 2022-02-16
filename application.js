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



const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: () => {
        this.count = promptNumb("Сколько фильмов вы уже посмотрели?")
    },
    rememberMyFilms: () => {
        let lastFilm, rating;

        for (let i = 0; i < 2; i++ ) {
        lastFilm = checkPromptStr("Один из последних просмотренных фильмов?");
        rating = promptNumb ("На сколько оцените его?")
        ;
            personalMovieDB.movies[lastFilm] = rating;
        };
    },
    detectPersonalLevel: () => {
        
        if (personalMovieDB.count < 10) {alert("Просмотрено довольно мало фильмов")}
        else if (personalMovieDB.count < 30 && personalMovieDB.count >= 10) {alert("Вы классический зритель")}
        else if (personalMovieDB.count >= 30) {alert("Вы киноман")};
    },
    showMyDB: function() {
        if (!personalMovieDB.privat) {console.log(personalMovieDB)}
        },
    writeYourGenres: function() {
        for (let i = 1; i < 4; i++) {
            personalMovieDB.genres.push(checkPromptStr(`Ваш любимый жанр под номером ${i}`));
        };
        this.genres.forEach((value, index) => alert(`Любимый жанр #${index + 1} - это ${value}`))
        },
    toggleVisibleMyDB: function() {
        if(this.privat) this.privat = false;
        else this.privat = true;
    }

};



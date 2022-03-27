function calc() {
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
        if(v.value.match(/\D/g)) v.style.border = '1px solid red';
        else v.style.border = 'none';
        calculateKal();
    }));
}

export default calc;
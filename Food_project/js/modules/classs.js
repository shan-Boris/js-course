const getData = async (u)=> {
    const res = await fetch(u);
        if(!res.ok) {
            throw new Error(`status ${res.status}`);
        };
         return await res.json();                  
};

function classs() {
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
   

    getData('http://localhost:3000/menu').then(cards => {
        cards.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price).render();
        })
    });
}

export default classs;
export {getData};
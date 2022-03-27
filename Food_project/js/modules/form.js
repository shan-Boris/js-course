function form () {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success:'Спасибо',
        failure:'Чтот-то не так'
    };

    forms.forEach(item => postFromForm(item));

    const postData = async (url, obj) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type':'application/json'
            },
            body: obj                
        });

        return await res.json();
    };

    function postFromForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;`;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form),
                formJson = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://localhost:3000/requests', formJson)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }). catch(() => showThanksModal(message.failure))
            .finally(() => form.reset());            
        })
    }

    function showThanksModal(mes) {
        const preventModal = document.querySelector('.modal__dialog');
        preventModal.classList.remove('show');
        preventModal.classList.add('hide');

        showModal(modalWindow);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close">&times;</div>
        <div class="modal__title">${mes}</div></div>`;
        document.querySelector('.modal').append(thanksModal);
        
        setTimeout(() => {
            thanksModal.remove();
            preventModal.classList.add('show');
            preventModal.classList.remove('hide');
            hideModal(modalWindow);
        }, 4000)
    }
}

export default form;
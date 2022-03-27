function modal() {
    const btnModalOpen = document.querySelectorAll('[data-open]'),
        modalWindow = document.querySelector('.modal');

        function showModal(window) {
            window.classList.add('show');
            window.classList.remove('hide');
            document.querySelector('body').style.overflow = 'hidden';
            clearTimeout(modalTimerId);
        };
        function hideModal(window) {
            window.classList.add('hide');
            window.classList.remove('show');
            document.querySelector('body').style.overflow = '';
        };
    
    btnModalOpen.forEach(i => {
        i.addEventListener('click', () => showModal(modalWindow))}); 


    modalWindow.addEventListener('click', (e) => {
        if (e?.target.className == 'modal show' || e?.target.className == 'modal__close') hideModal(modalWindow);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modalWindow.classList.contains('show')){
            hideModal(modalWindow);
        }});
    
    const modalTimerId = setTimeout(() => showModal(modalWindow), 8000);

    function showModalInScrollEnd() {
        if(window.scrollY + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight - 1) {
                showModal(modalWindow);
                document.removeEventListener('scroll', showModalInScrollEnd);
    }};

    document.addEventListener('scroll', showModalInScrollEnd);
}

export default modal;
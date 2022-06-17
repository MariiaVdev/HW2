const btn = document.getElementById('btn')
const menu = document.getElementById('header__nav-list-items-block')
const img = document.getElementById('header__btn-img')

function open() {

    menu.classList.toggle('header__nav-list--hidden')
    img.classList.toggle('header__menu-image--cancel')
}

btn.addEventListener('click', open)

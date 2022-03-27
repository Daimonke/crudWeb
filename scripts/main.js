// nav functionality
const navBox = document.querySelector('.navBox')
const hamburgerClose = document.querySelector('.hamburgerClose')
const hamburgerIcon = document.querySelector('.hamburgerIcon')
hamburgerIcon.addEventListener('click', () => {
    navBox.classList.remove('noDisplay')
    setTimeout(()=> {
    navBox.classList.remove('navBoxHidden')
    }, 1)
})

hamburgerClose.addEventListener('click', () => {
    navBox.classList.add('navBoxHidden')
    setTimeout(()=> {
        navBox.classList.add('noDisplay')
        }, 500)
})
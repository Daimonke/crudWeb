// nav functionality
const navBox = document.querySelector('.navBox')
const hamburgerClose = document.querySelector('.hamburgerClose')
const hamburgerIcon = document.querySelector('.hamburgerIcon')
hamburgerIcon.addEventListener('click', () => {
    navBox.classList.remove('noDisplay')
    setTimeout(() => {
        navBox.classList.remove('navBoxHidden')
    }, 1)
})

hamburgerClose.addEventListener('click', () => {
    navBox.classList.add('navBoxHidden')
    setTimeout(() => {
        navBox.classList.add('noDisplay')
    }, 500)
})

// Post method

const postForm = document.querySelector('#postForm')
postForm.addEventListener('submit', e => {
    e.preventDefault()
    const data = {
        "user": "demouser",
        "brand": e.target.elements.brand.value,
        "model": e.target.elements.model.value,
        "fuel": e.target.elements.fuel.value,
        "image": e.target.elements.image.value,
        "price": parseInt(e.target.elements.price.value),
    }

    fetch('http://localhost:3000/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(alert(`Car posted!`))
})

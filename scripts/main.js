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

// Display all cars in main section. Get method
const main = document.querySelector('main')

function createCar(brand, model, fuel, price, image) {
    const carDiv = document.createElement('div')
    carDiv.innerHTML = `
    <img src="${image}">
    <div>
        <span><strong>Brand:</strong></span>
        <span><strong>Model:</strong></span>
        <span><strong>Fuel:</strong></span>
        <span><strong>Price:</strong></span>
    </div>
    <div>
        <span>${brand}</span>
        <span>${model}</span>
        <span>${fuel}</span>
        <span>${price}</span>
    </div>
       
    `
    main.append(carDiv)
}

fetch('http://localhost:3000/cars')
    .then(data => data.json())
    .then(data => {
        data.forEach(car => {
            createCar(car.brand, car.model, car.fuel, car.price, car.image)
        })
    })
    .catch(error => console.log(error))

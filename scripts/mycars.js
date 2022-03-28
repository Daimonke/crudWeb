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

// display demouser cars
const main = document.querySelector('#myCarsMain')

function createCar(brand, model, fuel, image, price, id) {
    const carDiv = document.createElement('div')
    carDiv.innerHTML = `
    <img src="${image}">
    <div class="myCarsMenu">
        <div>
            <span>${brand}</span>
            <span>${model}</span>
        </div>
        <div class="myCarsSettings">
        <button class="myCarsEdit">Edit</button>
        <button class="myCarsDelete">Delete</button>
        </div>
    </div>
    `
    main.append(carDiv)

    carDiv.querySelector('.myCarsEdit').addEventListener('click', () => {
        editButton(brand, model, fuel, image, price, id)
    })
    carDiv.querySelector('.myCarsDelete').addEventListener('click', () => {
        deleteCar(id)
    })
}

fetch('http://localhost:3000/cars')
    .then(data => data.json())
    .then(data => {
        const demoUserCars = data.filter(car => car.user === 'demouser')
        demoUserCars.forEach(car => {
            createCar(car.brand, car.model, car.fuel, car.image, car.price, car.id)
        })
    })
    .catch(error => console.log(error))

// Car edit form


function editButton(brand, model, fuel, image, price, id) {
    const formDiv = document.createElement('form')
    formDiv.id = 'editForm'
    formDiv.innerHTML = `
    <label for="brand">Car brand:</label>
    <input type="text" name="brand" id="brand" value="${brand}" required>
    <label for="model">Car model:</label>
    <input type="text" name="model" id="model" value="${model}" required>
    <label for="fuel">Type of fuel:</label>
    <select name="fuel" id="fuel" required>
    <option value="Diesel">Diesel</option>
    <option value="Petrol">Petrol</option>
    <option value="Gas/Petrol">Gas/Petrol</option>
    <option value="Electric">Electric</option>
    <option value="Petrol/electric">Petrol/electric</option>
    </select>
    <label for="image"">Car image url:</label>
    <input type="text" name="image" id="image" value="${image}" required>
    <label for="price">Price:</label>
    <span class="input-symbol-euro">
        <input type="number" name="price" id="price" value="${parseInt(price)}" required>
    </span>
    <button type="button" class="cancel">Cancel</button>
    <button type="submit">Post</button>
    `
    formDiv.querySelector('.cancel').addEventListener('click', () => {
        formDiv.remove()
    })
    formDiv.addEventListener('submit', e => {
        const newBrand = e.target.elements.brand.value
        const newModel = e.target.elements.model.value
        const newFuel = e.target.elements.fuel.value
        const newImage = e.target.elements.image.value
        const newPrice = e.target.elements.price.value
        editCar(newBrand, newModel, newFuel, newImage, newPrice, id)
    })
    main.append(formDiv)
}

// Put method
function editCar(newBrand, newModel, newFuel, newImage, newPrice, id) {
    const openEditForm = document.querySelector('#editForm')
    const data = {
        "user": "demouser",
        "brand": newBrand,
        "model": newModel,
        "fuel": newFuel,
        "image": newImage,
        "price": newPrice,
        "id": id
    }
    fetch(`http://localhost:3000/cars/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(alert(`Car edited!`))
        .then(openEditForm.remove())
}

// Delete method

function deleteCar(id) {
    fetch(`http://localhost:3000/cars/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.ok)
        .catch(error => console.log(error))
}
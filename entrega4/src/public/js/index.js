const ioServer = io()

let submitProduct = document.querySelector('#submitProduct');
let title = document.querySelector('#title');
let description = document.querySelector('#description');
let code = document.querySelector('#code');
let stock = document.querySelector('#stock');
let price = document.querySelector('#price');
let thumbnail = document.querySelector('#thumbnail');
let category = document.querySelector('#category');
let statusInput = document.querySelector('#statusInput');

let productID = document.querySelector('#titleDelete');
let deletBtn = document.querySelector('#deleteProduct');

let container = document.querySelector('#container');

submitProduct.addEventListener('click', (e) => {
    e.preventDefault()

    let product = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        statusInput: statusInput.value,
        stock: stock.value,
        thumbnail: thumbnail.value,
        category: category.value
    }
    ioServer.emit('product', product)
});

deletBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let pid = productID.value
    ioServer.emit('deleteProduct', pid)
});

ioServer.on('mensajeServer', data => {
    container.innerHTML = ''

    data.forEach(element => {
        container.innerHTML += `
        <div>
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <p>${element.category}</p>
            <p>${element.stock}</p>
            <p>${element.price}</p>
            <p>${element.id}</p>
        </div>`
    });
});

ioServer.on('productoAgregado', data => {
    container.innerHTML = ''

    data.forEach(element => {
        container.innerHTML += `
        <div>
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <p>${element.category}</p>
            <p>${element.stock}</p>
            <p>${element.price}</p>
        </div>`
    });
});

ioServer.on('productoEliminado', data => {
    container.innerHTML = ''

    data.forEach(element => {
        container.innerHTML += `
        <div>
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <p>${element.category}</p>
            <p>${element.stock}</p>
            <p>${element.price}</p>
        </div>`
    });
});
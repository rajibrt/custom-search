const loadAllProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

const setAllMenu = async () => {
    // console.log(loadAllProducts());
    // loadAllProducts()
    //     .then(data => console.log(data));
    const data = await loadAllProducts();
    const menu = document.getElementById('all-menu');

    const uniqueArray = [];

    for (const product of data) {
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            const li = document.createElement('li');
            li.innerHTML = `
                <a>${product.category}</a>
               `
            menu.appendChild(li);
        }
    }
}

setAllMenu()
// loadAllProducts()

const searchField = document.getElementById('search-field');

searchField.addEventListener('keypress', async (event) => {
    // console.log(event.key);
    if (event.key === 'Enter') {
        // console.log(searchField.value);
        const searchValue = searchField.value;
        // console.log(searchValue);
        const allProducts = await loadAllProducts();
        // console.log(allProducts);
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue))
        // console.log(foundProducts);

        const productsContainer = document.getElementById('products-container');
        const notFound = document.getElementById('not-found');
        notFound.textContent = "";

        productsContainer.textContent = '';

        if (foundProducts.length === 0) {
            notFound.innerHTML = `<h2 class="text-center text-pink-600 text-3xl">Product Not Found</h2>`
        }

        foundProducts.forEach(product => {
            console.log(product);

            const { category, image, price, title } = product;

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card w-auto bg-base-100 shadow-xl">
            <figure><img class="h-60 w-auto p-4" src="${image}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title capitalize">${category}</h2>
                    <p>${title.length > 20 ? title.slice(0, 30) + "..." : title}</p>
                    <h2 class="text-cyan-600">$ ${price}</h2></br>
                    <div class="card-actions justify-end">                
                    <p class="btn bg-teal-400 border-none">View Details</p>
                    </div>               
          </div>`;
            productsContainer.appendChild(div);

        })
    }
})


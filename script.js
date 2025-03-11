
document.addEventListener("DOMContentLoaded", function () {
    const banners = document.querySelectorAll(".banner-item");

    banners.forEach(banner => {
        banner.addEventListener("click", function (event) {
            if (!event.target.closest(".buy-btn")) { // Проверяем, что клик не по кнопке
                banners.forEach(item => item.classList.remove("active"));
                this.classList.add("active");
            }
        });
    });
});


function toggleCategory(button) {
    let categoryItem = button.closest('.category-item');
    let products = categoryItem.querySelector('.category-products');
    document.querySelectorAll('.category-products.active').forEach(activeProducts => {
        if (activeProducts !== products) {
            activeProducts.classList.remove("active");
            setTimeout(() => {
                activeProducts.style.display = "none";
            }, 300);
        }
    });
    document.querySelectorAll('.category-toggle.active').forEach(activeButton => {
        if (activeButton !== button) {
            activeButton.classList.remove("active");
        }
    });
    button.classList.toggle("active");

    if (button.classList.contains("active")) {
        products.classList.add("active");
        products.style.display = "flex";
    } else {
        products.classList.remove("active");
        setTimeout(() => {
            products.style.display = "none";
        }, 300);
    }
}

// добавление и удаление товара из корзины 

document.addEventListener("DOMContentLoaded", function () {
    const cartModal = document.getElementById("cartModal");
    const cartItemsList = document.getElementById("cartItems");
    const closeModal = document.querySelector(".close");
    const buyButtons = document.querySelectorAll(".buy-btn");

    function openCart() {
        cartModal.classList.add("active");
    }

    function closeCart() {
        cartModal.classList.remove("active");
    }

    closeModal.addEventListener("click", closeCart);

    function addToCart(event) {
        event.stopPropagation();

        const button = event.currentTarget;
        const itemContainer = button.closest(".banner-item");
        
        if (!itemContainer) {
            return;
        }

        const itemName = itemContainer.querySelector("h2")?.innerText;
        const itemPrice = "150 000 Р"; 

        if (!itemName) {
            return;
        }

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${itemName}</span>
            <span>${itemPrice}</span>
            <img src="img/trash.svg" alt="Удалить" class="delete-icon">
        `;

        cartItemsList.appendChild(listItem);

        listItem.querySelector(".delete-icon").addEventListener("click", function () {
            listItem.remove();
        });

        openCart();
    }

    buyButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });
});


// модальное окно с картами 
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("mapModal");
    const closeModal = document.querySelector(".close-btn");
    const contactsLink = document.querySelector(".open-map");
    let mapInstance = null;

    if (!contactsLink) {
        return;
    }

    contactsLink.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "flex"; 
        setTimeout(loadMap, 100); 
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none"; 
    });

    function loadMap() {
        if (mapInstance) {
            mapInstance.destroy();
        }

        ymaps.ready(function () {
            mapInstance = new ymaps.Map("map", {
                center: [55.751244, 37.618423],
                zoom: 10
            });

            var placemark = new ymaps.Placemark([55.751244, 37.618423], {
                balloonContent: "Мы здесь!"
            });

            mapInstance.geoObjects.add(placemark);
        });
    }
});
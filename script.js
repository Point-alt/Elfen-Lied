document.addEventListener("DOMContentLoaded", function () {
    const banners = document.querySelectorAll(".banner-item");
    const cartModal = document.getElementById("cartModal");
    const cartItemsList = document.getElementById("cartItems");
    const closeModal = document.querySelector(".close");
    const buyButtons = document.querySelectorAll(".buy-btn");
    const modal = document.getElementById("mapModal");
    const closeMapModal = document.querySelector(".close-btn");
    const contactsLink = document.querySelector(".open-map");

    let mapInstance = null;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Обновляем корзину при загрузке страницы
    renderCart();

    // Активация баннеров
    banners.forEach(banner => {
        banner.addEventListener("click", function (event) {
            if (!event.target.closest(".buy-btn")) {
                banners.forEach(item => item.classList.remove("active"));
                this.classList.add("active");
            }
        });
    });

    // Переключение категорий
    window.toggleCategory = function(button) {
        const categoryItem = button.closest('.category-item');
        const products = categoryItem.querySelector('.category-products');
        
        document.querySelectorAll('.category-products.active').forEach(activeProducts => {
            if (activeProducts !== products) {
                activeProducts.classList.remove("active");
            }
        });
        
        document.querySelectorAll('.category-toggle.active').forEach(activeButton => {
            if (activeButton !== button) {
                activeButton.classList.remove("active");
            }
        });

        button.classList.toggle("active");
        products.classList.toggle("active");
    };

    // Открытие корзины
    function openCart() {
        cartModal.classList.add("active");
    }

    // Закрытие корзины
    function closeCart() {
        cartModal.classList.remove("active");
    }

    // Добавление товара в корзину
    function addToCart(event) {
        event.stopPropagation();

        const button = event.currentTarget;
        const productContainer = button.closest(".banner-item") || button.closest(".product-item");
        const itemName = productContainer.querySelector("h2")?.innerText || productContainer.querySelector("h3")?.innerText;
        const itemPrice = productContainer.querySelector(".product-price")?.innerText || "150 000 Р";

        const newItem = { name: itemName, price: itemPrice };
        cart.push(newItem);

        updateLocalStorage();
        renderCart();
        openCart();
    }

    // Отображение товаров в корзине
    function renderCart() {
        cartItemsList.innerHTML = '';

        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
                <img src="img/trash.svg" alt="Удалить" class="delete-icon">
            `;
            cartItemsList.appendChild(listItem);
        });
    }

    // Удаление товара 
    cartItemsList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-icon")) {
            const itemName = event.target.closest("li").querySelector("span").innerText;
            cart = cart.filter(item => item.name !== itemName);
            updateLocalStorage();
            renderCart();
        }
    });

    // Открытие модального окна с картой
    function openMapModal() {
        modal.style.display = "flex";
        setTimeout(loadMap, 100);
    }

    // Загрузка карты
    function loadMap() {
        if (!mapInstance) {
            ymaps.ready(function () {
                mapInstance = new ymaps.Map("map", {
                    center: [55.751244, 37.618423],
                    zoom: 10
                });

                const placemark = new ymaps.Placemark([55.751244, 37.618423], {
                    balloonContent: "Мы здесь!"
                });

                mapInstance.geoObjects.add(placemark);
            });
        }
    }

    // Закрытие модального окна с картой
    function closeMapModalFunc() {
        modal.style.display = "none";
    }

    // Обновление localStorage
    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Закрытие модальных окон при клике на фон
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeMapModalFunc();
        }

        if (event.target === cartModal) {
            closeCart();
        }
    });

    buyButtons.forEach(button => button.addEventListener("click", addToCart));

    // Добавляем обработчик для кнопок из .category-products
    document.querySelectorAll('.category-products .buy-btn').forEach(button => {
        button.addEventListener("click", addToCart);
    });

    closeModal.addEventListener("click", closeCart);
    contactsLink?.addEventListener("click", openMapModal);
    closeMapModal.addEventListener("click", closeMapModalFunc);
});

document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    
    function moveSlide(direction) {
        currentSlide += direction;

        if (currentSlide < 0) {
        currentSlide = totalSlides - 1; 
        } else if (currentSlide >= totalSlides) {
        currentSlide = 0; 
        }

        updateSlider();
    }

    function updateSlider() {
        const sliderWrapper = document.querySelector(".slider-wrapper");
        const slideWidth = slides[0].clientWidth; 
      sliderWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    // Инициализация слайдера
    updateSlider();

    window.moveSlide = moveSlide; 
});

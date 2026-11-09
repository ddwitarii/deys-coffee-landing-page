
document.addEventListener("DOMContentLoaded", () => {
    /* ========================================
       BUSINESS CONFIGURATION
    ======================================== */

    const WHATSAPP_NUMBER = "6281234567890";
    const INSTAGRAM_URL = "https://www.instagram.com/";
    const BUSINESS_ADDRESS = "Your coffee shop address, Indonesia";

    const CART_STORAGE_KEY = "deysCoffeeCart";

    /* ========================================
       PRODUCT DATA
    ======================================== */

    const products = [
        {
            id: "caramel-latte",
            name: "Caramel Latte",
            category: "Coffee",
            price: 25000,
            description: "Smooth espresso with creamy milk and caramel. A sweet and comforting drink for your coffee break.",
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"
        },
        {
            id: "cappuccino",
            name: "Cappuccino",
            category: "Coffee",
            price: 22000,
            description: "Rich espresso topped with silky milk foam. A timeless coffee classic.",
            image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80"
        },
        {
            id: "americano",
            name: "Americano",
            category: "Coffee",
            price: 18000,
            description: "Bold espresso balanced with fresh water. Simple, smooth, and refreshing.",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80"
        },
        {
            id: "matcha-latte",
            name: "Matcha Latte",
            category: "Non-Coffee",
            price: 24000,
            description: "Earthy Japanese matcha combined with creamy milk for a smooth and relaxing drink.",
            image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=700&q=80"
        },
        {
            id: "chocolate",
            name: "Chocolate",
            category: "Non-Coffee",
            price: 23000,
            description: "Rich chocolate flavor blended into a delicious drink for your sweet moments.",
            image: "https://images.unsplash.com/photo-1653085315536-1379bc836161?auto=format&fit=crop&w=700&q=80"
        },
        {
            id: "strawberry-milk",
            name: "Strawberry Milk",
            category: "Non-Coffee",
            price: 22000,
            description: "Sweet strawberry flavor mixed with fresh milk. A lovely choice for any time of day.",
            image: "https://images.unsplash.com/photo-1734747638453-dd5c0766add2?auto=format&fit=crop&w=700&q=80"
        }
    ];

    /* ========================================
       HELPER FUNCTIONS
    ======================================== */

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(price);
    };

    const openWhatsApp = (message) => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank", "noopener,noreferrer");
    };

    let toastTimer;

    function showToast(message) {
        const toast = document.getElementById("toast");

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }

    function setBodyScrollLock() {
        const cartIsOpen = cartDrawer?.classList.contains("open");
        const modalIsOpen = productModal?.classList.contains("open");

        document.body.classList.toggle(
            "no-scroll",
            Boolean(cartIsOpen || modalIsOpen)
        );
    }

    /* ========================================
       BUSINESS INFORMATION
    ======================================== */

    const mapsLink = document.getElementById("maps-link");
    const googleMap = document.getElementById("google-map");
    const addressElement = document.getElementById("business-address");

    const mapQuery = encodeURIComponent(BUSINESS_ADDRESS);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    if (mapsLink) {
        mapsLink.href = mapUrl;
        mapsLink.target = "_blank";
        mapsLink.rel = "noopener noreferrer";
    }

    if (googleMap) {
        googleMap.src = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
        googleMap.loading = "lazy";
        googleMap.title = "Dey's Coffee location on Google Maps";
    }

    if (addressElement) {
        addressElement.textContent = BUSINESS_ADDRESS;
    }

    [
        "contact-whatsapp-link",
        "whatsapp-float",
        "footer-whatsapp"
    ].forEach((id) => {
        const element = document.getElementById(id);

        if (element) {
            element.href = `https://wa.me/${WHATSAPP_NUMBER}`;
            element.target = "_blank";
            element.rel = "noopener noreferrer";
        }
    });

    [
        "instagram-link",
        "footer-instagram"
    ].forEach((id) => {
        const element = document.getElementById(id);

        if (element) {
            element.href = INSTAGRAM_URL;
            element.target = "_blank";
            element.rel = "noopener noreferrer";
        }
    });

    /* ========================================
       MOBILE NAVIGATION
    ======================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMobileMenu() {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.remove("active");
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    /* ========================================
       STICKY HEADER AND BACK TO TOP
    ======================================== */

    const header = document.getElementById("site-header");
    const backToTop = document.getElementById("back-to-top");

    function handleScroll() {
        const scrollPosition = window.scrollY;

        if (header) {
            header.classList.toggle("scrolled", scrollPosition > 30);
        }

        if (backToTop) {
            backToTop.classList.toggle("show", scrollPosition > 400);
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ========================================
       ACTIVE NAVIGATION ON SCROLL
    ======================================== */

    const pageSections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const activeId = entry.target.id;

                navLinks.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${activeId}`;

                    link.classList.toggle("active", isActive);
                });
            });
        }, {
            rootMargin: "-30% 0px -60% 0px"
        });

        pageSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    /* ========================================
       MENU CATEGORY FILTER AND SEARCH
    ======================================== */

    const filterButtons = document.querySelectorAll(".filter-button");
    const searchInput = document.getElementById("menu-search");
    const productCards = document.querySelectorAll(".product-card");
    const emptyMenu = document.getElementById("empty-menu");

    let activeCategory = "all";

    function filterProducts() {
        const searchTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;

        productCards.forEach((card) => {
            const category = card.dataset.category;
            const name = (card.dataset.name || "").toLowerCase();

            const matchesCategory =
                activeCategory === "all" || category === activeCategory;

            const matchesSearch = name.includes(searchTerm);

            const shouldShow = matchesCategory && matchesSearch;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        if (emptyMenu) {
            emptyMenu.hidden = visibleCount !== 0;
        }
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.category;

            filterButtons.forEach((item) => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            filterProducts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    /* ========================================
       SHOPPING CART AND LOCAL STORAGE
    ======================================== */

    const cart = [];

    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-overlay");

    const openCartButton = document.getElementById("open-cart");
    const closeCartButton = document.getElementById("close-cart");

    // Read saved cart from browser storage.
    function loadCart() {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);

            if (!savedCart) return;

            const parsedCart = JSON.parse(savedCart);

            if (!Array.isArray(parsedCart)) return;

            parsedCart.forEach((savedItem) => {
                const product = products.find(
                    (item) => item.id === savedItem.id
                );

                const quantity = Number(savedItem.quantity);

                if (
                    product &&
                    Number.isInteger(quantity) &&
                    quantity > 0 &&
                    quantity <= 99
                ) {
                    cart.push({
                        ...product,
                        quantity
                    });
                }
            });
        } catch (error) {
            console.error("Unable to load saved cart:", error);
        }
    }

    // Save current cart to browser storage.
    function saveCart() {
        try {
            const cartToSave = cart.map((item) => ({
                id: item.id,
                quantity: item.quantity
            }));

            localStorage.setItem(
                CART_STORAGE_KEY,
                JSON.stringify(cartToSave)
            );
        } catch (error) {
            console.error("Unable to save cart:", error);
            showToast("Unable to save your cart. Please check browser storage.");
        }
    }

    function updateCart() {
        const totalQuantity = cart.reduce((sum, item) => {
            return sum + item.quantity;
        }, 0);

        const totalPrice = cart.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        // Update cart count in the header.
        if (cartCount) {
            cartCount.textContent = totalQuantity;
        }

        // Optional separate count inside the cart drawer.
        const drawerCount = document.getElementById("cart-drawer-count");

        if (drawerCount) {
            drawerCount.textContent = totalQuantity;
        }

        // Update subtotal.
        if (cartTotal) {
            cartTotal.textContent = formatPrice(totalPrice);
        }

        // Enable checkout only when cart has products.
        if (checkoutButton) {
            checkoutButton.disabled = cart.length === 0;
        }

        if (!cartItems) {
            saveCart();
            return;
        }

        cartItems.replaceChildren();

        if (cart.length === 0) {
            const emptyMessage = document.createElement("p");

            emptyMessage.className = "cart-empty";
            emptyMessage.textContent =
                "Your cart is still empty. Let's find your favorite drink!";

            cartItems.appendChild(emptyMessage);
            saveCart();
            return;
        }

        cart.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            const details = document.createElement("div");

            const name = document.createElement("h3");
            name.textContent = item.name;

            const price = document.createElement("p");
            price.className = "cart-item-price";
            price.textContent = formatPrice(item.price * item.quantity);

            const controls = document.createElement("div");
            controls.className = "quantity-controls";

            const decreaseButton = document.createElement("button");
            decreaseButton.type = "button";
            decreaseButton.textContent = "−";
            decreaseButton.setAttribute(
                "aria-label",
                `Kurangi ${item.name}`
            );
            decreaseButton.dataset.action = "decrease";
            decreaseButton.dataset.productId = item.id;

            const quantity = document.createElement("span");
            quantity.textContent = item.quantity;

            const increaseButton = document.createElement("button");
            increaseButton.type = "button";
            increaseButton.textContent = "+";
            increaseButton.setAttribute(
                "aria-label",
                `Tambah ${item.name}`
            );
            increaseButton.dataset.action = "increase";
            increaseButton.dataset.productId = item.id;

            controls.append(
                decreaseButton,
                quantity,
                increaseButton
            );

            details.append(name, price, controls);

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "remove-item";
            removeButton.textContent = "Remove";
            removeButton.setAttribute(
                "aria-label",
                `Hapus ${item.name} dari keranjang`
            );
            removeButton.dataset.action = "remove";
            removeButton.dataset.productId = item.id;

            cartItem.append(details, removeButton);
            cartItems.appendChild(cartItem);
        });

        saveCart();
    }

    function addToCart(productId) {
        const product = products.find((item) => item.id === productId);

        if (!product) return;

        const existingItem = cart.find((item) => item.id === productId);

        if (existingItem) {
            if (existingItem.quantity >= 99) {
                showToast("Maximum quantity is 99 items.");
                return;
            }

            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();
        showToast(`${product.name} added to your cart!`);
    }

    function changeCartQuantity(productId, action) {
        const itemIndex = cart.findIndex((item) => item.id === productId);

        if (itemIndex === -1) return;

        const item = cart[itemIndex];

        if (action === "increase") {
            if (item.quantity >= 99) {
                showToast("Maximum quantity is 99 items.");
                return;
            }

            item.quantity++;
            showToast(`${item.name} quantity updated.`);
        }

        if (action === "decrease") {
            item.quantity--;

            if (item.quantity <= 0) {
                cart.splice(itemIndex, 1);
                showToast(`${item.name} removed from your cart.`);
            } else {
                showToast(`${item.name} quantity updated.`);
            }
        }

        if (action === "remove") {
            cart.splice(itemIndex, 1);
            showToast(`${item.name} removed from your cart.`);
        }

        updateCart();
    }

    function openCart() {
        if (!cartDrawer || !cartOverlay) return;

        closeMobileMenu();

        cartDrawer.classList.add("open");
        cartOverlay.classList.add("visible");

        cartDrawer.setAttribute("aria-hidden", "false");
        cartOverlay.setAttribute("aria-hidden", "false");

        setBodyScrollLock();

        if (closeCartButton) {
            closeCartButton.focus();
        }
    }

    function closeCart() {
        if (!cartDrawer || !cartOverlay) return;

        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("visible");

        cartDrawer.setAttribute("aria-hidden", "true");
        cartOverlay.setAttribute("aria-hidden", "true");

        setBodyScrollLock();

        if (openCartButton) {
            openCartButton.focus();
        }
    }

    if (openCartButton) {
        openCartButton.addEventListener("click", openCart);
    }

    if (closeCartButton) {
        closeCartButton.addEventListener("click", closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCart);
    }

    if (cartItems) {
        cartItems.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-action]");

            if (!button) return;

            changeCartQuantity(
                button.dataset.productId,
                button.dataset.action
            );
        });
    }

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            addToCart(button.dataset.productId);
        });
    });

    /* ========================================
       PRODUCT DETAIL MODAL
    ======================================== */

    const productModal = document.getElementById("product-modal");
    const closeProductModal = document.getElementById("close-product-modal");

    const modalImage = document.getElementById("modal-product-image");
    const modalCategory = document.getElementById("modal-product-category");
    const modalName = document.getElementById("modal-product-name");
    const modalDescription = document.getElementById("modal-product-description");
    const modalPrice = document.getElementById("modal-product-price");
    const modalAddButton = document.getElementById("modal-add-to-cart");

    let selectedProductId = null;

    function openProductDetail(productId) {
        const product = products.find((item) => item.id === productId);

        if (!product || !productModal) return;

        selectedProductId = product.id;

        if (modalImage) {
            modalImage.src = product.image;
            modalImage.alt = product.name;
        }

        if (modalCategory) {
            modalCategory.textContent = product.category.toUpperCase();
        }

        if (modalName) {
            modalName.textContent = product.name;
        }

        if (modalDescription) {
            modalDescription.textContent = product.description;
        }

        if (modalPrice) {
            modalPrice.textContent = formatPrice(product.price);
        }

        productModal.classList.add("open");
        productModal.setAttribute("aria-hidden", "false");

        setBodyScrollLock();

        if (closeProductModal) {
            closeProductModal.focus();
        }
    }

    function closeProductDetail() {
        if (!productModal) return;

        productModal.classList.remove("open");
        productModal.setAttribute("aria-hidden", "true");

        setBodyScrollLock();

        selectedProductId = null;
    }

    document.querySelectorAll(".product-detail-trigger").forEach((button) => {
        button.addEventListener("click", () => {
            openProductDetail(button.dataset.productId);
        });
    });

    if (closeProductModal) {
        closeProductModal.addEventListener("click", closeProductDetail);
    }

    if (productModal) {
        productModal.addEventListener("click", (event) => {
            if (event.target === productModal) {
                closeProductDetail();
            }
        });
    }

    if (modalAddButton) {
        modalAddButton.addEventListener("click", () => {
            if (!selectedProductId) return;

            addToCart(selectedProductId);
            closeProductDetail();
        });
    }

    /* ========================================
       WHATSAPP CHECKOUT
    ======================================== */

    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (cart.length === 0) {
                showToast("Your cart is empty.");
                return;
            }

            const totalQuantity = cart.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0);

            const totalPrice = cart.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);

            // Ask the customer to confirm before opening WhatsApp.
            const confirmed = window.confirm(
                `Confirm your order?\n\n` +
                `Total items: ${totalQuantity}\n` +
                `Subtotal: ${formatPrice(totalPrice)}\n\n` +
                `You will be redirected to WhatsApp to send your order.`
            );

            if (!confirmed) return;

            const orderLines = cart.map((item, index) => {
                const itemSubtotal = item.price * item.quantity;

                return `${index + 1}. ${item.name} x${item.quantity}\n` +
                    `   Price: ${formatPrice(item.price)} each\n` +
                    `   Subtotal: ${formatPrice(itemSubtotal)}`;
            });

            const message = [
                "Hello Dey's Coffee! ☕ I'd like to place an order.",
                "",
                "*My Order:*",
                ...orderLines,
                "",
                `*Total Items: ${totalQuantity}*`,
                `*Subtotal: ${formatPrice(totalPrice)}*`,
                "",
                "Please confirm the availability and share the payment details.",
                "",
                "Thank you! 😊"
            ].join("\n");

            openWhatsApp(message);
        });
    }

    /* ========================================
       CONTACT FORM TO WHATSAPP
    ======================================== */

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const formData = new FormData(contactForm);

            const name = String(formData.get("name") || "").trim();
            const email = String(formData.get("email") || "").trim();
            const messageText = String(formData.get("message") || "").trim();

            const message = [
                "Hello Dey's Coffee!",
                "",
                "*New message from website:*",
                `Name: ${name}`,
                `Email: ${email}`,
                `Message: ${messageText}`
            ].join("\n");

            openWhatsApp(message);
            contactForm.reset();
        });
    }

    /* ========================================
       SCROLL REVEAL ANIMATION
    ======================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("active");
        });
    }

    /* ========================================
       KEYBOARD ACCESSIBILITY
    ======================================== */

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        if (productModal && productModal.classList.contains("open")) {
            closeProductDetail();
            return;
        }

        if (cartDrawer && cartDrawer.classList.contains("open")) {
            closeCart();
            return;
        }

        closeMobileMenu();
    });

    /* ========================================
       FOOTER YEAR
    ======================================== */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* ========================================
       INITIALIZE WEBSITE
    ======================================== */

    loadCart();
    updateCart();

    console.log("Dey's Coffee website is ready!");
});
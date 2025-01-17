// hamburger menu
hamburger.addEventListener("click", () => {
  const hamburger = document.getElementById("hamburger");
  navbarNav = document.querySelector(".navbar-nav");
  navbarNav.classList.toggle("active");
  hamburger.classList.toggle("showx");
});
// Fungsi untuk search dan filter produk di halaman
document
  .getElementById("search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
document.getElementById("search-btn").addEventListener("click", handleSearch);
function handleSearch() {
  const query = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  if (query) {
    window.location.href = `produk.html?search=${encodeURIComponent(query)}`;
  }
}
// corausel
const container = document.querySelector(".carousel-container");
const items = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentIndex = 0;
let autoplayInterval;
// Function to update carousel position
function updateCarousel() {
  const width = container.parentElement.offsetWidth;
  container.style.transform = `translateX(-${currentIndex * width}px)`;
}
// Function to go to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
}
// Function to go to the previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
}
// Autoplay functionality
function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}
// Stop autoplay
function stopAutoplay() {
  clearInterval(autoplayInterval);
}
// Reset autoplay on user interaction
function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}
// Event listeners for navigation buttons
prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoplay();
});
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoplay();
});
// Update carousel on window resize
window.addEventListener("resize", updateCarousel);
// Initialize carousel
updateCarousel();
startAutoplay();
// produk
const cardBtns = document.querySelectorAll(".card-btn");
cardBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = btn.getAttribute("data-id"); // Ambil ID dari atribut data-id
    const produk = document.getElementById(id); // Cari elemen dengan ID tersebut

    // Sembunyikan semua elemen produk terlebih dahulu
    document.querySelectorAll(".produk").forEach((el) => {
      el.style.display = "none";
    });

    // Tampilkan elemen dengan ID sesuai
    if (produk) {
      produk.style.display = "flex";
    }
  });
});
document.querySelectorAll(".produk .close-x").forEach((closeBtn) => {
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const parentProduk = closeBtn.closest(".produk"); // Cari elemen produk terdekat
    if (parentProduk) {
      // Tambahkan kelas 'closing' untuk animasi
      parentProduk.classList.add("closing");

      // Tunggu hingga animasi selesai sebelum menyembunyikan elemen
      parentProduk.addEventListener(
        "animationend",
        () => {
          parentProduk.style.display = "none"; // Sembunyikan elemen setelah animasi selesai
          parentProduk.classList.remove("closing"); // Hapus kelas animasi
        },
        { once: true } // Jalankan event listener ini sekali saja
      );
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const decreaseButtons = document.querySelectorAll(".decrease-qty");
  const increaseButtons = document.querySelectorAll(".increase-qty");

  // Menambahkan event listener untuk tombol "-"
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.closest(".quantity-controls").querySelector("input");
      let value = parseInt(input.value, 10);

      if (value > 1) {
        // Pastikan nilai tidak lebih kecil dari 1
        value -= 1;
        input.value = value;
      }
    });
  });

  // Menambahkan event listener untuk tombol "+"
  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.closest(".quantity-controls").querySelector("input");
      let value = parseInt(input.value, 10);

      if (!isNaN(value)) {
        value += 1;
        input.value = value;
      }
    });
  });
});

// shopping cart
const shop = document.getElementById("shop");
cart = document.querySelector(".shoping-cart");
x = document.querySelector(".back-to-shop");

shop.addEventListener("click", () => {
  cart.classList.toggle("active");
});
x.addEventListener("click", () => {
  cart.classList.remove("active");
});
document.addEventListener("DOMContentLoaded", () => {
  const sizeLabels = document.querySelectorAll(".sizes label");

  sizeLabels.forEach((label) => {
    // Tambahkan listener saat label diklik
    label.addEventListener("click", () => {
      // Reset semua warna label
      sizeLabels.forEach((item) => {
        item.style.backgroundColor = "#fff"; // Warna default
        item.style.color = "#000"; // Teks default
        item.style.borderColor = "#000"; // Border default
      });

      // Ubah warna label yang dipilih
      label.style.backgroundColor = "#000";
      label.style.color = "#fff";
      label.style.borderColor = "#000";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cart = getCartFromLocalStorage(); // Ambil cart dari localStorage
  const cartContainer = document.querySelector(".cart-items");
  const totalItems = document.querySelector(".total-items");
  const cartCount = document.querySelector(".cart-count");
  const shopIcon = document.querySelector(".cart-count");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const totalPriceElement = document.getElementById("total-price"); // Elemen untuk menampilkan total harga

  // Fungsi untuk menyimpan cart ke localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Fungsi untuk mengambil cart dari localStorage
  function getCartFromLocalStorage() {
    const savedCart = localStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Fungsi untuk menambahkan produk ke keranjang
  const addToCart = (name, price, img, quantity = 1, size, model) => {
    const existingProduct = cart.find(
      (product) =>
        product.name === name &&
        product.size === size &&
        product.model === model
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ name, price, img, quantity, size, model });
    }
    updateCart();
    saveCartToLocalStorage(); // Simpan perubahan ke localStorage
  };

  // Fungsi untuk memperbarui tampilan keranjang
  const updateCart = () => {
    cartContainer.innerHTML = "";
    let totalItemsCount = 0;
    let totalPrice = 0;

    cart.forEach((product, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <input type="checkbox" class="cart-item-checkbox" data-index="${index}" checked>
        <img src="${product.img}" alt="${product.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <p>Size: ${product.size} | ${product.model} |</p>
          <p>${product.quantity} x Rp ${product.price.toLocaleString()} |</p>
          <P>= Rp ${(product.price * product.quantity).toLocaleString()}</p>
        </div>
        <div class="quantity-controls">
            <button class="decrease-qty" data-index="${index}">-</button>
            <span>${product.quantity}</span>
            <button class="increase-qty" data-index="${index}">+</button>
          </div>
        <button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash" style="color: #ff0000;"></i></button>
      `;

      cartContainer.appendChild(cartItem);

      // Tambahkan event listener untuk tombol tambah dan kurang
      cartItem.querySelector(".decrease-qty").addEventListener("click", () => {
        if (product.quantity > 1) {
          product.quantity--;
          updateCart();
          saveCartToLocalStorage();
        }
      });

      cartItem.querySelector(".increase-qty").addEventListener("click", () => {
        product.quantity++;
        updateCart();
        saveCartToLocalStorage();
      });

      // Tambahkan event listener ke checkbox setelah elemen dibuat
      const checkbox = cartItem.querySelector(".cart-item-checkbox");
      checkbox.addEventListener("change", () => {
        // Rehitung total berdasarkan status checkbox
        recalculateTotal();
      });

      // Hitung total hanya jika checkbox dicentang
      if (checkbox.checked) {
        totalItemsCount += product.quantity;
        totalPrice += product.price * product.quantity;
      }

      // Menambahkan event listener untuk tombol hapus
      cartItem.querySelector(".remove-item").addEventListener("click", () => {
        cart.splice(index, 1); // Hapus item dari array cart
        updateCart(); // Perbarui tampilan keranjang
        saveCartToLocalStorage(); // Simpan perubahan ke localStorage
      });
    });

    totalItems.textContent = `Total Items: ${totalItemsCount}`;
    cartCount.textContent = totalItemsCount;
    shopIcon.style.display = totalItemsCount > 0 ? "flex" : "none";
    totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString()}`;
  };

  // Fungsi untuk menghitung ulang total harga
  const recalculateTotal = () => {
    let totalItemsCount = 0;
    let totalPrice = 0;

    document.querySelectorAll(".cart-item-checkbox").forEach((checkbox) => {
      const index = checkbox.dataset.index;
      if (checkbox.checked) {
        const product = cart[index];
        totalItemsCount += product.quantity;
        totalPrice += product.price * product.quantity;
      }
    });

    totalItems.textContent = `Total Items: ${totalItemsCount}`;
    cartCount.textContent = totalItemsCount;
    shopIcon.style.display = totalItemsCount > 0 ? "flex" : "none";
    totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString()}`;
  };

  // Pasang event listener pada tombol "Tambah ke Keranjang"
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price, 10);
      const img = button.dataset.img;
      const quantity =
        parseInt(document.querySelector("#jumlah-produk").value, 10) || 1;

      const selectedSize = document.querySelector('input[name="size"]:checked');
      const size = selectedSize ? selectedSize.value : "M";

      const selectedModel = button
        .closest(".produk")
        .querySelector(".model-selector .model-nike.active");
      const model = selectedModel ? selectedModel.id : "Model 1";

      addToCart(name, price, img, quantity, size, model);
    });
  });

  document.querySelectorAll(".model-nike").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".model-nike").forEach((modelButton) => {
        modelButton.classList.remove("active");
      });
      button.classList.add("active");
    });
  });

  // Inisialisasi tampilan keranjang
  updateCart();
});
document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById("checkout-button"); // Tombol Checkout
  const itemsDipilihContainer = document.querySelector(".items-dipilih");
  const cartItemsContainer = document.querySelector(".cart-items-container");

  // Fungsi untuk menghitung ulang total harga dan menyiapkan data
  const prepareCartData = () => {
    let totalPrice = 0;
    const itemsDipilih = []; // Array untuk menyimpan data item yang dipilih

    // Ambil semua item di keranjang
    const cartItems = document.querySelectorAll(".cart-item");
    cartItems.forEach((cartItem) => {
      const checkbox = cartItem.querySelector(".cart-item-checkbox");
      if (checkbox && checkbox.checked) {
        const img = cartItem.querySelector(".cart-item-img").src;
        const name = cartItem.querySelector(".cart-item-info h4").textContent;

        // Mengambil size dan model
        const sizeText =
          cartItem.querySelector(".cart-item-info p").textContent;
        const sizeMatch = sizeText.match(/Size: (\w+)/);
        const modelMatch = sizeText.match(/\|\s*(.*?)\s*\|/);

        const size = sizeMatch ? sizeMatch[1] : null;
        const model = modelMatch ? modelMatch[1] : null;

        const quantity = parseInt(
          cartItem.querySelector(".quantity-controls span").textContent,
          10
        );
        const priceText = cartItem
          .querySelector(".cart-item-info p:nth-of-type(2)")
          .textContent.match(/Rp ([\d,.]+)/)[1];
        const price = parseInt(priceText.replace(/[.,]/g, ""), 10);

        const itemTotal = price * quantity; // Total harga per item
        totalPrice += itemTotal; // Tambah ke total keseluruhan

        // Tambahkan item ke array
        itemsDipilih.push({
          nama: name,
          gambar: img,
          model: model,
          size: size,
          jumlah: quantity,
          harga: price,
          total: itemTotal,
          status: "Belum Dibayar", // Status default
        });
      }
    });

    return { totalPrice, itemsDipilih };
  };

  // Fungsi untuk memeriksa dan mengupdate data di halaman status
  const syncItemsToStatus = (itemsDipilih) => {
    const statusBarang = JSON.parse(localStorage.getItem("statusBarang")) || [];

    itemsDipilih.forEach((item) => {
      // Cari item yang sudah ada di statusBarang berdasarkan nama, model, dan size
      const existingItem = statusBarang.find(
        (statusItem) =>
          statusItem.nama === item.nama &&
          statusItem.size === item.size &&
          statusItem.model === item.model
      );

      if (existingItem) {
        // Jika item sudah ada, tambahkan jumlah dan total harga
        existingItem.jumlah += item.jumlah;
        existingItem.total = existingItem.harga * existingItem.jumlah;
        console.log(`Item ditemukan, menambahkan quantity untuk: ${item.nama}`);
      } else {
        // Jika item belum ada, tambahkan item baru
        statusBarang.push(item);
        console.log(`Item baru ditemukan, menambahkan: ${item.nama}`);
      }
    });

    // Simpan data yang sudah diupdate ke localStorage
    localStorage.setItem("statusBarang", JSON.stringify(statusBarang));
  };

  // Fungsi untuk mengirim data ke halaman status
  const sendDataToStatusPage = (itemsDipilih) => {
    if (itemsDipilih.length > 0) {
      // Sinkronkan item ke status
      syncItemsToStatus(itemsDipilih);

      // Redirect ke halaman status
      window.location.href = "status.html";
    } else {
      alert("Pilih minimal satu item untuk melanjutkan!");
    }
  };

  // Event Listener untuk tombol Checkout
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      const { totalPrice, itemsDipilih } = prepareCartData();
      if (totalPrice > 0) {
        sendDataToStatusPage(itemsDipilih);
      }
    });
  } else {
    console.warn("Checkout button not found in DOM.");
  }

  // Event Listener untuk menghapus item dari cart
  cartItemsContainer?.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const cartItem = e.target.closest(".cart-item");
      if (cartItem) {
        cartItem.remove();
        prepareCartData(); // Update cart setelah penghapusan
      }
    }
  });
});

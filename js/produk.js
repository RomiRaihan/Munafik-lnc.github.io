// hamburger menu
hamburger.addEventListener("click", () => {
  const hamburger = document.getElementById("hamburger");
  navbarNav = document.querySelector(".navbar-nav");
  navbarNav.classList.toggle("active");
  hamburger.classList.toggle("showx");
});
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");

  if (searchQuery) {
    const products = document.querySelectorAll(".produck");
    products.forEach((product) => {
      const name = product.getAttribute("data-name").toLowerCase();
      if (!name.includes(searchQuery)) {
        product.style.display = "none"; // Sembunyikan produk yang tidak sesuai
      }
    });
  }
});
// Fungsi untuk search dan filter produk di halaman
// filter
document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const products = document.querySelectorAll(".produck");

  function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;

    products.forEach((product) => {
      const productCategory = product.getAttribute("data-name");
      const productPriceText = product
        .querySelector("h4")
        .innerText.replace("IDR ", "")
        .replace(".", "");
      const productPrice = parseInt(productPriceText, 10);

      let matchesCategory =
        selectedCategory === "all" || productCategory === selectedCategory;
      let matchesPrice = true;

      if (selectedPrice === "low") {
        matchesPrice = productPrice < 100000;
      } else if (selectedPrice === "medium") {
        matchesPrice = productPrice >= 100000 && productPrice <= 200000;
      } else if (selectedPrice === "high") {
        matchesPrice = productPrice > 200000;
      }

      if (matchesCategory && matchesPrice) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }
    });
  }

  categoryFilter.addEventListener("change", filterProducts);
  priceFilter.addEventListener("change", filterProducts);
});

// Ambil elemen input dan produk
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".produck"); // Semua elemen produk

// Fungsi untuk melakukan pencarian dan menyaring produk
const liveSearch = () => {
  const searchTerm = searchInput.value.toLowerCase(); // Ambil input pencarian dan ubah menjadi lowercase

  // Jika input kosong, kembalikan semua produk ke tampilan semula
  if (searchTerm === "") {
    products.forEach((product) => {
      product.style.display = "block"; // Tampilkan semua produk
    });

    // Sembunyikan pesan "Produk tidak ditemukan"
    const noProductsMessage = document.getElementById("noProductsMessage");
    noProductsMessage.style.display = "none";
    return; // Hentikan fungsi di sini
  }

  // Jika input tidak kosong, cek produk yang cocok
  let foundProduct = false; // Flag untuk melacak apakah ada produk yang cocok

  products.forEach((product) => {
    const productName = product.getAttribute("data-name").toLowerCase(); // Ambil nama produk

    // Periksa apakah nama produk mengandung kata kunci pencarian
    if (productName.includes(searchTerm)) {
      product.style.display = "block"; // Tampilkan produk
      foundProduct = true; // Set flag menjadi true
    } else {
      product.style.display = "none"; // Sembunyikan produk
    }
  });

  // Tampilkan atau sembunyikan pesan "Produk tidak ditemukan"
  const noProductsMessage = document.getElementById("noProductsMessage");
  noProductsMessage.style.display = foundProduct ? "none" : "flex";
};

// Tambahkan event listener untuk mendeteksi input pencarian
searchInput.addEventListener("input", liveSearch);

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
  updateCart();
});
function getCartFromLocalStorage() {
  const savedCart = localStorage.getItem("shoppingCart");
  return savedCart ? JSON.parse(savedCart) : [];
}
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
      localStorage.removeItem(".cart");
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

// from pembayaran
// const payButton = document.querySelector(".paybutton");
// payButton.disabled = true; // Pastikan menggunakan `disabled`
// const form = document.querySelector(".form");
// form.addEventListener("keyup", function () {
//   let allFilled = true; // Asumsikan semua input terisi
//   let emailValid = true; // Asumsikan email valid
//   let phoneValid = true; // Asumsikan nomor telepon valid

//   // Loop melalui semua elemen dalam form
//   for (let i = 0; i < form.elements.length; i++) {
//     const element = form.elements[i];

//     // Abaikan elemen yang bukan input relevan
//     if (element.tagName === "BUTTON" || element.type === "submit") {
//       continue;
//     }

//     // Cek jika ada elemen yang kosong
//     if (element.value.trim() === "") {
//       allFilled = false;
//       break;
//     }

//     // Validasi khusus untuk email
//     if (element.type === "email") {
//       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk format email
//       if (!emailPattern.test(element.value.trim())) {
//         emailValid = false;
//         break;
//       }
//     }

//     // Validasi khusus untuk nomor telepon
//     if (element.type === "tel") {
//       const phonePattern = /^08[0-9]{8,10}$/; // Regex untuk format nomor telepon Indonesia
//       if (!phonePattern.test(element.value.trim())) {
//         phoneValid = false;
//         break;
//       }
//     }
//   }

//   // Atur status tombol berdasarkan validasi
//   if (allFilled && emailValid && phoneValid) {
//     payButton.disabled = false;
//     payButton.classList.remove("disable");
//   } else {
//     payButton.disabled = true;
//     payButton.classList.add("disable");
//   }
// });
// // payment snap
// document.addEventListener("DOMContentLoaded", () => {
//   const payButton = document.querySelector("#paybutton");
//   const form = document.querySelector("#checkout-form");

//   if (payButton) {
//     payButton.addEventListener("click", async function (e) {
//       e.preventDefault();

//       // Validasi form
//       if (!form.checkValidity()) {
//         alert("Harap lengkapi semua kolom yang diperlukan.");
//         return;
//       }

//       // Menampilkan loading indicator
//       const loadingIndicator = document.createElement("div");
//       loadingIndicator.id = "loading-indicator";
//       loadingIndicator.textContent = "Memproses pembayaran...";
//       document.body.appendChild(loadingIndicator);

//       try {
//         // Ambil data dari form
//         const formData = new FormData(form);
//         const objData = Object.fromEntries(formData);

//         // Validasi data pengguna (name, email, phone)
//         if (!objData.name || !objData.email || !objData.phone) {
//           alert("Harap lengkapi data pengguna (nama, email, telepon).");
//           loadingIndicator.remove();
//           return;
//         }

//         // Ambil semua elemen cart-item
//         const cartItems = document.querySelectorAll(".cart-item");
//         const orderDetails = [];
//         let totalPrice = 0;

//         cartItems.forEach((cartItem, index) => {
//           const checkbox = cartItem.querySelector(".cart-item-checkbox");
//           if (checkbox && checkbox.checked) {
//             const name =
//               cartItem.querySelector(".cart-item-info h4")?.textContent ||
//               "Produk Tidak Diketahui";
//             const quantity = parseInt(
//               cartItem.querySelector(".quantity-controls span")?.textContent ||
//                 "1",
//               10
//             );
//             const priceText =
//               cartItem
//                 .querySelector(".cart-item-info p:nth-of-type(2)")
//                 ?.textContent.match(/Rp ([\d,.]+)/)?.[1] || "0";
//             const price = parseInt(priceText.replace(/[.,]/g, ""), 10) || 0;

//             totalPrice += price * quantity;

//             orderDetails.push({
//               id: `item-${index + 1}`,
//               name: name.substring(0, 50), // Midtrans membatasi nama item max 50 karakter
//               price: price,
//               quantity: quantity,
//               status: "Belum Dibayar", // Tambahkan status default
//             });
//           }
//         });

//         // Periksa apakah ada item yang dipilih
//         if (orderDetails.length === 0) {
//           alert("Harap pilih setidaknya satu item untuk dibayar.");
//           loadingIndicator.remove();
//           return;
//         }

//         // Validasi total harga
//         if (totalPrice <= 0) {
//           alert("Total harga tidak valid.");
//           loadingIndicator.remove();
//           return;
//         }

//         // Siapkan data untuk dikirim ke server
//         objData.orderDetails = orderDetails;
//         objData.total = totalPrice;

//         console.log("Total price (number):", objData.total);
//         console.log("Order details:", orderDetails);

//         // Kirim data ke server menggunakan fetch
//         const response = await fetch("http://localhost:3000/pay", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(objData),
//         });

//         console.log("Data yang dikirim ke server:", objData);

//         if (!response.ok) {
//           console.error(
//             "Gagal melakukan request:",
//             response.status,
//             response.statusText
//           );
//           alert(
//             "Gagal membuat pembayaran. Periksa koneksi atau hubungi admin."
//           );
//           return;
//         }

//         const result = await response.json();
//         console.log(result);

//         // Simpan data pembayaran ke localStorage
//         localStorage.setItem(
//           "paymentData",
//           JSON.stringify({
//             orderDetails: orderDetails,
//             userInfo: {
//               name: objData.name,
//               email: objData.email,
//               phone: objData.phone,
//               address: objData.address,
//             },
//           })
//         );

//         // Jika token pembayaran berhasil diterima
//         if (result.token) {
//           console.log("Token pembayaran:", result.token);
//           window.snap.pay(result.token, {
//             onSuccess: function (result) {
//               alert("Pembayaran berhasil!");
//               console.log(result);

//               // Update status menjadi Dibayar
//               const paymentData = JSON.parse(
//                 localStorage.getItem("paymentData")
//               );
//               paymentData.orderDetails.forEach((item) => {
//                 item.status = "Dibayar";
//               });
//               localStorage.setItem("paymentData", JSON.stringify(paymentData));

//               // Perbarui tampilan status
//               renderStatus();
//             },
//             onPending: function (result) {
//               alert("Pembayaran sedang diproses.");
//               console.log(result);
//             },
//             onError: function (result) {
//               alert("Pembayaran gagal.");
//               console.log(result);
//             },
//           });
//         } else {
//           alert("Gagal mendapatkan token pembayaran.");
//         }
//       } catch (error) {
//         console.error("Terjadi kesalahan:", error);
//         alert("Terjadi kesalahan, coba lagi nanti.");
//       } finally {
//         // Menghapus loading indicator setelah proses selesai
//         loadingIndicator.remove();
//       }
//     });
//   } else {
//     console.error("payButton tidak ditemukan di DOM");
//   }
// });

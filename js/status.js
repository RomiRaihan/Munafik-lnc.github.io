// hamburger menu
hamburger.addEventListener("click", () => {
  const hamburger = document.getElementById("hamburger");
  navbarNav = document.querySelector(".navbar-nav");
  navbarNav.classList.toggle("active");
  hamburger.classList.toggle("showx");
});
// searcbox
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
document.addEventListener("DOMContentLoaded", () => {
  const payButton = document.querySelector("#paybutton");
  const form = document.querySelector("#checkout-form");
  const itemsDipilihContainer = document.querySelector(".items-dipilih");
  const paymentStatusContainer = document.getElementById("payment-status");
  const paymentSection = document.getElementById("payment");
  const closePayment = document.getElementById("close-payment");
  const totalPricePayment = document.getElementById("dibayar");
  const multiPayButton = document.getElementById("multi-paybutton");
  const ongkirElement = document.getElementById("ongkir");
  const jumlahElement = document.getElementById("jumlah");
  const reuseTokenButton = document.createElement("button");
  const clearAllButton = document.getElementById("clear-all-button");
  const statusBarang = JSON.parse(localStorage.getItem("statusBarang")) || [];
  const riwayatBelanja =
    JSON.parse(localStorage.getItem("riwayatBelanja")) || [];
  const saveData = () => {
    localStorage.setItem("statusBarang", JSON.stringify(statusBarang));
    localStorage.setItem("riwayatBelanja", JSON.stringify(riwayatBelanja));
  };

  const updateTotalJumlah = () => {
    const ongkir =
      parseInt(ongkirElement.textContent.replace(/[^0-9]/g, "")) || 0;
    const totalPrice =
      parseInt(totalPricePayment.textContent.replace(/[^0-9]/g, "")) || 0;
    const totalJumlah = ongkir + totalPrice;
    jumlahElement.textContent = `Rp ${totalJumlah.toLocaleString()}`;
  };

  function updateShippingCost() {
    const city = document.getElementById("city").value;
    const district = document.getElementById("district").value;

    const shippingCosts = {
      "kabupaten-bandung-baleendah": 15000,
      "jakarta-pusat-kemayoran": 12000,
    };

    const key = `${city}-${district}`;

    if (shippingCosts[key] !== undefined) {
      ongkirElement.textContent = `Rp. ${shippingCosts[key].toLocaleString(
        "id-ID"
      )}`;
    } else {
      ongkirElement.textContent = "Rp. 0";
    }

    updateTotalJumlah();
  }

  const openPaymentMenu = (selectedItems) => {
    const validItems = selectedItems.filter(
      (item) => item.status === "Belum Dibayar"
    );

    if (validItems.length === 0) {
      // alert("Tidak ada item yang memenuhi syarat untuk pembayaran.");
      return;
    }

    itemsDipilihContainer.innerHTML = "";
    let totalPrice = 0;

    validItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item-dipilih");
      itemElement.innerHTML = `<div style="display: flex; align-items: center; margin-bottom: 10px;">
          <img src="${item.gambar}" alt="${
        item.nama
      }" style="width: 50px; height: 50px; margin-right: 10px;">
          <div>
            <h4 style="margin: 0;">${item.nama}</h4>
            <p>${item.model} | ${item.size} | ${
        item.jumlah
      } x Rp ${item.harga.toLocaleString()} | 
            <strong>Total: Rp ${item.total.toLocaleString()}</strong>
          </div>
        </div>`;
      itemsDipilihContainer.appendChild(itemElement);
      totalPrice += item.total;
    });
    if (validItems.length === 0) {
      paymentSection.style.display = "none";
    }

    totalPricePayment.textContent = `Rp ${totalPrice.toLocaleString()}`;
    paymentSection.style.display = "block";
    updateTotalJumlah();
  };

  const closePaymentMenu = () => {
    paymentSection.style.display = "none";
  };

  const renderStatusBarang = () => {
    paymentStatusContainer.innerHTML = "";
    statusBarang.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item-status");
      itemElement.innerHTML = `<div style="display: flex; align-items: center;">
          <input type="checkbox" id="item-${index}" class="item-checkbox" style="margin-right: 10px;">
          <img src="${item.gambar}" alt="${
        item.nama
      }" style="width: 50px; height: 50px; margin-right: 10px;">
          <div class="item-details">
            <h4>${item.nama}</h4>
            <p>${item.model} | ${item.size} | ${
        item.jumlah
      } x Rp ${item.harga.toLocaleString()} | Rp ${item.total.toLocaleString()} |
            <span class="status">${item.status}</span> |
            <button class="pay-item-button" data-index="${index}" style="background-color: ${
        item.status === "dibayar"
          ? "green"
          : item.status === "Pending"
          ? "red"
          : "blue"
      } ;  padding:0.5rem; border-radius: 0.5rem; color: white; cursor: pointer;" >
              ${
                item.status === "dibayar"
                  ? "Diterima"
                  : item.status === "Pending"
                  ? "Lanjutkan Pembayaran"
                  : "Bayar Item Ini"
              }
            </button>
            <button class="remove-item-button" data-index="${index}" style="background-color: none;">
              <i class="fa-solid fa-trash" style="color: #ff0000;"></i>
            </button>
          </div>
        </div>`;
      paymentStatusContainer.appendChild(itemElement);
    });
  };

  renderStatusBarang();

  const renderRiwayatBelanja = () => {
    const riwayatCartContainer = document.getElementById(
      "riwayat-cart-container"
    );
    riwayatCartContainer.innerHTML = "";
    riwayatBelanja.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item-riwayat");
      itemElement.innerHTML = `<div style="display: flex; align-items: center;">
         <img src="${item.gambar}" alt="${
        item.nama
      }" style="width: 50px; height: 50px; margin-right: 10px;">
          <div class="item-details">
            <h4>${item.nama}</h4>
            <p>${item.model} | ${item.size} | ${
        item.jumlah
      } x Rp ${item.harga.toLocaleString()} | Rp ${item.total.toLocaleString()} |
            <span class="status" style="color:green;">Selesai</span> 
               </div>
        </div>`;
      riwayatCartContainer.appendChild(itemElement);
    });
  };
  renderRiwayatBelanja();
  clearAllButton.addEventListener("click", () => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus seluruh riwayat belanja?"
    );
    if (confirmDelete) {
      riwayatBelanja.length = 0; // Menghapus semua item dari riwayat belanja
      localStorage.setItem("riwayatBelanja", JSON.stringify(riwayatBelanja)); // Simpan perubahan ke localStorage
      renderRiwayatBelanja(); // Render ulang tampilan riwayat belanja
      alert("Seluruh riwayat belanja telah dihapus.");
    }
  });
  paymentStatusContainer.addEventListener("click", (e) => {
    const payButton = e.target.closest(".pay-item-button");
    const diterimaButton = e.target.closest(".pay-item-button");

    if (diterimaButton) {
      const index = diterimaButton.dataset.index;
      const itemToMove = statusBarang[index];

      if (itemToMove && itemToMove.status === "dibayar") {
        // Pindahkan item ke riwayat belanja
        riwayatBelanja.push(itemToMove);
        statusBarang.splice(index, 1); // Hapus item dari status barang
        saveData();
        closePaymentMenu();
        renderStatusBarang();
        renderRiwayatBelanja();
      } else {
        // alert("Item ini belum dibayar atau tidak dapat dipindahkan.");
      }
    }
    if (payButton) {
      const index = payButton.dataset.index;
      const itemToPay = statusBarang[index];

      if (itemToPay) {
        if (itemToPay.status !== "belum dibayar") {
          const selectedItems = [itemToPay];
          openPaymentMenu(selectedItems);
        } else {
          alert(
            "Item ini belum dibayar. Anda tidak dapat melanjutkan pembayaran."
          );
        }
      }
    }

    const removeButton = e.target.closest("button.remove-item-button");
    if (removeButton) {
      const index = removeButton.dataset.index;
      statusBarang.splice(index, 1);
      saveData();
      renderStatusBarang();
    }

    const retryPaymentButton = e.target.closest(".pay-item-button");
    if (retryPaymentButton) {
      const index = retryPaymentButton.dataset.index;
      const itemToRetry = statusBarang[index];

      if (itemToRetry && itemToRetry.status === "Pending") {
        const token = localStorage.getItem("midtransToken");
        if (token) {
          // Menjalankan Snap dengan token yang sudah disimpan
          window.snap.pay(token, {
            onSuccess: function (result) {
              console.log(result);
              updateItemStatus(result, "dibayar");
              location.reload();
            },
            onPending: function (result) {
              console.log(result);
              updateItemStatus(result, "Pending");
              location.reload();
            },
            onError: function (result) {
              alert("Pembayaran gagal.");
              console.log(result);
            },
            onClose: function () {
              location.reload(); // Refresh halaman ketika modal ditutup
            },
          });
        }
      }
    }
  });

  multiPayButton.addEventListener("click", () => {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll(".item-checkbox");
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked && statusBarang[index].status === "Belum Dibayar") {
        selectedItems.push(statusBarang[index]);
      }
    });
    if (selectedItems.length > 0) {
      openPaymentMenu(selectedItems);
    } else {
      alert("Hanya item dengan status 'belum dibayar' yang dapat diproses.");
    }
  });

  closePayment.addEventListener("click", closePaymentMenu);

  document
    .getElementById("city")
    .addEventListener("change", updateShippingCost);
  document
    .getElementById("district")
    .addEventListener("change", updateShippingCost);

  let isProcessingPayment = false;

  payButton.addEventListener("click", async function (e) {
    e.preventDefault();

    if (isProcessingPayment) {
      alert("Pembayaran sedang diproses, harap tunggu.");
      return;
    }
    payButton.disabled = true;
    isProcessingPayment = true;

    if (!form.checkValidity()) {
      alert("Harap lengkapi semua kolom yang diperlukan.");
      isProcessingPayment = false;
      return;
    }

    const loadingIndicator = document.createElement("div");
    loadingIndicator.id = "loading-indicator";
    loadingIndicator.textContent = "Memproses pembayaran...";
    document.body.appendChild(loadingIndicator);

    try {
      const formData = new FormData(form);
      const objData = Object.fromEntries(formData);

      if (!objData.name || !objData.email || !objData.phone) {
        alert("Harap lengkapi data pengguna (nama, email, telepon).");
        loadingIndicator.remove();
        isProcessingPayment = false;
        return;
      }

      const selectedItems =
        itemsDipilihContainer.querySelectorAll(".item-dipilih");
      const orderDetails = [];
      let totalAmount = 0;
      let ongkir =
        parseInt(ongkirElement.textContent.replace(/[^0-9]/g, "")) || 0;

      selectedItems.forEach((item) => {
        const name =
          item.querySelector("h4").textContent || "Produk Tidak Diketahui";
        const size =
          item.querySelector("p:nth-of-type(1)").textContent.split("|")[1] ||
          "Ukuran Tidak Diketahui";
        const model =
          item.querySelector("p:nth-of-type(1)").textContent.split("|")[0] ||
          "Model Tidak Diketahui";
        const priceText =
          item
            .querySelector("p:nth-of-type(1)")
            .textContent.match(/Rp ([\d,.]+)/)?.[1] || "0";
        const price = parseInt(priceText.replace(/[.,]/g, ""), 10) || 0;
        const quantityText =
          item
            .querySelector("p:nth-of-type(1)")
            .textContent.match(/(\d+)\s*x\s*Rp/)?.[1] || "0";
        const quantity = parseInt(quantityText, 10);
        const total = price * quantity;

        totalAmount += total;

        orderDetails.push({
          name: name,
          size: size,
          model: model,
          price: price,
          quantity: quantity,
          totalPrice: total,
        });
      });

      totalAmount += ongkir;

      objData.orderDetails = orderDetails;
      objData.totalAmount = totalAmount;
      objData.ongkir = ongkir;

      const response = await fetch("http://localhost:3000/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objData),
      });

      const result = await response.json();

      if (result.token) {
        midtransToken = result.token; // Simpan token Midtrans
        localStorage.setItem("midtransToken", midtransToken); // Simpan token untuk digunakan lagi
        reuseTokenButton.style.display = "block"; // Tampilkan tombol untuk menggunakan token kembali

        window.snap.pay(result.token, {
          onSuccess: function (result) {
            console.log(result);
            updateItemStatus(result, "dibayar");
            location.reload();
          },
          onPending: function (result) {
            console.log(result);
            updateItemStatus(result, "Pending");
            location.reload();
          },
          onError: function (result) {
            alert("Pembayaran gagal.");
            console.log(result);
          },
          onClose: function () {
            location.reload(); // Refresh halaman ketika modal ditutup
          },
        });
      } else {
        alert("Gagal mendapatkan token pembayaran.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan, coba lagi nanti.");
    } finally {
      loadingIndicator.remove();
      isProcessingPayment = false;
    }
  });

  function updateItemStatus(result, status) {
    // Mengambil semua item yang dipilih untuk dibayar
    const selectedItems =
      itemsDipilihContainer.querySelectorAll(".item-dipilih");

    // Iterasi semua item yang dipilih untuk memperbarui status masing-masing
    selectedItems.forEach((item, index) => {
      const itemElement = statusBarang.find(
        (itemInList) => itemInList.nama === item.querySelector("h4").textContent
      );

      if (itemElement) {
        // Memperbarui status item di statusBarang
        itemElement.status = status;

        // Simpan data terbaru ke localStorage
        saveData();
      }
    });
    statusBarang.forEach((item) => {
      if (item.status === "Pending") {
        item.status = status; // Update status menjadi "dibayar" atau lainnya
      }
      saveData();
    });

    // Render ulang status barang di UI setelah update
    renderStatusBarang();
  }
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

const payButton = document.querySelector(".paybutton");
payButton.disabled = true; // Pastikan menggunakan `disabled`
const form = document.querySelector(".form");
form.addEventListener("keyup", function () {
  let allFilled = true; // Asumsikan semua input terisi
  let emailValid = true; // Asumsikan email valid
  let phoneValid = true; // Asumsikan nomor telepon valid

  // Loop melalui semua elemen dalam form
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];

    // Abaikan elemen yang bukan input relevan
    if (element.tagName === "BUTTON" || element.type === "submit") {
      continue;
    }

    // Cek jika ada elemen yang kosong
    if (element.value.trim() === "") {
      allFilled = false;
      break;
    }

    // Validasi khusus untuk email
    if (element.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk format email
      if (!emailPattern.test(element.value.trim())) {
        emailValid = false;
        break;
      }
    }

    // Validasi khusus untuk nomor telepon
    if (element.type === "tel") {
      const phonePattern = /^08[0-9]{8,10}$/; // Regex untuk format nomor telepon Indonesia
      if (!phonePattern.test(element.value.trim())) {
        phoneValid = false;
        break;
      }
    }
  }

  // Atur status tombol berdasarkan validasi
  if (allFilled && emailValid && phoneValid) {
    payButton.disabled = false;
    payButton.classList.remove("disable");
  } else {
    payButton.disabled = true;
    payButton.classList.add("disable");
  }
});

function updateCities() {
  const province = document.getElementById("province").value;
  const citySelect = document.getElementById("city");
  // Clear existing city options
  citySelect.innerHTML =
    '<option value="" disabled selected>Pilih Kota</option>';
  // Define cities for each province
  const cities = {
    banten: [
      "Tangerang",
      "Tangerang Selatan",
      "Serang",
      "Cilegon",
      "Kabupaten Serang",
      "Kabupaten Pandeglang",
      "Kabupaten Lebak",
      "Kabupaten Tangerang",
    ],
    "dki-jakarta": [
      "Jakarta Pusat",
      "Jakarta Utara",
      "Jakarta Barat",
      "Jakarta Selatan",
      "Jakarta Timur",
      "Kabupaten Kepulauan Seribu",
    ],
    "jawa-barat": [
      "Bandung",
      "Bekasi",
      "Bogor",
      "Depok",
      "Cimahi",
      "Sukabumi",
      "Tasikmalaya",
      "Cirebon",
      "Banjar",
      "Kabupaten Bandung",
      "Kabupaten Bandung Barat",
      "Kabupaten Bekasi",
      "Kabupaten Bogor",
      "Kabupaten Cianjur",
      "Kabupaten Cirebon",
      "Kabupaten Garut",
      "Kabupaten Indramayu",
      "Kabupaten Karawang",
      "Kabupaten Kuningan",
      "Kabupaten Majalengka",
      "Kabupaten Purwakarta",
      "Kabupaten Subang",
      "Kabupaten Sukabumi",
      "Kabupaten Sumedang",
      "Kabupaten Tasikmalaya",
    ],
  };
  // If a valid province is selected, add the cities for that province
  if (cities[province]) {
    cities[province].forEach(function (city) {
      const option = document.createElement("option");
      option.value = city.toLowerCase().replace(/\s+/g, "-");
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }
}

function updateDistricts() {
  const city = document.getElementById("city").value;
  const districtSelect = document.getElementById("district");

  // Clear existing district options
  districtSelect.innerHTML =
    '<option value="" disabled selected>Pilih Kecamatan</option>';

  // Define districts for each city
  const districts = {
    "kabupaten-tangerang": [
      "Curug",
      "Cikupa",
      "Kelapa Dua",
      "Cisauk",
      "Panongan",
      "Pagedangan",
      "Rajeg",
      "Sepatan",
      "Sepatan Timur",
      "Sukamulya",
      "Solear",
      "Legok",
      "Pakuhaji",
      "Teluknaga",
      "Kosambi",
      "Mauk",
      "Tigaraksa",
      "Kresek",
      "Kronjo",
    ],
    tangerang: [
      "Batuceper",
      "Karawaci",
      "Cipondoh",
      "Ciledug",
      "Periuk",
      "Tangerang",
      "Neglasari",
      "Pinang",
      "Larangan",
      "Jatiuwung",
      "Benda",
    ],
    "kota-tangerang-selatan": [
      "Ciputat",
      "Ciputat Timur",
      "Pamulang",
      "Serpong",
      "Serpong Utara",
      "Setu",
      "Pondok Aren",
    ],
    serang: [
      "Serang",
      "Cipocok Jaya",
      "Curug",
      "Kasemen",
      "Taktakan",
      "Walantaka",
    ],
    cilegon: [
      "Cibeber",
      "Citangkil",
      "Ciwandan",
      "Grogol",
      "Jombang",
      "Pulomerak",
      "Purwakarta",
    ],
    "kabupaten-serang": [
      "Anyar",
      "Baros",
      "Binuang",
      "Cikande",
      "Cinangka",
      "Ciomas",
      "Ciruas",
      "Gunungsari",
      "Jawilan",
      "Kopo",
      "Kragilan",
      "Kramatwatu",
      "Lebak Wangi",
      "Mancak",
      "Padarincang",
      "Pamarayan",
      "Petir",
      "Pontang",
      "Pulo Ampel",
      "Tanara",
      "Tirtayasa",
      "Waringinkurung",
    ],
    "kabupaten-lebak": [
      "Bayah",
      "Banjarsari",
      "Bojongmanik",
      "Cimarga",
      "Cijaku",
      "Cileles",
      "Cikulur",
      "Cihara",
      "Cibeber",
      "Gunungkencana",
      "Kalanganyar",
      "Leuwidamar",
      "Maja",
      "Malingping",
      "Panggarangan",
      "Rangkasbitung",
      "Sajira",
      "Sobang",
      "Sukaresmi",
      "Warunggunung",
      "Wanasalam",
    ],
    bandung: [
      "Andir",
      "Arcamanik",
      "Astana Anyar",
      "Babakan Ciparay",
      "Batununggal",
      "Bojongloa Kaler",
      "Bojongloa Kidul",
      "Buahbatu",
      "Cibeunying Kaler",
      "Cibeunying Kidul",
      "Cicendo",
      "Coblong",
      "Lengkong",
      "Mandalajati",
      "Panyileukan",
      "Rancasari",
      "Regol",
      "Sumurbandung",
    ],
    bekasi: [
      "Bekasi Barat",
      "Bekasi Selatan",
      "Bekasi Timur",
      "Bekasi Utara",
      "Jatiasih",
      "Jatisampurna",
      "Medan Satria",
      "Mustikajaya",
      "Pebayuran",
      "Rawalumbu",
    ],
    bogor: [
      "Bogor Barat",
      "Bogor Selatan",
      "Bogor Tengah",
      "Bogor Timur",
      "Bogor Utara",
      "Tanah Sereal",
    ],
    depok: [
      "Beji",
      "Cinere",
      "Cipayung",
      "Cilodong",
      "Limo",
      "Sukmajaya",
      "Tapos",
      "Pancoran Mas",
      "Bojongsari",
      "Sawangan",
    ],
    sukabumi: ["Baros", "Cikole", "Gunungpuyuh", "Lembursitu", "Warudoyong"],
    cirebon: ["Kejaksan", "Lemahwungkuk", "Harjamukti", "Sumber"],
    "kabupaten-bandung": [
      "Arjasari",
      "Banjaran",
      "Baleendah",
      "Cangkuang",
      "Ciparay",
      "Cileunyi",
      "Cikancung",
      "Cimaung",
      "Cipatat",
      "Dayeuhkolot",
      "Kertasari",
      "Kutawaringin",
      "Majalaya",
      "Nagreg",
      "Pangalengan",
      "Pasirjambu",
      "Rancabali",
      "Rancasari",
      "Solokanjeruk",
      "Soreang",
      "Ujungberung",
    ],
    "kabupaten-bekasi": [
      "Babelan",
      "Bojongmangu",
      "Cibarusah",
      "Cikarang Barat",
      "Cikarang Timur",
      "Cikarang Pusat",
      "Cikarang Selatan",
      "Karangbahagia",
      "Kedungwaringin",
      "Kubang",
      "Muaragembong",
      "Serangbaru",
      "Setu",
      "Sukatani",
      "Tambun Selatan",
      "Tambun Utara",
      "Tarumajaya",
    ],
    "kabupaten-bogor": [
      "Ciampea",
      "Cibinong",
      "Cileungsi",
      "Ciomas",
      "Dramaga",
      "Gunungputri",
      "Jasinga",
      "Kemang",
      "Leuwiliang",
      "Leuwisadeng",
      "Nanggung",
      "Parung",
      "Parung Panjang",
      "Rancabungur",
      "Rumpin",
      "Tamansari",
      "Tenjo",
      "Tambun Selatan",
    ],
    "kabupaten-garut": [
      "Banyuresmi",
      "Bayongbong",
      "Cibalong",
      "Cihurip",
      "Cisewu",
      "Cisaat",
      "Karangpawitan",
      "Kadungora",
      "Garut Kota",
      "Garut Selatan",
      "Garut Timur",
      "Garut Utara",
      "Karangtengah",
      "Leuwigoong",
      "Malangbong",
      "Mekarmukti",
      "Pakenjeng",
      "Pangatikan",
      "Pasirwangi",
      "Samarang",
      "Selaawi",
      "Sukawening",
      "Tarogong Kidul",
      "Tarogong Kaler",
      "Wanaraja",
      "Cihideung",
    ],
    "kabupaten-indramayu": [
      "Anjatan",
      "Balongan",
      "Cikedung",
      "Cantigi",
      "Haurgeulis",
      "Jatibarang",
      "Kandanghaur",
      "Karangampel",
      "Lohbener",
      "Mundu",
      "Patrol",
      "Sukra",
      "Sumber",
      "Tukdana",
      "Terisi",
    ],
    "kabupaten-karawang": [
      "Batujaya",
      "Cikampek",
      "Cilamaya Kulon",
      "Cilamaya Wetan",
      "Jatisari",
      "Karawang Barat",
      "Karawang Timur",
      "Klari",
      "Kotabaru",
      "Lemahabang",
      "Majalaya",
      "Pakisjaya",
      "Pangkalan",
      "Rengasdengklok",
      "Tirtajaya",
      "Tegalwaru",
      "Tempuran",
      "Telukjambe Barat",
      "Telukjambe Timur",
    ],
    "kabupaten-kuningan": [
      "Adiwerna",
      "Ciwaru",
      "Cilimus",
      "Ciawigebang",
      "Cilebak",
      "Darma",
      "Garawangi",
      "Hantara",
      "Kadugede",
      "Kuningan",
      "Luragung",
      "Mandirancan",
      "Nusaherang",
      "Pasawahan",
      "Selajambe",
      "Sindangagung",
      "Subang",
    ],
    "kabupaten-majalengka": [
      "Argapura",
      "Bantarujeg",
      "Cikijing",
      "Cingambul",
      "Jatiwangi",
      "Kadipaten",
      "Ligung",
      "Majalengka",
      "Rajagaluh",
      "Sindang",
      "Sumberjaya",
      "Talaga",
    ],
    "kabupaten-subang": [
      "Adiwerna",
      "Ciasem",
      "Cibogo",
      "Cikao",
      "Cilamaya",
      "Cisalak",
      "Ciwaru",
      "Garut",
      "Kadipaten",
      "Karawang",
      "Kalijati",
      "Legon Kulon",
      "Patokbeusi",
      "Purwadadi",
      "Purwakarta",
    ],
    "kabupaten-sukabumi": [
      "Cisaat",
      "Cibadak",
      "Cicurug",
      "Cidahu",
      "Ciracap",
      "Kalapanunggal",
      "Nyalindung",
      "Pabuaran",
      "Parungkuda",
      "Pelabuhanratu",
      "Purabaya",
      "Sukabumi",
      "Sumberjaya",
      "Surade",
    ],
    "kabupaten-tasikmalaya": [
      "Cibalong",
      "Cikatomas",
      "Ciawi",
      "Jamanis",
      "Karangnunggal",
      "Kawalu",
      "Leuwisari",
      "Mangkubumi",
      "Manonjaya",
      "Padakembang",
      "Pamarican",
      "Pamulihan",
      "Parungponteng",
      "Rajapolah",
      "Salawu",
      "Singaparna",
      "Sukaratu",
      "Sukaresik",
      "Tasikmalaya",
    ],
    "kabupaten-ciamis": [
      "Banjaranyar",
      "Ciamis",
      "Cikijing",
      "Cipaku",
      "Lumbung",
      "Manggung",
      "Pamotan",
      "Purbahayu",
      "Rajapolah",
      "Sindangkasih",
    ],
    "jakarta-pusat": [
      "Gambir",
      "Johar Baru",
      "Kemayoran",
      "Menteng",
      "Cempaka Putih",
      "Sawah Besar",
      "Tanah Abang",
      "Senen",
      "Rumah Sakit",
    ],
    "jakarta-utara": [
      "Cilincing",
      "Koja",
      "Kelapa Gading",
      "Pademangan",
      "Tanjung Priok",
      "Penjaringan",
      "Jakarta Utara",
    ],
    "jakarta-selatan": [
      "Cilandak",
      "Pasar Minggu",
      "Kebayoran Baru",
      "Kebayoran Lama",
      "Pancoran",
      "Mampang Prapatan",
      "Setiabudi",
      "Jagakarsa",
      "Tebet",
    ],
    "jakarta-barat": [
      "Grogol Petamburan",
      "Kembangan",
      "Kebon Jeruk",
      "Palmerah",
      "Cengkareng",
      "Kalideres",
      "Tambora",
      "West Jakarta",
    ],
    "jakarta-timur": [
      "Jatinegara",
      "Cipayung",
      "Matraman",
      "Kramat Jati",
      "Pulo Gadung",
      "Duren Sawit",
      "Makasar",
      "Ciracas",
      "Pasar Rebo",
      "Kampung Melayu",
      "Jakarta Timur",
    ],
  };

  // If a valid city is selected, add the districts for that city
  if (districts[city]) {
    districts[city].forEach(function (district) {
      const option = document.createElement("option");
      option.value = district.toLowerCase().replace(/\s+/g, "-");
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  }
}

// Fungsi untuk menangani klik pada tombol "Bayar Sekarang"
// document.addEventListener("DOMContentLoaded", () => {
//   const payButton = document.querySelector("#paybutton");
//   const form = document.querySelector("#checkout-form");
//   const itemsDipilihContainer = document.querySelector(".items-dipilih"); // Kontainer item di menu pembayaran

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

//         // Ambil data dari menu pembayaran
//         const selectedItems =
//           itemsDipilihContainer.querySelectorAll(".item-dipilih");
//         const orderDetails = [];
//         let totalPrice = 0;

//         selectedItems.forEach((item, index) => {
//           const name =
//             item.querySelector("h4")?.textContent || "Produk Tidak Diketahui";
//           const priceText =
//             item
//               .querySelector("strong")
//               ?.textContent.match(/Rp ([\d,.]+)/)?.[1] || "0";
//           const price = parseInt(priceText.replace(/[.,]/g, ""), 10) || 0;
//           const quantityText =
//             item
//               .querySelector("p:nth-of-type(1)")
//               ?.textContent.match(/(\d+)/)?.[1] || "1";
//           const quantity = parseInt(quantityText, 10);

//           totalPrice += price;

//           orderDetails.push({
//             id: `item-${index + 1}`,
//             name: name.substring(0, 50), // Midtrans membatasi nama item max 50 karakter
//             price: price,
//             quantity: quantity,
//             status: "Belum Dibayar", // Tambahkan status default
//           });
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

//         // Kirim data ke server menggunakan fetch
//         const response = await fetch("http://localhost:3000/pay", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(objData),
//         });

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

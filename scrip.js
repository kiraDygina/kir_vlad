document.addEventListener('DOMContentLoaded', function() {     //DOMContentLoaded ждем пока вся страница загрузится
    const addToCartButtons = document.querySelectorAll('.add-to-cart');//ищем кнопу с ценой
    const cartItemsList = document.getElementById('cartItems');//ищем контейнер в которм товар описание и цена
    const totalPrice = document.getElementById('totalPrice'); //ищем всего сумма товаров в модальнм окне
    const cartCounter = document.querySelector('.korz');//ищем 0 в корзине
    let cart = [];     //массив с именем cart, в который будем добавлять элементы, которые пользователь добавляет в корзину.
  
    function displayCart() {            //Это функция, которая отображает содержимое корзины на странице.
      cartItemsList.innerHTML = '';  //Мы очищаем содержимое элемента cartItemsList
  
      cart.forEach(item => {         //Мы используем цикл forEach для перебора всех элементов в массиве cart,          потому                         что каждый элемент в этом массиве представляет товар в корзине.
  
        const div = document.createElement('div'); //создаем новый элемент <div> с помощью document.createElement('div'), потому что мы хотим создать контейнер для каждого товара в корзине. 
  
        div.classList.add('cart-item');// После этого мы добавляем класс "cart-item" к этому элементу с помощью div.classList.add('cart-item'), чтобы стилизовать его
  
        const img = document.createElement('img');  // Мы создаем новый элемент картинка для того чтобы сделать копию картинки и управлять ее свойствами
        img.src = item.image; //обращаемся к переменной и через ресурс просим обратится к картинке
        img.alt = item.name + ' image';
        img.classList.add('cart-item-image'); //додаем класс для стилей картинки
        div.appendChild(img); //вкладываем нащу картинку в корзине внутрь дива
  
        const description = document.createElement('div'); // создаем блок для описания товара
        description.classList.add('cart-item-description');// создаем клас для дива описания
        description.innerHTML = ` 
          <p>${item.name}</p>
          <p>Ціна: ${item.price} ua</p>   
        `;
        div.appendChild(description); //вкладываем описание в див
  
  
  
        const quantityControls = document.createElement('div'); // создает див с + - для товара
        quantityControls.classList.add('quantity-controls'); // присваеваем клас
  
        const increaseBtn = document.createElement('button'); //создаем кнопки
        increaseBtn.textContent = '+';
        increaseBtn.addEventListener('click', function() {
          increaseQuantity(item);
        });
        quantityControls.appendChild(increaseBtn); // вкладываем + - внуть дива  quantityControls
  
        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity; // Показуємо поточну кількість товару
        quantityControls.appendChild(quantityDisplay);
  
        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.addEventListener('click', function() {
          decreaseQuantity(item);
        });
        quantityControls.appendChild(decreaseBtn);
  
        div.appendChild(quantityControls);
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.classList.add('delete-item');
        deleteBtn.addEventListener('click', function() {
          removeItemFromCart(item);
        });
        div.appendChild(deleteBtn);
  
        cartItemsList.appendChild(div);
      });
  
      // Оновлюємо значення лічильника
      cartCounter.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  
      // Розраховуємо загальну суму покупок
      const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
      // Оновлюємо загальну суму у кошику
      totalPrice.textContent = 'Всього в кошику: ' + total + ' ua';
    }
  
    function increaseQuantity(item) {  // Это функция для увеличения количества товара в корзине.
      item.quantity += 1;
      displayCart();
    }
  function decreaseQuantity(item) {  // Это функция для уменьшения количества товара в корзине.
      if (item.quantity > 1) {
        item.quantity -= 1;
        displayCart();
      }
    }
  
    function removeItemFromCart(item) {    // Это функция для удаления товара из корзины.
      const index = cart.findIndex(cartItem => cartItem === item);
      if (index !== -1) {
        cart.splice(index, 1);
        displayCart();
      }
    }
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {   // Мы добавляем слушателя событий для каждой кнопки "Добавить в корзину".
        const name = this.parentNode.querySelector('p').textContent;
        const price = parseInt(this.getAttribute('data-price'));
        const image = this.parentNode.querySelector('img').src;
        let item = { name, price, image, quantity: 1 }; // Створюємо новий об'єкт для кожного товару
        cart.push(item);
        displayCart();
      });
    });
  
  
  
    // Отримуємо посилання на кнопку "Кошик"
    const cartLink = document.getElementById('cartLink');
  
    // Отримуємо посилання на модальне вікно кошика
    const modal = document.getElementById('cartModal');
  
    // Отримуємо посилання на кнопку "Закрити" модального вікна
    const closeBtn = modal.querySelector('.close');
  
    // Обробник натискання на кнопку "Кошик"
    cartLink.addEventListener('click', function() {
      // Відображаємо модальне вікно кошика
      modal.style.display = 'block';
  
      // Оновлюємо вміст кошика
      displayCart();
    });
  
    // Обробник натискання на кнопку "Закрити"
    closeBtn.addEventListener('click', function() {
      // Закриваємо модальне вікно кошика
      modal.style.display = 'none';
    });
  });


  let zakaz = document.getElementById('checkoutBtn')
  zakaz.addEventListener('click', function() {
    alert('Ваше замовлення оформленно!')
  })
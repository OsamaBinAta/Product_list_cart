const buttons1 = document.querySelectorAll('.btn_1');
    const buttons2 = document.querySelectorAll('.btn_2');
    const cart0 = document.querySelector('.cart_item0');
    const cart = document.querySelector('.cart_item');
    const list = document.querySelector('.list');
    const cart1 = document.querySelectorAll('.cart_item');
    const _quantity = document.querySelector('.Quantity');
    const title = document.querySelector('.title');
    const e_cost = document.querySelector('.e_cost');
    const line2 = document.querySelector('.line_2');
    const remove_imgs = document.querySelectorAll('.line_1 img');
    const confirm = document.querySelector('.confirm');
    const checkout = document.querySelector('.checkout');
    const overlay = document.querySelector('.overlay');
    const foodcart = document.querySelector('.food_cart');
    const ototal = document.querySelector('.O_total > p:nth-child(2)');
    const new_order=document.querySelector('.checkout button');
    let total_prod = 0;
    // let all_cost = 0;
    let _quan = 1;

    function text1(e) {
      const parentdiv = e.target.closest('.dessert');
      const btn2 = parentdiv.querySelector('.btn_2');
      const img = parentdiv.querySelector('img');
      const name = parentdiv.querySelector('.name').innerHTML;
      const cost = parentdiv.querySelector('.cost').innerHTML;
      const itemsArray = Array.from(cart.querySelectorAll('.line_1'))
        .find((item) => { return item.querySelector('.title').innerText === name; });
      total_prod += 1;
      _quantity.innerHTML = `Your Cart (${total_prod})`;
      img.style.border = '3px solid hsl(14, 86%, 42%)';
      btn2.style.display = 'flex';
      e.target.style.display = 'none';
      cart0.style.display = 'none';
      cart.style.display = 'flex';
      if (!itemsArray) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
    <p class="title">${name}</p>
    <div>
    <p class="quan">1x</p>
    <p class="b_cost">@ ${cost}</p>
    <p class="t_cost">${cost}</p>
    </div>
  `;
        const removeImg = document.createElement('img');
        removeImg.src = 'icon-remove-item.svg';
        const lineDiv = document.createElement('div');
        lineDiv.className = 'line_1';
        lineDiv.appendChild(productDiv);
        lineDiv.appendChild(removeImg);
        cart.insertBefore(lineDiv, cart.firstChild);
      }
      updatecost();
    }


    function text2(e) {
      const dessertdiv = e.target.closest('.dessert');
      const name = dessertdiv.querySelector('.name').innerHTML;
      const parentdiv = e.target.closest('.btn_2');
      let quantity = parseInt(parentdiv.querySelector('p').innerHTML);
      quantity++;
      parentdiv.querySelector('p').innerHTML = `${quantity}`;
      total_prod++;
      _quantity.innerHTML = `Your Cart (${total_prod})`;
      const itemsArray = Array.from(cart.querySelectorAll('.line_1'))
        .find((item) => { return item.querySelector('.title').innerText === name; });
      if (itemsArray) {
        const quan = itemsArray.querySelector('.quan');
        const b_cost = itemsArray.querySelector('.b_cost').innerHTML;
        let total_cost = quantity * parseFloat(b_cost.replace(/[@$]/g, ''));
        itemsArray.querySelector('.t_cost').innerHTML = `$${total_cost.toFixed(2)}`;
        quan.innerHTML = `${quantity}x`;
      }
      updatecost();
    }
    function text3(e) {
      const dessertdiv = e.target.closest('.dessert');
      const parentdiv = dessertdiv.querySelector('.btn_2');
      const btn = dessertdiv.querySelector('.btn_1');
      const img = dessertdiv.querySelector('img');
      const name = dessertdiv.querySelector('.name').innerHTML;
      let quantity = parseInt(parentdiv.querySelector('p').innerHTML);
      total_prod--;
      _quantity.innerHTML = `Your Cart (${total_prod})`;
      const itemsArray = Array.from(cart.querySelectorAll('.line_1'))
        .find((item) => { return item.querySelector('.title').innerText === name; });
      if (quantity > 1) {
        quantity--;
        parentdiv.querySelector('p').innerHTML = `${quantity}`;
        if (itemsArray) {
          const quan = itemsArray.querySelector('.quan');
          const b_cost = itemsArray.querySelector('.b_cost').innerHTML;
          let total_cost = quantity * parseFloat(b_cost.replace(/[@$]/g, ''));
          itemsArray.querySelector('.t_cost').innerHTML = `$${total_cost.toFixed(2)}`;
          quan.innerHTML = `${quantity}x`;
          // console.log(quantity);
        }
        updatecost();
      }
      else {
        itemsArray.remove();
        updatecost();
        img.style.border = 'none';
        btn.style.display = 'flex';
        btn.innerHTML = `<img src="icon-add-to-cart.svg" alt=""><p>Add to Cart</p>`;
        parentdiv.style.display = 'none';
      }
      if (total_prod < 1) {
        cart0.style.display = 'flex';
        cart.style.display = 'none';
      }
    }

    window.addEventListener('resize', updatesize());
    window.addEventListener("DOMContentLoaded", updatesize());
    function updatesize(){
      const dessertdiv=document.querySelectorAll('.dessert');
      dessertdiv.forEach(function(dessert){
        const img=dessert.querySelector('img');
        if (window.innerWidth >= 900){
          img.src=img.src.replace('mobile', 'desktop');
        }
        else{
          img.src=img.src.replace('desktop', 'mobile');
        }
        //console.log(img.src);
      })
    }
    cart.addEventListener('click', function (e) {
      if (e.target.tagName === 'IMG' && e.target.closest('.line_1')) {
        removeline(e);
      }
    });
    buttons1.forEach(function (btn) {
      btn.addEventListener('click', text1);
    })
    buttons2.forEach(function (btn) {
      const addbtn = btn.querySelector('.btn_2 img:nth-child(3)');
      const removebtn = btn.querySelector('.btn_2 img:nth-child(1)');
      addbtn.addEventListener('click', text2);
      removebtn.addEventListener('click', text3);
    });
    confirm.addEventListener('click', function () {
      checkout.classList.toggle('show');
      overlay.classList.toggle('show');
      cart2checkout();
      ototal.innerHTML=e_cost.innerHTML;
    })
    overlay.addEventListener('click', function () {
      checkout.classList.remove('show');
      overlay.classList.remove(('show'));
    })
    new_order.addEventListener('click',function(){
      const line1=document.querySelectorAll('.line_1');
      if(line1)
      line1.forEach(function(line){
    line.remove();
    })
      checkout.classList.remove('show');
      overlay.classList.remove(('show'));
      cart0.style.display = 'flex';
      cart.style.display = 'none';
      total_prod=0;
      _quantity.innerHTML = `Your Cart (${total_prod})`;
      const dessertdiv=document.querySelectorAll('.dessert');
      dessertdiv.forEach(function(dessert){
        const img=dessert.querySelector('img:nth-child(1)');
        const btn1=dessert.querySelector('.btn_1');
        const btn2=dessert.querySelector('.btn_2');
        img.style.border = 'none';
        btn1.style.display = 'flex';
        btn1.innerHTML = `<img src="icon-add-to-cart.svg" alt=""><p>Add to Cart</p>`;
        btn2.style.display = 'none';
      })
    })

    function cart2checkout() {
      const food1= document.querySelector('.food1');
      food1.innerHTML='';
      const lineitems = cart.querySelectorAll('.line_1');
      lineitems.forEach(product => {
        const title = product.querySelector('.title').innerHTML;
        const quantity = product.querySelector('.quan').innerHTML;
        const b_cost = product.querySelector('.b_cost').innerHTML;
        const t_cost = product.querySelector('.t_cost').innerHTML;
        const actualprod= Array.from(document.querySelectorAll('.dessert'))
        .find(item => item.querySelector('.name').innerHTML===title);
        if(actualprod){
          const thumb= actualprod.getAttribute('data-thumb');
        const update_prod = document.createElement('div');
        update_prod.classList.add('food');
        update_prod.innerHTML = `
    <img src="${thumb}" alt="">
    <div class="data1">
      <p>${title}</p>
      <div class="data2"><p>${quantity}</p>
      <p>${b_cost}</p></div>
    </div>
    <p>${t_cost}</p>
        `;
        food1.appendChild(update_prod);
      }
      })
      
    }

    function removeline(e) {
      const line1 = e.target.closest('.line_1');
      const title = line1.querySelector('.title').innerHTML;
      const quan = line1.querySelector('.quan').innerHTML;
      const imgArray = Array.from(list.querySelectorAll('.dessert'))
        .find((img) => { return img.querySelector('.name').innerText === title; });

      let quan_item = parseInt(quan.replace('x', ''));
      if (imgArray) {
        const dessert_img = imgArray.querySelector('.dessert img:nth-child(1)');
        const btn1 = imgArray.querySelector('.btn_1');
        const btn2 = imgArray.querySelector('.btn_2');
        dessert_img.style.border = 'none';
        btn2.style.display = 'none';
        btn1.style.display = 'flex';
        btn1.innerHTML = `<img src="icon-add-to-cart.svg" alt=""><p>Add to Cart</p>`;
        total_prod -= quan_item;
        _quantity.innerHTML = `Your Cart (${total_prod})`;
        if (total_prod < 1) {
          cart0.style.display = 'flex';
          cart.style.display = 'none';
        }
      }
      line1.remove();
      updatecost();
    }

    function updatecost() {
      const prod = document.querySelectorAll('.product');
      let all_cost = 0;
      prod.forEach(function (prodt) {
        const t_cost = prodt.querySelector('.t_cost').innerHTML;
        let cost = parseFloat(t_cost.replace('$', ''));
        all_cost += parseFloat(cost);
        e_cost.innerHTML = '$' + all_cost.toFixed(2);
      })
    }


// get elements
var addToCartButtons = document.getElementsByClassName('btn-primary')
var cartContainer = document.getElementsByTagName('tbody')[0]
var quantityFields = document.getElementsByClassName('num')
var delete_buttons = document.getElementsByClassName('uk-button-danger')
var hearts=Array.from(document.getElementsByClassName("fa-heart"))


// const whiteHeart = '\u2661';
// const blackHeart = '\u2665';
// const button = document.querySelector('button');
// button.addEventListener('click', toggle);

// function toggle() {
//   const like = button.textContent;
//   if(like==whiteHeart) {
//     button.textContent = blackHeart;
//   } else {
//     button.textContent = whiteHeart;
//   }
// }

for(let heart of hearts){
    heart.addEventListener('click',function(){
        if(heart.style.color!=="red") heart.style.color="red"
        else heart.style.color="#212529"
    })
}

// This function add items to shopping cart
function addToCart(event){    
    let itemContainer = document.createElement('tr')
    let btn = event.target
    let btnGrandParent = btn.parentElement.parentElement
    let btnParent = btn.parentElement
    let itemImage = btnGrandParent.children[0].src
    let itemName = btnParent.children[0].innerText
    let itemPrice = btnParent.children[1].innerText
    
    
    itemContainer.innerHTML = `
    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
`
    cartContainer.append(itemContainer)


    // Accessing individual quantity fields
    for(let i = 0; i < quantityFields.length; i++){
        quantityFields[i].value = 1
        quantityFields[i].addEventListener('change', totalCost)
                
    }

    // Accessing individual quantity fields
    for(let i = 0; i < delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', removeItem)
    }
    grandTotal()
}



// This function  multiply the quantity and the price
function totalCost(event){
    let quantity = event.target
    quantity_parent = quantity.parentElement.parentElement
    price_field = quantity_parent.getElementsByClassName('item-price')[0]
    total_field = quantity_parent.getElementsByClassName('total-price')[0]
    price_field_content = price_field.innerText.replace('$', '')
    total_field.children[0].innerText = '$' +  quantity.value * price_field_content
    grandTotal()
    if(isNaN(quantity.value)|| quantity.value <= 0){
        quantity.value = 1
    }
}

// This function  add up the total of the items
function grandTotal(){
    let total = 0
    let grand_total = document.getElementsByClassName('grand-total')[0]
    all_total_fields = document.getElementsByClassName('total-price')
    for(let i = 0; i < all_total_fields.length; i++){
        all_prices = Number(all_total_fields[i].innerText.replace('$', ''))
        total+=all_prices
    }
    grand_total.children[0].innerText = "$"+total
    grand_total.children[0].style.fontWeight = 'bold'
    console.log(total)
}


function removeItem(event){
    del_btn = event.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    console.log(del_btn)
    grandTotal()
}
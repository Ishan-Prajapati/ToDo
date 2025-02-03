const itemform = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearbtn = document.getElementById('clear')
const itemfilter = document.getElementById('filter')
const formbtn = itemform.querySelector('button')
let isEditmode = false; 

function displayitems(){
    const itemfromstorage = getitemfromstorage();
    itemfromstorage.forEach((item) => addItemToDOM(item))
}

function onAdditemsubmit(e){
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem ==''){
        alert("Please enter a value")
        return;
    }
    // create list item DOM element
   addItemToDOM(newItem);
    
   //   add items to storage 
   additemtostorage(newItem);
    checkUI()
    itemInput.value=='';
}
//  check for edit mode 

if(isEditmode){
    const itemtoedit = itemList.querySelector('.edit-mode');

    removeitemfromstorage(itemtoedit.textContent)
    itemtoedit.classList.remove('edit-mode')
    itemtoedit.remove(); 
    isEditmode = false;

}

function addItemToDOM(item){
    const li = document.createElement('li')
   li.appendChild(document.createTextNode(item));
    // create Button
    const button = createButton('remove-item btn-link text-red')
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    li.appendChild(button)
    itemList.append(li)
}

function getitemfromstorage(){
    let itemsfromstorage;
    if(localStorage.getItem('items')===null){
        itemsfromstorage = [];
    }else 
    {
        itemsfromstorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsfromstorage;
}

function additemtostorage(item){
    let itemsfromstorage;
    if(localStorage.getItem('items')===null){
        itemsfromstorage = [];
    }else 
    {
        itemsfromstorage = JSON.parse(localStorage.getItem('items'));
    }
    // add new item to array
    itemsfromstorage.push(item);
    // convert to JSON and set to localstorage
    localStorage.setItem('items',JSON.stringify(itemsfromstorage))
}

function createButton(classes){
    const button = document.createElement('Button')
    button.className=classes;
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i')
    icon.className=classes;
    return icon;
}

function onclickitem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeitem(e.target.parentElement.parentElement);
}else{
    setitemtoedit(e.target)
}
}

function setitemtoedit(item){
    isEditmode =true;
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))
    item.classList.add('edit-mode')
    formbtn.innerHTML= '<i class="fa-solid fa-pen"></i>Update item';
    itemInput.value = item.textContent;
    formbtn.style.backgroundColor = '#228b22'

    
}

function removeitem(item){
    if(confirm("are you sure?")){
    //    remove from dom
        item.remove();

        // remove from localstorage
        removeitemfromstorage(item.textContent)

        formbtn.innerHTML = '<i class = "fa-solid fa-plus"></i>Add item '
        formbtn.style.backgroundColor = '#333'
        isEditmode = 'false'
        checkUI();
    }
    
}

function removeitemfromstorage(item){
    let itemsfromstorage = getitemfromstorage();
    // console.log(itemsfromstorage)
    // filter to removed 
    itemsfromstorage = itemsfromstorage.filter( i => i!== item);

    // re- set to localstorage
    localStorage.setItem('items',JSON.stringify(itemsfromstorage))
}


function clearitem(e){
    if(confirm("Are you want to delete All ?")){
        while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild)
        }
    }
    checkUI()
    localStorage.removeItem('items')
}

function filterItem(e){
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase();
    items.forEach((item)=>{
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text)!=-1){
            item.style.display='flex';
        } else{
            item.style.display='none'
        }
    })
}

function checkUI(){
    itemInput.value = ''
    const items = itemList.querySelectorAll('li')
    console.log(items)
    if(items.length===0){
        clearbtn.style.display='none'
        itemfilter.style.display='none'
    }
    else{
        clearbtn.style.display='block'
        itemfilter.style.display='block'
    }
    formbtn.innerHTML = '<i class="fa-solid fa-pen"></i>Add item '
    formbtn.style.backgroundColor = "#333"
    isEditmode = 'false';
}
function init(){

    clearbtn.addEventListener('click',clearitem)
    itemList.addEventListener('click',onclickitem)
    itemform.addEventListener('submit',onAdditemsubmit)
    itemfilter.addEventListener('keyup',filterItem)
    document.addEventListener('DOMContentLoaded',displayitems)
    checkUI()
}
init()
// 
// 
// 
// 
// 
const itemform = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearbtn = document.getElementById('clear')
const itemfilter = document.getElementById('filter')


function additem(e){
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem ==''){
        alert("Please enter a value")
        return;
    }
    // create list item 
   const li = document.createElement('li')
   li.appendChild(document.createTextNode(newItem));
    // create Button
    const button = createButton('remove-item btn-link text-red')
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    li.appendChild(button)
    itemList.append(li)
    checkUI()
    itemInput.value=='';
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

function removeitem(e){
   if(e.target.parentElement.classList.contains('remove-item')){
    if(confirm("are you sure?")){

        e.target.parentElement.parentElement.remove()
        checkUI()
    }
    // console.log('click')
   }
  
}

function clearitem(e){
    alert("are you want to delete all")
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }
}

function checkUI(){
    const items = document.querySelectorAll('li')
    console.log(items)
    if(items.length===0){
        clearbtn.style.display='none'
        itemfilter.style.display='none'
    }
    else{
        clearbtn.style.display='block'
        itemfilter.style.display='block'
    }
}

clearbtn.addEventListener('click',clearitem)
itemList.addEventListener('click',removeitem)
itemform.addEventListener('submit',additem)
checkUI()
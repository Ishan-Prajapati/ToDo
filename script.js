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
    if(confirm("Are you want to delete All ?")){
        while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild)
        }
    }
    checkUI()
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
}

clearbtn.addEventListener('click',clearitem)
itemList.addEventListener('click',removeitem)
itemform.addEventListener('submit',additem)
itemfilter.addEventListener('keydown',filterItem)
checkUI()
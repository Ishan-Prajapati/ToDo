const itemform = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

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

itemform.addEventListener('submit',additem)
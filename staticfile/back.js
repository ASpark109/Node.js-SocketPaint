const numBlock = 3906;
const socket = io();

let body = document.querySelector('body');
let newUserConnectionMsg = document.querySelector('#newUser');
let submitNameButton = document.querySelector('#nameSubmit');
let name = document.querySelector('#nameInput');
let newUserClick = document.querySelector('#logMess'); 
let block = [];

let userName;

for(let i = 0; i < numBlock; i++)
{
    block[i] = document.createElement('div');
    body.appendChild(block[i]);
}

for(let i = 0; i < numBlock; i++)
{
    block[i].onclick = () => {
        
        if(block[i].style.background == 'rgb(31, 78, 52)')
        {
            socket.emit('clickFalse', i, userName)
        }
        else
        {
            socket.emit('clickTrue', i, userName)
        }
    }
}

socket.on('updata', function(bitField){
    for(let i = 0; i < numBlock; i++)
    {
        if(bitField[i])
        {
            block[i].style.background = 'rgb(31, 78, 52)'
        }
        else
        {
            block[i].style.background = 'rgb(228, 228, 228)'
        }
    }
})

socket.on('broadcast',function(x, state) {
    if(state)
    {
        block[x].style.background = 'rgb(31, 78, 52)';
    }
    else
    {
        block[x].style.background = 'rgb(228, 228, 228)';
    }
 });

socket.on('newUser', function(name){
    newUserConnectionMsg.innerHTML = "New user " + name + " connected";
    newUserConnectionMsg.style.opacity = '1';
    setTimeout(() => {
        newUserConnectionMsg.style.opacity = '0';
    }, 3000)
})

socket.on('nameSet', function(){
    submitNameButton.onclick = () => {
        if(name.value)
        {
            userName = name.value;
            console.log(userName);
            socket.emit('newNameSet', userName);
            name.value = "";
            name.placeholder = "";
        }
    }
})

socket.on('userAction', function(ActName, block)
{
    newUserClick.innerHTML = "User " + ActName + " clicked on block " + (block+1)
    newUserClick.style.opacity = '1';
    setTimeout(() => {
        newUserClick.style.opacity = '0';
    }, 3000)
})

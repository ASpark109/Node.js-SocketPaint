
const socket = io();

let b = document.querySelector('body');
let a = [];

for(let i = 0; i < 4998; i++)
{
    a[i] = document.createElement('div');
    b.appendChild(a[i]);
}

console.log(window.innerHeight)
console.log(window.innerWidth)

for(let i = 0; i < 4998; i++)
{
    a[i].onclick = () => {
        
        if(a[i].style.background == 'rgb(31, 78, 52)')
        {
            socket.emit('clickFalse', i)
        }
        else
        {
            socket.emit('clickTrue', i)
        }
    }
}

socket.on('updata', function(bitField){
    for(let i = 0; i < 4998; i++)
    {
        if(bitField[i])
        {
            a[i].style.background = 'rgb(31, 78, 52)'
        }
        else
        {
            a[i].style.background = 'rgb(228, 228, 228)'
        }
    }
})

socket.on('broadcast',function(x, state) {
    if(state)
    {
        a[x].style.background = 'rgb(31, 78, 52)';
    }
    else
    {
        a[x].style.background = 'rgb(228, 228, 228)';
    }
 });
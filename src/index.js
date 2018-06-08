import './style.css';
import Icon from './img.jpeg';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    var myIcon = new Image();
    myIcon.src = Icon;

    btn.innerHTML = 'Click me and check the console!';
    element.appendChild(btn);
    element.appendChild(myIcon);
    return element;
}

document.body.appendChild(component());
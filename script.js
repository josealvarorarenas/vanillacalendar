'use strict'


let listaMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];

let fechaActual = new Date();
let diaActual = fechaActual.getDate();
let numeroMes = fechaActual.getMonth();
let anioActual = fechaActual.getFullYear();

let dates = document.querySelector('#dates');
let month = document.querySelector('#month');
let year = document.querySelector('#year');

let mesPrevio = document.querySelector('#prev-month');
let mesProximo = document.querySelector('#next-month');

month.textContent = listaMeses[numeroMes];
year.textContent = anioActual.toString();

mesPrevio.addEventListener('click', ()=>lastMonth());
mesProximo.addEventListener('click', ()=>nextMonth());



let writeMonth = (month) => {

    for(let i = startDay(); i > 0 ; i--){
        dates.innerHTML += ` <div class="calendar__date calendar__item calendar__last-days">
            ${getTotalDays(numeroMes-1)-(i-1)}
        </div>`;
    }

    for(let i = 1 ; i <= getTotalDays(month); i++){
        if(i===diaActual) {
            dates.innerHTML += ` <div class="calendar__date calendar__item calendar__today">${i}</div>`;
        }else{
            dates.innerHTML += ` <div class="calendar__date calendar__item">${i}</div>`;
        }
    }
}

let getTotalDays = month => {
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return bisiesto() ? 29:28;
    }
}

let bisiesto = () => {
    return ((anioActual % 100 !==0) && (anioActual % 4 === 0) || (anioActual % 400 === 0));
}

let startDay = () => {
    let start = new Date(anioActual, numeroMes, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
}

let lastMonth = () => {
    if(numeroMes !== 0){
        numeroMes--;
    }else{
        numeroMes = 11;
        anioActual--;
    }

    setNewDate();
}

let nextMonth = () => {
    if(numeroMes !== 11){
        numeroMes++;
    }else{
        numeroMes = 0;
        anioActual++;
    }

    setNewDate();
}

let setNewDate = () => {
    fechaActual.setFullYear(anioActual,numeroMes,diaActual);
    month.textContent = listaMeses[numeroMes];
    year.textContent = anioActual.toString();
    dates.textContent = '';
    writeMonth(numeroMes);
}

writeMonth(numeroMes);



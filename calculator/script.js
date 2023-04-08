// thid id to store input in input box 
let string = "";
// getting elemnts by id 
let buttons = document.querySelectorAll('.button');


// maing array with buttons zutton).forEach arrow
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            string = eval(string);
            document.querySelector('input').value = string;

        }

        else if(e.target.innerHTML== 'C'){
            string ="";
            document.querySelector('input').value = string;
        }

        else {
            console.log(e.target);
            string = string + e.target.innerHTML;
            document.querySelector('input').value = string;
        }


    })
})
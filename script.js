//Wiring event listener to the display and shit

//Functions
function writeToDisplay(txt, cat= false){
    const display = document.querySelector('[data-display]');
    if(cat) 
        display.textContent = display.textContent.concat(txt);
    else 
        display.textContent = txt;

}

function isMaxLengthDisplay(){
    const display = document.querySelector('[data-display]');
    return display.textContent.length > 12;
}

function removeNumDisplay(){
    const display = document.querySelector('[data-display]');
    if(display.textContent.length > 0)
    display.textContent = display.textContent.slice(0,(display.textContent.length - 1));
}

//Keys entered via keyboard input
const valid_keys = [...document.querySelectorAll('button[data-key]')].map(key => {return key.dataset.key});

window.addEventListener('keydown', (event) => {
    //Reset the / key on browser to not search shit and 
    //backspace not to go back previous site.
    if(event.key == '/' || event.key == 'Backspace'){
        event.preventDefault();
     }
    if(valid_keys.indexOf(event.key) != -1){
        // the ` key is considered AC on the calculator
        if(event.key == '`'){
            writeToDisplay('');
        }
        else if(event.key == 'Backspace'){
            removeNumDisplay();
        } else {
            //Query the key
            const key_pressed = document.querySelector(`button[data-key="${event.key}"]`);

            if(!isMaxLengthDisplay()){
                //Display the key
                writeToDisplay(event.key,true);
            }
        }
    }
});

//Via clicking
//Bind the button on the control panel for user to click
const cal_keys = document.querySelectorAll('button[data-key]');
cal_keys.forEach(key => {
    key.addEventListener('click', () => {
        if (key.textContent == 'ac') writeToDisplay('');
        else if(key.textContent == '<-') removeNumDisplay();
        else if(!isMaxLengthDisplay()) {writeToDisplay(key.textContent, true)};
    })
});

//Calculation
let current = 0; //current number
let operand; //The number used to apply operator to.
let operator;
//Connecting to the numeric_display and shit
const numeric_display = document.querySelector('[data-numeric-display]');
const operator_display = document.querySelector('[data-operator]');
const state_display = document.querySelector('[data-state]');

//Functions
function writeToDisplay(txt, cat= false){
    if(cat) 
        numeric_display.textContent = numeric_display.textContent.concat(txt);
    else 
        numeric_display.textContent = txt;
}

function writeToOperatorDisplay(txt){
    operator_display.textContent = txt;
}

function isMaxLengthDisplay(){
    return numeric_display.textContent.length > 12;
}

function removeNumDisplay(){
    if(numeric_display.textContent.length > 0)
    numeric_display.textContent = numeric_display.textContent.slice(0,(numeric_display.textContent.length - 1));
}

function validDecimal(){
    return (numeric_display.textContent.indexOf('.') == -1);
}

function resetVar() {
    first_operand = 0;
    second_operand = 0;
    operator = '';
    state = FOPERAND;
}

function writeToStateDsiplay(current_state){
    let str = '';
    switch(current_state){
        case  0:
            str = 'FOPERAND';
            break;
        case  1:
            str = 'OPERATOR';
            break;
        case  2:
            str = 'SOPERAND';
            break;
    }
    state_display.textContent = str;
}

//Keys entered via keyboard input
const valid_keys = [...document.querySelectorAll('button[data-key]')].map(key => {return key.dataset.key});
valid_keys.push('Enter'); //This is valid as equal sign
const operator_keys = [...document.querySelectorAll('button[data-operator-key]')].map(key => {return key.dataset.key});
operator_keys.push('Enter');

//STATE
const FOPERAND = 0;
const OPERATOR = 1;
const SOPERAND = 2;

let state = FOPERAND;

//Variables
let first_operand = 0;
let second_operand = 0;
let operator = '';

resetVar();
writeToStateDsiplay(state);
window.addEventListener('keydown', (event) => {
    //Reset the / key on browser to not search shit and 
    //backspace not to go back previous site.
    if(event.key == '/' || event.key == 'Backspace'){
        event.preventDefault();
    } 

    if(valid_keys.indexOf(event.key) != -1){

        // the ` key is considered AC on the calculator
        if(event.key == '`'){
            resetVar();
            writeToDisplay('');
            writeToOperatorDisplay('');
        }
        else if(event.key == 'Backspace'){
            removeNumDisplay();
        }
        //Operator key
        else if(operator_keys.indexOf(event.key) != -1) {

            if(state == FOPERAND){
                first_operand = Number(numeric_display.textContent);

                state = OPERATOR; //Waiting for the second number
                if(event.key == 'Enter') {
                    operator = '=';
                } else  {
                    operator = event.key; //Capture the current operation
                }
            } else if (state == SOPERAND){
                let equal_sign = false;
                if(event.key == '=' || event.key ==  'Enter'){
                    equal_sign = true;
                } else {
                    operator = event.key; //Capture the current operation
                }

                if(numeric_display.textContent != ''){
                    second_operand = Number(numeric_display.textContent);
                    switch(operator){
                        case '+':
                            first_operand += second_operand;
                            break;
                        case '-':
                            first_operand -= second_operand;
                            break;
                        case '*':
                            first_operand *= second_operand;
                            break;
                        case '/':
                            first_operand /= second_operand;
                            break;
                        }
                }
                if(equal_sign) {
                    operator = '=';
                    state = FOPERAND;
                } else {
                    state = OPERATOR;
                }
            } else {
                if(event.key == 'Enter') 
                    operator = '=';
                else
                    operator = event.key;
            }

            first_operand = Math.round(first_operand * 1000) / 1000;
            writeToDisplay(first_operand.toString());
            writeToOperatorDisplay(operator);
        }
        //Number key
        else{
            if(!isMaxLengthDisplay()){
                if(state == OPERATOR){
                    if(state == OPERATOR)
                        state = SOPERAND;
                    writeToDisplay('');
                }

                if(event.key == '.'){
                    if(validDecimal())
                        writeToDisplay(event.key,true);
                } else {
                   //display the keys
                    writeToDisplay(event.key,true);
                }
            }
        }
        writeToStateDsiplay(state);
    }
});

//Via clicking
//Bind the button on the control panel for user to click
const cal_keys = document.querySelectorAll('button[data-key]');
cal_keys.forEach(key => {
    key.addEventListener('click', () => {
        window.dispatchEvent(new KeyboardEvent('keydown', {'key': key.dataset.key} ));
    })
});

//The fucking theme selector
//Initial set up
document.body.classList.toggle(document.querySelector('input[type="radio"]:checked').value);   

const themes = document.querySelectorAll('input[type=radio]');
themes.forEach( theme => {
    theme.addEventListener('change', () => {
        if(theme.checked){
            //Toggle what's ever in there
            document.body.classList.toggle(document.body.classList[0]);
            document.body.classList.toggle(theme.value);   
            console.log(document.body.classList);
        }
    });
});
var calc = {};
calc.equation = [];
calc.currentvalue = '';
calc.currentvaluedecimal = false;
calc.answer = '' ;
calc.syntax = false;
calc.operators = ['/','*','+','-'];
window.addEventListener('load',onload);

/*When the window loads*/
function onload(){
	calc.output = document.getElementById('equ');
	var logo = document.getElementById('logo');
	if(logo != null){logo.innerHTML = 'MEMO\'S CALCULATOR V1.0';}
	else{
	document.clear();
	document.write('I see you :-p<br/>Always remember to credit a hardworker');
	}
	document.getElementById('console').style.display = 'none';
}

/*Repopulate the output screen and scroll it*/
function redraw(type){
if(calc.equation.length == 0){
calc.equation = [];
}
	calc.output.innerHTML = '<tt>'+calc.equation.join('') + calc.currentvalue+'</tt>';
if(type != 'ans'){
	calc.output.scrollLeft += calc.output.innerHTML.length*30;
	}
else{
calc.output.scrollLeft = 0;
}
}

//An error message is displayed
function Error(type){
if(type == 'syntax'){
calc.output.innerHTML = '<tt>Syn Error</tt>';
}
else if(type == 'math'){
calc.output.innerHTML = '<tt>Ma Error</tt>';
}
calc.syntax = true;
}

//A custom console
function showstats(){
	var equscroll = calc.output.scrollLeft;
	alert('Scroll: '+equscroll+' CurrentValue: '+calc.currentvalue+' Equation Array length: '+calc.equation.length);
	alert('Full equation: '+calc.equation.join('')+calc.currentvalue);
}

//Clear the entire screen and set values to
//original state
function clearScreen(){
	calc.equation = [];
	calc.currentvalue = '';
	calc.currentvaluedecimal = false;
	calc.syntax = false;
	redraw();
}

//Inputting phase
//Input a digit
function inputdigit(no){
//If an error was already being shown
if(calc.syntax == true){
	calc.equation = [];
	calc.currentvalue = '';
	calc.syntax = false;
}
//Check if a dot is inputted
	if(no == '.'){
		if(calc.currentvalue == ''){
			calc.currentvalue = '0.';
			calc.currentvaluedecimal = true;
			}
		else{
			if(calc.currentvaluedecimal != true){
				calc.currentvalue += '.';
				calc.currentvaluedecimal = true;}
			}	
	}
//If it's an ordinary digit add it to the current value directly		
	else{
		calc.currentvalue += no;
	}
	redraw();
}

/*Add an operator*/
function addoperator(op){
	//If an error was already being shown
	if(calc.syntax == true){
	calc.equation = [];
	calc.currentvalue = '';
	calc.syntax = false;
	}
//If the current value is empty
	if(calc.currentvalue != ''){
		calc.equation.push(calc.currentvalue);
		calc.currentvaluedecimal = false;
		calc.currentvalue = '';
	}
	calc.equation.push(op);
	redraw();
}

function del(){
//If there is no error message
if(calc.syntax != true){
Del();
}
//If there is, clear the error message
else{
calc.currentvalue = calc.equation.pop();
//If it isn't empty
if(calc.currentvalue != null){
//Check if it isn't an operator
var newcheck = checkForOperator(calc.currentvalue);
//If it is
if(newcheck == true){
	calc.equation.push(calc.currentvalue);
	calc.equation = '';
	calc.currentvaluedecimal = false;
}
//If it isn't
else{
	if((calc.currentvalue.indexOf('.')) != -1){calc.currentvaluedecimal = true;}
	else{calc.currentvaluedecimal = false;}
}
}
else{
calc.currentvalue = '';
}
calc.syntax = false;
redraw();
}
}

/*Delete the last digit from the equation*/
function Del(){
//If current value is not empty
	if(calc.currentvalue != ''){
	var lastdigit = calc.currentvalue[calc.currentvalue.length - 1];
//If the last digit is a dot
		if(lastdigit == '.'){
//The current number stops being a decimal
		calc.currentvaluedecimal = false;
		}
		var valarray = calc.currentvalue.split('');
		valarray.pop();
		calc.currentvalue = valarray.join('');
		redraw();
	}
//If current value is empty
	else{
//if the equation is not empty
		if(calc.equation.length != 0){
			calc.currentvalue = calc.equation.pop();
//Check if the current value is an operator
			var check = checkForOperator(calc.currentvalue);
//If it's an operator				
			if(check == true){
					calc.currentvalue = calc.equation.pop();
//Check if the new value is an operator
					var check = checkForOperator(calc.currentvalue);
//If it isn't an operator set it as the new current value
				if(check != true){
//If the current value exists
				 	 if(calc.currentvalue != null){
//Check if the new current value is a decimal number
					 if(calc.currentvalue.indexOf('.') != -1){
						calc.currentvaluedecimal = true;
					  }
					else{
						calc.currentvaluedecimal = false;
					  }
				    }
//This only occurs if there is no equation and current value left
				  else{
				  	calc.currentvalue = '';
				  	}
				}
//If the new value is an operator push it back
				else{
						calc.equation.push(calc.currentvalue);
						calc.currentvalue = '';
				}
			}
//If it is not an operator
				else{
					calc.currentvalue = '';
				}
				
			redraw();
		}
	}
	
}

//It checks if the inputted value is an operand
function checkForOperator(no){
var check;
	for(var i = 0;i < calc.operators.length;i++){
		if(no == calc.operators[i]){
			check = true;
			break;
		}
	}
	if(check == true){
		return true
	}
	else{
		return false;
	}
}


//Execution of the equation
function execute(){
var check;
//create the progress bar and the syntax error message
var progress = document.createElement('progress');
var calcframe = document.getElementById('calculatorframe');
calcframe.appendChild(progress);

//Empty the current value into the equation if it isn't empty
if(calc.currentvalue != ''){
calc.equation.push(calc.currentvalue);
}
calc.currentvalue = '';
calc.currentvaluedecimal = false;

//Checks if you entered anything
if(calc.equation.length != 0){
//Turn the equation into a proper expression
//Digit strings are turned to actual numbers
	calc.temporaryequation = calc.equation;
		for(var i = 0;i < calc.equation.length;i++){
		check = checkForOperator(calc.equation[i]);
		if(check != true){
			calc.temporaryequation[i] = Number(calc.equation[i]);
		}
	}
	
//Check for syntax errors
check = checkForSyntaxError();

//if there is a syntax error
if(check == true){
deleteprogress();
for(var i = 0;i < calc.equation.length;i++){
		calc.equation[i] = calc.equation[i].toString();
	}
Error('syntax');
}
//if there is no syntax error
	else{
	//Set the current value as the answer and clear the equation
	perfect();
	evaluate();
	calc.equation = [];
	calc.currentvalue = calc.answer.toString();
	if(calc.currentvalue.indexOf('e') != -1){
		var epos = calc.currentvalue.indexOf('e');
		var dpos = calc.currentvalue.indexOf('.');
		var split = calc.currentvalue.split('');
		split.splice(epos,split.length);
		if(calc.answer > 0){
		split.splice(dpos,1);
		}
		calc.currentvalue = split.join('');
	}
	deleteprogress();
	if(calc.currentvalue.indexOf('Infinity') != -1){Error('math');}
	else{redraw('ans');}
	}
}
//If you didn't enter anything to begin with
else{
deleteprogress()
}

//Delete the progress bar
	function deleteprogress(){
		calcframe.removeChild(progress);
	}
	
}

//Checks the temporary equation for syntx errors
//If true is returned that means an error was detected
function checkForSyntaxError(){
	var check;
	var firstno = calc.temporaryequation[0]
	var secondno = calc.temporaryequation[1];
	firstDigitCheck();
     function firstDigitCheck(){
//If the first value is '+' or '-'
       	if((firstno == '-' || firstno == '+') == true){
//Check if the second digit isn't an operand
     	   if((typeof secondno) == 'number'){
     	   check = false;
      	   }
  	      else{
      	  check = true;
  	      }
     }
        //If the first value is '*' or '/' there is a syntax error
        else if((firstno == '*' || firstno == '/') == true){
	        check = true;
        }
    }
        
//For the first and last digit syntax
 //If a syntax error is detected
	if(check == true){
		return true;
	}
	
//If it isn't detected
else{
var detected;
//Check if the last digit isn't an operator
	var newcheck = checkForOperator(calc.temporaryequation[calc.temporaryequation.length-1]); 
//If it is	
	if(newcheck == true){
		return true;
		}
//If it isn't
	else{
//check for syntax errors within the equation
operatorcheck:
		for(var i = 0;i < calc.operators.length;i++){
//Set the ope variable to an operator
			var ope = calc.operators[i];
//start searching for the operator
innercheck:
			for(var j = 0;j < calc.temporaryequation.length;j++){
//When an operator is found in the equation
				if(calc.temporaryequation[j] == ope){
//If the operator is a '/' or '*'
					if((ope == '/' || ope== '*')==true){
						check = checkForOperator(calc.temporaryequation[j+1])
//check if the next value is an operator				
						if(check == true){
//If the next operator is a '-' or '+'
							if((calc.temporaryequation[j+1] == '+' || calc.temporaryequation[j+1] == '-') == true){
//Check if the upper value is not another operator
								check = checkForOperator(calc.temporaryequation[j+2]);
//If it is								
								if(check == true){
									detected = true;
									break operatorcheck;
									break;
								}
							}
//else if the next operator is a '*' or '/'
							if((calc.temporaryequation[j+1] == '/' || calc.temporaryequation[j+1] == '*') == true){
								detected = true;
								break operatorcheck;
								break;
							}
						}
					}
//The the found operator is '+' or '-'
					if((ope == '+' || ope== '-')==true){
//check if the next value is an operator
					check = checkForOperator(calc.temporaryequation[j+1])
					//The next value is an operator				
						if(check == true){
							detected = true;
							break operatorcheck;
							break;
						}
					}
				}
			}
		}
		
		if(detected == true){
			return true;
		}
		else{
		if(firstno == '-'){
		secondno = (-1*secondno);
		calc.temporaryequation.splice(0,2,secondno);
		}
		return false;
		}
	}
}
	
}

//This stage perfects your equation
function perfect(){
//check for an instance where '+' and '-' appears after '*' or '/'
	for(var i = 0;i < calc.temporaryequation.length;i++){
//When a '+' is found
		if(calc.temporaryequation[i] == '+'){
		//if the previous value is a '*' or '/'
			if((calc.temporaryequation[i-1] == '/' || calc.temporaryequation[i-1] ==  '*')==true){
			calc.temporaryequation.splice(i,1);
			}
		}
//when a '-' is found
		else if(calc.temporaryequation[i] == '-'){
		//if the previous value is a '*' or '/'
			if((calc.temporaryequation[i-1] == '/' || calc.temporaryequation[i-1] ==  '*')==true){
		//Turn the next value to a negative number
			var result = -1*calc.temporaryequation[i+1];
			calc.temporaryequation.splice(i,2,result);
			}
		}
	}
}

//This is the final stage of execution
//It evaluates the equation using BODMAS
//And returns an answer
function evaluate(){
	var ope;
	var result;
//Use bodmas
calculate()
function calculate(){
	for(var i = 0;i < calc.operators.length;i++){
		ope = calc.operators[i]
		//search the equation for the operator
		for(var j = 0;j < calc.temporaryequation.length;j++){
		//If the operator is found
			if(calc.temporaryequation[j] == ope){
				switch(ope){
				//If its a division sign
					case '/':if(calc.temporaryequation[j-1] == 0){result = 0;}
								else{result = calc.temporaryequation[j-1]/calc.temporaryequation[j+1];}
								calc.temporaryequation.splice(j-1,3,result);
								break;
				//If its a multiplication sign
					case '*':result = calc.temporaryequation[j-1]*calc.temporaryequation[j+1];
								calc.temporaryequation.splice(j-1,3,result);
								break;		
				//If its an addition sign
					case '+':result = calc.temporaryequation[j-1]+calc.temporaryequation[j+1];
								 calc.temporaryequation.splice(j-1,3,result);
								  break;
				//If its a subtraction sign	
					case '-':if(calc.temporaryequation[j-1] == 0){result = -1*calc.temporaryequation[j+1];}
								else{result = calc.temporaryequation[j-1]-calc.temporaryequation[j+1];}
								calc.temporaryequation.splice(j-1,3,result);
								break;		
				}
			}
		}
	}
}
//check if the equation has been fully evaluated
while(calc.temporaryequation.length > 1){
calculate();
}
	calc.answer = calc.temporaryequation[0];
}
/*The calculator class*/
function Calculator(screen=''){
	this.equation = [''];
	this.operators = ['(',')','/','*','+','-'];
	this.numbers = ['.','0','1','2','3','4','5','6','7','8','9'];
	this.message = '';
	this.screen = screen;
	this.brackets = [];
}

/*Input a digit character*/
Calculator.prototype.inputDigit = 
	function(no){
		/*Check if there is no answer or warning message*/
		if(this.message == ''){
			var lastDigit = this.equation.length-1;
			/*If a dot is inputted*/
			if(no == '.'){
				if(this.equation[lastDigit] == '') this.equation[lastDigit] = '0.';			
				else if(this.equation[lastDigit].indexOf('.') == -1) this.equation[lastDigit] += '.';			
			}
			/*If it's an ordinary digit add it to the current value directly*/		
			else if(this.numbers.indexOf(no) != -1) this.equation[lastDigit] += no;
			/*If an invalid input is entered*/
			else console.log("An invalid number was entered!\nCharacter: "+no)
		}
		/*If there is an answer or warning message, clear it*/
		else this.message = '';
		/*Update the screen*/
		this.updateScreen();
	}

/*Input an operator character*/
Calculator.prototype.inputOperator =
	function(op){
		/*If the screen is free*/
		if(this.message == ''){
			/*If it's an allowed operator*/
			if(this.operators.indexOf(op) != -1){
				var lastDigit = this.equation.length-1;
				/*If the current digit is not empty*/
				if(this.equation[lastDigit] != '') this.equation.push(op,'');
				/*If the current digit is empty*/
				else{
					this.equation[lastDigit] = op;
					this.equation.push('');		
				}
				/*If a new bracket is opened, record it's starting coordinates*/
				if(op == '('){
					/*For the first bracket*/
					if(this.brackets.length == 0) this.brackets.push([[this.equation.length-2]]); 
					/*When another bracket is already opened*/
					else{
						/*Loop through the brackets*/
						for(i = 0;i < this.brackets.length;i++){
							/*If a sub level is being continued*/
							if(this.brackets[i][this.brackets[i].length-1].length == 2){
								this.brackets[i].push([this.equation.length-2]);
								break;
							}
							/*If another sub level still exists*/
							else if(i+1 != this.brackets.length){
								if(this.brackets[i+1][this.brackets[i+1].length-1].length == 2){
									this.brackets[i+1].push([this.equation.length-2]);	
									break;
								}
							}
							/*If no other sub level exists, create a new sub level*/
							else if(i+1 == this.brackets.length){
								this.brackets.push([[this.equation.length-2]]);
								break;
							}
						}
					}
				}
				/*If a bracket is being closed*/
				if(op == ')'){
					var bracketExists = false;
					/*Check if it's corresponding open bracket exists, starting from the bottom*/
					for(i = this.brackets.length-1;i >= 0;i--){
						/*When it is found, input the ending coordinates and stop searching*/
						if(this.brackets[i][this.brackets[i].length-1].length == 1){
							this.brackets[i][this.brackets[i].length-1].push(this.equation.length-2);
							bracketExists = true;
							break;
						}
					}
					/*If the corresponding open bracket is not found, remove the close bracket*/
					if(!bracketExists){
						this.equation.pop();
						this.equation.pop();
						if(this.equation.length == 0) this.equation = [''];
						lastDigit = this.equation.length-1;
						if(this.operators.indexOf(this.equation[lastDigit]) != -1){
							this.equation.push('');
						}
					}
				}
			}
			/*When there is an unknown operator*/
			else console.log("An invalid operator was inputed\nCharacter:"+op);
		}
		/*Else if an answer is already occupying the screen*/
		else if(this.numbers.indexOf(this.message[0]) != -1 | this.operators.indexOf(this.message[0]) != -1){
			var temp = this.message;
			this.clearScreen();
			this.equation[0] = temp;
			this.inputOperator(op);
		}
		/*Else if it's an error message clear the screen*/
		else this.message = '';
		/*Update the screen*/
		this.updateScreen();
	}

/*Delete last entered character*/
Calculator.prototype.del =
	function(){
		if(this.message == ''){
			var lastDigit = this.equation.length-1;
			/*If the last input is an operator*/
			if(this.equation[lastDigit] == '' & this.operators.indexOf(this.equation[lastDigit-1]) != -1){
				this.equation.pop();
				var op = this.equation.pop();
				/*If the operator was a close bracket, delete the coordinates of the outermost close bracket*/
				if(op == ')'){
					for(var i = 0;i < this.brackets.length;i++){
						if(this.brackets[i][this.brackets[i].length-1].length == 2){
							this.brackets[i][this.brackets[i].length-1].pop();
							break;
						}
					}
				}
				/*If the operator is a open bracket, delete the coordinates of the outer most open bracket*/
				if(op == '('){
					for(var i = this.brackets.length-1;i >= 0;i--){
						if(this.brackets[i][this.brackets[i].length-1].length == 1){
							this.brackets[i].pop();
							if(this.brackets[i].length == 0)this.brackets.pop();
							break;
						}
					}
				}
				/*If the next input is also an operator*/
				lastDigit = this.equation.length-1;
				if(this.operators.indexOf(this.equation[lastDigit]) != -1) this.equation.push('');
			}
			/*If the last input is a digit, delete the last character*/
			else{
				/*If the last digit isn't empty continue*/
				if(this.equation[lastDigit] != '') this.equation[lastDigit] = this.equation[lastDigit].slice(0,this.equation[lastDigit].length-1);
			}
			/*If there are no more inputs*/
			if(this.equation.length == 0) this.equation = [''];
		}
		/*Clear the message*/
		else{
			var temp = Object.create(this.equation);
			this.clearScreen();
			/*Re-input everything to ensure the brackets are not affected*/
			for(var i = 0; i < temp.length; i ++){
				/*When an operator is encountered*/
				if(this.operators.indexOf(temp[i]) != -1) this.inputOperator(temp[i]);
				else{
					/*Input every character in a number*/
					for(var j = 0;j < temp[i].length;j++){
						if(this.numbers.indexOf(temp[i][j]) != -1) this.inputDigit(temp[i][j]);
						/*When a '-' sign is encountered*/
						else this.inputOperator(temp[i][j].toString());
					}
				}
			}
			/*Clear the message*/
			this.message = '';
		}
		/*Update the screen*/
		this.updateScreen();
	}
	
/*Clear the entire screen*/
Calculator.prototype.clearScreen = 
	function(){
		this.equation = [''];
		this.message = '';
		this.brackets = [];
		this.temporaryEquation = [];
		/*Update the screen*/
		this.updateScreen();
	}

/*Update the output screen and scroll it*/
Calculator.prototype.updateScreen =
	function(){
		if(screen != ''){
			var screen = document.querySelector(this.screen);
			/*If the screen isn't superimposed by the answer or an error message*/
			if(this.message == ''){
				var string = '';
				for(var i = 0;i < this.equation.length;i++){
					string += this.equation[i];
				}
				screen.innerHTML = "<tt>"+string+"</tt>";
				screen.scrollLeft += screen.innerHTML.length*30;
			}
			else{
				screen.innerHTML = "<tt>"+this.message+"<tt>";
				screen.scrollLeft = 0;
			}
		}
		/*When there is no out put screen*/
		else console.log("Output screen not set for the calculator!");
	}

/*Evaluate the equation*/
Calculator.prototype.evaluate = 
	function(){
		this.temporaryEquation = Object.create(this.equation);
		/*Trim the equation*/
		if(this.temporaryEquation[this.temporaryEquation.length-1] == '') this.temporaryEquation.pop();
		/*Digit strings are turned to actual numbers*/
		for(var i = 0;i < this.temporaryEquation.length;i++){
			if(this.operators.indexOf(this.temporaryEquation[i]) == -1) this.temporaryEquation[i] = Number(this.temporaryEquation[i]);
		}
		/*Check for syntax errors errors*/
		var check = this.checkForSyntaxError();
		/*If an error was found*/
		if(check) this.message = "Syntax Error";
		/*If no error was found then equation is valid*/
		else{
			/*Handle all brackets available starting from the lowests*/
			if(this.brackets.length != 0){
				/*Start from the lowest level*/
				for(i = this.brackets.length-1;i >= 0;i--){
					/*Start from the last bracket in the level*/
					for(var j = this.brackets[i].length-1;j >= 0;j--){
						/*Get the coordinates of the bracket*/
						var coord = this.brackets[i][j];
						/*Get the equation*/
						var equ = this.temporaryEquation.slice(coord[0]+1,coord[1]);
						/*Check if the coordinates of upper levels are not affected*/
						for(var k=i-1;k >= 0;k--){
							for(var l = this.brackets[k].length-1;l>=0;l--){
								var currentBracket = this.brackets[k][l];
								/*If an upper bracket was affected validate it*/
								if(currentBracket[1] > coord[1]) this.brackets[k][l][1] -= coord[1]-coord[0];
								if(currentBracket[0] > coord[1]) this.brackets[k][l][0] -= coord[1]-coord[0];
							}
						}
						var answer = this.handleBracket(equ);
						var length = coord[1]-coord[0]+1;
						this.temporaryEquation.splice(coord[0],length,answer);
					}
				}
			}
			/*Process the main equation after all brackets have been solved*/
			this.temporaryEquation = this.perfect();
			this.message = this.bodmas();
		}
		/*If a math error popped up*/
		if(this.message.indexOf("Infinity") != -1) this.message = "Math Error";
		if(this.message.indexOf("N") != -1) this.message = "Syntax Error";
		if(this.message.indexOf("e") != -1) this.message = "Stack Error";
		/*Update the screen*/
		this.updateScreen();
	}

/*Checks the temporary equation for syntax errors
If true is returned that means an error was detected*/
Calculator.prototype.checkForSyntaxError =
	function(){
		/*Loop through every input*/
		for(var i = 0;i < this.temporaryEquation.length;i++){
			/*When an operator is found*/
			if(this.operators.indexOf(this.temporaryEquation[i]) != -1){
				if((i == this.temporaryEquation.length-1 & this.temporaryEquation[this.temporaryEquation.length-1] != ')') | (i == 0 & (this.temporaryEquation[i] == '/' | this.temporaryEquation[i] == '*' | this.temporaryEquation[i] == ')')) ) return true;
				switch(this.temporaryEquation[i]){
					case '/':
					case '*':
					case '+':
					case '-':
					case '(':
						if(this.temporaryEquation[i+1] == '*' | this.temporaryEquation[i+1] == '/' | this.temporaryEquation[i+1] == ')') return true;
						break;
				}
				if(this.operators.indexOf(this.temporaryEquation[i+1]) != -1 & (this.operators.indexOf(this.temporaryEquation[i+2]) != -1 & this.temporaryEquation[i+2] != '(' & this.temporaryEquation[i] != ')')){
					if(this.temporaryEquation[i+1] == '(' & this.temporaryEquation[i+2] != '-' & this.temporaryEquation[i] != '+') return true;
				}
				if(this.temporaryEquation[i] == '(' & i-1 != -1) if(this.operators.indexOf(this.temporaryEquation[i-1]) == -1) return true;
				if(this.temporaryEquation[i] == ')' & i+1 < this.temporaryEquation.length) if(this.operators.indexOf(this.temporaryEquation[i+1]) == -1) return true;
			}
		}
		/*Check if the brackets are properly closed*/
		if(this.brackets.length!=0) if(this.brackets[0][this.brackets[0].length-1].length == 1) return true;
		/*When there is no syntax error return false*/
		return false;
	}

/*This function handles brackets like the main equation and returns the answer*/
Calculator.prototype.handleBracket=
	function(equation){
		var perfectEquation = this.perfect(equation);
		return Number(this.bodmas(perfectEquation));
	}

/*This converts the numbers to positives and negatives*/
Calculator.prototype.perfect=
	function(equation = this.temporaryEquation){
		/*Loop through the temporary equation*/
		var newEquation = [];
		for(var i = 0;i < equation.length;i++){
			switch(equation[i]){
				case '+':
					if(this.operators.indexOf(equation[i+1]) == -1) newEquation.push(equation[i+1]);
					else if(equation[i+1] == '+'){
							newEquation.push(equation[i+2]);
							equation.splice(i+1,1);
						}
					else if(equation[i+1] == '-'){
							newEquation.push(equation[i+2]*-1);
							equation.splice(i+1,1);
						}
					break;
				case '-':
					if(this.operators.indexOf(equation[i+1]) == -1) newEquation.push(equation[i+1]*-1);
					else if(equation[i+1] == '+'){
							newEquation.push(equation[i+2]*-1);
							equation.splice(i+1,1);
						}
					else if(equation[i+1] == '-'){
							newEquation.push(equation[i+2]);
							equation.splice(i+1,1);
						}
					break;
				default: 
					if(equation[i-1] != '-' & equation[i-1] != '+') newEquation.push(equation[i]);
			}
		}
		return newEquation;
	}

/*This is the final stage of execution*/
Calculator.prototype.bodmas=
	function(equation = this.temporaryEquation){
		var newEquation = equation;
		/*Handle divisions in the temporary equation until none are left*/
		function handleDivision(){
			var i = newEquation.indexOf('/');
			if(i != -1){
				if(newEquation[i-1] == 0 & newEquation[i+1] != 0){
					newEquation.splice(i-1,3,0);
				}
				else if(newEquation[i-1] == 0 & newEquation[i+1] == 0){
					newEquation.splice(i-1,3,Infinity);
				}
				else newEquation.splice(i-1,3,newEquation[i-1]/newEquation[i+1]);
				return true;
			}
			else return false;
		}
		/*Handle multiplications in the temporary equation until none are left*/
		function handleMultiplication(){
			var i = newEquation.indexOf('*');
			if(i != -1){
				if(newEquation[i-1] == 0) newEquation.splice(i-1,3,0);
				else newEquation.splice(i-1,3,newEquation[i-1]*newEquation[i+1]);
				return true;
			}
			else return false;
		}
		/*Order of operations*/
		while(handleDivision()){}
		while(handleMultiplication()){}
		/*Handle additions and subtractions*/
		var answer = 0;
		for(var i = 0;i < newEquation.length;i++){
			answer += newEquation[i];
		}
		/*Return the final answer as a string*/
		return answer.toString();
	}
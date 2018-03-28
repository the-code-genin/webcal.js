
function Calculator(screen=''){
	this.equation = [''];
	this.operators = ['(',')','/','*','+','-'];
	this.numbers = ['.','0','1','2','3','4','5','6','7','8','9'];
	this.message = '';
	this.screen = screen;
	this.brackets = [];
}


Calculator.prototype.inputDigit = 
	function(no){
		
		if(this.message == ''){
			var lastDigit = this.equation.length-1;
			
			if(no == '.'){
				if(this.equation[lastDigit] == '') this.equation[lastDigit] = '0.';			
				else if(this.equation[lastDigit].indexOf('.') == -1) this.equation[lastDigit] += '.';			
			}
					
			else if(this.numbers.indexOf(no) != -1) this.equation[lastDigit] += no;
			
			else console.log("An invalid number was entered!\nCharacter: "+no)
		}
		
		else this.message = '';
		
		this.updateScreen();
	}


Calculator.prototype.inputOperator =
	function(op){
		
		if(this.message == ''){
			
			if(this.operators.indexOf(op) != -1){
				var lastDigit = this.equation.length-1;
				
				if(this.equation[lastDigit] != '') this.equation.push(op,'');
				
				else{
					this.equation[lastDigit] = op;
					this.equation.push('');		
				}
				
				if(op == '('){
					
					if(this.brackets.length == 0) this.brackets.push([[this.equation.length-2]]); 
					
					else{
						
						for(i = 0;i < this.brackets.length;i++){
							
							if(this.brackets[i][this.brackets[i].length-1].length == 2){
								this.brackets[i].push([this.equation.length-2]);
								break;
							}
							
							else if(i+1 != this.brackets.length){
								if(this.brackets[i+1][this.brackets[i+1].length-1].length == 2){
									this.brackets[i+1].push([this.equation.length-2]);	
									break;
								}
							}
							
							else if(i+1 == this.brackets.length){
								this.brackets.push([[this.equation.length-2]]);
								break;
							}
						}
					}
				}
				
				if(op == ')'){
					var bracketExists = false;
					
					for(i = this.brackets.length-1;i >= 0;i--){
						
						if(this.brackets[i][this.brackets[i].length-1].length == 1){
							this.brackets[i][this.brackets[i].length-1].push(this.equation.length-2);
							bracketExists = true;
							break;
						}
					}
					
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
			
			else console.log("An invalid operator was inputed\nCharacter:"+op);
		}
		
		else if(this.numbers.indexOf(this.message[0]) != -1 | this.operators.indexOf(this.message[0]) != -1){
			var temp = this.message;
			this.clearScreen();
			this.equation[0] = temp;
			this.inputOperator(op);
		}
		
		else this.message = '';
		
		this.updateScreen();
	}


Calculator.prototype.del =
	function(){
		if(this.message == ''){
			var lastDigit = this.equation.length-1;
			
			if(this.equation[lastDigit] == '' & this.operators.indexOf(this.equation[lastDigit-1]) != -1){
				this.equation.pop();
				var op = this.equation.pop();
				
				if(op == ')'){
					for(var i = 0;i < this.brackets.length;i++){
						if(this.brackets[i][this.brackets[i].length-1].length == 2){
							this.brackets[i][this.brackets[i].length-1].pop();
							break;
						}
					}
				}
				
				if(op == '('){
					for(var i = this.brackets.length-1;i >= 0;i--){
						if(this.brackets[i][this.brackets[i].length-1].length == 1){
							this.brackets[i].pop();
							if(this.brackets[i].length == 0)this.brackets.pop();
							break;
						}
					}
				}
				
				lastDigit = this.equation.length-1;
				if(this.operators.indexOf(this.equation[lastDigit]) != -1) this.equation.push('');
			}
			
			else{
				
				if(this.equation[lastDigit] != '') this.equation[lastDigit] = this.equation[lastDigit].slice(0,this.equation[lastDigit].length-1);
			}
			
			if(this.equation.length == 0) this.equation = [''];
		}
		
		else{
			var temp = Object.create(this.equation);
			this.clearScreen();
			
			for(var i = 0; i < temp.length; i ++){
				
				if(this.operators.indexOf(temp[i]) != -1) this.inputOperator(temp[i]);
				else{
					
					for(var j = 0;j < temp[i].length;j++){
						if(this.numbers.indexOf(temp[i][j]) != -1) this.inputDigit(temp[i][j]);
						
						else this.inputOperator(temp[i][j].toString());
					}
				}
			}
			
			this.message = '';
		}
		
		this.updateScreen();
	}
	

Calculator.prototype.clearScreen = 
	function(){
		this.equation = [''];
		this.message = '';
		this.brackets = [];
		this.temporaryEquation = [];
		
		this.updateScreen();
	}


Calculator.prototype.updateScreen =
	function(){
		if(screen != ''){
			var screen = document.querySelector(this.screen);
			
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
		
		else console.log("Output screen not set for the calculator!");
	}


Calculator.prototype.evaluate = 
	function(){
		this.temporaryEquation = Object.create(this.equation);
		
		if(this.temporaryEquation[this.temporaryEquation.length-1] == '') this.temporaryEquation.pop();
		
		for(var i = 0;i < this.temporaryEquation.length;i++){
			if(this.operators.indexOf(this.temporaryEquation[i]) == -1) this.temporaryEquation[i] = Number(this.temporaryEquation[i]);
		}
		
		var check = this.checkForSyntaxError();
		
		if(check) this.message = "Syntax Error";
		
		else{
			
			if(this.brackets.length != 0){
				
				for(i = this.brackets.length-1;i >= 0;i--){
					
					for(var j = this.brackets[i].length-1;j >= 0;j--){
						
						var coord = this.brackets[i][j];
						
						var equ = this.temporaryEquation.slice(coord[0]+1,coord[1]);
						
						for(var k=i-1;k >= 0;k--){
							for(var l = this.brackets[k].length-1;l>=0;l--){
								var currentBracket = this.brackets[k][l];
								
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
			
			this.temporaryEquation = this.perfect();
			this.message = this.bodmas();
		}
		
		if(this.message.indexOf("Infinity") != -1) this.message = "Math Error";
		if(this.message.indexOf("N") != -1) this.message = "Syntax Error";
		if(this.message.indexOf("e") != -1) this.message = "Stack Error";
		
		this.updateScreen();
	}

/*Checks the temporary equation for syntax errors
If true is returned that means an error was detected*/
Calculator.prototype.checkForSyntaxError =
	function(){
		
		for(var i = 0;i < this.temporaryEquation.length;i++){
			
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
		
		if(this.brackets.length!=0) if(this.brackets[0][this.brackets[0].length-1].length == 1) return true;
		
		return false;
	}


Calculator.prototype.handleBracket=
	function(equation){
		var perfectEquation = this.perfect(equation);
		return Number(this.bodmas(perfectEquation));
	}


Calculator.prototype.perfect=
	function(equation = this.temporaryEquation){
		
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


Calculator.prototype.bodmas=
	function(equation = this.temporaryEquation){
		var newEquation = equation;
		
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
		
		function handleMultiplication(){
			var i = newEquation.indexOf('*');
			if(i != -1){
				if(newEquation[i-1] == 0) newEquation.splice(i-1,3,0);
				else newEquation.splice(i-1,3,newEquation[i-1]*newEquation[i+1]);
				return true;
			}
			else return false;
		}
		
		while(handleDivision()){}
		while(handleMultiplication()){}
		
		var answer = 0;
		for(var i = 0;i < newEquation.length;i++){
			answer += newEquation[i];
		}
		
		return answer.toString();
	}
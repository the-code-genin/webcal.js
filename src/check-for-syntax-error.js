/*Checks the temporary equation for syntax errors
If true is returned that means an error was detected*/
Calculator.prototype.checkForSyntaxError =
	function(){
		/*Loop through every input*/
		for(var i = 0;i < this.temporaryEquation.length;i++){
			/*When an operator is found*/
			if(this.operators.indexOf(this.temporaryEquation[i]) != -1){
				/*Check if it's at the beginning or the end of the equation*/
				if((i == this.temporaryEquation.length-1 & this.temporaryEquation[this.temporaryEquation.length-1] != ')') | (i == 0 & (this.temporaryEquation[i] == '/' | this.temporaryEquation[i] == '*' | this.temporaryEquation[i] == ')')) ) return true;
				/*Check if the next input is also an operator*/
				if(this.operators.indexOf(this.temporaryEquation[i+1]) != -1){
					switch(this.temporaryEquation[i]){
						case '/':
						case '*':
						case '^':
						case '+':
						case '-':
						case '(':	
							if(this.temporaryEquation[i+1] != '+' & this.temporaryEquation[i+1] != '-'
							& this.temporaryEquation[i+1] != '√' & this.temporaryEquation[i+1] != '(') return true;
							/*If the upper input is also an operator*/
							if(this.operators.indexOf(this.temporaryEquation[i+2]) != -1){
								if(this.temporaryEquation[i+2] != '√' & this.temporaryEquation[i+2] != '('){
									if(this.temporaryEquation[i+1] == '(' | this.temporaryEquation[i+1] == '√'){
										if(this.temporaryEquation[i+2] == '/' | this.temporaryEquation=='*') return true;
									}
									else return true;
								}
							}
							break;
						case '√':
							if(this.temporaryEquation[i+1] != '+' & this.temporaryEquation[i+1] != '('
							& this.temporaryEquation[i+1] != '√')return true;
							/*If the upper input is also an operator*/
							if(this.operators.indexOf(this.temporaryEquation[i+2]) != -1){
								if(this.temporaryEquation[i+2] != '(' & this.temporaryEquation[i+2] != '√'
								& this.temporaryEquation[i+2] != '+') return true;
							}
							break;
						case ')':	
							if(this.temporaryEquation[i+1] != '+' & this.temporaryEquation[i+1] != '-'
							& this.temporaryEquation[i+1] != '*' & this.temporaryEquation[i+1] != '/'
							&this.temporaryEquation[i+1] != ')' & this.temporaryEquation[i+1] != '^') return true;			
					}
				}
				/*If the next input is not an operator*/
				else{
					switch(this.temporaryEquation[i]){
						case ')':
							if(this.temporaryEquation.length - i != 1) if(this.numbers.indexOf(this.temporaryEquation[i+1]) == -1) return true;
							break;
					}
				}
			}
			/*When a number is found*/
			else if(this.numbers.indexOf(this.temporaryEquation[i].toString()) != -1){
				switch(this.temporaryEquation[i+1]){
					case '(':
					case '√':
						return true;
						break;
				}
			}
		}
		/*Check if the brackets are properly closed*/
		if(this.brackets.length!=0) if(this.brackets[0][this.brackets[0].length-1].length == 1)return true;
		/*When there is no syntax error return false*/
		return false;
	}
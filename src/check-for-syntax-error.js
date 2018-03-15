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
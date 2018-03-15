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
			temp = [];
			/*Clear the message*/
			this.message = '';
		}
		/*Update the screen*/
		this.updateScreen();
	}
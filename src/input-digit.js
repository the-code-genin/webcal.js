/*Input a digit character*/
Calculator.prototype.inputDigit = 
	function(no){
		/*Check if there is no answer of warning message*/
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

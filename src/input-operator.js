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

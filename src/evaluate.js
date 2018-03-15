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
			alert("Temp equation:\n"+this.temporaryEquation);
			/*Process the main equation after all brackets have been solved*/
			this.temporaryEquation = this.perfect();
			this.message = this.bodmas();
		}
		/*If a math or internal error popped up*/
		if(this.message.indexOf("Infinity") != -1) this.message = "Math Error";
		if(this.message.indexOf("N") != -1) this.message = "Syntax Error";
		/*Update the screen*/
		this.updateScreen();
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
					if(equation[i] == '*' | equation[i] == '/' | equation[i] == '√'){
						newEquation.push(equation[i]);
					}
					else if(equation[i-1] != '-' & equation[i-1] != '+') newEquation.push(equation[i]);
			}
		}
		return newEquation;
	}
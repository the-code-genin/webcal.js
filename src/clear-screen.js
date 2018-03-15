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

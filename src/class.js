/*The calculator class*/
function Calculator(screen=''){
	this.equation = [''];
	this.operators = ['(',')','/','*','+','-','√','^'];
	this.numbers = ['.','0','1','2','3','4','5','6','7','8','9'];
	this.message = '';
	this.screen = screen;
	this.brackets = [];
}
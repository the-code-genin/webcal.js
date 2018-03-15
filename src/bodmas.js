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
/*Update the output screen and scroll it*/
Calculator.prototype.updateScreen =
	function(){
		if(screen != ''){
			var screen = document.querySelector(this.screen);
			/*If the screen isn't superimposed by the answer or an error message*/
			if(this.message == ''){
				var string = '';
				for(var i = 0;i < this.equation.length;i++){string += this.equation[i];}
					screen.innerHTML = "<tt>"+string+"</tt>";
					screen.scrollLeft += screen.innerHTML.length*30;
			}
			else{
				screen.innerHTML = "<tt>"+this.message+"<tt>";
				screen.scrollLeft = 0;
			}
		}
		/*When there is no out put screen*/
		else console.log("Output screen not set for the calculator!");
	}

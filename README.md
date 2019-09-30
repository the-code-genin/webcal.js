# WEBCAL.JS

An easy to use javascript library for creating quick and beautiful GUI calculators.

**Note::** This project is no longer being maintained.

# Description

With this lightweight and easy to use javascript library, you don't need to be an experienced programmer to embed a working GUI calculator on your webpages.
Being an independent library you don't need the knowledge of other libraries like jquery, angular etc to implement it.

You should visit the github page for a better documentation of the project.

# Installation

To install the library simply include it in your webpage using the script tag.

```HTML
<script src="library_url"></script>
```

# How To Use

After including the library in your webpage, in another script tag create a new calculator object passing the the ID of the output element(**A paragraph or div is recommended**) as an argument. i.e

```HTML
<script>var Calc = new Calculator(output ID);<script>
 ```

Then map the calculator object's methods to html elements. i.e

```HTML
 <button onclick="Calc.inputDigit('9')">9</button>

 <button onclick="Calc.inputOperator('+')">+</button>
```

Check out the examples to see working demonstrations.

## Calculator controls
Below are the calculator object's methods.

- **Calculator.inputDigit(digit);**

   This method is used for inputting digit characters into the calculator.
 
   Allowed digits = ('0','1','2','3','4','5','6','7','8','9','.')
   
   **Note:** Digits must be inputted as single character strings.
   
- **Calculator.inputOperator(operator);**

   This method is used for inputting operator characters into the calculator.
 
   Standard operators = ('/','*','+','-','(',')')
   
   **Note:** Operators must be inputted as single character strings.
 
- **Calculator.del();**

  This method is used for deleting the last character entered into the calculator.
 
- **Calculator.clearScreen();**

  This method is used to clear all characters on the screen.
 
- **Calculator.evaluate();**
  
  This method evaluates the input and returns the output as either an error message or an answer.

# Contributors
  [Iyiola-am](https://github.com/Iyiola-am)

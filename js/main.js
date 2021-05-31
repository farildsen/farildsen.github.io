
window.onload = () => {

     
      // ----------------------------- THEME TOGGLER ----------------------------         
       
      //Uncomment below to clear localStorage
      //localStorage.clear()

      //getting any previous saved theme
      let themeMode = localStorage.getItem('theme') 

      //create a div for the checkmark
      const checkmark = document.createElement('div')
  
      
      // if no theme has previously been saved in localStorage then use theme-1
      // else set the last saved theme
       if(!themeMode) {
             const targetElement = document.querySelector("[data-area-theme='1']")
             targetElement.appendChild(checkmark).setAttribute('id', 'checkmark') 
        } 
        
      else {
             const targetElement = document.querySelector("[data-area-theme='" + themeMode + "']")
             targetElement.appendChild(checkmark).setAttribute('id', 'checkmark')
             document.documentElement.setAttribute('data-theme', themeMode)     
       }

      
      // adding eventListener to all areas of the toggle button (checkmark-areas)
      document.querySelectorAll('.checkmark-area').forEach(item => {
            item.addEventListener('click', event => {

                  //set data-theme on html-element to the theme matching the pressed button
                  document.documentElement.setAttribute('data-theme', item.dataset.areaTheme)
              
                  //move checkmark to the correct position relative to the current theme
                  const currentPos = document.querySelector("#checkmark")
                  let targetDiv = document.querySelector("[data-area-theme='" + item.dataset.areaTheme + "']")
                  targetDiv.appendChild(currentPos)

                  //update localStorage
                  localStorage.setItem('theme', item.dataset.areaTheme )
            })
      })




     //------------------------------- CALCULATOR ----------------------------------------
      
      
      class Calculator {
            constructor(previousOperandTextElement, currentOperandTextElement, currentOperand) {
                  this.previousOperandTextElement = previousOperandTextElement
                  this.currentOperandTextElement =  currentOperandTextElement
                  this.currentOperand = currentOperand
                  this.clear()
            }

            clear() {
                  this.currentOperand = '0'
                  this.previousOperand = ''
                  this.operation = undefined
            }

            delete() {
                  this.currentOperand = this.currentOperand.toString().slice(0, -1)
                  if(this.currentOperand === '') {
                        this.currentOperand = '0'
                  }
            }

            appendValue(number) {
                  if(number === '.' && this.currentOperand.includes('.')) return

                  if(number !== '.' && this.currentOperand === '0') {
                        this.currentOperand = ''
                        this.currentOperand = this.currentOperand.toString() + number.toString()
                  }
                  else {
                        this.currentOperand = this.currentOperand.toString() + number.toString()         
                  }
                  
            }

            chooseOperation(operation) {
                  if(this.currentOperand === '') return
                  if(this.previousOperand !== '') {
                        this.compute()
                  }
                  this.operation = operation
                  this.previousOperand = this.currentOperand
                  this.currentOperand = ''
            }

            compute() {
                  let computation
                  const previous = parseFloat(this.previousOperand)
                  const current = parseFloat(this.currentOperand)

                  if(isNaN(previous) || isNaN(current)) return

                  switch(this.operation) {
                        case '+': 
                              computation = previous + current
                              break
                        case '-': 
                              computation = previous - current
                              break
                        case '/': 
                              computation = previous / current
                              break
                        case 'x': 
                              computation = previous * current
                              break
                        default:
                              return
                  }
 
                  this.currentOperand = computation
                  this.operation = undefined
                  this.previousOperand = ''
                  console.log(this.previousOperand)
            }

            updateDisplay() {
                  this.currentOperandTextElement.innerText = this.currentOperand
                  if(this.operation != null) {
                        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
                  } 
                  else {
                        this.previousOperandTextElement.innerText = this.previousOperand
                  }                
            }
      }

      
      const numberKeys = document.querySelectorAll('[data-number]')
      const operationKeys = document.querySelectorAll('[data-operation]')
      const equalsKey = document.querySelector('[data-equals]')
      const deleteKey = document.querySelector('[data-delete]')
      const resetKey = document.querySelector('[data-reset]')
      const previousOperandTextElement = document.querySelector('[data-previous-operand]')
      const currentOperandTextElement = document.querySelector('[data-current-operand]')
      let currentOperand = '0'

      const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, currentOperand)

      calculator.updateDisplay()

      numberKeys.forEach(button => {
           button.addEventListener('click', () => {
            calculator.appendValue(button.innerText)
            calculator.updateDisplay()
           }) 
      })

      operationKeys.forEach(button => {
            button.addEventListener('click', () => {
             calculator.chooseOperation(button.innerText)
             calculator.updateDisplay()
            }) 
       })

      equalsKey.addEventListener('click', button => {
            calculator.compute()
            calculator.updateDisplay()
      })

      resetKey.addEventListener('click', button => {
            calculator.clear()
            calculator.updateDisplay()
      })

      deleteKey.addEventListener('click', button => {
            calculator.delete()
            calculator.updateDisplay()
      })















      
}





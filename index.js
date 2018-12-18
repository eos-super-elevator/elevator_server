const express = require('express')
const app = express()
const Gpio = require('onoff').Gpio //include onoff to interact with the GPIO

function makeLEDBlink(duration = 5000, interval = 250) {
  let LED = new Gpio(4, 'out') //use GPIO pin 4, and specify that it is output
  let blinkInterval = setInterval(blinkLED, 250) //run the blinkLED function every 250ms

  function blinkLED() { //function to start blinking
    if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
      LED.writeSync(1) //set pin state to 1 (turn LED on)
    } else {
      LED.writeSync(0) //set pin state to 0 (turn LED off)
    }
  }

  function endBlink() { //function to stop blinking
    clearInterval(blinkInterval) // Stop blink intervals
    LED.writeSync(0) // Turn LED off
    LED.unexport() // Unexport GPIO to free resources
  }

  setTimeout(endBlink, duration); //stop blinking after 5 seconds
}

app.get('/', function(req, res) {

  makeLEDBlink()

  res.send('Hello World!')
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

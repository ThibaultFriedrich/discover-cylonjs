# Control arduino from a web interface

This project uses the same circuit as the project button-led.

You can switch on/off the LED directly from the web interface accessible at http://localhost:8080. If you push the button, it still switches the LED but also updates the switch on the web interface. In this way, the web interface and the reality are consistent at every time.

    node web-controller.js


You can also access to the web interface through an other device by using the ip address of the computer hosting the cylon.js script `web-controller.js`.

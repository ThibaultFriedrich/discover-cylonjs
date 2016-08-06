# To control arduino for computer

    npm install cylon cylon-firmata --save

## Upload the firmware

You need to upload the cylon.js firmware on the arduino. For that you need `gort`.

**Do not use `npm install -g gort`**.

Go to the page http://gort.io/documentation/getting_started/downloads/ and download your OS version.


```bashrc

$ gort scan serial # scan the serial ports to find where is the arduino.
1 serial port(s) found.

1. [/dev/ttyACM0] - [usb-Arduino__www.arduino.cc__0043_85438363938351B0A001-if00]
    USB device:  Bus 002 Device 010: ID 2341:0043 Arduino SA Uno R3 (CDC ACM)

$ gort arduino install # install locally arduino firmware

$ gort arduino upload firmata /dev/ttyACM0 # upload the firmware into the arduino

```

## Projects

* button-led: first example to control a led from a push button.

## Hardware

All the examples have been tested with an arduino UNO.

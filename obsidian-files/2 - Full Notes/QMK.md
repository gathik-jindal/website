16th Nov '24, 16:47pm

Status: #Completed #ProperNotes 

Tags: [[Keyboards]]

# QMK

QMK (_Quantum Mechanical Keyboard_) is an open source community centered around developing computer input devices. The community encompasses all sorts of 
input devices, such as keyboards, mice,
and MIDI devices. A core group of collaborators maintains [QMK Firmware](https://github.com/qmk/qmk_firmware), [QMK Configurator](https://config.qmk.fm/), [QMK Toolbox](https://github.com/qmk/qmk_toolbox), [qmk.fm](https://qmk.fm/), and this documentation with the
help of community members like you.

But here we will only talk about keyboards.

Currently I use the Redragon k630, this uses the cheaper sonix chip and is not supported by QMK, instead I'll be using a fork called SonixQMK that supports th
cheaper chip. Many manufacturers have
started using the cheaper chip and hence a demand for it started to creep up.

## Where are we now?

After wasting half a day, I've figured this much out. All of this is really cool if you have a compatible keyboard. It'll be expensive because microcontrollers that allow
one to change specific leds and extra, will have complexity and hence be expensive.

The redragon k630 uses the BYK901 MCU. We are not sure if its QMK or even SonixQMK for that matter, compatible.

QMK is really good when one needs to remap certain keys of their keyboard, or even if one is building their own keyboard and they probably require it.

# References
https://docs.qmk.fm/
https://sonixqmk.github.io//SonixDocs/
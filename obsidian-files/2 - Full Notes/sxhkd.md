14th Jul '24, 14:12pm

Status: #Completed #Small 

Tags: [[Linux]] [[X.org]]

# sxhkd

> [sxhkd](https://github.com/baskerville/sxhkd) is a simple X hotkey daemon, by the developer of bspwm, that reacts to input events by executing commands
								\- Arch Wiki

sxhkd is very useful to export key bindings across window managers, its easy-to configure syntax, compatibility with X directly and options make it very usable.

>[!info]
>Easiest way to learn its syntax is through the `man` pages.

## Binding Multiple / Chain of keys
Read the `man` carefully, there they specifically tell us that, to chain key presses (chords), the keys except the last one need to be valid modifiers, only the last key can be anything! So chaining something like:

`b + u`

is not possible.

And also keep in mind, `shift_L` and similar chords are not modifiers since we specified they key itself. look [here](https://github.com/baskerville/sxhkd/issues/188#issuecomment-700068328)

>[!Note]
>Need to search how to convert a chord to a modifier

# References
https://github.com/baskerville/sxhkd/issues/188
https://wiki.archlinux.org/title/Sxhkd
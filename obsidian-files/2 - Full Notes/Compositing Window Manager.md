12th Jun '24, 19:48pm

Status: #Completed 

Tags: [[GUI]] [[Linux]]

# Compositing Window Manager

When using a ==_compositing_ window manager==, each application window has an off-screen buffer into which the application draws. It is the task of the window manager to create a "composition" of windows on screen, with each window reflecting the contents of the buffer to which the application has written. The window manager of course does not compose the screen out of its own free will; the windows are placed by the user using the mouse or keyboard commands.

With this arrangement an application can draw to its window as if it was the only graphical program running, and it is the task of the compositor to make several programs coexist on the same screen, by placing the windows and clipping them if they overlap.

Before the introduction of compositing window managers, _stacking window managers_ were typically used. With a stacking window manager, when a window belonging to an application needed to be redrawn, the application itself had to be sent a message informing that (part of) the window had been exposed. When this happened, the application was expected to do the redrawing. If the application failed to do so, the area would typically retain its old, now garbled contents.

I'm not much into games, but it is my understanding that they typically use the display in full-screen mode. In this case the compositor is not very relevant, and the compositor may even be disabled altogether.

currently, picom is giving so many issues :L

# References
https://unix.stackexchange.com/questions/359257/what-is-a-compositor-in-general-and-which-gives-the-best-performance-ubuntu
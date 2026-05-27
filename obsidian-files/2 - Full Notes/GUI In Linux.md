---
aliases:
  - Window Manager
  - Display Manager
  - Display Server
  - Desktop Environment
---
4th Jul '24, 22:20pm

Status: #Completed #ProperNotes 

Tags: [[GUI]] [[Linux]] [[Boot Up]]

# GUI In Linux

There are three components of GUIs in Linux:

- [[#Display Manager]]
- [[#Display Server]]
- [[#Window Manager]]
- [[#Compositing Window Manager]]

## Display Manager

A display manager, or login manager, is typically a graphical user interface that is displayed at the end of the boot process in place of the default shell. There are various implementations of display managers, just as there are various types of window managers and desktop environments. There is usually a certain amount of customization and themeability available with each one.

## Display Server

refer to: [[Windowing System#^display-server|Display Server]]

## Window Manager

Because display servers only offer ways of drawing stuff onscreen, you need a program on top of it to use that in order to manage windows, and that is the job of a *Window Manager*. They keep track of how many windows you have open, which one is the focused one, where on the screen they are, and take all that info to the display server in order to be drawn onscreen. Some window managers can be used standalone as a minimalist yet streamlined experience (like OpenBox, i3wm, IceWM, etc.), while others are an integral part of a more complete desktop environment (like KWin from KDE Plasma, Mutter from GNOME, Xfwm from Xfce, and so on).

## Compositing Window Manager

Now, compositors change a bit on definition if we are talking about X or Wayland. In the X world, they refer to a piece of software that works alongside a window manager to add fancy effects like animations, transparency, and make windows wobble like if they were made of jelly when you drag them around. Popular ones are picom and compiz. In the Wayland realm, it is the name given to a window manager itself as wayland requires that the window manager takes care of that instead of a separate companion program.

# References
https://wiki.archlinux.org/title/display_manager
https://www.reddit.com/r/linux4noobs/comments/16o83wp/what_are_the_differences_between_display_servers/
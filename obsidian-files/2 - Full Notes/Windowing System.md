11th Jun '24, 17:14pm ^e35e70

Status: #ProperNotes #Completed 

Tags: [[OS]] [[GUI]]

# Windowing System

A **windowing system** (or **window system**) is a ==software suite that manages separately different parts of display screens==. It is a type of graphical user interface (GUI) which implements the WIMP (windows, icons, menus, pointer) paradigm for a user interface.

![[windowingSystem.png]]

The basic components of a GUI: The **display server** implements the windowing system. A simple window manager merely draws the window decorations, but compositing window managers do more.

## Technical Details

The main component of any windowing system is usually called the ==display server==, although alternative denominations such as window server or compositor are also in use. ==Any application that runs and presents its GUI in a window, is a client of the display server==. The display server and its clients ==communicate with each other over an application programming interface (API) or a communications protocol==, which is usually ==called display server protocol==, the display server being the mediator between the clients and the user.

==Display server receives all the input from the kernel, that the kernel receives from all attached input devices, such as keyboard, pointing devices, or touchscreen and transmits it to the correct client==. ==The display server is also responsible for the output of the clients to the computer monitor==. The output of sound is usually not managed by the display server, but the sound volume is usually handled through GUI applets and it is the display server who decides which applications are on top. ==A windowing system enables the computer user to work with several programs at the same time==. Each program presents its GUI in its own window, which is generally a rectangular area of the screen.

## Display Server
^display-server

A **display server** or **window server** is a program whose primary ==task is to coordinate the input and output of its clients to and from the rest of the operating system==, the hardware, and each other. The display server communicates with its clients over the ==display server protocol, a communications protocol==, which can be network-transparent or simply network-capable.

The display server is a key component in any graphical user interface, specifically the windowing system.

The server/client relationship of a standalone display server is somewhat counterintuitive in that a "server" is usually thought of as a large, remote machine, whereas a standalone "display server" is a small local system, with most clients being executed on a larger central machine. ==The explanation is that a display server provides the _services_ of a display and input devices==.

## Display Server Communication Protocols

### X11

The X.Org Server communicates with its clients, e.g. [Amarok](https://en.wikipedia.org/wiki/Amarok_(software) "Amarok (software)"), over the X11 protocol.

One example of a display server is the X.Org Server, which runs on top of the kernel (usually a Unix-like kernel, such as Linux or BSD. It receives user input data (e.g. from evdev on Linux) and passes it to one of its clients. The display server also receives data from its clients; it processes the data, it does the compositing and on Linux it passes the data to one of three kernel components – DRM, gem (Graphics Execution Manager) or KMS driver. The component writes the data into the framebuffer and content of the framebuffer is transmitted to the connected screen and displayed. X relies on [[GLX]].

One of the implementations of display server concept is [[Basic Linux Concepts & Terminology#^x-window-system|X Window System]], in particular its actually used version – X.Org Server and Xlib and XCB client libraries. The X.Org Server is a display server, but in its current implementation it relies on a second program, the [[Compositing Window Manager]], to do the compositing. Examples are [Mutter](https://en.wikipedia.org/wiki/Mutter_(window_manager) "Mutter (window manager)") or [KWin](https://en.wikipedia.org/wiki/KWin "KWin").

Notable examples of display servers implementing the X11 display server protocol are X.Org Server, XFree86, XQuartz and Cygwin/X, while client libraries implementing the X11 display server protocol are Xlib and XCB.

### Wayland

Display servers that implement the Wayland display server protocol are called Wayland compositors. Like any display server, a Wayland compositor is responsible for handling input and output for its clients and, in contrast to X11, the compositing as well. Examples are [Weston](https://en.wikipedia.org/wiki/Weston_(software) "Weston (software)"), [Mutter](https://en.wikipedia.org/wiki/Mutter_(software) "Mutter (software)"), [KWin](https://en.wikipedia.org/wiki/KWin "KWin") or [Enlightenment](https://en.wikipedia.org/wiki/Enlightenment_(software) "Enlightenment (software)").

Wayland compositors communicate with Wayland clients over the Wayland display server protocol. This protocol defines that clients can directly write data into the framebuffer using the EGL rendering API. The display server still gets to decide which window is on top and thus visible to the user and also still is responsible for passing data regarding to input devices from evdev to its clients.

Wayland is used to a certain degree in some Linux desktop distributions, such as [Fedora](https://en.wikipedia.org/wiki/Fedora_(operating_system) "Fedora (operating system)"). It is also well suited for mobile computing and has been adopted, for example, by the smartphone- and tablet-focused projects [Tizen](https://en.wikipedia.org/wiki/Tizen "Tizen"), [Sailfish OS](https://en.wikipedia.org/wiki/Sailfish_OS "Sailfish OS") and [AsteroidOS](https://en.wikipedia.org/wiki/AsteroidOS "AsteroidOS").

# References
https://en.wikipedia.org/wiki/Windowing_system
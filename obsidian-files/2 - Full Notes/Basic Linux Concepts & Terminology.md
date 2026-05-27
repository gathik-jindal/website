9th Jun '24, 11:31am

Status: #InProgress #ProperNotes 

Tags: [[Linux]] [[Terminal]]

# Basic Linux Concepts & Terminology

### Graphical User Interface (GUI):

Updated Version on this topic: [[GUI In Linux]]

- **Desktop Environment (DE)**: A complete suite of software for the GUI, including a window manager, file manager, and standard applications (e.g., GNOME, KDE Plasma, XFCE).
- **Window Manager (WM)**: Manages the placement and appearance of windows within the GUI (e.g., i3, Openbox). It is part of the Desktop Environment.

### X Window System (X11) and Wayland:

^x-window-system

- **X11**: The traditional display server protocol providing the basic framework for a GUI environment on Unix-like systems.
- **Wayland**: A newer protocol intended to replace X11, offering a simpler and more modern approach to display server management.

Also see: [[Windowing System]]
### Login Process:

- **TTY (TeleTYpewriter)**: Virtual consoles that provide command-line interfaces. You can switch between them using `Ctrl+Alt+F1` to `Ctrl+Alt+F7`.
- **Graphical Login**: The screen you see to log in to your system graphically, provided by the display manager.

Also see: [[Login Process of Linux]]

### Main Functions of a Display Manager

1. **Graphical Login Screen**:
    - Provides a user-friendly interface to log in to the system.
    - Manages user authentication, often integrating with system security protocols like PAM (Pluggable Authentication Modules).

2. **Session Management**:
    - Starts and manages user sessions.
    - Handles session-related tasks such as running startup scripts, setting environment variables, and launching the desktop environment or window manager.

3. **User Switching**:    
    - Allows multiple users to log in and switch between their sessions without logging out.

# Also See

- [[BIOS]]
- [[Disk Partitioning]]
- [[Disk Partitioning|MBR]]
- [[Display Manager]]
- [[Login Process of Linux]]
- [[PACMAN]]
- [[SUDO]]
- [[Compositing Window Manager]]
- [[GLX]]
- Honestly A lot more...

# References

https://chatgpt.com/share/5506a88f-fd92-4f65-b4ca-e60ce3c3aadf
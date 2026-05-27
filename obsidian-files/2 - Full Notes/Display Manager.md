9th Jun '24, 08:11am

Status: #Completed #Small

Tags: [[Linux]] [[Terminal]]

# Display Manager

First of all, this is the worst name given to a piece of software, it should be called ==login-manager== and not display manager, since it handles the UI and start up at the time of login.

### Main Functions of a Display Manager
 
1. **Graphical Login Screen**:
    - Provides a user-friendly interface to log in to the system.
    - Manages user authentication, often integrating with system security protocols like PAM (Pluggable Authentication Modules).
2. **Session Management**:
    - Starts and manages user sessions.
    - Handles session-related tasks such as running startup scripts, setting environment variables, and launching the desktop environment or window manager.
3. **User Switching**:
    - Allows multiple users to log in and switch between their sessions without logging out.

### Popular Display Managers

- **GDM (GNOME Display Manager)**: The default for GNOME.
- **SDDM (Simple Desktop Display Manager)**: Often used with KDE Plasma.
- **LightDM**: Lightweight and highly configurable, used in various distributions.
- **XDM (X Display Manager)**: A basic, older display manager.

# Also See

[[Windowing System]]

# References

ChatGPT :nervous:
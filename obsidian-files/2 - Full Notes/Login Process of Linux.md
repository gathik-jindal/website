12th Jun '24, 20:03pm

Status: #Completed #ProperNotes #Small 

Tags: [[Linux]] [[OS]] [[Systemd]]

# Login Process of Linux

### 1. Boot Process

1. **BIOS/UEFI Initialization**: The system firmware performs hardware initialization and hands control over to the bootloader.
2. **Bootloader**: Typically GRUB (Grand Unified Bootloader) in many Linux distributions. The bootloader loads the Linux kernel into memory and passes control to it.
3. **Kernel Initialization**: The Linux kernel initializes hardware and mounts the root filesystem.

### 2. Init System

1. **init/Systemd**: The kernel starts the `init` process (PID 1). On most modern systems, this is managed by `systemd`. `init` or `systemd` then starts essential services and mounts filesystems.
2. **Targets/Runlevels**: The system reaches a specific `runlevel` or target. For graphical login, the system must reach a `runlevel` that supports graphical interfaces (commonly `runlevel` 5 or `graphical.target` in `systemd`).

### 3. Display Manager

1. **Starting the Display Manager**: The display manager (e.g., GDM, LightDM, SDDM) is started by `systemd` or `init` once the system reaches the appropriate target.
2. **Graphical Login Screen**: The display manager presents the graphical login screen (greeter) to the user.

### 4. User Authentication

1. **User Input**: The user enters their username and password.
2. **Authentication**: The display manager verifies the credentials using system authentication mechanisms such as PAM (Pluggable Authentication Modules).
3. **Session Selection**: The user may select a specific session type (e.g., GNOME, KDE Plasma, XFCE).

### 5. Session Initialization

1. **X11/Wayland Server**: Depending on the system setup, either an X11 server or a Wayland compositor is started.
2. **Starting the Session**: The display manager starts the user session by launching the appropriate session manager for the selected desktop environment or window manager.
3. **Running Startup Scripts**: The session manager runs startup scripts and initializes user-specific settings and applications.

### Detailed Flow of the Login Process

#### A. From Boot to Display Manager

1. **Bootloader Stage**:
    - GRUB loads the kernel.
2. **Kernel Stage**:
    - Kernel initializes hardware.
    - Mounts root filesystem.
    - Hands control to `init`/`systemd`.
3. **init/systemd Stage**:
    - Starts essential services.
    - Reaches graphical target/runlevel.
    - Launches the display manager service.

#### B. From Display Manager to Desktop Environment

1. **Display Manager Initialization**:
    - Display manager starts and configures the graphical login screen.
2. **User Login**:
    - User inputs credentials.
    - Display manager uses PAM to authenticate.
3. **Session Setup**:
    - Depending on success, the display manager initializes the graphical session.
    - Starts X11/Wayland.
    - Launches the selected desktop environment or window manager.
4. **User Session**:
    - Desktop environment’s session manager starts.
    - Runs user-specific startup scripts (e.g., `.xinitrc`, `.xsession`).
    - Initializes the desktop environment.

# Also see

[[Display Manager]]

# References
https://chatgpt.com/share/5506a88f-fd92-4f65-b4ca-e60ce3c3aadf
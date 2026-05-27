10th Jan '25, 11:55am

Status: #InProgress #ProperNotes 

Tags: [[Linux]] [[OS]]

# Hotkey Capturing

In Linux, key capture and event handling work through the kernel and user-space programs, relying on a well-defined event subsystem. Here's an overview of how key captures work and why one program capturing a key might prevent another from doing so.

---
### **How Key Capture Works in Linux**

1. **Input Events and the Kernel:**
    - The Linux kernel handles hardware inputs, including keyboards, through the **input subsystem**.
    - Key presses and releases generate **input events**, which the kernel exposes via device files, typically found under `/dev/input/`.
2. **X11 or Wayland:**
    - In a graphical environment, the input events are passed to a display server like X11 or Wayland. These systems mediate between the kernel and user-space applications.
    - For X11, programs like window managers, keybinding daemons, or other applications register interest in key events.
3. **User-Space Programs:**
    - Programs like `sxhkd` (a keybinding daemon), `dwm` (a window manager), or even individual applications listen for specific key events.
    - These programs use libraries or APIs like `Xlib`, `xcb`, or Wayland equivalents to intercept input events

---
### **Why One Program Captures the Key Exclusively**

#### **1. Passive vs. Active Grabs**

- In X11, applications can register keybindings in two main ways:
    - **Passive Grab:** This allows an application to "claim" a keybinding. For example, `sxhkd` might grab `Mod4+Return` to launch a terminal.
    - **Active Grab:** When a program actively listens for all input events, such as a global shortcut program, it takes precedence.

If an application passively grabs a key combination, **other programs cannot also grab it simultaneously**. The key event is routed to the first program that successfully grabs it.

#### **2. Focus and Context**

- Some programs capture keys based on the active window or screen focus. For example:    
    - A keybinding set in `dwm` is usually scoped to the window manager itself.
    - Applications like `sxhkd` may operate globally, capturing keys even if a specific window has focus.
- If `sxhkd` grabs a key globally, the event does not propagate to other programs because the input system considers it "handled."

#### **3. Propagation and Handling**

- When a key is pressed:
    1. The kernel generates an input event.
    2. The event is passed to the display server (e.g., X11).
    3. The display server checks if any application or window manager has claimed the keybinding.
    4. If a program has registered a grab for the key, the event is delivered to that program and **not forwarded further**.
### **Solutions for Keybinding Conflicts**

1. **Check Priority of Grabs:**
    
    - Use tools like `xev` (X11) or `evtest` to see how keys are captured and which program claims them.
2. **Scope Keybinding Programs:**
    
    - Limit the scope of global keybinds in programs like `sxhkd` to avoid overriding window manager keybindings.
3. **Chain Keybinding Programs:**
    
    - Use a primary program (like `sxhkd`) to manage keybindings and execute scripts or commands for other programs.
4. **Use a Dedicated Keybinding System:**
    
    - In Wayland, compositors like `sway` or `Hyprland` handle keybindings directly, often avoiding conflicts with external programs.

---

### **Why Can't Multiple Programs Capture the Same Key?**

This behavior is by design, to avoid conflicts and ambiguity:

- If multiple programs tried to handle the same key event, it would be unclear which program's action to prioritize.
- By allowing only one grab for a keybinding, the system ensures deterministic behavior.

---
### **Solutions for Keybinding Conflicts**

1. **Check Priority of Grabs:**
    
    - Use tools like `xev` (X11) or `evtest` to see how keys are captured and which program claims them.
2. **Scope Keybinding Programs:**
    
    - Limit the scope of global keybinds in programs like `sxhkd` to avoid overriding window manager keybindings.
3. **Chain Keybinding Programs:**
    
    - Use a primary program (like `sxhkd`) to manage keybindings and execute scripts or commands for other programs.
4. **Use a Dedicated Keybinding System:**
    
    - In Wayland, compositors like `sway` or `Hyprland` handle keybindings directly, often avoiding conflicts with external programs.

---

### **How Key Capturing Works**

#### **Key Events in the Kernel**

- The kernel generates **individual key events** for every key press and release (e.g., `KEY_A` for the "A" key or `KEY_LEFTCTRL` for the "Ctrl" key).
- These events are sent to `/dev/input/event*` device files or passed to the display server.

#### **Key Handling in X11 or Wayland**

- X11 or Wayland receives these individual key events and can combine them into **key combinations** by tracking pressed keys.

---

### **Individual Keys vs. Key Combinations**

1. **Individual Key Events**:
    - Programs like `evtest` or `/dev/input` event listeners receive **raw events** for key presses (`KEYDOWN`) and key releases (`KEYUP`).
    - These are low-level and represent single keys.
2. **Key Combinations**:
    - Higher-level libraries, like X11's `Xlib` or Wayland's APIs, interpret combinations of key events.
    - For example:
        - Pressing `Ctrl` emits a `KEY_LEFTCTRL` event.
        - Holding `Ctrl` and pressing `C` emits `KEY_C` but with the modifier `Ctrl`.
3. **Grabbing Key Events**:
    - Programs don't grab raw individual key events unless they're working at the kernel level (e.g., tools like `xev` or `libinput`).
    - Instead, they register interest in specific **combinations** (e.g., `Ctrl+C` or `Alt+Tab`).
    - If a program grabs a combination, it effectively blocks others from using the same combination, not necessarily the individual keys.

---

### **Why Does It Feel Like Individual Keys Are Captured?**

#### **Modifier Keys (Ctrl, Alt, Shift, etc.)**

- Modifier keys like `Ctrl`, `Alt`, and `Shift` are often **always grabbed and tracked** by the display server or keybinding program.
- This allows them to be combined with other keys to create shortcuts like `Ctrl+C` or `Alt+Tab`.
- The modifier itself is not "captured" exclusively but contributes to combinations.

#### **Global Grabs**

- Some programs grab individual keys globally. For example:
    - A media key like `KEY_PLAYPAUSE` might be captured by a media daemon (e.g., `playerctl`) regardless of the current focus.
- This can prevent other programs from reacting to the same key.

---

### **Key Combination Conflicts**

When a program claims a key combination:
1. The program registers the combination (e.g., `Mod4+Return`) with the display server (in X11) or compositor (in Wayland).
2. The display server checks for conflicts:
    - If another program has already claimed `Mod4+Return`, the new program cannot register it.
    - The first program to grab the combination gets exclusive handling of it.

This explains why you can't "share" key combinations between programs.
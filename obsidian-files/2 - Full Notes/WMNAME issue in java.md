16th Nov '24, 09:06am

Status: #Small #Completed 

Tags: [[Java]]

# WMNAME issue in java

>You may use the [wmname](https://archlinux.org/packages/?name=wmname) from [suckless.org](https://tools.suckless.org/x/wmname) to make the JVM believe you are running a different window manager. This may solve a rendering issue of Java GUIs occurring in window managers like [Awesome](https://wiki.archlinux.org/title/Awesome "Awesome") or [Dwm](https://wiki.archlinux.org/title/Dwm "Dwm") or [Ratpoison](https://wiki.archlinux.org/title/Ratpoison "Ratpoison"). This works because the JVM contains a hard-coded list of known, non-re-parenting window managers. For maximum irony, some users prefer to impersonate `LG3D`, the non-re-parenting window manager [written by Sun, in Java](https://en.wikipedia.org/wiki/Project_Looking_Glass "wikipedia:Project Looking Glass"). Try setting "compiz", "Metacity" or "LG3D".

```bash
$ wmname _window_manager_name_
```

You must restart the application in question after issuing the wmname command.

Alternatively, the [javaagent JavaMatePatch](https://github.com/zheludkovm/JavaMatePatch), created to set the WM name in [MATE](https://wiki.archlinux.org/title/MATE "MATE") and resolve the bug with java swing apps working incorrectly when launched in full screen, can be used. Add `-javaagent:JavaMatePatch-1.0.0-SNAPSHOT.jar=_window_manager_name_` to the java options to use it.

# References
https://wiki.archlinux.org/title/Java#Impersonate_another_window_manager
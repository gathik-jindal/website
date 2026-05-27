14th Jul '24, 13:39pm

Status: #InProgress 

Tags: [[Linux]] [[File System]]

# Different Ways to Start a Program Automatically

Before we can begin we need to understand the following files:

- **.xprofile**: Its executed by display managers before starting window manager or desktop environment.
- **.profile**: Executed by login shells when you log in to your system either via a terminal or a graphical interface that starts a login shell.
- **.xsession**: Executed by display managers if you select a custom session.
- **.xsessionrc**: Sourced by `.xsession`.
- **.xinitrc**: Executed by the `startx` command.
- **.bashrc**: Executed by launching a non-login interactive shells.
- **.bash_profile**: Executed by login bash shells which includes logging in via the console or an SSH session.

## To Simplify It

During Login:
- `.profile` or `.bash_profile` is executed depending on your shell. For bash `.bash_profile` takes precedence.

# References
https://www.reddit.com/r/linux/comments/1p6orz/bashrc_bash_profile_inputrc_profile_xprofile/?rdt=37891
https://bbs.archlinux.org/viewtopic.php?id=56188
https://unix.stackexchange.com/questions/281858/difference-between-xinitrc-xsession-and-xsessionrc
https://stackoverflow.com/questions/41397361/xprofile-vs-xsession-vs-xinitrc
9th Jun '24, 05:29am

Status: #Completed #Small #ProperNotes 

Tags: [[Linux]] [[Terminal]]

# SUDO

`sudo` stands for SUPER USER DO, this means any command with the `sudo` prefix gets ==elevated privileges, temporarily granting them `root` access==. This allows users to perform tasks that ==require administrative power==, such as installing software, modifying system files, or configuring network settings, ==without having to log in as the root user==.

When a user runs a command with the `sudo` prefix, the system checks the `/etc/sudoers` file to determine if the ==user is allowed to execute the command==. All commands with `sudo` need to ==type in the root password== to confirm if they're a `sudo` user.

for more in detail understanding of `sudo` check out [Geeksforgeeks](https://www.geeksforgeeks.org/sudo-command-in-linux-with-examples/).

# References
https://search.brave.com/search?q=what+is+sudo+in+linux&source=desktop&summary=1&summary_og=ac7cc36261fd167677bc24
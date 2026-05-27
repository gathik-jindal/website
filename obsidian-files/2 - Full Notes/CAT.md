9th Jun '24, 07:25am

Status: #Small #Completed #ProperNotes 

Tags: [[Linux]] [[Terminal]] [[Linux File Editing]]

# CAT

The cat command in Linux is a powerful tool for ==manipulating files==. It is commonly used to ==display the content of existing files, concatenate multiple files, create new files, append content to existing files, and redirect output in the terminal or files==. Here are some examples of how to use the cat command:

**Displaying the content of a file:**

```bash
cat filename
```

Replace `filename` with the name of the file you want to display. For example:

```bash
cat testfile.txt
```

This will display the content of the file `testfile.txt` in the terminal.

**Displaying the content of multiple files:**

```bash
cat file1 file2 file3
```

Replace `file1`, `file2`, and `file3` with the names of the files you want to display. For example:

```bash
cat file1.txt file2.txt file3.txt
```

This will display the content of all three files in the terminal.

**Concatenating multiple files:**

```bash
cat file1 > file2
```

This will concatenate the content of `file1` and write it to `file2`.

**Appending content to an existing file:**

```bash
cat file1 >> file2
```

This will append the content of `file1` to the end of `file2`.

**Redirecting output to a file:**

```bash
cat file1 > output.txt
```

This will redirect the output of `file1` to a new file named `output.txt`.

**Options:** The cat command has ==several options== that can be used to customize its behavior. Here are a few examples:

- `-E` displays line ends
- `-n` displays numbers before lines
- `-t` treats tabs as spaces
- `-v` displays non-printable characters

To see a list of all available options, use the command:

```bash
cat --help
```

These are just a few examples of how to use the cat command in Linux. It is a powerful tool that can be used in many different ways, so be sure to check out the man pages for more information.

# References
https://search.brave.com/search?q=what+is+cat+in+linux+terminal&source=desktop
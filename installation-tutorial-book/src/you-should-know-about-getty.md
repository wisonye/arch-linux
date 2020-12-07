# You should know about Getty

What is `Getty`?

After reboot, you will see a default terminal login prompt which prints with **tty1**, that's the `getty`.

In Arch Linux, `agetty` is the default `getty`, it prompts for a login name and invokes the `/bin/login` command.

You can press `Ctrl+Alt+F1 ~ F6` to switch between **tty1 ~ tty6**. 

The **`tty7`** (`Ctrl+Alt+F7`) is for the `X` which means your `DE`(Desktop Environment) or `WM`(Window Manager).

More information from [here](https://wiki.archlinux.org/index.php/getty)

Tips:
    
- Sometimes, when you do a wrong configuration to your `DE` or `WM`, even the `DM` (Display Manager which works like a graphical login prompt),
  then you can switch another **tty** and login to fix it, very handy.

- How to change **tty** fonts:

    ```bash
    # All fonts stay in this folder
    ls -lht /usr/share/kbd/consolefonts

    # Set the TTY font
    setfont FONT_FILE_NAME_HERE
    ```

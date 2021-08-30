# How to start `i3` without `DM (Display Manager)`

The **xinit** program allows a user to manually start and **Xorg** display
server. The **startx** script is a front-end for **xinit**.

- Install `xinit` and `startx`

    ```bash
    sudo pacman --sync --refresh xorg-xinit
    ```

- Customize your `.xinitrc`

    ```bash
    cp -rvf /etc/X11/xinit/xinitrc  ~/.xinitrc
    ```

    Then open it and let is start `i3` at the end:

    ```bash
    #!/bin/sh

    userresources=$HOME/.Xresources
    usermodmap=$HOME/.Xmodmap
    sysresources=/etc/X11/xinit/.Xresources
    sysmodmap=/etc/X11/xinit/.Xmodmap

    # merge in defaults and keymaps

    if [ -f $sysresources ]; then
        xrdb -merge $sysresources
    fi

    if [ -f $sysmodmap ]; then
        xmodmap $sysmodmap
    fi

    if [ -f "$userresources" ]; then
        xrdb -merge "$userresources"
    fi

    if [ -f "$usermodmap" ]; then
        xmodmap "$usermodmap"
    fi

    # start some nice programs

    if [ -d /etc/X11/xinit/xinitrc.d ] ; then
     for f in /etc/X11/xinit/xinitrc.d/?*.sh ; do
      [ -x "$f" ] && . "$f"
     done
     unset f
    fi

    # Start i3
    exec i3
    ```

    The script is very simple, it does the following things:

    - Run your `~/.Xresources` if exists. Mine is for setting the `Xft.dpi` for
    my monitor.

    - Run your `~/.Xmodmap` if exists. Mine is for setting the keyboard.

    - Then run your window manager (the `i3 in this case)


    </br>


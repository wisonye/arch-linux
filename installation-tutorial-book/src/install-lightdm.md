# Install **`ligthDM`** as Dislpay Manager

- What is `Dislpay Manager`?

    A display manager, or login manager, is typically a graphical user interface that is displayed at the end of the boot process in place of the default shell.

</br>

- We will install one of the implementation which is called: **LightDM**

    **LightDM** is a cross-desktop **D**isplay **M**anager (also known as a **L**ogin **M**anager). Its key features are:

    - Cross-desktop - supports different desktop technologies.
    - Supports different display technologies (X, Mir, Wayland ...).
    - Lightweight - low memory usage and high performance.
    - Supports guest sessions.
    - Supports remote login (incoming - XDMCP, VNC, outgoing - XDMCP, pluggable).
    - Comprehensive test suite.
    - Low code complexity.

    [Here](https://wiki.archlinux.org/index.php/LightDM) has more detail information.

</br>

- Installation 

    ```bash
    # `lightdm-webkit2-greeter` is one of the lightdm greeter which will explain below
    sudo pacman -S lightdm lightdm-webkit2-greeter
    ```

</br>

- Change the default `greeter`

    A `greeter` just like a graphical login prompt, you can install any one you like.

    By default, all installed `gretter` are located in `/usr/share/xgreeters`

    ```bash
    ls -lth /usr/share/xgreeters/
    # lightdm-webkit2-greeter.desktop
    ```

    By default, `lightdm` will use `lightdm-gtk-greeter` but you can change it any time in `/etc/lightdm/lightdm.conf`

    If you add new `greeter`, then get the name in `/usr/share/xgreeters` and change in `/etc/lightdm/lightdm.conf` like below:

    ```bash
    [Seat:*]
    # ...
    # For example, we just installed this one
    greeter-session=lightdm-webkit2-greeter
    # ...

    ```

</br>

- Enable the `lightdm` service when booting

    ```bash
    sudo systemctl enable lightdm.service
    ```

</br>

- Restart the `lightdm` service when booting

    After you change the greeter or another settings, you need to restart the service to take affect.
    Pay attention that this command will logout the curernt session, 
    make sure save all docs before you do that

    ```
    sudo systemctl restart lightdm.service
    ```

    If you want to change setting very often and don't want to be foreced to logout, then you can open
    another **`tty`** (Ctrl+Alt+F1 ~ F6) and run the command above, then back the **`lightdm`** will 
    refresh in the **`tty7`** which more convenience. 

</br>

- Install new theme for the `lightdm-webkit2-greeter`

    It's super easy to add a different theme based on `lightdm-webkit2-greeter`, for example, install this one:

    ```bash
    yay -Sy lightdm-webkit-theme-aether
    ```

    After a theme be installed, it saves in `/usr/share/lightdm/themes`

    ```bash
    ls -lht /usr/share/lightdm/themes

    # lightdm-webkit-theme-aether
    ```

    So, you need to change the theme name in `/etc/lightdm/lightdm-webkit2-greeter.conf` like below:

    ```bash
    webkit_theme = lightdm-webkit-theme-aether
    ```

    Save it and logout to take affect.

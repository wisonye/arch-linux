# Install **`ligthDM`** as Dislpay Manager

- What is `Dislpay Manager`?

    A display manager, or login manager, is typically a graphical user interface that is displayed at the end of the boot process in place of the default shell.

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

- Installation 

    ```bash
    # `lightdm-webkit2-greeter` is one of the lightdm greeter which will explain below
    sudo pacman -S lightdm lightdm-webkit2-greeter
    ```

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

- Enable the `lightdm` service when booting

    ```bash
    sudo systemctl enable lightdm.service

    # After you change the greeter or another settings,
    # you need to restart the service to take affect.
    sudo systemctl restart lightdm.service
    ```

Then reboot and you will see the new greeter UI.

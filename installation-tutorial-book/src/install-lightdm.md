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

    After you change the greeter or another settings, you need to restart the service to take effect.
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
    paru -Sy lightdm-webkit-theme-aether
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

    Save it and logout to take effect.

</br>

- How to replace the default login screen user icon

    Be default, there is a file named `/var/lib/AccountsService/users/YOUR_USER_NAME`
    with your current user name. Open it and replace the `Icon` line like below:

    ```bash
    [User]
    Session=default
    XSession=i3
    Icon=/var/lib/AccountsService/icons/XXXX.png
    SystemAccount=false
    ```

    `XXXX.png` is your login user icon image file, just copy the file to there and restart
    `lightdm` service, it will work. If not work, then restart, it should show up there.

</br>

- Troubleshooting

    If you can't start the `lightdm` or `lightdm-webkit2-greeter` (which includes can't see the webkit2
    themes), plz double check all configurations
    to see whether you put the wrong spelling there, as around 90% chance is that:)

    If yes, then switch another **`tty`** to fix it and restart **`lightdm`** again:

    ```bash
    sudo systemctl restart lightdm.service
    ```

    </br>

    Or you can try to install the `i3` and see what happen, as sometimes it works after installing
    `i3`. I think the reason should be `i3` installs something that theme needes, not very sure:)

    If you make sure NO wrong spelling in the configuration file, then switch to another **`tty`** and 
    run the command below to see whether some helpful error to figure out what's happening there:

    ```bash
    /usr/bin/lightdm-webkit2-greeter --help
    ```

    </br>

    My personal very bad luck experience, it causes by missing the correct version of `icu` package
    to be installed. I think that's because I installed `lightdm-webkit-theme-aether` via `paru` which
    always use the latest package, but my `Arch Linux` use another older package. That's why no matter
    what I had tried, it still doesn't work. After I run `sudo pacmac -Syc` to upgrade all installed 
    package. It works...:)

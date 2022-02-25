# Bar customization with **`polybar`**

- Install

    ```bash
    paru -S polybar
    ```

</br>

- Copy the default config to your home folder like below:

    ```bash
    mkdir ~/.config/polybar
    cp -rvf /usr/share/doc/polybar/config  ./polybar/
    ```

    Also, make sure to change the `[bar/example]` to `[bar/i3-bar]` in
    `~/.config/polybar/config`.

</br>

- Create `~/scripts/restart-polybar.sh` with the following content:

    ```bash
    #!/usr/bin/bash
    
    killall polybar
    
    while pgrep -x > /dev/null; do sleep 1; done
    
    polybar i3-bar
    ```

</br>

- Make some changes to `~/.config/i3/config`

    - Add this:

        ```bash
        # Load polybar
        exec_always --no-startup-id ~/scripts/restart-polybar.sh &
        ```

        </br>

    - Remove all related settings about the `i3 status bar`

        ```bash
        # ===========================================================================
        # i3 status control
        #
        # Start i3bar to display a workspace bar (plus the system information i3status
        # finds out, if available)
        # ===========================================================================
        bar {
            # ......
        }
        ```

</br>


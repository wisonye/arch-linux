# Screen brightness control

### The basic approach to control screen brightness

```bash
# Print out the current screen brightness
cat /sys/class/backlight/intel_backlight/brightness

# Print out the maximum screen brightness
cat /sys/class/backlight/intel_backlight/max_brightness

# Set the current screen brightness
sudo bash -c "echo 512 > /sys/class/backlight/intel_backlight/brightness"
```

### Build the `mac-brightness-controller`

- Pull from repo, build it

    ```bash
    # Go into any folder you want
    git clone https://github.com/wisonye/mac-screen-brightness-controller.git
    cd mac-screen-brightness-controller
    cargo clean && \
    cargo build --release && \
    strip ./target/release/mac-screen-brightness-controller 

    # Move to any folder you want `i3` to launch from there (Optional)
    mv ./target/release/mac-screen-brightness-controller ~/scripts/
    ```

</br>

- Add keybinds to `i3` configuration file

    `vim ~/.config/i3/config` and add the following settings:

    ```bash
    # ===========================================================================
    # Screen brightness control
    # ===========================================================================
    bindsym XF86MonBrightnessUp exec --no-startup-id ~/scripts/mac-screen-brightness-controller +
    bindsym XF86MonBrightnessDown exec --no-startup-id ~/scripts/mac-screen-brightness-controller -
    ```

</br>

- Allow any linux account in `wheel` group can modify the backlight system file with `root` permission

    - `sudo vim /etc/udev/rules.d/90-backlight.rules` and add the following settings:

        ```bash
        SUBSYSTEM=="backlight", ACTION=="add", \
        RUN+="/bin/chgrp wheel /sys/class/backlight/%k/brightness", \
        RUN+="/bin/chmod g+w /sys/class/backlight/%k/brightness"
        ```

    Of course, make sure your current linux account is in `wheel` group!!!

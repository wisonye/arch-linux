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

### Apple keyboard control brightness

- Install `macbook-lighter` to enable the screen brightness control by apple keyboard

    ```bash
    yay -Sy macbook-lighter
    ```
- Enable `non-root` user to control screen brightness via apple keyboard

    - `sudo vim /etc/udev/rules.d/90-backlight.rules` and add the following settings:

        ```bash
        SUBSYSTEM=="backlight", ACTION=="add", \
        RUN+="/bin/chgrp video /sys/class/backlight/%k/brightness", \
        RUN+="/bin/chmod g+w /sys/class/backlight/%k/brightness"
        ```

    - `sudo vim /etc/udev/rules.d/91-leds.rules` and add the following settings:

        ```bash
        SUBSYSTEM=="leds", ACTION=="add", \
        RUN+="/bin/chgrp video /sys/class/leds/%k/brightness", \
        RUN+="/bin/chmod g+w /sys/class/leds/%k/brightness"
        ```

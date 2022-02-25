# Multi screen lock

### Install

```bash
paru -S multilockscreen
```

</br>

### Copy config file

```bash
mkdir ~/.config/multilock
cp -rvf /usr/share/doc/multilockscreen/examples/config ~/.config/multilock/config
```

Then you can open it to change to your prefer settings.

</br>

### Update lock image

```bash
multilockscreen --update ~/Photos/wallpaper/arch-4.png

# [m] multilockscreen
# [*] Updating image cache...
# [=] Detected 1 display(s) @ 2880x1800 total resolution
# [=] Original image(s): arch-4.png
# [=] Processing display: eDP1 (1)
# [=] Resolution: 2880x1800
# [*] Resizing base image...
# [*] Rendering 'dim' effect...
# [*] Rendering 'blur' effect...
# [*] Rendering 'dimblur' effect...
# [*] Rendering 'pixel' effect...
# [*] Rendering 'dimpixel' effect...
# [*] Rendering 'color' effect...
# [*] Rendering final wallpaper images...
# [*] Rendering final lockscreen images...
# [+] Done
```

### Add `alias` or `abbreviation` to your shell

- For `bash`, then put the setting below to your bash profile or rc file:

    ```bash
    # abbr i3lock "multilockscreen --lock dim 20"
    abbr i3lock "multilockscreen --lock blur"
    ```

- For `fish`, then put the setting below to your fist config

    ```bash
    # abbr i3lock "multilockscreen --lock dim 20"
    abbr i3lock "multilockscreen --lock blur"
    ```

</br>

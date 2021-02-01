# Switching keyboard in real-time

If you have multiple keyboards, how do you switch them in `Arch Linux` in real-time?

For example, you have different keybaords below:

- Apple keybaord (embedded in your MBP) or separated Apple wireless keyboard
- Varmilo mechanical keyboard

And you want to switch between in real-time, how to do that?

Let's make some requirements for the switching task below:

- No matter switch to which keyboard, the `i3` configuration settings below no need to be changed:

    ```bash
    # ===========================================================================
    # Set `$mod` to `Mod4`(WinKey or CmdKey)
    # ===========================================================================
    set $mod Mod4
    set $alt Mod1
    ```

</br>

- **`Apple keybaord`**

    - Use `Super_L`(Left Command) key as the `i3` $Mod key
    - Use `Caps Lock` key as `Escape` key
    - Use `Alt_L`(Left Alt) key as Mod1

</br>

- **`Varmilo mechanical keybaord`**

    - Exchange the `Super_L` key and `Alt_L` key, as they're in a different 
    position with `Apple Keyboard` and you don't like to change your pressing 
    habit
    - Use `Super_L`(Left Command) key as the `i3` $Mod key
    - Use `Caps Lock` key as `Escape` key
    - Use `Alt_L`(Left Alt) key as Mod1

</br>

Let's do it.

</br>

- **`Apple keybaord`**

    - Create `~/scripts/Xmodmap-for-apple-keyboard` from current keybinding:

        ```bash
        xmodmap -pke > ~/scripts/Xmodmap-for-apple-keyboard
        ```
    - Open `~/scripts/Xmodmap-for-apple-keyboard` and add some settings below:

        - Add to the beginning of the file:

            ```bash
            clear lock
            clear mod1
            clear mod4
            ```

        - Add to the bottom of the file:

            ```bash
            add mod1 = Alt_L
            add mod4 = Super_L
            ```

        - Edit the setting like below:

            ```bash
            keycode  66 = Escape NoSymbol Escape
            ```

    - Create `~/scripts/change-keybinding-for-apple-keyboard.sh` with the following settings:

        ```bash
        #!/bin/bash
        cp -rvf ~/scripts/Xmodmap-for-apple-keyboard ~/.Xmodmap
        i3-msg restart
        ```

    - Make it executable

        ```bash
        chmod +x ~/scripts/change-keybinding-for-apple-keyboard.sh
        ```

</br>

- **`Apple keybaord` for `colemak` keyboard layout**

    - Set to `colemak` layout before you continue:

        ```bash
        setxkbmap us colemak
        ```

        Right now, your keyboard key mapping should be load as `colemak`.

    - Create `~/scripts/Xmodmap-colemak-for-apple-keyboard` from current keybinding:

        ```bash
        xmodmap -pke > ~/scripts/Xmodmap-colemak-for-apple-keyboard
        ```
    - Open `~/scripts/Xmodmap-for-apple-keyboard` and add some settings below:

        - Add to the beginning of the file:

            ```bash
            clear lock
            clear mod1
            clear mod4
            ```

        - Add to the bottom of the file:

            ```bash
            add mod1 = Alt_L
            add mod4 = Super_L
            ```

        - Edit the setting like below:

            ```bash
            keycode  66 = Escape NoSymbol Escape
            ```

    - Create `~/scripts/change-keybinding-for-apple-keyboard-colemak.sh` with the following settings:

        ```bash
        #!/bin/bash
        cp -rvf ~/scripts/Xmodmap-colemak-for-apple-keyboard ~/.Xmodmap
        i3-msg restart
        ```

    - Make it executable

        ```bash
        chmod +x ~/scripts/change-keybinding-for-apple-keyboard-colemak.sh
        ```

</br>

- **`Varmilo mechanical keybaord`**

    - Create `~/scripts/Xmodmap-for-varmilo-keyboard` from current keybinding:

        ```bash
        xmodmap -pke > ~/scripts/Xmodmap-for-varmilo-keyboard
        ```
    - Open `~/scripts/Xmodmap-for-varmilo-keyboard` and add some settings below:

        - Add to the beginning of the file:

            ```bash
            clear lock
            clear mod1
            clear mod4
            ```

        - Add to the bottom of the file:

            ```bash
            add mod1 = Alt_L
            add mod4 = Super_L
            ```

        - Edit the setting like below:

            ```bash
            keycode  66 = Escape NoSymbol Escape
            keycode  64 = Super_L NoSymbol Super_L
            keycode 133 = Alt_L Meta_L Alt_L Meta_L
            ```

    - Create `~/scripts/change-keybinding-for-varmilo-keyboard.sh` with the following settings:

        ```bash
        #!/bin/bash
        cp -rvf ~/scripts/Xmodmap-for-varmilo-keyboard ~/.Xmodmap
        i3-msg restart
        ```

    - Make it executable

        ```bash
        chmod +x ~/scripts/change-keybinding-for-varmilo-keyboard.sh
        ```

</br>

After that, you can switch to any keyboard at anytime you want in real-time.

```bash
# For Apple keybaord
~/scripts/change-keybinding-for-apple-keyboard.sh

# For Apple keybaord colemak
~/scripts/change-keybinding-for-apple-keyboard-colemak.sh

# For Varmilo keyboard
~/scripts/change-keybinding-for-varmilo-keyboard.sh
```

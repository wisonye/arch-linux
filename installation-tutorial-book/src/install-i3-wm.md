# Install **`i3`** Window Manager

A window manager (**`WM`**) is system software that controls the placement and appearance of windows
within a windowing system in a graphical user interface (GUI). It can be part of a desktop environment 
(**`DE`**) or be used standalone.

We will install a **`Tiling`** window manager which calls **`i3`**.

- How to install

    ```bash
    sudo pacman -Sy i3 dmenu

    # It will ask you what selection you want like below:
    #
    # 1) i3-gaps 2) i3-wm 3) i3block 4) i3lock 5) i3status
    #
    # Enter a selection (default=al): // Just enter to access all of them!!!
    ```

    Then we need on more comopnent from **`AUR`**`:
    ```bash
    paru -Sy i3exit
    ```
    
| Component | Description|
| --------- | -----------
| `i3-gaps` | Provides a grap between different tiling windows. |
| `i3-wm`   | The core component. |
| `i3block` | Define blocks for your i3bar status line. |
| `i3lock`  | mproved screenlocker based upon XCB and PAM.|
| `i3status`| Generates status bar to use with i3bar, dzen2 or xmobar. |
| `i3exit`  | A easy to do `shutdown`, `reboot`, `lock` in i3 environment. |


</br>

- Let `lightdm` to start `i3`

    After finishing install the `i3`, the new **`X`** session already been added to `/usr/share/xessions`.

    What you need to do just add that `i3.desktop` to `/etc/lightdm/lightdm.conf` like below:

    ```bash
    user-session=i3

    # Logout to take effect
    i3exit logout
    `````

</br>

- How to run some scripts or programms when **`i3`** reload?

    Add the setting below to your `~/.config/i3/config`

    ```bash
    # Run the command without delay
    exec_always YOUR_COMMAND_HERE

    # Sleep 1 second then run the command
    exec_always sleep 1; YOUR_COMMAND_HERE
    ```

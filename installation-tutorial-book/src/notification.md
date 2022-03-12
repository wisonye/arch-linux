# Notification

- Install notification backend/server

    ```bash
    sudo pacman --sync --refresh dunst libnotify
    ```

    </br>

- Launch notification server

    ```bash
    pkill dunst
    dunst -config ~/.config/dunst/dunstrc &
    ```

    </br>


- How to use `dunstify` (client) to test notification

    By default, use mouse right click to close the nofitcation window.

    ```bash
    dunstify --appname="Battery checker" \
                --urgency=critical \
                --icon=battery-level-0-charging-symbolic.symbolic \
                "Battery almost die, Please connect charger immediate!"
    ```

    </br>


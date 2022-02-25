# Install Google Chrome

If you want to keep the original `Google Chrome` user experience, then
keep reading.

</br>

- Install via `paru`
    ```bash
    sudo pacman -S --needed git base-devel
    mkdir ~/temp && cd ~/temp
    git clone https://aur.archlinux.org/paru.git
    cd paru
    makepkg -si
    cd ~/temp && rm -rf paru

    paru -S google-chrome
    ```

</br>

- Apply the selected theme in `lxappearance`:

    - Open `chrome` with this url: `chrome://settings/?search=theme`
    - Then choose `Use GTK+`

</br>

- Install `xdg-utils` and set `Chrome` as the default browser

    ```bash
    sudo pacman -Sy xdg-utils

    # Set `chrome` as the default browser
    xdg-settings set default-web-browser google-chrome.desktop

    # Query to confirm
    xdg-settings get default-web-browser
    ```

Tips: All installed GUI application links located in `/usr/share/applications/`.

</br>


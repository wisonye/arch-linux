# Install Google Chrome

- Install via `yay`
    ```bash
    pacman -S --needed git base-devel
    mkdir ~/temp && cd ~/temp
    git clone https://aur.archlinux.org/yay.git
    cd yay
    makepkg -si
    cd ~/temp && rm -rf yay

    yay -S google-chrome
    ```

- Apply the selected theme in `lxappearance`:

    - Open `chrome` with this url: `chrome://settings/?search=theme`
    - Then choose `Use GTK+`

- Install `xdg-utils` and set `Chrome` as the default browser

    ```bash
    sudo pacman -Sy xdg-utils

    # Set `chrome` as the default browser
    xdg-settings set default-web-browser google-chrome.desktop

    # Query to confirm
    xdg-settings get default-web-browser
    ```

    The `Materia-dark` + `Source Code Pro` font would be nice chocie.

# Install Google Chrome

```
pacman -S --needed git base-devel
mkdir ~/temp && cd ~/temp
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
cd ~/temp && rm -rf yay

yay -S google-chrome
```

</br>

Apply the selected theme in `lxappearance`:

- Open `chrome` with this url: `chrome://settings/?search=theme`
- Then choose `Use GTK+`

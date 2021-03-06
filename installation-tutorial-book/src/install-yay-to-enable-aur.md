# Install **`yay`** to enable AUR

What is AUR?

**AUR** stands for Arch User Repository. It is a community-driven repository for Arch-based Linux distributions users.
It contains package descriptions named **PKGBUILDs** that allow you to compile a package from source with `makepkg` and
then install it via `pacman` (package manager in Arch Linux).

How to enable **AUR** installation:

```bash
mkdir ~/temp && cd ~/temp

pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

cd ~/temp && rm -rf yay
```

If you want to change or add any mirror server to `/etc/pacman.d/mirrorlist`, you can go to [here](https://www.archlinux.org/mirrorlist/)



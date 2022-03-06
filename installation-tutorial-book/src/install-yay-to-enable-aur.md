# Install **`Paru`** to enable AUR

What is AUR?

**AUR** stands for Arch User Repository. It is a community-driven repository for Arch-based Linux distributions users.
It contains package descriptions named **PKGBUILDs** that allow you to compile a package from source with `makepkg` and
then install it via `pacman` (package manager in Arch Linux).

What is `Paru`?

`Paru` is the help of **AUR** that written by `Rust` based on `yay`.

How to enable **AUR** installation:

```bash
mkdir ~/temp && cd ~/temp

sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/paru.git
cd paru

# Choose '2', install `cargo` via `rustup` for a small download size!!!
makepkg -si

# If you see any error, make sure first update `rust` to the latest version by
# running the command below then try again
rustup update


cd ~/temp && rm -rf paru
```

If you want to change or add any mirror server to `/etc/pacman.d/mirrorlist`, you can go to [here](https://www.archlinux.org/mirrorlist/)



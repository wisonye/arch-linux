# Install **`Paru`** to enable AUR

What is AUR?

**AUR** stands for Arch User Repository. It is a community-driven repository for Arch-based Linux distributions users.
It contains package descriptions named **PKGBUILDs** that allow you to compile a package from source with `makepkg` and
then install it via `pacman` (package manager in Arch Linux).

What is `Paru`?

`Paru` is the help of **AUR** that written by `Rust` based on `yay`.

How to enable **AUR** installation:

If you use `doas`, then you HAVE TO install `sudo`, otherwise, you can't install
`paru`!!!

```bash
# Switch to root
su

# Install sudo
pacman --sync --refresh sudo

# Allow `wheel` group to use `sudo`
doas visudo
```

</br>

You need to install `rustup` first:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```


Install `paru`:

```bash
mkdir ~/temp && cd ~/temp

sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/paru.git
cd paru

# Choose '2', install `cargo` via `rustup` for a small download size!!!
makepkg -si


# If exit with error, then plz make sure to added the latest stable toolchain
rustup toolchain add stable

# Or if you've already install the stable toolchain, then update it
rustup update


cd ~/temp && rm -rf paru
```


</br>

Make sure to disable the `wheel` rule by re-running `doas visudo`, as I use `doas` instead of `sudo`!!!

# Prepare your preferred editor Configuration

Before to edit a lot of configuration files, you better to prepare 
your personal preferred editor and shell environment before continuing.

For example, if you prefer the pre-installed `vim`, then you need to 
install `gvim` to enable the `clipboard` feature which makes your life a 
bit easier.

```bash
# It will ask you to remove the `vim-minimal` as a conflict, just says `Y`
sudo pacman --sync --refresh gvim
```

</br>

Or you can install `neovim`:

```bash
sudo pacman --sync --refresh neovim python-pynvim

mkdir ~/.config/nvim
touch ~/.config/nvim/init.vim
```

</br>

Let's do it:)

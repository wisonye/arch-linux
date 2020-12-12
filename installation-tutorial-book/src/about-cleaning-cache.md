# About cleaning cache

After running `Arch Linux` for a while, you will notice that your disk free 
space keeps reducing and never stop, that should be a signal that you should
clean your cache. Usually, it will save over **`GB`** disk space:)

```bash
# Show how much your cache hold the disk space
dust -d1 ~/.cache

# Clean yay cache
yay -Sc

# Clean pacman cache
sudo pacman -Scc

# Clean yarn (if you installed)
yarn cache clean

# After that, calculate again, it should get big improved.
dust -d1 ~/.cache
```

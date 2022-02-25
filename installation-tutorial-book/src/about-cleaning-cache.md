# About cleaning cache

After running `Arch Linux` for a while, you will notice that your disk free 
space keeps reducing and never stop, that should be a signal that you should
clean your cache. Usually, it will save over **`GB`** disk space:)

```bash
# Show how much your cache hold the disk space
dust -d1 ~/.cache

# Clean paru cache and unneeded dependencies
paru -Sc
paru -Yc

# Clean pacman cache (it locates `/var/cache/pacman/pkg/`)
sudo pacman -Scc

# Clean yarn (if you installed)
yarn cache clean

# Clean google-chrome cache (sometimes, this folder is huge!)
rm -rf ~/.cache/google-chrome/Default

# After that, calculate again, it should get big improved.
dust -d1 ~/.cache
```

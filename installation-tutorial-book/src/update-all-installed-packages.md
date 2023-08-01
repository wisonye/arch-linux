# Update all installed packages

To avoid the `corrupted (invalid or corrupted package (PGP signature)` issue,
we should update all the pacman keys before upgrading:

```bash
doas pacman --sync --refresh gnupg archlinux-keyring
doas pacman --sync --clean
```

After that, let's do the upgrade by running:

```bash
doas pacman -Syu
```

</br>


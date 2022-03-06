# Install or update kernel

### 1. First you need to check the current linux kernel you can install

```bash
pacman --sync --search linux | grep core/linux

# [ The current kernel installed ]

# core/linux 5.10.5.arch1-1 [installed]
# core/linux-api-headers 5.8-1 [installed]
# core/linux-docs 5.10.5.arch1-1
# core/linux-firmware 20201218.646f159-1 [installed]
# core/linux-headers 5.10.5.arch1-1 [installed]


# [ The LTS (Long Term Support) kernel ]

# core/linux-lts 5.4.87-1
# core/linux-lts-docs 5.4.87-1
# core/linux-lts-headers 5.4.87-1
```

If you need to install driver (webcam driver, usb driver), then
you have to install `headers`. Otherwise, you don't need that.

</br>

### 2. After you confirm you ready need that, then pick the one you like to install:

```bash
# Install the latest kernel and headers if you want latest one
sudo pacman --sync --refresh linux linux-headers

# Install the latest LTS kernel and headers if you want LTS
sudo pacman --sync --refresh linux-lts linux-headers-lts
```

</br>

### 3. Regernate the GRUB config to boot into LTS

Optionally, you can list all installed kernels in the **`grub`** bootloader
UI, then you can pick which one you want to boot into. 

_This just optaional, you don't need to do that if don't need it_

`sudo vim /etc/default/grub` with the following settings:

```bash
GRUB_DISABLE_SUBMENU=y
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```
Then re-generate the grub configuration:

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

Reboot.

</br>


### 4. Upgrade the entire system and all installed packages

If you run `uname -r` right now, then you should see the LTS kernel version:

```bash
# 5.15.26-1-lts
```

</br>

Before doing the system upgrade, if you don't want to upgrade the particular
packages (even the linux kernel or LTS kernel), you should list them into the
pacman config file.

For example, if you want to keep the current installed linux kernel or LTS
kernel, then you can add them to to `/etc/pacman.conf` like this:

```bash
IgnorePkg   = linux
```

</br>


Also, to avoid the `corrupted (invalid or corrupted package (PGP signature)` issue,
we should update all the pacman keys before upgrading:

```bash
sudo rm -r /etc/pacman.d/gnupg
sudo pacman-key --init
sudo pacman-key --populate archlinux

# This step might fail, but it doesn't affect the upcoming steps!!!
sudo pacman-key --refresh-keys

sudo pacman --sync --refresh gnupg archlinux-keyring
sudo pacman --sync --clean
```

After that, let's do the upgrade by running:

```bash
sudo pacman -Syu
```



# Install or update kernel

First you need to check the current linux kernel you can install
by running:

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

After you confirm you ready need that, then pick the one you like 
to install:

```bash
# Install the latest kernel and headers
sudo pacman --sync --refresh linux linux-headers

# Install the latest LTS kernel and headers
sudo pacman --sync --refresh linux-lts linux-headers-lts
```

</br>

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

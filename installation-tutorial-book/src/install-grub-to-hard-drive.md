# Install **`grub`** to hard drive


Make sure you're in the `New Arch Linux` root environment. If not, please run `arch-chroot /mnt` to go inside it.

```bash
# `intel-ucode` is for the bootloader to know Intel CPU architecture, 
# you need to change to your CPU one.
#
# Optionally, you can install `os-prober` if you want `grub` to detect exists OS.
# For example, you want `grub` to handle multi OS boot situation.
pacman -S grub efibootmgr intel-ucode 

# Generate then grub config
mkdir /boot/grub
grub-mkconfig > /boot/grub/grub.cfg

# Install CPU specified `grub`, you can run `uname -m` to confirm your CPU architecture.
# For example, to install `x86_64` architecture and `EFI`.
grub-install --target=x86_64-efi --efi-directory=/boot

# After that, it will generate `/boot/EFI/arch/grubx64.efi`!!!
```

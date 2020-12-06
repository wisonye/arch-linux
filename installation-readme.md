# Arch Installation Guide

Go to [here](https://www.archlinux.org/download/) and pick your closest mirror to download the ISO, then burn into a USB.
Plug your USB into computer and boot the live ISO, it will automatic login to install Arch, then follow the steps below to 
install your own `Arch Linus`.

## 1. Connect to your router

If you use WIFI, plz make sure your WIFI doesn't hide the **SSID**. Otherwise, it won't work!!!
Also, it seems not works with the **5G** WIFI as well, use **2.4G** plz.


```
# Make your WIFI INC up, change `wlan0` to yours!!!
ip link set wlan0 up

# If you don't know the SSID or not sure your SSID is scanable or not, then run it to confirm
iwlist wlan0 scan | grep SSID

# Save your WIFI passwork into config file
wpa_passphrase YOUR_SSID_HERE YOUR_WIFI_PASSWORD_HERE > interent.conf

# Connet to WIFI
wpa_supplicant -c interent.conf -i wlan0 &

# After you see the log looks like connected, then check your ip
ip add

# Maybe you need to run `dhcpcd wlan0 ` to grab a new IP if your router doesn't do that for u.

# After you can access to interent, enable NTP to sync your clock
timedatectl set-ntp true
```

## 2. Setup disk partition

- List your installation target disk by running `fdisk -l`. The following example supposes that your disk is `/dev/sdc`, change to your own one!!!

- To confirm your `boot mode`:

    ```bash
    ls /sys/firmware/efi/efivars
    ```

    If the command shows the directory without error, then the system is booted in `UEFI` mode.
    If the directory does not exist, the system may be booted in `BIOS` (or `CSM`) mode.

- Follow the steps below to setup your Arch Linux partition:

    ```bash
    # As I confirmed my boot mode is `UEFI`, then I should use `GPT` partition.
    # Press `g` to create a new empty `GPT` partition table, it will remove all your exists partitions.
    # After pressing `g`, you should be able to see something like below:
    #
    # "Created a new GPT dislabel (GUID: xxxxxxxxx)."
    `g`

    # Create boot partition which will be mount to `/boot`
    `n`
    `1` or just `Enter` to use partition no `1`
    `Enter` to use the default start sector
    `+512M` to set this partition size to `512MB`
    # If success, you should see `Created a new partition 1 of type `Linux filesystem` and of size 512 MiB.


    # Create SWAP partition:
    `n`
    `3`, set this partition no to `3` rather than `2`, then when you print the partition table, it shows as the last partition which is more easy to read.
    `Enter` to use the default start sector
    `+8G` to use 8GB as SWAP, usually, should set to equal to your RAM amout or 1.5 time of  your RAM amount. 
    # If success, you should see `Created a new partition 3 of type `Linux filesystem` and of size 8 MiB.
    

    # Finally, create the linux root partition which will be mount to `/root`
    `n`
    `Enter` to use partition no `2`
    `Enter` to use the default start sector
    `Enter` to use all the left spaces
    # If success, you should see `Created a new partition 2 of type `Linux filesystem` and of size XXXX MiB.


    # Then you can print the partition table by pressing `p` to have a look if you want

    # The last step is press `w` to write all changes into the disk!!!
    `w`
    ```

## 3. Format app created partitions

```bash
# The boot partition has to be `FAT` format
mkfs.fat -F32 /dev/sdc1

# The root partition, we use `EXT4` format
mkfs.ext4 /dev/sdc2

# Swap partition
mkswap /dev/sdc3

# Enable SWAP partition
swapon /dev/sdc3
```

## 4. Config `pacman`

- Enable the `Color` output
    
    ```
    vim /etc/pacman.conf

    # Search and enable `Color` line, save and exit
    ```

- Setup mirror

    Open [mirror list](https://www.archlinux.org/mirrors/) to search your native country and click on it, you should be able to see the **Mirror URL**.
    I pick **New Zealand** which looks like this:

    ```bash
    http://mirror.smith.geek.nz/archlinux/
    https://mirror.smith.geek.nz/archlinux/
    ```

    Then `vim /etc/pacman.d/mirrorlist` and replace all contents with the below settings:


    ```bash
    # New Zealand
    Server = http://mirror.smith.geek.nz/archlinux/$repo/os/$arch
    Server = https://mirror.smith.geek.nz/archlinux/$repo/os/$arch
    ```

## 5. Mout the `Arch Linux root partition` and `Arch Linux boot partition`

You can run `fdisk -l /dev/sdc` to print the partition table again if you forgot.

```bash
mount /dev/sdc2 /mnt
mkdir /mnt/boot
mount /dev/sdc1 /mnt/boot

# You can `ls` to confirm 
ls -lht /mnt/boot
ls -lht /mnt

# You can run `df -Th` to confirm both partitions are using the correct format before you do the real installation.
df -Th
```

## 6. Installation

Use the `pacstrap(8)` script to install the base package, Linux kernel and firmware for common hardware:

```
pacstrap /mnt base linux linux-firmware
```

After that, Generate an `fstab` file (use -U or -L to define by **UUID** or **labels**, respectively):
```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

## 7. Configuration for the new installed Arch Linux by changing root into it

- Change root into the new `Arch Linux`

    ```bash
    arch-chroot /mnt
    ```

- Choose timezone

    ```bash
    # ln -sf /usr/share/zoneinfo/YOUR_REGION/YOUR_CITY /etc/localtime
    ln -sf /usr/share/zoneinfo/Pacific/Auckland /etc/localtime
    ```

- Generate `/etc/adjtime`

    ```bash
    hwclock --systohc
    ```

- Localization
    Edit `/etc/locale.gen` and uncomment `en_US.UTF-8 UTF-8` and other needed `locales`.

    But it doesn't have the `vim` yet, then we need to `exit` current Arch and back to install Arch to edit it.

    ```bash
    # Exit current Arch root
    exit

    # Now, we're in install Arch and edit the file. Enable `en_US.UTF-8 UTF-8` line, save and exit.
    vim /mnt/etc/locale.gen

    # Then, change root back to new Arch Linux to genereate the locale settings
    arch-chroot /mnt
    locale-gen

    # Exit current Arch root and edit LANG settings. Add `LANG=en_US.UTF-8`, save and exit.
    exit
    vim /mnt/etc/locale.conf

    vim /mnt/etc/vconsole.conf

    # Add my custom settings below (`Caps_Lock` works like `Escape`), then save and exit
    KEYMAP=us
    keycode 9 = Escape
    keycode 66 = Escape
    ```

- Hostname and host settings
    - `vim /mnt/etc/hostname`, set to your hostname.
    
    - `vim /mnt/etc/hosts` with the base settings like below:

        ```
        127.0.0.1	localhost
        ::1		localhost
        127.0.1.1	YOUR_HOSTNAME_HERE.localdomain	YOUR_HOSTNAME_HERE
        ```

- Change root password

    ```bash
    arch-chroot /mnt
    passwd
    ```

- Install `grub` bootloader

    ```bash
    # `intel-ucode` is for the bootloader to know Intel CPU architecture, you need to change to your CPU one
    # Optionally, you can install `os-prober` if you want `grub` to detect exists OS.
    pacman -S grub efibootmgr intel-ucode 

    # Generate then grub config
    mkdir /boot/grub
    grub-mkconfig > /boot/grub/grub.cfg

    # Install CPU specified `grub`, you can run `uname -m` to confirm your CPU architecture
    # I will install `x86_64` architecture and `EFI` (as I confirmed my boot mode is `UEFI` above)
    grub-install --target=x86_64-efi --efi-directory=/boot

    # After that, it will generate `/boot/EFI/arch/grubx64.efi`!!!
    ```

- Install necessary stuff (editor, fish shell, WIFI tool)

    ```
    pacman -S vim fish wpa_supplicant dhcpcd
    ```

- Exit and shutdown

    ```
    exit
    shutdown -h now
    ```


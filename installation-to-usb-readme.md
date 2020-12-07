# Arch installation guide

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

- List your installation target disk by running `fdisk -l`. The following example supposes that your disk is `/dev/sdX`, change to your own one!!!

- To confirm your `boot mode`:

    ```bash
    ls /sys/firmware/efi/efivars
    ```

    If the command shows the directory without error, then the system is booted in `UEFI` mode.
    If the directory does not exist, the system may be booted in `BIOS` (or `CSM`) mode.

- Detail about `BIOS` and `UEFI`

    Basically, there are two different systems implemented today that motherboards use to communicate between an operating system and their firmware. There is the standard (legacy) BIOS (basic input/output system), and there is the newer UEFI (unified extensible firmware interface). Although UEFI was implemented on some top-end machines in the early 2000s, any computer more than six or seven years old is probably only going to be able to boot up in BIOS mode. Newer machines, on the other hand, will often be capable of booting in both UEFI mode and BIOS mode. Many times a preferred boot mode can be selected from the BIOS menu on such machines. Current Apple computers only recognize UEFI.

    Both BIOS and UEFI require different particular partition schemes in order to boot. If the motherboard is set to boot in UEFI mode only and the inserted boot media does not have the correct partition scheme for UEFI, the boot will fail; the same goes for an attempted BIOS boot. This is one place I believe some of the USB installation guides out there fail: they often only describe how to create a USB boot device that uses only one mode. It is possible, however, to setup a USB drive that will have a partition scheme allowing it to boot in both modes and still use the same persistent installation of Linux. This guide will setup such a scheme in the partitioning and formatting sections below.

    On most newer machines, you will be presented with the option to boot in either BIOS or UEFI mode from your bootable USB. This means the machine recognizes the UEFI boot media, but it does not always mean the machine is actually set to boot in UEFI mode, and selecting the UEFI boot option may fail. Selecting a mode that the motherboard is not set to boot in will not damage anything or touch any of the other drives on the machine, the boot will simply fail and one can reboot in the other mode. The USB stick created with this guide has been able to boot on every (about a dozen) desktop and laptop, new and old, BIOS and UEFI, machine that I have tried it on.

- Follow the steps below to setup your Arch Linux partition:

    We will setup a USB which compitlabe with both **BIOS** and **UEFI**!!!

    - Run `fdisk /dev/sdX`

    - Delete all existing partitions

        ```bash
        # First, make sure you use `d` to delete all existing partitions!!!
        # First, make sure you use `d` to delete all existing partitions!!!
        # First, make sure you use `d` to delete all existing partitions!!!
        `d` // Untill all partitions are be deleted!
        ```

    - Create new partition table

        ```bash
        # As I confirmed my boot mode is `UEFI`, then I should use `GPT` partition.
        # Press `g` to create a new empty `GPT` partition table, it will remove all your exists partitions.
        # After pressing `g`, you should be able to see something like below:
        #
        # "Created a new GPT dislabel (GUID: xxxxxxxxx)."
        `g`
        ```

    - Create `10MB` **MBR** partition

        ```bash
        `n`
        `1` or just `Enter` to use partition no `1`
        `Enter` to use the default start sector
        `+10M` to set this partition size to `10M`
        # If success, you should see `Created a new partition 1 of type `Linux filesystem` and of size 10 MiB.
        # If it asks you "Partition #X contains a YYYY signature, Do you want to remove the signature", then press 'Y' to remove the previous partition signature.

        # We need to change the partition type from `Linux filesystem` to `BIOS BOOT`. Before that you can press `l` to list all supported partition types:
        `t`
        `4`, 

        # Finally, press `p` to confirm the result, it should look like this
        #
        # /dev/sdX1   (ignore the sector numbers there) 10M BIOS boot
        ```

    - Create `512MB` ESP (EFI System Partition) which will be mounted to `/boot` and hold the bootloader

        ```bash
        `n`
        `2` or just `Enter` to use partition no `2`
        `Enter` to use the default start sector
        `+512M` to set this partition size to `512MB`
        # If success, you should see `Created a new partition 2 of type `Linux filesystem` and of size 512 MiB.

        # We need to change the partition type from `Linux filesystem` to `EFI System`. Before that you can press `l` to list all supported partition types:
        `t`
        `2` to make sure select the 512MB partition
        `1` which means `EFI System`

        # Finally, press `p` to confirm the result, it should look like this
        #
        # /dev/sdX1   (ignore the sector numbers there) 10M  BIOS boot
        # /dev/sdX2   (ignore the sector numbers there) 512M EFI System
        ```

    - Finally, create the linux root partition which will be mounted to `/` and hold the entire Linux system

        ```bash
        `n`
        `3` or just `Enter` to use partition no `3`
        `Enter` to use the default start sector
        `Enter` to use all the left spaces
        # If success, you should see `Created a new partition 3 of type `Linux filesystem` and of size XXXX GiB.

        # Finally, press `p` to confirm the result, it should look like this
        #
        # /dev/sdX1   (ignore the sector numbers there) 10M  BIOS boot
        # /dev/sdX2   (ignore the sector numbers there) 512M EFI System
        # /dev/sdX3   (ignore the sector numbers there) XXXG Linux filesystem
        ```

    - The last step is press `w` to write all changes into the disk!!!
        ```bash
        `w`
        ```

## 3. Format app created partitions

```bash
# Do not format the /dev/sdX1 partition. This is the BIOS/MBR partion!!!

# The `EFI` boot partition has to be `FAT` format
mkfs.fat -F32 /dev/sdX2

# The root partition, we use `EXT4` format
mkfs.ext4 /dev/sdX3
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
    http://mirror.fsmg.org.nz/archlinux/
    https://mirror.fsmg.org.nz/archlinux/
    http://mirror.smith.geek.nz/archlinux/
    https://mirror.smith.geek.nz/archlinux/
    ```

    Then `vim /etc/pacman.d/mirrorlist` and replace all contents with the below settings:


    ```bash
    # New Zealand
    Server = http://mirror.fsmg.org.nz/archlinux/$repo/os/$arch
    Server = https://mirror.fsmg.org.nz/archlinux/$repo/os/$arch
    Server = http://mirror.smith.geek.nz/archlinux/$repo/os/$arch
    Server = https://mirror.smith.geek.nz/archlinux/$repo/os/$arch
    ```

## 5. Mount the `Arch Linux root partition` and `Arch Linux boot partition`

You can run `fdisk -l /dev/sdX` to print the partition table again if you forgot.

```bash
mount /dev/sdX3 /mnt
mkdir /mnt/boot
mount /dev/sdX2 /mnt/boot

# You can `ls` to confirm 
ls -lht /mnt/boot
ls -lht /mnt

# You can run `df -Th` to confirm both partitions are using the correct format before you do the real installation.
df -Th | grep \/mnt
/dev/sdb3   ext4    /mnt
/dev/sdb2   vfat    /mnt/boot
```

## 6. Installation

Use the `pacstrap(8)` script to install the base package, Linux kernel and firmware for common hardware:

```
pacstrap /mnt base linux linux-firmware
```

After that, generate the `fstab` file (`-U` means use **UUID** to identify the device, as USB will be plugged into a different machine which causes different `/dev/XXX` labels.
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
- RAM disk image

    In order to boot the Linux Kernel persistently off of a USB device, 
    some adjustments may be necessary to the initial RAM disk image. 
    We need to ensure that block device support is properly loaded before 
    any attempt at loading the filesystem. This not always the way a RAM disk
    image is configured in a generic Linux installation, and I suspect this may
    one of the failure points in other Linux USB installations out there.

    So we need to make some changes to `/etc/mkinitcpio.conf`:

    ```bash
    # Back to install Arch
    exit

    # Editr the config
    vim /mnt/etc/mkinitcpio.conf

    # And ensure the `block` hook comes before the `filesystems` hook
    # and directly after the `udev` hook like the following:
    HOOKS=(base udev block filesystems keyboard fsck)

    # Save it and exit.
    ```


    Now go back to installed Arch and regenerate the initial RAM disk image with the changes made:

    ```bash
    arch-chroot /mnt

    mkinitcpio -p linux
    ```


- Network interface names

    Arch Linux's basic service manager, systemd, assigns network interfaces predictable 
    names based on the actual device hardware. This is great for just about any other type
    of install, but can pose some problems for the portable USB installation we're going for.

    To ensure that the ethernet and wifi interfaces will always be respectively named **eth0** 
    and **wlan0**, revert the Arch Linux USB back to traditional device naming:

    ```bash
    # We're inside installed Arch
    `ln -s /dev/null /etc/udev/rules.d/80-net-setup-link.rules`
    ````

- Journal configuration

    A default installation of Arch Linux is setup with systemd to continuously journal various 
    information about current processes and write that data to storage on disk. For a persistent 
    bootable installation on a flash memory device, however, we can change some options in `journald.conf`
    to enable journal keeping entirely in RAM (thus reducing writes to the flash device). To control where
    journal data is stored.

    ```bash
    # Back to install Arch
    exit

    # Editr the config
    vim /mnt/etc/systemd/journald.conf

    # To switch journal data storage to RAM, set the storage variable to 
    # `volatile` by ensuring the following line is uncommented:
    Storage=volatile
    
    # As an additional precaution, to ensure the operating system doesn't 
    # overfill RAM with journal data, set the max-use variable like below:
    SystemMaxUse=16M

    # Save it and exit
    ```

- Mount options

    Modern filesystems are able to record various metadata (last accessed, last modified, user rights, etc.) 
    about their files. A default filesystem mount generally keeps track of as much as this information as possible.
    For a persistent bootable operating system on a flash memory device, however, we should limit some of this record
    keeping in order to reduce writes to the flash device. 

    Using the **noatime** mount option in `fstab` will disable the record keeping of file access times: 
    **no writes will occur when a file is read, only when it is modified.**

    To disable record keeping of file access times for the bootable USB:

    ```bash
    vim /mnt/etc/fstab


    # Replace the mount options from **relatime** to **noatime**. Save it and exit
    ```

- Install `grub` bootloader

    To enable booting the USB in both modes (**BIOS**, **UEFI**), two bootloader will need to be installed.

    - Install the following packages:

        ```bash
        # Go inside the installed Arch
        arch-chroot /mnt

        # `intel-ucode` is for the bootloader to know Intel CPU architecture, you need to change to your CPU one
        # Optionally, you can install `os-prober` if you want `grub` to detect exists OS.
        pacman -S grub efibootmgr intel-ucode 
        ```

    - Setup bootloader:

        View the current block devices to determine the target USB device:

        ```bash
        lsblk

        # sdX // Make sure that block device is the USB you're installing to !!!
        # Note the target USB device name (without any numbers) /dev/sdX!!! (like `/dev/sdb`, not `/dev/sdb1`)

        # Setup GRUB for MBR/BIOS booting mode (replace the `X` your device letter)
        grub-install --target=i386-pc --boot-directory /boot /dev/sdX

        # Setup GRUB for UEFI booting mode
        # Install CPU specified `grub`, you can run `uname -m` to confirm your CPU architecture
        # I will install `x86_64` architecture and `EFI` (as I confirmed my boot mode is `UEFI` above)
        grub-install --target=x86_64-efi --efi-directory /boot --boot-directory /boot --removable

        # Generate a GRUB configuration:
        grub-mkconfig -o /boot/grub/grub.cfg

        # After that, it will generate something important below:
        # /boot/EFI/BOOT/BOOTX64.EFI
        # /boot/grub/x86_64-efi/
        # /boot/grub/i386-pc/
        ```

- Install extra packages we needed:

    - Networking

        Install the `ifplugd` package to configure automatic IP leasing on ethernet devices:

        ```bash
        pacman -S netctl ifplugd
        ```
        
        Install the packages to enable wifi support with a basic command line interface:
        ```bash
        pacman -S iw wpa_supplicant dialog dhcpcd
        ```
        
        Copy the example ethernet profile to `/etc/netctl/`:

        ```bash
        cp /etc/netctl/examples/ethernet-dhcp /etc/netctl/eth0-dhcp
        ```
        
        Enable `ifplugd` to automatically connect to any available wired network:

        ```bash
        systemctl enable netctl-ifplugd@eth0.service
        ```
        
        Enable network time synchronization:
        ```bash
        systemctl enable systemd-timesyncd.service
        ```

    - Video drivers

        To support most common GPUs, install all five basic open source video drivers:

        ```bash
        pacman -S xf86-video-amdgpu xf86-video-ati xf86-video-intel xf86-video-nouveau xf86-video-vesa
        ```
        
    - Touchpad support

        Install support for standard notebook touchpads:
        
        ```bash
        pacman -S xf86-input-synaptics
        ```
        
    - Battery support

        Install support for checking battery charge and state:
        
        ```bash
        pacman -S acpi tlp
        ```
        
        Enable the service

        ```bash
        systemctl enable tlp.service
        ```
        
    - Install necessary stuff (editor, fish shell, man, base development tools)

        ```
        pacman -S vim fish man base-devel
        ```

- Add new user

```bash
# Add new user
useradd -m -G wheel wison

# Set password
passwd wison

# Install `sudo`
pacman -S sudo

# Enable `wheel` group for `sudo` command, run `visudo` and enable the below line:
# %wheel ALL=(ALL) ALL
# Save and exit
visudo
```

- Exit and shutdown

```
exit

# Unmount all USB mounted fold and sync
umount /mnt/boot /mnt && sync

# Shutdown, all done:)
shutdown -h now
```

<hr>
</br>

# Arch configuration guide

Login with your own user (not the `root` user) to finish all the steps below.

## What is `Getty`

After reboot, you will see a default terminal login prompt which prints with **tty1**, that's the `getty`.

In Arch Linux, `agetty` is the default `getty`, it prompts for a login name and invokes the `/bin/login` command.

You can press `Ctrl+Alt+F1 ~ F6` to switch between **tty1 ~ tty6**. If you press `Ctrl+Alt+F7` then that the `X` which means your `DE`(Desktop Environment) or `WM`(Window Manager).

More information from [here](https://wiki.archlinux.org/index.php/getty)

Tips:
    
- Sometimes, when you do a wrong configuration to your `DE` or `WM`, even the `DM` (Display Manager which works like a graphical login prompt),
  then you can switch another **tty** and login to fix it, very handy.

- How to change **tty** fonts:

    ```bash
    # All fonts stay in this folder
    ls -lht /usr/share/kbd/consolefonts

    # Set the TTY font
    setfont FONT_FILE_NAME_HERE
    ```


## Handle your WIFI connection

- Copy the WIFI config from example and named it as `wlan0-dhcp`

    ```bash
    cd /etc/netctl
    sudo cp -rvf examples/wireless-wpa ./wlan0-dhcp
    ```

- Edit `wlan0-dhcp` to change your WIFI `SSID` and `KEY` (encrypted password in HEX string)

    ```bash
    sudo vim wlan0-dhcp

    # Change the `ESSID` to your WIFI `SSID`
    
    # Go to bottom part, run the command below to read the `wpa_passphrase` result into current file
    :r !wpa_passphrase YOUR_SSID_HERE YOUR_WIFI_PASSWORD_TEXT_HERE | grep psk
    
    # After that, you should get something like below:
    # #psk="xxxxx"
    # psk="XXXXXX" // That's encrypted WIFI PASS in HEX string
    # 
    # So you need to copy that "XXXX" hex string and make it looks like below to set the `Key` value
    # Make sure the value start with `\"` and then follow your HEX string
    Key=\"XXXXXX
    
    # Finally, enable the `Hidden=yes` line if your SSID is hidden.
    # Then save and exit
    ```

- Start connecting to WIFI

    ```bash
    # Any file located at `/etc/netctl` folder is call `profile`,
    # you can run the `netctl start PROFILE_NAME` to that profile like below
    sudo netctl start wlan0-dhcp

    # If start fail, then run `sudo netctl status wlan0-dhcp` to read the detail reason

    # You can create a `systemd` service to connect to WIFI automatic when computer boots
    sudo netctl reenable wlan0-dhcp
    ```

- Still can't connect to **5G**, I think should be the driver issue, as the result below doesn't include **5G** channel

    ```bash
    iw dev

    # phy#0
    #   Interface wlan0
    #       ifindex 2 
    #       wdev 0x1
    #       addr xx:xx:xx:xx:xx (mac address)
    #       type managed
    #       channel 1 (2412 MHz), width: 20 MHz, center1: 2312 MHz
    ```

## Make your boot more faster

`sudo vim /etc/default/grub` to change some settings to reduce the timeout

```bash
GRUB_TIMEOUT=0
GRUB_TIMEOUT_STYLE=hidden
```

Save and exit. Then run the command below to re-generate the grub configuration file:

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

Now, reboot to take affect.


## Install `X` implementation

**`The`** X Window System (X11, or simply X) is a windowing system for bitmap displays, common on Unix-like operating systems.
What is `X`? It's the `X Window System` or (`X11`), it provides the basic framework for a GUI environment:

- Drawing
- Moving windows
- Interact with mouse and keyboard


It's `Client, Server` architecture

How to install a `X` implementation? 

```bash
sudo pacman -S xorg xorg-server
```

More information from [here](https://en.wikipedia.org/wiki/X_Window_System)


## Install `lightdm` as the login UI

- What is `Dislpay Manager`?

    A display manager, or login manager, is typically a graphical user interface that is displayed at the end of the boot process in place of the default shell.

- We will install one of the implementation which is called: **LightDM**

    **LightDM** is a cross-desktop **D**isplay **M**anager (also known as a **L**ogin **M**anager). Its key features are:

    - Cross-desktop - supports different desktop technologies.
    - Supports different display technologies (X, Mir, Wayland ...).
    - Lightweight - low memory usage and high performance.
    - Supports guest sessions.
    - Supports remote login (incoming - XDMCP, VNC, outgoing - XDMCP, pluggable).
    - Comprehensive test suite.
    - Low code complexity.

    [Here](https://wiki.archlinux.org/index.php/LightDM) has more detail information.

- Installation 

    ```bash
    sudo pacman -S lightdm lightdm-gtk-greeter
    ```

- Change `greeter` which just like a login graphical prompt

    By default, all `gretter` you installed are located in `/usr/share/xgreeters`

    ```bash
     ls -lth /usr/share/xgreeters/
     # lightdm-gtk-greeter.desktop
    ```

    By default, `lightdm` will use `lightdm-gtk-greeter` if you don't change the setting in `/etc/lightdm/lightdm.conf`

    If you add new `greeter`, then get the name in `/usr/share/xgreeters` and change in `/etc/lightdm/lightdm.conf` like below:

    ```bash
    [Seat:*]
    # ...
    greeter-session=lightdm-yourgreeter-greeter
    # ...

    ```

- Enable the `lightdm` service when booting

    ```bash
    sudo systemctl enable lightdm.service
    ```

Then reboot and you will see the new greeter UI.

If it cann't load the `lightdm` (for example, you change to a non-exists greeter or you delete the greeter but didn't update the `/etc/lightdm/lightdm.conf`),
then you can press `Ctrl+ALt+(Fn)F2` to switch to another `TTY` console, then login and fix the problem:)


## Install `yay` to What is AUR?

**AUR** stands for Arch User Repository. It is a community-driven repository for Arch-based Linux distributions users.
It contains package descriptions named **PKGBUILDs** that allow you to compile a package from source with `makepkg` and
then install it via `pacman` (package manager in Arch Linux).

How to enable **AUR** installation:

```bash
mkdir ~/temp && cd ~/temp

pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

cd ~/temp && rm -rf yay
```

If you want to change or add any mirror server to `/etc/pacman.d/mirrorlist`, you can go to [here](https://www.archlinux.org/mirrorlist/)


## How to improve graphic performance

- Identify your graphics card:

    ```bash
    lspci -v | grep -A1 -e VGA -e 3D

    # It will print something like this:
    #
    # VGA compatible controller: Intel Corproation Crystal ell Integrated Grahpics Controller (rev 08) (prog-if 00 [VGA controller])
    # Subsystem: Apple Inc. Device 0147

    ```

    So you can know that's a GPU integrated inside Intel CPU and 'Subsystem' show you the specific model for you to find the driver

- Install the video driver

    ```bash
    # Driver - `xf86-video-BRAND_NAME_HERE`
    # OpenGL - `lib32-mesa` if you needed
    # OpenGL (multilib) - `mesa`
    sudo pacman -S xf86-video-intel mesa
    ```

    [here](https://wiki.archlinux.org/index.php/xorg) is the full list

## How to remove `pacmanc` cache

After a while, `pacman` cache will be huge, it locates in `/var/cache/pacman/pgk`, you can remove all if you don't need it.

```bash
sudo pacman -Scc
```

# Extra configuration for USB

- RAM disk image

    In order to boot the Linux Kernel persistently off of a USB device, 
    some adjustments may be necessary to the initial RAM disk image. 
    We need to ensure that block device support is properly loaded before 
    any attempt at loading the filesystem. This not always the way a RAM disk
    image is configured in a generic Linux installation, and I suspect this may
    one of the failure points in other Linux USB installations out there.

    So we need to make some changes to `/etc/mkinitcpio.conf`:

    ```bash
    # Back to `Live Arch`
    exit

    # Editr the config
    vim /mnt/etc/mkinitcpio.conf

    # And ensure the `block` hook comes before the `filesystems` hook
    # and directly after the `udev` hook like the following:
    HOOKS=(base udev block filesystems keyboard fsck)

    # Save it and exit.
    ```


    Now go back to new `Arch Linux` and regenerate the initial RAM disk image with the changes made:

    ```bash
    arch-chroot /mnt

    mkinitcpio -p linux
    ```

</br>

- Network interface names

    Arch Linux's basic service manager, **`systemd`**, assigns network interfaces predictable 
    names based on the actual device hardware. This is great for just about any other type
    of install, but can pose some problems for the portable USB installation we're going for.

    To ensure that the ethernet and wifi interfaces will always be respectively named **`eth0`** 
    and **`wlan0`**, revert the Arch Linux USB back to traditional device naming:

    ```bash
    # We're inside installed Arch
    ln -s /dev/null /etc/udev/rules.d/80-net-setup-link.rules
    ````

</br>

- Journal configuration

    A default installation of Arch Linux is setup with **`systemd`** to continuously journal various 
    information about current processes and write that data to storage on disk. For a persistent 
    bootable installation on a flash memory device, however, we can change some options in `journald.conf`
    to enable journal keeping entirely in RAM (thus reducing writes to the flash device). To control where
    journal data is stored.

    ```bash
    # Back to `Live Arch`
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

</br>

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


    # Replace all mount options from `relatime` to `noatime`. 
    # Save it and exit
    ```


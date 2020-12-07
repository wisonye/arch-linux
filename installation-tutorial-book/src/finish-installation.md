# Finish installation

Below are the final steps to finish the `Arch Linux` installation.

Make sure you're in the `New Arch Linux` root environment. If not, please run `arch-chroot /mnt` to go inside it.

- Add a new user and assign it to the `sudo` group

    ```bash
    # Add new user
    useradd -m -G wheel YOUR_USER_NAME

    # Set password
    passwd YOUR_USER_NAME

    # Install `sudo`
    pacman -S sudo

    # Enable `wheel` group for `sudo` command
    visudo

    # Enable the below line:
    # %wheel ALL=(ALL) ALL
    #
    # Save and exit.
    ```

- Exit and shutdown

    ```
    # Exit current Arch root.
    exit

    # Unmount all mounted folders and sync
    umount /mnt/boot /mnt && sync

    # Shutdown, all done:)
    shutdown -h now
    ```

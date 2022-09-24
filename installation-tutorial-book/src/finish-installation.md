# Finish installation

Below are the final steps to finish the `Arch Linux` installation.

Make sure you're in the `New Arch Linux` root environment. If not, please run `arch-chroot /mnt` to go inside it.

- Add a new user

    ```bash
    # Add new user
    useradd -m -G wheel YOUR_USER_NAME

    # Set password
    passwd YOUR_USER_NAME
    ```

    </br>

- Install and configure `doas`

    ```bash
    pacman --sync --refresh opendoas
    ```

    </br>

    Then create `/etc/doas.conf` with the following settings:

    ```bash
    # nopass   The user is not required to enter a password.
    # keepenv  Environment variables other than those listed in doas(1) are
    #          retained when creating the environment for the new process.
    #
    # Read `man doas.conf` for more details
    permit nopass keepenv YOUR_USER_NAME as root
    ```

    </br>

    Make sure to change the file permission:

    ```bash
    chown -c root:root /etc/doas.conf
    chmod -c 0400 /etc/doas.conf
    ```

    From now on, you can replace all `sudo xxx` to `doas xxx`.

    </br>


- Exit and shutdown

    ```
    # Exit current Arch root.
    exit

    # Unmount all mounted folders and sync
    umount /mnt/boot /mnt && sync

    # Shutdown, all done:)
    shutdown -h now
    ```

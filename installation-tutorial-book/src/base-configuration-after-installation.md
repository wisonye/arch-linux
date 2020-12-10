# Base configuration after installation

Keep in mind that:

The current `Arch Linux` you've already login is boot from the `Live ISO`, 
it just a `tool` for you to install another brand new `Arch Linux` to your hard drive or USB which located at `/mnt` and `/mnt/boot`.

Right now, you need to config the newer `Arch Linux` you just installed, that's why you need to use `arch-chroot` to change linux root environment into the `/mnt` folder!!!

After running `arch-chroot` command, you will be inside the newly installed `Arch Linux`.

</br>

- Change root into the new `Arch Linux`

    ```bash
    arch-chroot /mnt
    ```

</br>

- Choose timezone

    ```bash
    # ln -sf /usr/share/zoneinfo/YOUR_REGION/YOUR_CITY /etc/localtime

    # For example:
    ln -sf /usr/share/zoneinfo/Pacific/Auckland /etc/localtime
    ```

</br>

- Generate `/etc/adjtime`

    ```bash
    hwclock --systohc
    ```

</br>

- Localization

    Edit `/etc/locale.gen` and uncomment `en_US.UTF-8 UTF-8` line  and other needed `locales`.

    But the current linux doesn't have the `vim` yet, then we need to `exit` current Arch and back to `Live Arch` to edit it.

    ```bash
    # Exit current Arch root.
    exit

    # Now, we're in `Live Arch` and edit the file. 
    # Enable `en_US.UTF-8 UTF-8` line, save and exit.
    vim /mnt/etc/locale.gen

    # Then, change root back to new Arch Linux to genereate the locale 
    # settings.
    arch-chroot /mnt
    locale-gen

    # Exit current Arch root.
    exit

    # Then edit LANG settings. 
    # Add `LANG=en_US.UTF-8`.
    # save and exit.
    vim /mnt/etc/locale.conf

    # Then edit the keyboard settings
    vim /mnt/etc/vconsole.conf

    # Add my custom settings below (`Caps_Lock` works like `Escape`) to
    # `/mnt/etc/vconsole.conf`.
    # Save and exit.
    KEYMAP=us
    keycode 9 = Escape
    keycode 66 = Escape
    ```

</br>

- Hostname and host settings
    - `vim /mnt/etc/hostname`, set to your hostname.
    
    - `vim /mnt/etc/hosts` with the base settings like below:

        ```
        127.0.0.1	localhost
        ::1		localhost
        127.0.1.1	YOUR_HOSTNAME_HERE.localdomain	YOUR_HOSTNAME_HERE
        ```

</br>

- Change back into the new `Arch Linux` and set root password

    ```bash
    arch-chroot /mnt
    passwd
    ```


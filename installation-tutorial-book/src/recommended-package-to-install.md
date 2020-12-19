# Recommended package to install

All the packages below are optional but recommended which can make your life a bit easier before you install any DE (**`Desktop Environment`**) or WM (**`Window Manager`**).

Make sure you're in the `New Arch Linux` root environment. If not, please run `arch-chroot /mnt` to go inside it.

- Networking

    - [`netctl`](https://wiki.archlinux.org/index.php/netctl) - A CLI and profile-based network manager.
    - `ifplugd` - a daemon which will automatically configure your Ethernet device when a cable is plugged in and automatically unconfigure it if the cable is pulled.
    - And the based WIFI support CLI.

    ```bash
    pacman -S netctl ifplugd iw wpa_supplicant dialog dhcpcd
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

    # You can check you time setting by command `timedatectl`
    timedatectl
    #    Local time: Wed 2014-09-24 21:19:26 CST
    #  Universal time: Wed 2014-09-24 13:19:26 UTC
    #        RTC time: Wed 2014-09-24 13:19:26
    #        Timezone: Asia/Shanghai (CST, +0800) // time zone you setted
    #     NTP enabled: yes // if you enable systemd-timesysncd success here will be yes, otherwise you need use `systemctl status systemd-timesyncd.service` to check it
    #NTP synchronized: yes
    # RTC in local TZ: no
    #      DST active: n/a
    ```


    For the `WIFI` configuration, please go to `Configuration` chapter.
    
    </br>

- Video drivers

    To support most common **`GPUs`**, install all five basic open source video drivers:

    ```bash
    pacman -S xf86-video-amdgpu xf86-video-ati xf86-video-intel xf86-video-nouveau xf86-video-vesa
    ```

    </br>
    
- Touchpad support

    Install support for standard notebook touchpads:
    
    ```bash
    pacman -S xf86-input-synaptics
    ```
    
    </br>

- Battery support

    Install support for checking battery charge and state:
    
    ```bash
    pacman -S acpi tlp
    ```
    
    Enable the service

    ```bash
    systemctl enable tlp.service
    ```

    </br>
    
- Build tools if you needed

    ```bash
    pacman -S base-devel man
    ```

    </br>

- Basic editor and shell if you needed

    ```bash
    pacman -S vim fish
    ```
    
    </br>

- Basic ssh tool if you needed

  ```bash
  pacman -S openssh
  ```

  
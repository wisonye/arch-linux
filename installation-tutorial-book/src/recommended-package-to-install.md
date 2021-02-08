# Recommended package to install

All the packages below are optional but recommended which can make your life a bit easier before you install any DE (**`Desktop Environment`**) or WM (**`Window Manager`**).

Make sure you're in the `New Arch Linux` root environment. If not, please run `arch-chroot /mnt` to go inside it.

- Networking

    - [`netctl`](https://wiki.archlinux.org/index.php/netctl) - A CLI and profile-based network manager.
    - `ifplugd` - a daemon which will automatically configure your Ethernet device when a cable is plugged in and automatically unconfigure it if the cable is pulled.
    - And the based WIFI support CLI.

    ```bash
    pacman -S netctl ifplugd iw wpa_supplicant dhcpcd
    ```
    
    Copy the example ethernet profile to `/etc/netctl/`:

    ```bash
    cp /etc/netctl/examples/ethernet-dhcp /etc/netctl/eth0-dhcp
    ```

    ![36.png](./images/virtual-box-installation/36.png)
    
    Enable `ifplugd` to automatically connect to any available wired network:

    ```bash
    systemctl enable netctl-ifplugd@eth0.service
    ```

    ![37.png](./images/virtual-box-installation/37.png)
    
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

    ![38.png](./images/virtual-box-installation/38.png)

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

    </br>

- `bat` is a enhancement for `cat` written in `Rust`.

    It adds some default features below:

    - Line number
    - Color
    - Git integration, can show git status
    - Works like `less` you can do `vim` searching
    - Automatic paging

    ```bash
    pacman --sync --refresh bat
    ```

    usage:

    ```bash
    bat FILE_NAME
    
    # Pipe case
    curl -s https://sh.rustup.rs | bat
    ```

    </br>

- `procs` is a replacement for `ps` written in `Rust`.

    ```bash
    pacman --sync --refresh procs
    ```

    Optionally, you can add `alias ps="procs"` (for `bash`) or `abbr ps "pros" (for `fish`)
    to your shell configuration file.

    Some use cases:

    ```bash
    # Query `vim` related process
    procs vim

    # Query `vim` or `alacritty` related process
    procs --or vim alacritty

    # Query `vim` or `alacritty` and ascending sort by PID
    procs --or --sorta PID vim alacritty

    # Query `vim` or `alacritty` and descending sort by memory
    procs --or --sortd VmRss vim alacritty

    # Query `vim` or `alacritty` related process in watch mode (1s refresh rate)
    procs --or --watch vim alacritty
    ```

    </br>

    Also, you can custom the config to control which informat you want to show:

    `vim ~/.config/procs/config.toml` with the following settings:

    ```bash
    # For more detail setting information, plz visit https://github.com/dalance/procs
    
    [[columns]]
    # The column kind to show
    kind = "Pid"
    # Use which color to show
    style = "BrightYellow|Yellow"
    # This column can be search for as numeric parameter passed
    # to `procs` command?
    numeric_search = true
    # This column can be search for as non-numeric parameter passed
    # to `procs` command?
    nonnumeric_search = false
    # Alignment, "Left, Center, Right". "Left" by default.j
    # align = "Right"
    
    [[columns]]
    kind = "User"
    style = "BrightMagenta|Magenta"
    numeric_search = false
    nonnumeric_search = true
    align = "Right"
    
    [[columns]]
    kind = "Separator"
    style = "BrightWhite|White"
    color_075 = "BrightWhitee"
    numeric_search = false
    nonnumeric_search = false
    align = "Center"
    
    [[columns]]
    kind = "Tty"
    style = "BrightWhite|White"
    numeric_search = false
    nonnumeric_search = false
    align = "Center"
    
    [[columns]]
    kind = "Threads"
    style = "BrightWhite|White"
    numeric_search = false
    nonnumeric_search = false
    align = "Center"
    
    [[columns]]
    kind = "TcpPort"
    style = "BrightCyan|Cyan"
    numeric_search = true
    nonnumeric_search = false
    align = "Right"
    
    [[columns]]
    kind = "VmRss"
    style = "BrightGreen|Green"
    numeric_search = false
    nonnumeric_search = false
    align = "Right"
    
    # [[columns]]
    # kind = "UsageCpu"
    # style = "BrightGreen|Green"
    # numeric_search = false
    # nonnumeric_search = false
    # align = "Center"
    # 
    # [[columns]]
    # kind = "UsageMem"
    # style = "BrightGreen|Green"
    # numeric_search = false
    # nonnumeric_search = false
    # align = "Center"
    
    [[columns]]
    kind = "Separator"
    style = "BrightWhite|White"
    numeric_search = false
    nonnumeric_search = false
    align = "Center"
    
    [[columns]]
    kind = "Command"
    style = "BrightWhite|White"
    numeric_search = false
    nonnumeric_search = true
    align = "Left"
    
    [search]
    numeric_search = "Exact"
    nonnumeric_search = "Partial"
    logic = "And"
    
    [display]
    show_self = false
    show_thread = false
    show_thread_in_tree = true
    cut_to_terminal = true
    cut_to_pager = false
    cut_to_pipe = false
    color_mode = "Always"
    
    [sort]
    column = 0
    order = "Ascending"
    # order = "Descending"
    
    [docker]
    path = "unix:///var/run/docker.sock"
    
    [pager]
    mode = "Auto"
    ```

    The custom config above show with the follow colums:

    `PID, User, TTY, Threads, TCP, VmRSS, Command`

    Here is the running example:

    - Search by TCP port:

        ![procs-search-by-tcpport](./images/procs-search-tcp-port.png)

    - `Or` search by name and sort (desc) by memory usage:

        ![procs-search-name-and-sort-by-memory.png](./images/procs-search-name-and-sort-by-memory.png) <++>
    </br>


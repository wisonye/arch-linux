# About iptable module

The Linux kernel has a modular design. A kernel module, or often referred to as
a driver, is a piece of code that extends the kernel’s functionality.

Modules are either compiled as `loadable modules` or `built into the kernel`.
`Loadable modules` can be loaded and unloaded in the running kernel on request,
without the need to reboot the system.

</br>

- How to search particular loadable module name

    All kernel modules are located in `/lib/modules/$(uname -r)` folder, then
    you can search the particular module names like this:

    ```bash
    fd --type file -e ko.gz . /lib/modules/$(uname -r) | rg "iptable|ip_table|ip6table|ip6_table" | sort

    # /lib/modules/5.15.79-0-lts/kernel/net/ipv4/netfilter/ip_tables.ko.gz
    # /lib/modules/5.15.79-0-lts/kernel/net/ipv4/netfilter/iptable_filter.ko.gz
    # /lib/modules/5.15.79-0-lts/kernel/net/ipv4/netfilter/iptable_mangle.ko.gz
    # /lib/modules/5.15.79-0-lts/kernel/net/ipv4/netfilter/iptable_nat.ko.gz
    # /lib/modules/5.15.79-0-lts/kernel/net/ipv4/netfilter/iptable_raw.ko.gz
    # /lib/modules/5.15.79-0-lts/kernel/net/ipv6/netfilter/ip6_tables.ko.gz
    # /lib/modules/5.15.79-0-lts/kernel/net/ipv6/netfilter/ip6table_filter.ko.gz
    # /lib/modules/5.15.79-0-lts/kernel/net/ipv6/netfilter/ip6table_mangle.ko.gz
    # /lib/modules/5.15.79-0-lts/kernel/net/ipv6/netfilter/ip6table_nat.ko.gz
    # /lib/modules/5.15.79-0-lts/kernel/net/ipv6/netfilter/ip6table_raw.ko.gz
    ```

    Module name is the part that without `.ko.gz`, e.g `ip_tables`, `ip6_tables`.

    </br>


- How to get module info

    ```bash
    modinfo ip_tables

    # filename:       /lib/modules/5.15.79-0-lts/kernel/net/ipv4/netfilter/ip_tables.ko.gz
    # alias:          ipt_icmp
    # description:    IPv4 packet filter
    # author:         Netfilter Core Team <coreteam@netfilter.org>
    # license:        GPL
    # depends:        x_tables
    # retpoline:      Y
    # intree:         Y
    # name:           ip_tables
    # vermagic:       5.15.79-0-lts SMP mod_unload modversions
    ```

    ```bash
    modinfo ip6_tables

    # filename:       /lib/modules/5.15.79-0-lts/kernel/net/ipv6/netfilter/ip6_tables.ko.gz
    # alias:          ip6t_icmp6
    # description:    IPv6 packet filter
    # author:         Netfilter Core Team <coreteam@netfilter.org>
    # license:        GPL
    # depends:        x_tables
    # retpoline:      Y
    # intree:         Y
    # name:           ip6_tables
    # vermagic:       5.15.79-0-lts SMP mod_unload modversions
    ```

    </br>


- How to load and unload `loadable module`

    You can load a module by running `modprobe MODULE_NAME parameter=value` and
    unload a module by running `modprobe -r MODULE_NAME`.

    ```bash
    modprobe ip_tables ip6_tables
    ```

    </br>

    After loading a module, you can use `lsmod | rg ip_tables` to confirm whether
    it has been loaded or not.

    </br>

- Man pages

    Btw, I don't know how to install man pages for `modprobe/lsmod` in `Alpine
    Linux`, so here are the man pages from `Arch Linux`:

    [modprobe](https://man.archlinux.org/man/modprobe.8.en)

    [modinfo](https://man.archlinux.org/man/modinfo.8.en)

    [lsmod](https://man.archlinux.org/man/lsmod.8)

    </br>


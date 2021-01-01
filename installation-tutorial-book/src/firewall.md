# Firewall

- Install

    ```bash
    sudo pacman -Sy firewalld ipset
    ```
</br>

- About the **`zone`** and **`service`**
    - What is a **`zone`**

        Long story short, a zone just like a `folder` contains predefined
        firewall rules.

    - Predefined **`services`**

        A service is a combination of port and/or protocol rules.

</br>

- Available **`zones`**

    Here only list the usual zone which user will use, for more details
    plz access the man page by running: `man firewalld.zones`.

    - **`drop`**

        The high secure option, no service open by default. Any incoming 
        network packets are dropped, there is no reply. Only outgoing 
        network connections are possible.

        ```bash
        sudo firewall-cmd --info-zone=drop
        #drop
        #  target: DROP
        #  icmp-block-inversion: no
        #  interfaces:
        #  sources:
        #  services:
        #  ports:
        #  protocols:
        #  forward: no
        #  masquerade: no
        #  forward-ports:
        #  source-ports:
        #  icmp-blocks:
        #  rich rules:
        ```

    - **`public`** (The default zone)

        For use in public areas. You do not trust the other computers
        on networks to not harm your computer. Only selected incoming
        connections are accepted.

        ```bash
        sudo firewall-cmd --info-zone=home
        #home
        #  target: default
        #  icmp-block-inversion: no
        #  interfaces:
        #  sources:
        #  services: dhcpv6-client mdns samba-client ssh
        #  ports:
        #  protocols:
        #  forward: no
        #  masquerade: no
        #  forward-ports:
        #  source-ports:
        #  icmp-blocks:
        #  rich rules:
        ```

</br>

- Configuration


    All configurations in `firewalld` separate in `runtime` and `permanent`, 
    `runtime` means only take effect from now on, but will not exists after
    reboot. If you run the command without `--permanent`, that means only 
    affect to the `runtime` configuration.

    ```bash
    # List the default zone
    firewall-cmd --get-default-zone

    # List all available zones
    firewall-cmd --get-zones

    # List all enabled services under current zone (`public` by default)
    sudo firewall-cmd --list-service
    sudo firewall-cmd --list-service --permanent

    # List all available services which you can add or remove
    firewall-cmd --get-services

    # Add the specified (enable) sevice to the current zone
    sudo firewall-cmd --add-service SERVICE_NAME_HERE
    sudo firewall-cmd --add-service SERVICE_NAME_HERE --permanent

    # Remove the specified sevice to the current zone
    sudo firewall-cmd --remove-service SERVICE_NAME_HERE
    sudo firewall-cmd --remove-service SERVICE_NAME_HERE --permanent

    # Usually, all setting commands are instancely.
    # But you can reload all the rules at any time.
    sudo firewall-cmd --reload
    ```

    </br>

    But you can config all the rules in a `GUI` tool:

    ```bash
    sudo firewall-config
    ```

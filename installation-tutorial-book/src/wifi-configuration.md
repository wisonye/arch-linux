# WIFI Configuration

Right now, the newer `Arch Linux` can connect via **`ethernet`** NIC, but how about **`wireless`** NIC?

- Copy the WIFI config from example and named it as `wlan0-dhcp`

    ```bash
    cd /etc/netctl
    sudo cp -rvf examples/wireless-wpa ./wlan0-dhcp
    ```

</br>

- Edit `wlan0-dhcp` to change your WIFI `SSID` and `KEY` (encrypted password in HEX string)

    ```bash
    sudo vim wlan0-dhcp

    # Change the `ESSID` to your WIFI `SSID`
    
    # Go to the bottom, run the command below to read the 
    # `wpa_passphrase` result into current file.
    :r !wpa_passphrase YOUR_SSID_HERE YOUR_WIFI_PASSWORD_TEXT_HERE | grep psk
    
    # After that, you should get something like below:
    # #psk="xxxxx"
    # psk="XXXXXX" // That's encrypted WIFI PASS in HEX string
    # 
    # So you need to copy that "XXXX" hex string and make it looks like below
    # to set the `Key` value.
    # Make sure the value start with `\"` and then follow your HEX string
    Key=\"XXXXXX
    
    # Finally, enable the `Hidden=yes` line if your SSID is hidden.
    # Then save and exit
    ```

</br>

- Start connecting to WIFI

    Any file located at `/etc/netctl` folder is call `profile`,
    you can run the `netctl start PROFILE_NAME` to start any profile-based
    network configuration:

    ```bash
    sudo netctl start wlan0-dhcp
    ```

    If start fail, then run `sudo netctl status wlan0-dhcp` to read the detail error.

</br>

- Connect to WIFI when computer boots

    You can create a `systemd` service to connect to WIFI automatic when computer boots

    ```bash
    sudo netctl reenable wlan0-dhcp
    ```
    But this is not recommended if you're installing the `Arch Linux` to **USB**,
    as not all computers always have the `wlan0`. In the case which doesn't have the `wlan0` NIC,
    then the booting process will keep waiting before time out, it will waste a couple of seconds.

    For solving this, you can add a script to start `wlan0-dhcp` profile into a script which will 
    be added to **`lightdm`**, that will be perfect.


Pay attention:

In this tutorial, I still can't connect to **5G**, I think should be the driver
issue, as the result below doesn't include **5G** channel

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


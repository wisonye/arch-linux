# Connect to WIFI

If you prefer to use `WIFI` during the installation, then please keep reading.

First thing first, please make sure your WIFI doesn't hide the **SSID**. Otherwise, it won't work!!!

Also, the steps below seems not works with the **5G** WIFI if you use encrypted password, use **2.4G** instead.

For the `5G` network and hidden SSID, it works after you install `netctl`, plz read the details in `WIFI Configuration` chapter.

</br>

- Enable your WIFI NIC (Network Interface Card), please change `wlan0` to yours if your NIC doesn't `wlan0`. 
you can use `ip add` to show which WIFI NIC you're using.

    ```bash
    ip link set wlan0 up
    ```


- If you don't know the **SSID** or not sure your **SSID** is scannable or not, then run it to confirm
    ```bash
    iwlist wlan0 scan | grep SSID
    ```

- Save your WIFI password into a temporary config file
    ```bash
    wpa_passphrase YOUR_SSID_HERE YOUR_WIFI_PASSWORD_HERE > interent.conf
    ```

- Connet to WIFI
    ```bash
    wpa_supplicant -c interent.conf -i wlan0 &
    ```

- After you see the log looks like connected, then check your IP
    ```bash
    ip add
    ```

- Maybe you need to run `dhcpcd &` to grab a new IP if your router doesn't do that for u.

- After you can access to internet, enable **NTP** to sync your clock
    ```bash
    timedatectl set-ntp true
    ```

# How to connect `AirPods` via `Bluetooth`


- Install all following packages

    ```bash
    sudo pacman --sync --refresh bluez bluez-utils blueman pulseaudio-bluetooth pulseaudio-alsa
    ```

    </br>

- Enable/start service

    ```bash
    # Enable the bluetooh service when starting
    sudo systemctl enable bluetooth.service

    # Restart the service
    sudo systemctl restart bluetooth.service

    # Make sure it's running
    sudo systemctl status bluetooth.service
    # ● bluetooth.service - Bluetooth service
    #      Loaded: loaded (/usr/lib/systemd/system/bluetooth.service; enabled; vendor preset: disabled)
    #      Active: active (running) since Sat 2021-08-28 19:11:22 NZST; 8min ago
    #        Docs: man:bluetoothd(8)
    #    Main PID: 526 (bluetoothd)
    #      Status: "Running"
    #       Tasks: 1 (limit: 47948)
    #      Memory: 2.9M
    #         CPU: 47ms
    #      CGroup: /system.slice/bluetooth.service
    #              └─526 /usr/lib/bluetooth/bluetoothd
    ```

    </br>


- Before you can pair successfully, you need to change the configuration file:

    ```bash
    sudo nvim /etc/bluetooth/main.conf

    # Make sure `ControllerMode` set to `bredr`!!!
    ControllerMode = bredr

    # Save and exit
    ```

    Restart the service again (or reboot if it doesn't work)

    ```bash
    sudo systemctl restart bluetooth.service
    ```

    </br>

- If you didn't pair yet, then follow the steps below

    Run `bluetoothctl`, then:

    ```bash
    power on

    scan on
    ```

    Right now, open the lip and hold down the AirPods's pair button untill 
    you see the white flash ligth is blinking.

    Pay attention to the new device show up with `XXX AirPods`.
    For example, my AirPods Mac is `C4:0B:31:D8:C9:06`.


    Then you can release the pair button and start to pair, and **DO NOT take
    it out before you connected to it !!!**

    ```bash
    # You only need to type `C4` then press `tab` key to complect the whole
    # Id
    pair C4:0B:31:D8:C9:06
    ```

    You should see `Pair successfully` (some keywords like that), then you
    need to trust the AirPods by running:

    ```bash
    trust C4:0B:31:D8:C9:06
    ```

    Now you can connect by running:

    ```bash
    connect C4:0B:31:D8:C9:06
    ```

    </br>


### Connect all your bluetooth device by one command

- Create `~/scripts/connect-bluetooth.sh` with the following content:

    ```bash
    #!/bin/sh
    bluetoothctl -- power on
    bluetoothctl -- connect 64:C7:53:ED:C2:77
    bluetoothctl -- connect 68:FE:F7:59:8F:83
    bluetoothctl -- connect C4:0B:31:D8:C9:06
    ```

    Replace all your bluetooth hardware mac addresses, save it and make it
    executable.


    </br>

- Reboot and run run the `~/scripts/connect-bluetooth.sh` (maybe a few times
until all your bluetooth devices been connected.



</br>



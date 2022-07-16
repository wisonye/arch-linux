# WIFI Configuration via `Network Manager`

- Install and enable service

    ```bash
    # Install
    sudo pacman --sync --refresh networkmanager

    # Enable and restart service
    sudo sysctl enable NetworkManager.service
    sudo sysctl restart NetworkManager.service
    ```

    </br>


- Configure and connect
    
    - List all available devices

        ```bash
        # Markdown the device name with `wifi` TYPE
        nmcli device
        ```

        </br>



    - Enable WIFI on device

        ```bash
        # Enable wifi
        nmcli radio wifi on
        ```

        After that, you can print the wifi status and make sure it's `enabled`:

        ```bash
        nmcli radio wifi
        # enabled
        ```

        </br>

    - List or rescan existing WIFI SSID

        ```bash
        nmcli device wifi list

        # Rescan when needed
        nmcli device wifi rescan
        ```

        </br>


    - connect

        ```bash
        nmcli device wifi connect SSID_HERE password PASSOWRD_HERE
        ```

        </br>


    - Disconnect

        ```bash
        nmcli device disconnect WIFI_DEVICE_NAME_HERE

        # Use `down` for old version
        nmcli device down WIFI_DEVICE_NAME_HERE

        # You can reconnect to the last SSID by making it `up` again
        nmcli device up WIFI_DEVICE_NAME_HERE
        ```

        </br>



# How to setup low-battery notifications

- `vim ~/scripts/check-battery.sh` with the following content:

    ```bash
    #!/bin/bash

    # Because `dunstify` needs the `dbus-daemon` to send the notification,
    # that's why we need to have the below settings. 
    # 
    # `DBUS_SESSION_BUS_ADDRESS` helps the `dbus-daemon` to use the existing 
    # running session rather than fork the new one!!! 
    #
    # Otherwise, you will see a lot of forked `dbus-daemon` processes under the 
    # `CGroup: /system.slice/cronie.service` when checking the service like below:
    # 
    # `systemctl status cronie.service`
    export DISPLAY=:0
    export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/1000/bus"

    #Check parameters
    if [[ -z "$1" || "$1" -lt 0 || "$1" -gt 100 ]]; then
        echo "Usage: checkbat <warning threshold in percentage>"
        exit 1
    fi
    
    #Check if battery is present
    if [[ -f /sys/class/power_supply/BAT0/capacity ]]; then
        #Poll status and current capacity
        LEVEL=$(cat /sys/class/power_supply/BAT0/capacity)
        STATUS=$(cat /sys/class/power_supply/BAT0/status)
        echo "Battery level at ${LEVEL}% $STATUS"
    
        #Check if the capacity is below threshold and discharging
        if [[ "$LEVEL" -lt "$1" && "$STATUS" == "Discharging" ]]; then
            dunstify --appname="Battery checker" \
                     --urgency=critical \
                     --icon=battery-level-0-charging-symbolic.symbolic \
                     "Battery at ${LEVEL}%, Please connect charger immediate!"
        fi
    else
        echo "No battery!"
    fi
    ```

</br>

- Install `cronie`

    ```bash
    sudo pacman --sync --refresh cronie
    ```
</br>

- Add repeatable task to `cronine`

    Run `EDITOR=vim crontab -e` with the following settings:

    ```bash
    */1 * * * * ~/scripts/check-battery.sh 8
    ```

    It means run the `~/scripts/check-battery.sh 8` command for every minute
    with the `8%` threshold notification settings.

</br>

- Enable `cronie` service

    ```bash
    sudo systemctl enable --now cronie.service
    ```

</br>

- Service log

    If you run `systemctl status cronie.service` to check the service status, it
    will print out the log like below:

    ```bash
    ● cronie.service - Periodic Command Scheduler
         Loaded: loaded (/usr/lib/systemd/system/cronie.service; enabled; vendor preset: disabled)
         Active: active (running) since Sat 2021-02-06 20:46:55 NZDT; 44min ago
       Main PID: 722 (crond)
          Tasks: 1 (limit: 19013)
         Memory: 1.1M
         CGroup: /system.slice/cronie.service
                 └─722 /usr/bin/crond -n
    
    Feb 06 21:29:01 wison-arch CROND[5367]: (wison) CMDOUT (Unable to send notification: Error spawning command line “dbus-launch --autolaunch=61a4f82>
    Feb 06 21:29:01 wison-arch CROND[5367]: pam_unix(crond:session): session closed for user wison
    Feb 06 21:30:01 wison-arch crond[5531]: pam_unix(crond:session): session opened for user wison(uid=1000) by (uid=0)
    Feb 06 21:30:01 wison-arch CROND[5532]: (wison) CMD (~/scripts/check-battery.sh 60)
    Feb 06 21:30:01 wison-arch CROND[5531]: (wison) CMDOUT (Battery level at 30% Discharging)
    Feb 06 21:30:01 wison-arch CROND[5531]: pam_unix(crond:session): session closed for user wison
    Feb 06 21:31:01 wison-arch crond[5610]: pam_unix(crond:session): session opened for user wison(uid=1000) by (uid=0)
    Feb 06 21:31:01 wison-arch CROND[5611]: (wison) CMD (~/scripts/check-battery.sh 60)
    Feb 06 21:31:01 wison-arch CROND[5610]: (wison) CMDOUT (Battery level at 30% Discharging)
    Feb 06 21:31:01 wison-arch CROND[5610]: pam_unix(crond:session): session closed for user wison
    ```
</br>

</br>


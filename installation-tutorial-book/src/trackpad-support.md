# Trackpad support

- List your `Apple Trackpad` device

    ```bash
    sudo libinput list-devices | grep Trackpad -A 17
    ```



```bash
# By default, this folder should empty if you didn't add any configuration
# manually
ls -lht /etc/X11/xorg.conf.d/

# If you installed `synaptics` (`xf86-input-synaptics`) and `libinput` (`xf86-input-libinput`),
# then you should see result like this:
ls -lht /usr/share/X11/xorg.conf.d/

-rw-r--r-- 1 root root 1.4K Dec  2 08:51 10-quirks.conf
-rw-r--r-- 1 root root   92 May 19  2020 10-amdgpu.conf
-rw-r--r-- 1 root root 1.4K May 19  2020 40-libinput.conf
-rw-r--r-- 1 root root   92 May 17  2020 10-radeon.conf
-rw-r--r-- 1 root root 1.8K May 17  2020 70-synaptics.conf

# If match the above case, then create to soft link like this:
sudo ln -s /usr/share/X11/xorg.conf.d/40-libinput.conf /etc/X11/xorg.conf.d/40-libinput.conf

# After restart the X, run the command below and you should some ouput
# like below:
grep -e "Using input driver 'libinput'" /var/log/Xorg.0.log

[  5734.514] (II) Using input driver 'libinput' for 'Power Button'
[  5734.579] (II) Using input driver 'libinput' for 'Video Bus'
[  5734.633] (II) Using input driver 'libinput' for 'Power Button'
[  5734.687] (II) Using input driver 'libinput' for 'Sleep Button'
[  5734.729] (II) Using input driver 'libinput' for 'Apple Inc. Apple Internal Keyboard / Trackpad'
[  5734.887] (II) Using input driver 'libinput' for 'Broadcom Corp. Bluetooth USB Host Controller'
[  5734.927] (II) Using input driver 'libinput' for 'Broadcom Corp. Bluetooth USB Host Controller'""
```

That proves your trackpad is using the `libinput` driver. So you can add the following setting to 
improve your trackpad experiences:

- Same scrolling experience within **`MacOS`**

    `sudo vim /etc/X11/xorg.conf.d/40-libinput.conf`, then add the following settings to 
    `libinput touchpad catchall` section. 

    - `Option "NaturalScrolling" "true"` - Reverse the scrolling direction
    - `Option "Tapping" "on"` - Tap to click

    Finally, it looks like this:

    ```bash
    Section "InputClass"
            Identifier "libinput touchpad catchall"
            MatchIsTouchpad "on"
            MatchDevicePath "/dev/input/event*"
            Driver "libinput"
    	    Option "NaturalScrolling" "true"
            Option "Tapping" "on"
    EndSection
    ```


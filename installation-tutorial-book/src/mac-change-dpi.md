# Change **`DPI`** by script

If you install `Arch Linux` to a **USB**, then you definitely need to change screen **`DPI`**
when you switch between `iMac` and `MacBookPro`. 

- **`iMac (5K)`**
    
    - Create `~/scripts/Xresources-imac` with the following settings:

        ```bash
        Xft.dpi: 144
        ```
    - Create `~/scripts/change-dpi-for-imac.sh` with the following settings:

        ```bash
        #!/bin/bash
        cp -rvf ~/scripts/Xresources-imac ~/.Xresources
        i3exit logout
        ```
    - Make it executable

        ```bash
        chmod + x~/scripts/change-dpi-for-imac.sh
        ```

</br>

- **`MacBookPro 2015`**
    
    - Create `~/scripts/Xresources-mbp-2015` with the following settings:

        ```bash
        Xft.dpi: 192
        ```
    - Create `~/scripts/change-dpi-for-mbp-2015.sh` with the following settings:

        ```bash
        #!/bin/bash
        cp -rvf ~/scripts/Xresources-mbp-2015 ~/.Xresources
        i3exit logout
        ```
    - Make it executable

        ```bash
        chmod + x~/scripts/change-dpi-for-mbp-2015.sh
        ```

</br>

- **`MacBookPro 2012`**
    
    - Create `~/scripts/Xresources-mbp-2012` with the following settings:

        ```bash
        Xft.dpi: 96
        ```
    - Create `~/scripts/change-dpi-for-mbp-2012.sh` with the following settings:

        ```bash
        #!/bin/bash
        cp -rvf ~/scripts/Xresources-mbp-2012 ~/.Xresources
        i3exit logout
        ```
    - Make it executable

        ```bash
        chmod + x~/scripts/change-dpi-for-mbp-2015.sh
        ```

</br>

After that, you can change to any screen DPI at anytime you want in real-time.

Pay attention: After you run the script, it will log you out to take effect!!!

```bash
# For iMac 5K Screen
~/scripts/change-dpi-for-imac.sh

# For MacBookPro 2015 screen
~/scripts/change-dpi-for-mbp-2015.sh

# For MacBookPro 2012 screen
~/scripts/change-dpi-for-mbp-2012.sh
```

# Change **`DPI`** by script

If you install `Arch Linux` to a **USB**, then you definitely need to change screen **`DPI`**
when you switch between `iMac` and `MacBookPro`. 

- Create `~/scripts/Xresources-imac` with the following settings:

    ```bash
    # --------------------------------------------------------------------------------
    # The setting below will affect the screen DPI (Dots Per Inch)
    #
    # Based on the wiki (https://wiki.archlinux.org/index.php/HiDPI) "X Resources"
    # section, it says:
    #
    # For `Xft.dpi`, using the integer multiples 96 usually works best. For example:
    # 96  - 100% scaling
    # 144 - 150% scaling
    # 192 - 200% scaling
    # 288 - 300% scaling
    # --------------------------------------------------------------------------------
    # Xft.dpi: 96
    Xft.dpi: 144
    # Xft.dpi: 192
    # Xft.dpi: 288
    ```

- Create `~/scripts/Xresources-mac-book-pro` with the following settings:

    ```bash
    # --------------------------------------------------------------------------------
    # The setting below will affect the screen DPI (Dots Per Inch)
    #
    # Based on the wiki (https://wiki.archlinux.org/index.php/HiDPI) "X Resources"
    # section, it says:
    #
    # For `Xft.dpi`, using the integer multiples 96 usually works best. For example:
    # 96  - 100% scaling
    # 144 - 150% scaling
    # 192 - 200% scaling
    # 288 - 300% scaling
    # --------------------------------------------------------------------------------
    # Xft.dpi: 96
    # Xft.dpi: 144
    Xft.dpi: 192
    # Xft.dpi: 288
    ```

- Create `~/scripts/change-dpi-for-imac.sh` with the following settings:

    ```bash
    #!/bin/bash
    cp -rvf ~/scripts/Xresources-imac ~/.Xresources
    i3exit logout
    ```

- Create `~/scripts/change-dpi-for-mac-book-pro.sh` with the following settings:

    ```bash
    #!/bin/bash
    cp -rvf ~/scripts/Xresources-mab-book-pro ~/.Xresources
    i3exit logout
    ```

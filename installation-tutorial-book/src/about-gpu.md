# About GPU

- Identify your graphics card:

    ```bash
    lspci -v | grep -A1 -e VGA -e 3D

    # It will print something like this:
    #
    # VGA compatible controller: Intel Corproation Crystal ell Integrated Grahpics Controller (rev 08) (prog-if 00 [VGA controller])
    # Subsystem: Apple Inc. Device 0147

    ```

    So you can know that's a GPU integrated inside Intel CPU and 'Subsystem' show you the specific model for you to find the driver

</br>

- Install the video driver

    ```bash
    # Driver - `xf86-video-BRAND_NAME_HERE`
    # OpenGL - `lib32-mesa` if that's Intel
    # OpenGL (multilib) - `mesa` if that's Intel
    sudo pacman -S xf86-video-intel mesa mesa-demos
    sudo pacman -Sy 
    ```
    [here](https://wiki.archlinux.org/index.php/xorg) is the full list for all GPU brands.


    After that, you can run the utilities below to check your OpenGL ability:

    ```
    # Check the OpenGL version
    glxinfo | grep "OpenGL version"

    # Test the OpenGL render framerate
    glxgears
    ```


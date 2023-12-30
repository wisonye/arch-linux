# Config `pacman`

- Enable the `Color` output
    
    ```
    vim /etc/pacman.conf

    # Search and enable `Color` line, save and exit
    ```

</br>

- Setup mirror

    Open [mirror list](https://www.archlinux.org/mirrors/) to search your native country and click on it, you should be able to see the **Mirror URL**.
    In this tutorial, I just pick **New Zealand** as an example. 

    It looks like this:

    ```bash
    # Make sure to copy your country mirror URL here
    https://mirror.2degrees.nz/archlinux/
    https://mirror.fsmg.org.nz/archlinux/
    https://archlinux.ourhome.kiwi/archlinux/
    ```

    Then `vim /etc/pacman.d/mirrorlist` and replace all contents with the below settings:


    ```bash
    # Make sure change to your country mirror URL!!!
    # The syntax looks like below:
    #
    # Server = YOUR_MIRROR_URL/$repo/os/$arch

    # New Zealand
    Server = https://mirror.2degrees.nz/archlinux/$repo/os/$arch
    Server = https://mirror.fsmg.org.nz/archlinux/$repo/os/$arch
    Server = https://archlinux.ourhome.kiwi/archlinux/$repo/os/$arch
    ```

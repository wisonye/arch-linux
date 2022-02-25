# Fix webcam issues

- Check your `webcam` whether being detected

    - If you got `v4l-utils`, then try to run:

        ```bash
        v4l2-ctl --list-devices

        # Cannot open device /dev/video0, exiting.
        ```

    - If you got `vlc`, then just run:

        ```bash
        vlc v4l2:// :input-slave=alsa:// :v4l-vdev="/dev/video0"
        ```

        Or open `vlc` and choose `media --> Open Capture Device` and test it.

    </br>

    Basically, if you don't have `/dev/video0` device, then you webcam is not
    supported by the default kernel driver. So, you need to solve that manually.

</br>

- List your hardware and find the driver

    First you need to know what webcam hardware you have on your computer by running:

    ```bash
    sudo lspci -v | grep -e Cam -A18

    # 04:00.0 Multimedia controller: Broadcom Inc. and subsidiaries 720p FaceTime HD Camera
    # 	Subsystem: Broadcom Inc. and subsidiaries 720p FaceTime HD Camera
    # 	Flags: bus master, fast devsel, latency 0, IRQ 39
    # 	Memory at a0a00000 (64-bit, non-prefetchable) [size=64K]
    # 	Memory at 80000000 (64-bit, prefetchable) [size=256M]
    # 	Memory at a0900000 (64-bit, non-prefetchable) [size=1M]
    # 	Capabilities: [48] Power Management version 3
    # 	Capabilities: [58] MSI: Enable+ Count=1/1 Maskable- 64bit+
    # 	Capabilities: [68] Vendor Specific Information: Len=44 <?>
    # 	Capabilities: [ac] Express Endpoint, MSI 00
    # 	Capabilities: [100] Advanced Error Reporting
    # 	Capabilities: [13c] Device Serial Number 00-00-00-ff-ff-00-00-00
    # 	Capabilities: [150] Power Budgeting <?>
    # 	Capabilities: [160] Virtual Channel
    # 	Capabilities: [1b0] Latency Tolerance Reporting
    # 	Capabilities: [220] Physical Resizable BAR
    # 	Kernel driver in use: bdc-pci
    # 	Kernel modules: bdc_pci
    ```

    For my case, even the kernel driver `bdc_pci` is loaded, but the webcam still not
    working. That means the default `bdc_pci` driver is not correct or not support
    the `Apple MacBook Pro FaceTime HD Camera` provided by `Boradcom Inc`.

    After that, you can go to [here](https://www.linuxtv.org/wiki/index.php/Webcam_devices) to
    find your webcam driver if it exists there.

</br>

- Install `linux-header` if you don't have it

    before install driver, you better to check whether the `linux-headers` is installed
    or not by runing:

    ```bash
    pacman --query | sort | grep linux
    ```

    If you don't have `linuxXXX-headers` (`XXX` is you kernel version which you can get from
    `uname -sr`), then you need to install the `linux-headers` first. 

    ```bash
    sudo pacman -S linux-headers
    ```

    Otherwise, you might get error like below during installing your webcam driver:

    ```bash
    Unable to install module bcwc-pcie/r245.82626d4 for kernel *: Missing kernel headers.
    ```

    </br>

- Install your webcam driver

    For my case, I will install the `bcwc-pcie-git` driver via `AUR`. 

    ```bash
    paru -S bcwc-pcie-git
    ```

    After that, the new module `facetimehd` will be installed and it conflicts with the
    `bdc_pci` module. So, you need to disable it by doing this:

    `sudo vim /etc/modprobe.d/blacklist.conf` with the following settings:

    ```bash
    blacklist bdc_pci
    install bdc_pci /bin/false
    ```

    Then next reboot, it will load the correct module to serve your webcam.

    If you don't want to wait for the next reboot, then just do like this:

    ```bash
    # Unload all of them
    modprobe -r facetimehd  
    modprobe -r bdc_pci

    # Then load the new module
    sudo modprobe facetimehd
    ```

    Right now, it should work:

    ```bash
    v4l2-ctl --list-devices

    # Apple Facetime HD (PCI:0000:04:00.0):
    #     /dev/video0
    ```
    


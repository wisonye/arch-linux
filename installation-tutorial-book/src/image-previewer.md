# Image Previewr

- Install

    ```bash
    doas pacman --sync --refresh sxiv
    ```

    </br>

- Create shell script wrapper

    Create `image_preview.sh` with following settings:

    ```bash
    #!/usr/bin/bash
    sxiv -p -sf ${1} &
    ```

    </br>

    Place `image_preview.sh` to $PATH folder, go to any image folder and run

    ```bash
    image_preview .
    ```

    </br>


- Keybindings

    - `enter`: Toggle between thumbnail mode and image mode

    - `h/j/k/l`: Move focus in thumbnail mode

    - `n/space`: Next image in image mode

    - `p/backspace`: Previous image in image mode

    - `g/G`: Go to first or last image in image mode

    - `f`: Toggle fullscreen mode

    - `b`: Toggle bottom status bar (filename, zoom %, number of images)

    - `+/-/=`: Zoom in, zoom out and zoom to 100% (for easy zooming, double-finger up or down)

    - `</>`: Rotate image

    - `_/|`: Flip image horizontally or vertically

    </br>


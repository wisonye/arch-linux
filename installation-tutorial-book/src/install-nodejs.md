# Install NodeJS

- Install via `pacman`

    ```bash
    pacman --sync --search nodejs-lts

    # community/nodejs-lts-erbium 12.22.10-1
    #     Evented I/O for V8 javascript (LTS release: Erbium)
    # community/nodejs-lts-fermium 14.19.0-1
    #     Evented I/O for V8 javascript (LTS release: Fermium)
    # community/nodejs-lts-gallium 16.13.2-1
    #     Evented I/O for V8 javascript (LTS release: Gallium)
    ```

    Then pack the one you want.

    </br>

- Download from `nodejs.org`

    Downlaod the LTS version from [here](https://nodejs.org/en/download/)

    For example, download `node-v16.14.0-linux-x64.tar.xz` into `~/Downloads/`.

    ```bash
    cd ~/Downloads/
    tar xvf node-v16.14.0-linux-x64.tar.xz
    mv node-v16.14.0-linux-x64.tar ~/my-shell/
    ```

    </br>

    Then add `~/my-shell/node-v16.14.0-linux-x64/bin` to `$PATH`

    So, all `npm install -g` will be installed to `~/my-shell/node-v16.14.0-linux-x64/bin`.

    </br>


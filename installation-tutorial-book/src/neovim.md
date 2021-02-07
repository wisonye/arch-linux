# Everything related to `neovim`

- Installation

    ```bash
    sudo pacman --sync --refresh neovim python-pynvim
    
    mkdir ~/.config/nvim
    touch ~/.config/nvim/init.vim
    ```

</br>

- Auto install `vim-plug` when open `nvim`

    `nvim ~/.config/nvim/init.vim` and add the following settings:

    ```vim
    " ===
    " === Auto load for first time uses
    " ===
    if empty(glob('~/.config/nvim/autoload/plug.vim'))
    	silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
    				\ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
    	autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
    endif
    ```

</br>

- `Ranger` plugin

    `nvim ~/.config/nvim/init.vim` with the following settings:

    ```bash
    Plug 'kevinhwang91/rnvimr'

    " ----------------------------------------------------------------------------
    " 'rrnvim'
    " ----------------------------------------------------------------------------
    " Make Ranger to be hidden after picking a file
    let g:rnvimr_enable_picker = 1
    
    " Hide the files included in gitignore
    let g:rnvimr_hide_gitignore = 1
    
    " Fullscreen for initial layout
    let g:rnvimr_layout = {
               \ 'relative': 'editor',
               \ 'width': &columns,
               \ 'height': &lines - 2,
               \ 'col': 0,
               \ 'row': 0,
               \ 'style': 'minimal'
               \ }

    " Open key mapping
    nnoremap <leader>r :RnvimrToggle<CR>
    ```

</br>

- `Coc` troubleshooting

    - `TypeScript`: If you see the error below when you open any `TypeScript` file:

        ```js
        [tsserver 2307] [E] Cannot find module XXXXXXXX
        ```

        That means you should already installed the `coc-deno` extention. It's very
        easy to fix it:

        - Run `:CocList extentions` command 
        - Inside the extentions list, search `coc-deno`, then press `tab` on it and choose `disable`.

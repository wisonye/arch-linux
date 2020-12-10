# Special keybinding

You need to install the utilities below:
- [`xmodmap`](https://wiki.archlinux.org/index.php/xmodmap): A utility for modifying keymaps and pointer button mappings in Xorg.
- `xev`: A utility which we need it to see the keycode for each key.

After that, run the commands below to generate a copy with the current `keyboard key code -> key symbol` mapping.

```bash
xmodmap -pke > ~/.Xmodmap
```

Inside that file, it contains the keybinding with the syntax like below:

```bash
keycode   9 = Escape NoSymbol Escape
```

Then you can search `keycode` or `key symbol` in that file and change the mapping. Just in case, if you will switch
to different keyboard very often, then you should use `keycode` to set your own keybinding!!!

How to know the `keycode`? Just run `xev` and press any key, it prints out the hardware `keycode`.

Here is the some `keycode` you might interest in:

```bash
133 - Left Super/Win key, Left Command key (Apple Keyboard)
64  - Left Alt
37  - Left Control
66  - Caps_Lock
9   - Escape
```

</br>

### Let's do a real example for mapping **`Caps_Lock`** to **`Escape`**

`vim ~/.Xmodmap` then find the `keycode 66` and replace the settings like below:

```bash
keycode  66 = Escape NoSymbol Escape
```
Save and exit.

### How to load the **`~/.Xmodmap`** when **`i3`** reload?

`vim ~/.config/i3/config` and add the settings below:

```bash
# It will reload `~/.Xmodmap` every time when `i3` reload
exec_always sleep 1; xmodmap ~/.Xmodmap
```

And pay attention on that: Even the `Caps_Lock` key already mapped to `Escape`, but the caplock functionality still works!!!

So always tap `Caps_Lock` twice to make sure it doesn't switch uppercase mode!!!:)

</br>

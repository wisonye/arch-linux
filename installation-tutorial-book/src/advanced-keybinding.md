# Advanced keybinding

In `Arch Linux`, it uses the key combination below by default:

- `Control + c`: Copy
- `Control + v`: Paste
- `Control + f`: Find or search
- `Control + t`: Open new tab
- `Control + w`: Close current tab

But if you're a Mac user, then you will very difficult to deal with those settings.
Is that possible to change that?

**YES**, you can use `xdotool` combine with `i3` keybinding to do that:

`vim ~/.config/i3/config` and add the following settings:

```bash
# ===========================================================================
# Special key mapping
# ===========================================================================

# `cmd+c` -> `ctrl+c` (Copy)
bindsym --release $mod+c exec --no-startup-id xdotool key --clearmodifiers ctrl+c

# `cmd+v` -> `ctrl+v` (Paste)
bindsym --release $mod+v exec --no-startup-id xdotool key --clearmodifiers ctrl+v

# `cmd+f` -> `ctrl+f` (Find)
bindsym --release $mod+f exec --no-startup-id xdotool key --clearmodifiers ctrl+f

# `cmd+t` -> `ctrl+t` (Open new tab)
bindsym --release $mod+t exec --no-startup-id xdotool key --clearmodifiers ctrl+t

# `cmd+w` -> `ctrl+w` (Close current tab)
bindsym --release $mod+w exec --no-startup-id xdotool key --clearmodifiers ctrl+w
```


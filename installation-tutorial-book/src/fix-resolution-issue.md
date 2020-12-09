# Fix resolution issue

In some high **`DPI`** screens (e.g. Apple Retina Screen), you will see a very high resolution but with tiny small fonts which you even can see what's that.

For that case, you can add the settings below to `~/.Xresources`:

```bash
# -----------------------------------------------------------------------------
# The settings below will affect the screen DPI (Dots Per Inch)
#
# Based on the wiki (https://wiki.archlinux.org/index.php/HiDPI "X Resources"
# section, it says:
#
# For `Xft.dpi`, using the integer multiples 96 usually works best. For example:
#
# 96  - 100% scaling
# 144 - 150% scaling
# 192 - 200% scaling
# 288 - 300% scaling
# -----------------------------------------------------------------------------
# Xft.dpi: 96
Xft.dpi: 192
# Xft.dpi: 144
# Xft.dpi: 288
```

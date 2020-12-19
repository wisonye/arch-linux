# change wallpaper

```bash
sudo pacman -S feh
````

Download wallpaper you like and then add the following setting to 
`~/.config/i3/config`


```js
exec_always feh --bg--file YOUR_WALLPAPER_FULL_PATH_FILE_NAME
```

Restart `i3` then you should be able to see the new wallpaper.

# Make your boot faster

By default, **`grub`** will wait for around **5** second before select the default boot option.

But we can change it in `/etc/default/grub`.

`sudo vim /etc/default/grub` to change some settings to reduce the timeout

```bash
GRUB_TIMEOUT=0
GRUB_TIMEOUT_STYLE=hidden
```

Save and exit. 

Then run the command below to re-generate the grub configuration file:

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

Now, reboot to take effect.

</br>

A tips for changing the resolution for the **`GRUB`**:

You can change the following settings to `/etc/default/grub`

```bash
# Try 1024x768x32 first, if fail, then fallback to auto resolution
GRUB_GFXMODE=1024x768x32,auto
```

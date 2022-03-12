# Troubleshooting of X can't start

### 1. Print the `dmesg`

The first thing first, print the `dmesg` to see the errors:

```bash
sudo dmesg --ctime | rg -e fail -e error -e Fail -e Error | bat
```

</br>

Or if you're focusing on the GPU driver issue:

```bash
sudo dmesg --ctime | rg amd
sudo dmesg --ctime | rg intel
```

</br>


### 2. Print the `Xorg.0.log`

```bash
bat ~/.local/share/xorg/Xorg.0.log | rg -e fail -e Fail
```

</br>


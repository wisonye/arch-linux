# Format partitions on USB

```bash
# Do not format the /dev/sdX1 partition. This is the BIOS/MBR partion!!!

# The `EFI` boot partition has to be `FAT` format
mkfs.fat -F32 /dev/sdX2

# The root partition, we use `EXT4` format
mkfs.ext4 /dev/sdX3
```

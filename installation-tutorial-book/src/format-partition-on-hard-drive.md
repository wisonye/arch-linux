# Format partitions on hard drive

```bash
# The boot partition has to be `FAT` format
mkfs.fat -F32 /dev/sdX1

# The root partition, we use `EXT4` format
mkfs.ext4 /dev/sdX2

# Swap partition
mkswap /dev/sdX3

# Enable SWAP partition
swapon /dev/sdX3
```


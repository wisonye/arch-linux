# Setup iptables service

### 1. Install iptables and related packages:

```bash
doas pacman --sync --refresh core/iptables
```

</br>


### 2. Set `iptables` serivce to start in `boot` level

```bash
# Enable boot service
doas systemctl enable iptables.service

# Restart service
doas systemctl restart iptables.service

# Check status
systemctl status iptables.service
# ● iptables.service - IPv4 Packet Filtering Framework
#      Loaded: loaded (/usr/lib/systemd/system/iptables.service; enabled; preset: disabled)
#      Active: active (exited) since Wed 2023-04-05 18:39:19 NZST; 3s ago
#     Process: 64350 ExecStart=/usr/bin/iptables-restore /etc/iptables/iptables.rules (code=exited, status=0/SUCCESS)
#    Main PID: 64350 (code=exited, status=0/SUCCESS)
#         CPU: 2ms
# 
# Apr 05 18:39:19 my-arch systemd[1]: Starting IPv4 Packet Filtering Framework...
# Apr 05 18:39:19 my-arch systemd[1]: Finished IPv4 Packet Filtering Framework.
```

</br>


### 3. Run script and save rules

Script attached at the bottom

```bash
# Run script to reset all filter table rules
doas ~/.config/iptables/basic.fish

# Save loaded iptable rules to `/etc/iptables/iptables.rules`
doas iptables-save -f /etc/iptables/iptables.rules

# Reboot now, `iptables` service should reload from `/etc/iptables/iptables.rules`
doas reboot
```

</br>

After reboot, print out `filter` table rules to confirm:

```bash
doas iptables -t filter --list

# Chain INPUT (policy DROP)
# target     prot opt source               destination
# ACCEPT     all  --  anywhere             anywhere             state RELATED,ESTABLISHED
# ACCEPT     icmp --  192.168.1.125        anywhere             icmp echo-request
# ACCEPT     tcp  --  192.168.1.125        anywhere             tcp dpt:ssh
#
# Chain FORWARD (policy DROP)
# target     prot opt source               destination
#
# Chain OUTPUT (policy DROP)
# target     prot opt source               destination
# ACCEPT     all  --  anywhere             anywhere             state NEW,RELATED,ESTABLISHED
```

</br>

#### 5. `Basic` iptables script

```bash
#!/usr/bin/fish

# ---------------------------------------------------------------------------
# Author: Wison Ye
#
# Desciption:
#
# Setup firewall and save all rules to `/etc/iptables/`
#
# For the better man page, visit: https://man.archlinux.org/man/iptables.8.en
#
# How to use:
#
# // Install iptables and related packages:
# doas apk --no-cache add iptables iptables-openrc iptables-doc ip6tables ip6tables-openrc
#
# // Set `iptables` serivce to start in `boot` level if not yet
# doas rc-update add iptables boot
#
# // Confirm it set correct or not
# rc-status --all | rg iptables
#
# // Run this script to reset all iptable rules
# doas ~/.config/iptables/basic.fish
#
# // Save loaded iptable rules to `/etc/iptables/rules-save`
# doas service iptables save
#
# // Rebootr, `iptables` service should reload from `/etc/iptables/rules-save`
# doas reboot
#
# ---------------------------------------------------------------------------


#=============================================================================
# Flush all chains in default `filter` table
#=============================================================================
iptables --flush
iptables --zero


#=============================================================================
# Default policies: DROP
#=============================================================================
iptables --policy INPUT DROP
iptables --policy FORWARD DROP
iptables --policy OUTPUT DROP


#=============================================================================
# Allow the following packets into computer
#
# - Available protocol names are located in `/etc/protocols`
#
# - For more protocol match options, run `iptables -p PROTOCOL_NAME --help | bat`
#
# - `-j/--jump` target value
#
# `INVALID`:
#     the packet could not be identified for some reason which includes running
#     out of memory and ICMP errors which don't correspond to any known connection.
#
# `NEW`:
#     the packet has started a new connection, or otherwise associated with a
#     connection which has not seen packets in both directions.
#
# `ESTABLISHED`:
#     the packet is associated with a connection which has seen packets in both
#     directions.
#
# `RELATED`:
#     the packet is starting a new connection, but is associated with an existing
#     connection, such as an FTP data transfer, or an ICMP error.
#
# `UNTRACKED`:
#     the packet is not tracked at all, which happens if you use the `NOTRACK`
#     target in raw table.
#=============================================================================

#
# Vars
#
#
set local_interface "lo"
set local_network "192.168.1.0/24"
set trusted_node "192.168.1.125"


#
# Allow all incoming packets via `lo` NIC
#
iptables --append INPUT --in-interface $local_interface --jump ACCEPT



# Special rules:
#
# > Allow all outgoing packets for all protocols and ports
# > Allow all incoming packets on top of established connections
#
iptables --append INPUT  --match state --state ESTABLISHED,RELATED     --jump ACCEPT
iptables --append OUTPUT --match state --state NEW,ESTABLISHED,RELATED --jump ACCEPT



#
# ICMP outgoing (echo-request) and incoming (echo-reply) are already `ACCEPT`
# by the above `Special rules`. So you only need to set the ICMP incoming
# (echo-request) from someone `ping` you when needed
#
# Where to get the supported `icmp-type`:
#
# - iptables -p icmp --help | bat
# - https://www.inetdoc.net/guides/iptables-tutorial/icmptypes.html
#
# iptables --append INPUT --protocol ICMP --icmp-type echo-request --source $local_network --jump ACCEPT
iptables --append INPUT --protocol ICMP --icmp-type echo-request --source $trusted_node --jump ACCEPT


#
# SSH (only allows trusted node)
#
iptables --append INPUT --protocol TCP --dport 22 --source $trusted_node --jump ACCEPT


#
# Firebase emulator
#
# ┌────────────────┬──────────────┬─────────────────────────────────┐
# │ Authentication │ 0.0.0.0:9099 │ http://localhost:4000/auth      │
# ├────────────────┼──────────────┼─────────────────────────────────┤
# │ Firestore      │ 0.0.0.0:8080 │ http://localhost:4000/firestore │
# └────────────────┴──────────────┴─────────────────────────────────┘
#
# You DO NOT need the following rules for local development!!!
# You DO NOT need the following rules for local development!!!
# You DO NOT need the following rules for local development!!!
#
# iptables --append INPUT --protocol TCP --match multiport --dports 9099,8080 --jump ACCEPT


# Log everything that doesn't match any rules above
#
# 1. You have to enable the `klogd` service
#
# 2. After that, run the `journalctl` to query the log by the given conditions
#
#   - Try into my computer (ip): journalctl -k --grep="DST=192.168.1.165"
#
#   - Try into my computer (ip) with ssh: journalctl -k | rg "DST=192.168.1.165" | rg "DPT=22"-
#
iptables --append INPUT --jump LOG
iptables --append OUTPUT --jump LOG
```

</br>



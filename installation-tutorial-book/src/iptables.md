# About iptable module

`Iptables` and `ip6tables` are used to set up, maintain, and inspect the tables
of `IPv4` and `IPv6` packet filter rules in the Linux kernel.

Basically, it uses different `tables` to group different `chains` with a set
of `rules`:

`table --> chains --> rules`

</br>

### 1. Default tables and built-in chains

| Table | Built-in chains | Desc |
| ------ | --------------- | -------------|
| filter | | Default table (if no `-t` option provided), is responsible for filtering the incoming and outgoing packets on the current computer|
|       | INPUT | Packet to come in|
|       | OUTPUT | Packet to go out|
|       | FORWARD | Packet to pass through, usually only used when current computer configured as a `Router`|
| ------ | --------------- | -------------|
| nat | | Network address translation |
|       | PREROUTING | For altering packets as soon as they come in |
|       | OUTPUT | For altering outgoing packets before routing|
|       | POSTROUTING | For altering packets before they go out|
| ------ | --------------- | -------------|
| mangle | | Special use case|
|       | PREROUTING | For altering incoming packets before routing |
|       | OUTPUT | For altering outgoing packets before routing|
|       | INPUT | For packets coming into|
|       | POSTROUTING | For altering packets as they're about to go out|

</br>

### 2. How to flush tables (delete all chain's rules)

```bash
#=============================================================================
# Flush all tables and chains
#=============================================================================
iptables --table filter --flush
iptables --table filter --zero
iptables --table nat --flush
iptables --table nat --zero
iptables --table mangle --flush
iptables --table mangle --zero
```

If you don't provide `-t/--table` option, by default `iptables` applies to the
`filter` table.


```bash
# Same with `--table filter`
iptables --flush
iptables --zero
```

</br>

### 3. Terms and value meaning

Sample command:

`iptables -A {INPUT|OUTPUT} -p icmp --icmp-type {echo-reply|echo-request} -m state --state NEW,ESTABLISHED,RELATED -j {ACCEPT|REJECT|DROP}
`

</br>

- `-A/--append`: Append new rule to the chain

- `-p/--protocol`: Specific protocol, available protocol names are located in `/etc/protocols`

- `--icmp-type`: For more protocol match options, run `iptables -p PROTOCOL_NAME --help | bat`

- `-m/--match --state`: Specifies match to use:

    - `INVALID`:
        the packet could not be identified for some reason which includes running
        out of memory and ICMP errors which don't correspond to any known connection.

    - `NEW`:
        the packet has started a new connection, or otherwise associated with a
        connection which has not seen packets in both directions.

    - `ESTABLISHED`:
        the packet is associated with a connection which has seen packets in both
        directions.

    - `RELATED`:
        the packet is starting a new connection, but is associated with an existing
        connection, such as an FTP data transfer, or an ICMP error.

    - `UNTRACKED`:
        the packet is not tracked at all, which happens if you use the `NOTRACK`
        target in raw table.

- `-j/--jump` `target` value

    - `ACCEPT` means to let the packet through.

    - `DROP` means to drop the packet on the floor.

    - `RETURN` means stop traversing this chain  and  resume  at the  next rule
    in the previous (calling) chain.

    </br>



### 3. How to set tables policy

The default `action` (aka: `target`) if there are no rules to be matched:

```bash
#=============================================================================
# Default policies: DROP
#=============================================================================
iptables --policy INPUT DROP
iptables --policy FORWARD DROP
iptables --policy OUTPUT DROP

# iptables --table nat --policy PREROUTING  DROP
# iptables --table nat --policy INPUT DROP
# iptables --table nat --policy OUTPUT DROP
# iptables --table nat --policy POSTROUTING DROP
#
# iptables --table mangle --policy PREROUTING  DROP
# iptables --table mangle --policy INPUT DROP
# iptables --table mangle --policy OUTPUT DROP
# iptables --table mangle --policy POSTROUTING DROP
```

</br>

#### 4. Special rules

- If default policy is `DROP` for `INPUT & OUPUT` chains

    Then the following rules are saying:

    > Allow all outgoing for all protocols and ports

    > Allow all incoming on top of established connection

    ```bash
    iptables -t filter --append INPUT  --match state --state ESTABLISHED,RELATED     --jump ACCEPT
    iptables -t filter --append OUTPUT --match state --state NEW,ESTABLISHED,RELATED --jump ACCEPT
    ```

    It's very convenient and useful for reducing `OUTPUT` chain rules setup.

    </br>


- Allow all incoming packets via `lo` NIC

    ```bash
    #
    # Allow all incoming packets from `localhost`
    #
    iptables --append INPUT --in-interface $local_interface --jump ACCEPT
    ```

    </br>

- Multi dest port case

    When dealing with mulitple dest ports, you have to use:

    `--match multiport --dports PORT1,PORT2`

    Sample:

    ```bash
    iptables --append INPUT --protocol TCP --match multiport --dports 9099,8080 --jump ACCEPT
    ```

    </br>


#### 5. Logging

You do need to log all packets that don't match any rules you've already set,
then you're able to figure out what you're missing, here is how to do that:

```bash
#
# Log everything that doesn't match any rules above
#
iptables --append INPUT --jump LOG
iptables --append OUTPUT --jump LOG
```

</br>

After applying the above rules, make sure you start the `klogd` service,
otherwise, you won't see any packet log!!!

```bash
# Enable it if not yet
doas rc-update add klogd boot

# Start it if not yet
doas service klogd restart
```

</br>

Then run the following command to see the missing packets:

```bash
tail -f /var/log/messages
```

</br>

For example, if you don't allow someone to `ping` you, then you should see the
following logs:

_Packets fail to come into your computer_


```bash
Dec  4 16:56:47 my-alpine-linux kern.warn kernel: [ 2727.719112] IN=eth0 OUT= MAC=00:1c:42:99:56:c8:a4:83:e7:47:9c:05:08:00 SRC=192.168.1.125 DST=192.168.1.133 LEN=84 TOS=0x00 PREC=0x00 TTL=64 ID=57688 PROTO=ICMP TYPE=8 CODE=0 ID=36356 SEQ=0
Dec  4 16:56:48 my-alpine-linux kern.warn kernel: [ 2728.725955] IN=eth0 OUT= MAC=00:1c:42:99:56:c8:a4:83:e7:47:9c:05:08:00 SRC=192.168.1.125 DST=192.168.1.133 LEN=84 TOS=0x00 PREC=0x00 TTL=64 ID=50346 PROTO=ICMP TYPE=8 CODE=0 ID=36356 SEQ=1
Dec  4 16:56:49 my-alpine-linux kern.warn kernel: [ 2729.726381] IN=eth0 OUT= MAC=00:1c:42:99:56:c8:a4:83:e7:47:9c:05:08:00 SRC=192.168.1.125 DST=192.168.1.133 LEN=84 TOS=0x00 PREC=0x00 TTL=64 ID=12020 PROTO=ICMP TYPE=8 CODE=0 ID=36356 SEQ=2
```

Another example, if you don't allow `Network Time Protocol (ntp 123/udp)`, then
you should see the following logs:

_Packets fail to go out NTP server_


```bash
Dec  4 16:55:58 my-alpine-linux kern.warn kernel: [ 2678.889280] IN= OUT=eth0 SRC=192.168.1.133 DST=162.159.200.123 LEN=76 TOS=0x00 PREC=0x00 TTL=64 ID=11820 DF PROTO=UDP SPT=40367 DPT=123 LEN=56
Dec  4 16:55:59 my-alpine-linux kern.warn kernel: [ 2679.504496] IN= OUT=eth0 SRC=192.168.1.133 DST=130.217.74.63 LEN=76 TOS=0x00 PREC=0x00 TTL=64 ID=21699 DF PROTO=UDP SPT=43861 DPT=123 LEN=56
Dec  4 16:56:01 my-alpine-linux kern.warn kernel: [ 2681.524643] IN= OUT=eth0 SRC=192.168.1.133 DST=162.159.200.1 LEN=76 TOS=0x00 PREC=0x00 TTL=64 ID=47881 DF PROTO=UDP SPT=53274 DPT=123 LEN=56
```

Btw, the `NTP` UDP packet is caused by `chrony` process (run by `chrony` user)

```bash
procs chrony

# PID:▲   User │ TTY Threads TCP   VmRSS │ Command
#              │                 [bytes] │
# 2323  chrony │        1         1.125M │ /usr/sbin/chronyd -f /etc/chrony/chrony.conf
```

</br>

If you have no idea about which protocol use which port, then you should find it
in `/etc/services`.

</br>



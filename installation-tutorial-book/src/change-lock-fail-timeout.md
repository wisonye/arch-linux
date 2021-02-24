# Change unlock fail timeout

After 3 times wrong password try, you will be stopped to try before the `Unlock Timeout`
get passed. By default, that `Unlock Timeout` is **10 minutes**, here is the way to change
it:

`sudo vim /etc/security/faillock.conf` with the following settings:

```bash
# The access will be re-enabled after n seconds after the lock out.
# The value 0 has the same meaning as value `never` - the access
# will not be re-enabled without resetting the faillock
# entries by the `faillock` command.
# The default is 600 (10 minutes).
unlock_time = 30
```

Save and restart `ligthdm` to take effect.

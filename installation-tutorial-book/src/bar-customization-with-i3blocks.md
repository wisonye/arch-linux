# bar customization with i3blocks

`i3status` is simple, but you can get more flexible status output with `i3blocks`, as `i3blocks`
allows you to run different script/program for each part you want to display on the status bar.

For example:

You can customize the output with different status and icon based on the `acpi -b` program result:

```js
# Run `acpi -b` when charging
Battery 0: Charging, 72%, 00:31:20 until charged

# Run `acpi -b` when discharging
Battery 0: Discharging, 71%, 03:36:05 remaining
```

So, you can use diferent awesome font icon to show different status.

Let's step-by-step to make that happen.

</br>

- Use `i3blocks` as the `status line command`

    Copy the configuration template to your home folder like below:

    ```bash
    cp -rvf /etc/i3blocks.conf ~/.config/i3
    ```

    `vim ~/.config/i3/config` and change the line below:

    ```bash
    bar {
        # Run the `i3block` command and get back the standard
        # output as the bar content
        status_command  i3blocks -c ~/.config/i3/i3blocks.conf
    }
    ```

    Reload `i3`, the new status content should be display on the right-top on your screen.

- Configuration

    `i3blocks.conf` is super simple, plz have a look:

    ```bash
    [test]
    # You can define any property you want, and the property will become the 
    # environment variable in the `command` line
    my_var="(You look great today:)"

    # The command you want to run, the result will show to the status bar
    command=echo "OMG $my_var"

    # Command running interval settings:
    # `onece`: only run once, then never run
    # `x`: run per `x` second to refresh the conent
    interval=once
    ```

    That's it, super simple!!!:)


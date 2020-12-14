# bar customization

Preview:

![i3status-bar-sample.png](./images/i3status-bar-sample.png)

- Copy the template to your home folder like below:

    ```bash
    cp -rvf /etc/i3status.conf ~/.config/i3/i3status.conf
    ```
</br>

- Indicate the config file in `~/.config/i3/config`
    
    ```bash
    status_command  i3status --config ~/.config/i3/i3status.conf
    ```

    That means run the `i3status --config ~/.config/i3/i3status.conf` command
    and get back the standard output as the status bar content.

</br>

- Here is the `i3status.config` sample with comment

    You need to restart `i3` to take effect after changing this file.

    The icon below you can copy from `https://fontawesome.com/cheatsheet`

    ```bash
    general {
            # `false` to use the bar color by default
            colors = false
            # All commands refresh interval in seconds
            interval = 2
    }
    
    order += "wireless _first_"
    order += "ethernet _first_"
    order += "battery 0"
    order += "disk /"
    order += "memory"
    order += "volume master"
    order += "tztime local"
    
    wireless _first_ {
            format_up = " %essid"
            format_down = ""
    }
    
    ethernet _first_ {
            format_up = "d(%speed)"
            format_down = ""
    }
    
    battery 0 {
            format = " %status %percentage"
            format_down = ""
            status_bat = ""
            status_chr = ""
            status_full = " "
    }
    
    disk "/" {
            # format = " %avail"
            format = " [ %free / %total ]"
            prefix_type = "custom"
    }
    
    memory {
            format = " %used / %total"
            memory_used_method = "memavailable"
    }
    
    volume master {
        format = " %volume"
        format_muted = ""
        device = "default"
        mixer = "Master"
        mixer_idx = 0
    }
    
    tztime local {
            format = " %Y-%m-%d %H:%M:%S "
    }
    ```

</br>

- Extra `bar` customization with comment

    ```bash
    # ===========================================================================
    # i3 status control
    #
    # Start i3bar to display a workspace bar (plus the system information i3status
    # finds out, if available)
    # ===========================================================================
    set $bar_bg_color           #1C1C1CD9
    set $bar_text_color         #FFFFFFCC
    set $bar_itext_color        #616161
    set $bar_ws_bg_color        #551E22
    set $bar_ws_bg_color_2      #E66B17
    set $bar_separator_color    #E66B17
    
    bar {
        # Run the `i3status` command and get back the standard output as the bar content
        status_command  i3status --config ~/.config/i3/i3status.conf
    
        # Bar transparent effect
        # Even enabled this flag, you still need to apply the "transparency hex" value to 
        # the bar color for getting the real transparency effect. You can find the hex code
        # from here:
        # https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
        i3bar_command i3bar --transparency
    
        # Stay on the top/bottom
        position    top
    
        # Render to the primary screen only
        output  primary
    
        # Hide the appliation icon tray area (which always stay on the most-right)
        tray_output none
        # tray_output primary
    
        #
        font pango:SourceCodePro 10
        # font pango:monospace 10
    
        # The separator
        # separator_symbol    "|"
        separator_symbol    "  "
    
        # Workspace
        workspace_buttons   yes
        workspace_min_width 25
        # strip_workspace_numbers yes
        # binding_mode_indicator no
        colors {
            background  $bar_bg_color
            statusline  $bar_text_color
            separator   $bar_separator_color
    
            focused_workspace  $bar_ws_bg_color_2   $bar_ws_bg_color_2  $bar_text_color     $bar_ws_bg_color_2
            active_workspace   $bar_ws_bg_color_2   $bar_ws_bg_color_2  $bar_itext_color    $bar_ws_bg_color_2
            inactive_workspace $bar_ws_bg_color     $bar_ws_bg_color    $bar_itext_color    $bar_ws_bg_color
            urgent_workspace   $bar_ws_bg_color     $bar_ws_bg_color    $bar_text_color     $bar_ws_bg_color
        }
    }
    ```

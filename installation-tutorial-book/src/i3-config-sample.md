# i3 config sample with comment

Here is the fully comment **`i3`** configuration sample file:

```
# ===========================================================================
# Set `$mod` to `Mod4`(WinKey or CmdKey)
# ===========================================================================
set $mod Mod4
set $alt Mod1

# ===========================================================================
# This font is widely installed, provides lots of unicode glyphs, right-to-left
# text rendering and scalability on retina/hidpi displays (thanks to pango).
# font pango:DejaVu Sans Mono 8
# ===========================================================================
font pango:monospace 14

# ===========================================================================
# Start up programs
# ===========================================================================

# xss-lock grabs a logind suspend inhibit lock and will use i3lock to lock the
# screen before suspend. Use loginctl lock-session to lock your screen.
exec --no-startup-id xss-lock --transfer-sleep-lock -- i3lock --nofork

# NetworkManager is the most popular way to manage wireless networks on Linux,
# and nm-applet is a desktop environment-independent system tray GUI for it.
exec --no-startup-id nm-applet

# Load my custom keymapping
exec_always sleep 1; xmodmap ~/.Xmodmap

# Load compton renderer
exec_always compton

# Load chinese input method
exec_always fcitx

# ===========================================================================
# Audio and volume control
# ===========================================================================
# Use pactl to adjust volume in PulseAudio.
set $refresh_i3status killall -SIGUSR1 i3status
bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ +10% && $refresh_i3status
bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ -10% && $refresh_i3status
bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute @DEFAULT_SINK@ toggle && $refresh_i3status
bindsym XF86AudioMicMute exec --no-startup-id pactl set-source-mute @DEFAULT_SOURCE@ toggle && $refresh_i3status


# ===========================================================================
# Special key mapping
# ===========================================================================

# `CAPS_LOCK` to `ESCAPE`
# bindcode --release 66 exec --no-startup-id xdotool key Escape


# ===========================================================================
# Window Navigation (Vim style)
# ===========================================================================
set $up k
set $down j
set $left h
set $right l

# Change window focus by HJKL
bindsym $mod+$left focus left
bindsym $mod+$down focus down
bindsym $mod+$up focus up
bindsym $mod+$right focus right

# Change window focus by arrow key
bindsym $mod+Left focus left
bindsym $mod+Down focus down
bindsym $mod+Up focus up
bindsym $mod+Right focus right

# Move focused window by HJKL
bindsym $mod+Shift+$left move left
bindsym $mod+Shift+$down move down
bindsym $mod+Shift+$up move up
bindsym $mod+Shift+$right move right

# Move focused window by arrow key
bindsym $mod+Shift+Left move left
bindsym $mod+Shift+Down move down
bindsym $mod+Shift+Up move up
bindsym $mod+Shift+Right move right

# split in horizontal orientation
# bindsym $mod+h split h

# split in vertical orientation
# bindsym $mod+v split v

# kill focused window 
bindsym $mod+q kill


# ===========================================================================
# Resize window
# ===========================================================================
# resize window (you can also use the mouse for that)
set $resize_unit 5
mode "resize" {
        # These bindings trigger as soon as you enter the resize mode

        # Pressing left will shrink the window’s width.
        # Pressing right will grow the window’s width.
        # Pressing up will shrink the window’s height.
        # Pressing down will grow the window’s height.
        bindsym $left       resize shrink width $resize_unit px or $resize_unit ppt
        bindsym $down       resize grow height $resize_unit px or $resize_unit ppt 
        bindsym $up         resize shrink height $resize_unit px or $resize_unit ppt
        bindsym $right      resize grow width $resize_unit px or $resize_unit ppt

        # back to normal: Enter or Escape or $mod+r
        bindsym Return mode "default"
        bindsym Escape mode "default"
        bindsym $mod+r mode "default"
}
bindsym $mod+r mode "resize"


# ===========================================================================
# Layout control
# ===========================================================================

# Toggle fullscreen on current focused window
bindsym Control+$mod+f fullscreen toggle

# use Mouse+$mod to drag floating windows to their wanted position
floating_modifier $mod

# toggle tiling / floating
bindsym $mod+Shift+space floating toggle

# change container layout (stacked, tabbed, toggle split)
# bindsym $mod+s layout stacking
bindsym $mod+w layout tabbed
bindsym $mod+e layout toggle split


# ===========================================================================
# Workspace control
# ===========================================================================

# Workspace name 1 ~ 10
set $ws1 "1"
set $ws2 "2"
set $ws3 "3"
set $ws4 "4"
set $ws5 "5"
set $ws6 "6"
set $ws7 "7"
set $ws8 "8"
set $ws9 "9"
# set $ws10 "10"

# Switch to workspace
bindsym $mod+1 workspace number $ws1
bindsym $mod+2 workspace number $ws2
bindsym $mod+3 workspace number $ws3
bindsym $mod+4 workspace number $ws4
bindsym $mod+5 workspace number $ws5
bindsym $mod+6 workspace number $ws6
bindsym $mod+7 workspace number $ws7
bindsym $mod+8 workspace number $ws8
bindsym $mod+9 workspace number $ws9
# bindsym $mod+0 workspace number $ws10

# Move focused window to particular workspace
bindsym $mod+Shift+1 move container to workspace number $ws1
bindsym $mod+Shift+2 move container to workspace number $ws2
bindsym $mod+Shift+3 move container to workspace number $ws3
bindsym $mod+Shift+4 move container to workspace number $ws4
bindsym $mod+Shift+5 move container to workspace number $ws5
bindsym $mod+Shift+6 move container to workspace number $ws6
bindsym $mod+Shift+7 move container to workspace number $ws7
bindsym $mod+Shift+8 move container to workspace number $ws8
bindsym $mod+Shift+9 move container to workspace number $ws9
bindsym $mod+Shift+0 move container to workspace number $ws10



# ===========================================================================
# Program launch shortcuts
# ===========================================================================

# bindsym --release $mod+x exec --no-startup-id import /tmp/latest-screensh
bindsym --release Control+$mod+p exec --no-startup-id "import ~/Pictures/$(date +%F_%H:%M:%S.png)"

# Terminal
bindsym $mod+t exec alacritty

# Browser
set $browser google-chrome-stable
bindsym $mod+b exec $browser

# Open file manager
bindsym $mod+f exec "pcmanfm --new-win $(pwd) &"

# Updates manager
bindsym $mod+u exec "pamac-manager --updates"

# Software manager
bindsym $mod+s exec pamac-manager

# Take screenshot
# bindsym $alt+$mod+p exec "scrot -s ~/Pictures/screenshot-$(date +%F_%T).png -e 'xclip -selection c -t image/png < $f'"
# bindsym Control+$mod+p exec "scrot ~/Pictures/screenshot-$(date +%F_%T).png -e 'xclip -selection c -t image/png < $f'"

# start dmenu (a program launcher)
#
# There also is the (new) i3-dmenu-desktop which only displays applications
# shipping a .desktop file. It is a wrapper around dmenu, so you need that
# installed.
# bindsym $mod+d exec --no-startup-id i3-dmenu-desktop
# bindsym $mod+d exec dmenu_run
# bindsym $mod+d exec dmenu_run
bindsym $alt+space exec --no-startup-id i3-dmenu-desktop

# reload the configuration file
# bindsym $mod+Shift+c reload
# restart i3 inplace (preserves your layout/session, can be used to upgrade i3)
# bindsym $mod+Shift+r restart
# exit i3 (logs you out of your X session)
bindsym $mod+Shift+e exec "i3-nagbar -t warning -m 'You pressed the exit shortcut. Do you really want to exit i3? This will end your X session.' -B 'Yes, exit i3' 'i3-msg exit'"


# ===========================================================================
# i3 status control
#
# Start i3bar to display a workspace bar (plus the system information i3status
# finds out, if available)
# ===========================================================================
bar {
        status_command i3status
}

# ===========================================================================
# Display styles control
# ===========================================================================

# Thin border
new_window 1pixel

# With gaps
gaps inner 10

# ===========================================================================
# System control
# ===========================================================================
set $mode_system System (l) Lock, (o) Logout, (r) Reboot, (Shift+s) Shutdown
mode "$mode_system" {
    bindsym l exec --no-startup-id i3exit lock, mode "default"
    bindsym o exec --no-startup-id i3exit logout, mode "default"
    bindsym r exec --no-startup-id i3exit reboot, mode "default"
    bindsym Shift+s exec --no-startup-id i3exit shutdown, mode "default"
    bindsym Return mode "default"
    bindsym Escape mode "default"
}

bindsym $mod+0 mode "$mode_system"


# ===========================================================================
# Unknow purpose yet
# ===========================================================================

# move the currently focused window to the scratchpad
bindsym $mod+Shift+minus move scratchpad

# Show the next scratchpad window or hide the focused scratchpad window.
# If there are multiple scratchpad windows, this command cycles through them.
bindsym $mod+minus scratchpad show


#######################################################################
# automatically start i3-config-wizard to offer the user to create a
# keysym-based config which used their favorite modifier (alt or windows)
#
# i3-config-wizard will not launch if there already is a config file
# in ~/.config/i3/config (or $XDG_CONFIG_HOME/i3/config if set) or
# ~/.i3/config.
#
# Please remove the following exec line:
#######################################################################
exec i3-config-wizard
```

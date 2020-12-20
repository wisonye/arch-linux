# Wine

What is Wine?

**Wine is not an Emulator.** It is a compatibility layer capable of running Windows applications. Wine translates Windows API into POSIX vslld on-the-fly, eliminating the performance and memory penalties of other methods and allowing you to cleanly integrate Windows applicants into your desktop.

1. Install wine from pacman.

   ```bash
   # Check [multilib] source in /etc/pacman.conf is opened
   # Install wine and winetricks
   $ pacman -S wine winetricks
   
   # We can use winetricks to download windows DLLs easier
   
   # Run winecfg to create a default C:/ in $HOME/.wine/drive_c
   $ winecfg
   # It will ask you to install wine-mono and wine-gecko, click cancel. It doesn't matter to wecaht
   ```

2.  Link Chinese fonts to your local font

   ```bash
   $ vim ~/.wine/zh.reg
   
   REGEDIT4
   [HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\FontLink\SystemLink]
   "Lucida Sans Unicode"="wqy-microhei.ttc"
   "Microsoft Sans Serif"="wqy-microhei.ttc"
   "Microsoft YaHei"="wqy-microhei.ttc"
   "微软雅黑"="wqy-microhei.ttc"
   "MS Sans Serif"="wqy-microhei.ttc"
   "Tahoma"="wqy-microhei.ttc" 
   "Tahoma Bold"="wqy-microhei.ttc"
   "SimSun"="wqy-microhei.ttc"
   "Arial"="wqy-microhei.ttc"
   "Arial Black"="wqy-microhei.ttc"
   "宋体"="wqy-microhei.ttc"
   "新細明體"="wqy-microhei.ttc"
   
   # You can find the font name in /usr/share/fonts you like and replace "wqy-microhei.ttc". e.g. "SourceHanSansCN-Medium.otf"
   ```

   ```bash
   $ wine regdit
   
   # import zh.reg
   ```

   

3. Download DLLs by winetricks.

```bash
$ winetricks riched20
# It will download dependencies in $HOME/.cache/winetricks then install it in $HOME/.wine/drive_c

# If you can't download W2KSP4_EN.EXE automatically you can download it in http://www.mywindowspage.com/index.php/download/w2ksp4_en-exe/ then move it in $HOME/.cache/winetricks/wine2ksp4/ then run `$ winetricks riches20` again

```



4. Install Wechat or WxWork

- [WxWork](https://work.weixin.qq.com/#indexDownload)
- [Wechat](https://weixin.qq.com/cgi-bin/readtemplate?uin=&stype=&promote=&fr=&lang=zh_CN&ADTAG=&check=false&nav=download&t=weixin_download_list&loc=readtemplate,weixin,body,6)

```bash
$ wine $HOME/Downloads/WxWork.exe
# After install
$ wine $HOME/.wine/Program File/WXWork/WXWork.exe
```




const {execSync} = require('child_process')

// Run the `iw` command to do a WIFI scan
const cmd = `iw dev wlan0 scan | grep -e "freq:" -e "SSID:"`
let cmdResult = ``
try {
    cmdResult = execSync(cmd)
        .toString()
        .replace(/\t/g, '')
    // console.log(`cmdResult: ${cmdResult}`)
}
catch (error) {
    if (error.message && error.message.indexOf('Network is down') !== -1) {
        console.log(`Your WIFI inferace is down, plz run the command the below and try again: \n\nsudo ip link set wlan0 up\n`)
    }

    console.error(error)
    return;
}


// Format the result
const resultList = []

let lastWifiInfo = {freq: '', ssid: ''}
const tempArr = cmdResult.split(`\n`)
    .forEach((tempString, index, arrRef) => {
        const isSsid = index % 2 == 1

        if (isSsid) {
            let fixedSsid = tempString.replace(`SSID: `, ``).trim()
            lastWifiInfo.ssid = Boolean(fixedSsid == ``) ? `Unknown` : fixedSsid
            resultList.push(lastWifiInfo)
        } else {
            let freqStr = tempString.replace(`freq: `, ``).trim()
            let is5G = Boolean(parseInt(freqStr, 10) > 5100)
            // console.log(`freqStr: ${freqStr}, is5G: ${is5G}`)

            lastWifiInfo = {freq: '', ssid: ''}
            lastWifiInfo.freq = is5G ? `5G` : `2.4G`
        }
    })

let resultTable = `\n[ Available WIFI networks ]` +
    `\n--------------------------------------------\n` +
    resultList.map(wifiInfo => `${wifiInfo.ssid} - ${wifiInfo.freq}`)
        .join(`\n`) + `\n`

console.log(resultTable)

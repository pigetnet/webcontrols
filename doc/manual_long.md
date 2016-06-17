| /do/webcontrols/check   |                                       |
|:------------------------|:--------------------------------------|
| Info                    | [alpha] [undocumented]                |
| Modules                 | node /do/webcontrols/nodejs/index.js, |

| /do/webcontrols/https     |                                                                                                                                                                                                                                                           |
|:--------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Info                      | [alpha] [undocumented]                                                                                                                                                                                                                                    |
| Variables                 | hostname=$(cat /etc/hostname), openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout /user/config/webcontrols/webcontrols.key -out /user/config/webcontrols/webcontrols.crt -subj "/C=EN/ST=$hostname/L=$hostname/O=NO/CN=$hostname.local", |
| 1. HTTPS only for restify |                                                                                                                                                                                                                                                           |

| /do/webcontrols/install      |                                                                                                                               |
|:-----------------------------|:------------------------------------------------------------------------------------------------------------------------------|
| Info                         | [alpha] [undocumented]                                                                                                        |
| Softwares                    | node,                                                                                                                         |
| Variables                    | nodeversion=$(node -v),                                                                                                       |
| Modules                      | /do/webcontrols/https, /do/webcontrols/password raspberry, cp /do/webcontrols/conf/webcontrols.json /user/config/webcontrols, |
| System                       | /system/install node, /system/makedir /user/config/webcontrols,                                                               |
| 1. Install nodejs (adafruit) |                                                                                                                               |
| 3. Node version $nodeversion |                                                                                                                               |

| /do/webcontrols/log   |                        |
|:----------------------|:-----------------------|
| Info                  | [alpha] [undocumented] |

| /do/webcontrols/password   |                                                                 |
|:---------------------------|:----------------------------------------------------------------|
| Info                       | [alpha] [undocumented]                                          |
| Variables                  | password=$(node /do/webcontrols/nodejs/generatePassword.js $1), |
| Modules                    | password=$(node /do/webcontrols/nodejs/generatePassword.js $1), |

| /do/webcontrols/remotesend   |                        |
|:-----------------------------|:-----------------------|
| Info                         | [alpha] [undocumented] |

| /do/webcontrols/restart   |                        |
|:--------------------------|:-----------------------|
| Info                      | [alpha] [undocumented] |

| /do/webcontrols/send   |                        |
|:-----------------------|:-----------------------|
| Info                   | [alpha] [undocumented] |
| Arguments              | 1:command,             |
| Variables              | command=$1,            |

| /do/webcontrols/settings   |                        |
|:---------------------------|:-----------------------|
| Info                       | [alpha] [undocumented] |

| /do/webcontrols/setup   |                        |
|:------------------------|:-----------------------|
| Info                    | [alpha] [undocumented] |


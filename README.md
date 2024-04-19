# Cookie Clicker Web Worker

This is a JavaScript for online game Cookie Clicker.
It will click cookie automatically for you, even if your tab is not active.
Is working only with english language site of Cookie clicker, for other languages only generating cookies is working but other features will not work.

## Features

- Automatic clicking cookie for generating cookies
- Automatic clicking golden cookies when shows on screen
- Possibility to turn creating golden cookie every few seconds
- Possibility for automatic clicking Wrath cookie

## Settings
### cookieClicksAmount
You can set how fast clicker will click. This value depends on your pc. I recommend value between 1 - 5000.
### wrathCookieClick
With this setting you can automatically click on wrath cookie too.
### spawnGoldCookie
This settings enables automatically creating gold (or wrath) cookie.

## Usage

1. Copy script to your browser console and press enter.
2. You can turn off clickers in console with these commands:
```
clicker.stopAutoClicker()
clicker.stopGoldCookieClicker()
```
3. Start clickers again:
```
clicker.createAutoClicker()
clicker.createGoldCookieClicker()
```
4. Settings
```
clicker.settings.cookieClicksAmount = 1
clicker.settings.wrathCookieClick = true
clicker.settings.spawnGoldCookie = true
```

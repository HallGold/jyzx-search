'use strict'

import { app, BrowserWindow, globalShortcut, ipcMain, screen } from 'electron'
import MyAutoUpdater from './updater/index'
/* eslint-disable */
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9088`
  : `file://${__dirname}/index.html`

function createWindow () {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width,
    height,
    // 窗口居中
    // center:true,
    // 尺寸是否可变化
    resizable:false,
    // 可全屏化
    // fullscreenable:true,
    transparent:true,
    frame:false,
    // modal:true,
    fullscreen:true,
    // 允许跨域
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
      allowDisplayingInsecureContent: true,
      nodeIntegration:true
    },

  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}



app.on('ready', ()=>{
  createWindow(),
  new MyAutoUpdater(mainWindow)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 开启开发者模式
app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
    if(mainWindow!==null){
      if( mainWindow.webContents.isDevToolsOpened()){
        mainWindow.webContents.closeDevTools()
      }else{
        mainWindow.webContents.openDevTools()
      }
    }
  })
})

ipcMain.on("maximize",(e)=>{
  if( mainWindow.isMaximized()){
    mainWindow.unmaximize()
  }else{
    mainWindow.maximize()
  }
 
})

ipcMain.on("minimize",(e)=>{
  mainWindow.minimize()
})

ipcMain.on("close-app",(e)=>{
  mainWindow.close()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

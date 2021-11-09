// 自动更新
// 自动更新相关
import { autoUpdater } from 'electron-updater'
import {ipcMain} from 'electron'
/**
 * 自动更新
 */
class MyAutoUpdater {
  constructor (mainWindow) {
    this.mainWindow = mainWindow
  }
  init () {
    if (this.mainWindow == null) {
      return
    }
    // 通过main进程发送事件给renderer进程，提示更新信息
    function sendUpdateMessage (obj) {
      this.mainWindow.webContents.send('updateMessage', obj)
    }
    // 监测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
    const message = {
      error: '检查更新出错',
      checking: '正在检查更新......',
      updateAva: '监测到新版本，正在下载......',
      updateNotAva: '现在使用的就是最新版本，不用下载'
    }
    // 当更新出现错误时触发
    autoUpdater.on('error', (err) => {
      sendUpdateMessage({action: 'error', errorInfo: message.error, err: err})
    })

    // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', () => {
      sendUpdateMessage({action: 'checking'})
    })

    // 当发现一个可用更新的时候触发，更新下载包会自动开始
    autoUpdater.autoDownload = false
    autoUpdater.on('update-available', (info) => {
      sendUpdateMessage({action: 'updateAva', updateInfo: info})
    })

    // 当没有可用更新的时候触发
    autoUpdater.on('update-not-available', (info) => {
      sendUpdateMessage({action: 'updateNotAva', updateInfo: info})
    })

    // 更新下载进度事件
    autoUpdater.on('download-progress', (progressObj) => {
      this.mainWindow.webContents.send('downloadProgress', progressObj)
    })

    /**
     * event Event
     * releaseNotes String - 新版本更新公告
     * releaseName String - 新的版本号
     * releaseDate Date - 新版本发布的日期
     * updateUrl String - 更新地址
     */
    autoUpdater.on('update-downloaded', (info) => {
      // 下载太快可能无法触发downloadProgress事件，所以手动通知一下
      this.mainWindow.webContents.send('downloadProgress', {percent: 100})
      // 可以手动选择是否立即退出并更新
      this.ipcMain.on('isUpdateNow', (e, arg) => {
        // some code here to handle event
        autoUpdater.quitAndInstall()
      })
    })

    ipcMain.on('checkForUpdate', () => {
      // 执行自动更新检查
      autoUpdater.checkForUpdates()
    })

    ipcMain.on('downloadUpdate', () => {
      // 下载
      autoUpdater.downloadUpdate()
    })
  }
}
export default MyAutoUpdater

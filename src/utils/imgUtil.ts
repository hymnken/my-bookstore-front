export class LmgUtil {
  static imgList: Record<string, string> = {}
  static storageLmgList() {
    if (this.isEmpty()) {
      this.loadAllLmg()
    }
  }

  static isEmpty() {
    return !Object.getOwnPropertyNames(this.imgList).length
  }

  static getImg(imgName: string) {
    return LmgUtil.imgList[imgName]
  }
  static loadAllLmg() {
    const imgMap = import.meta.globEager('../assets/img/**/*.png')
    console.log('imgMap:', imgMap)
    let absolutePath: string = '' //绝对路径。
    let imgName: string = '' // 图片名
    for (const relatviePath in imgMap) {
      absolutePath = imgMap[relatviePath].default //
      if (absolutePath) {
        imgName = absolutePath.substring(absolutePath.lastIndexOf('/') + 1)
        this.imgList[imgName] = absolutePath
      }
    }
    console.log('this.imgList:', this.imgList)
  }
}

export default LmgUtil.getImg

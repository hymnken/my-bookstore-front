import goodstorage from 'good-storage';
export class LmgUtil {
    static imgList: Record<string, string> = {}

    static storageImgList() {
        this.imgList = goodstorage.get('imgList') || {}
        if (this.isEmpty()) {
            this.loadAllLmg()
            goodstorage.set('imgList',this.imgList)
        }
    }
    static isEmpty() {
        return !Object.getOwnPropertyNames(this.imgList).length
    }
    static loadAllLmg() {
        const imgMap = import.meta.globEager('../assets/img/**/*.png');
        let absulotePath: string = ""   // 绝对路径
        let imgName: string = ""  //图片名
        for (let relativePath in imgMap) {
            if (absulotePath) {
                absulotePath = imgMap[relativePath].default
                imgName = absulotePath.substring(absulotePath.lastIndexOf('/') + 1)
                this.imgList[imgName] = absulotePath
            }
        }
        console.log("this.imgList:",this.imgList);
    }
}
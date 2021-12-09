import { Size } from "../../../../model/Card/card";

export function getImgSize(imgSrc: string): Size {
    var newImg = new Image();
    var height: number = 0
    var width: number = 0
  
    newImg.onload = () => {
      height = newImg.height;
      width = newImg.width;
      console.log('Ширина:' + width + ' Высота:' + height);
    }
    newImg.src = imgSrc;
    
    return {width: width, height: height}
}
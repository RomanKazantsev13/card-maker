import { Size } from "../../../../model/Card/card";

export function getImgSize(imgSrc: string): Size {
  var newImg = new Image();
  var height: number = 0
  var width: number = 0

  // async function getSize() {
  //   await new Promise((resolve, reject) => newImg.onload = () => {
  //     height = newImg.height;
  //     width = newImg.width;
  //     console.log('Ширина:' + width + ' Высота:' + height);
  //     return { width: width, height: height }
  //   })
  // }
  // const size = getSize()
  // newImg.src = imgSrc;

  // return resolve
   return { width: width, height: height }
}
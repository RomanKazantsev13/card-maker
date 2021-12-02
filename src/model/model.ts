import { Canvas, setBackgroundColor, setSizeCanvas } from "./Canvas/canvas";
import { Element, getSelectElement, setSelectElement } from "./Canvas/Element/element";
import { addEllipse } from "./Canvas/Element/Figure/Ellipse/ellipse";
import { setColorFigure } from "./Canvas/Element/Figure/figure";
import { addRectangle } from "./Canvas/Element/Figure/Rectangle/rectangle";
import { addTriangle } from "./Canvas/Element/Figure/Triangle/triangle";
import { addImage } from "./Canvas/Element/Image/image";
import { addText } from "./Canvas/Element/Text/text";
import { initializationCard } from "./Card/card";
import { redo, undo } from "./Card/History/history";
import { Template } from "./Card/Templates/templates";

let card = initializationCard([])
card = addTriangle(card)
card = addRectangle(card)
card = addEllipse(card)
card = addImage(card, 'images/bin.png')
card = addText(card)
card = setBackgroundColor(card, '#fe5fe7')

card = setSelectElement(card, card.canvas.elements[2])


export { card }
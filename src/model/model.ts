import { Canvas } from "./Canvas/canvas";
import { Element } from "./Canvas/Element/element";
import { Template } from "./Card/Templates/templates";

export let card = {
    allTemplates: {
      templates: [] as Template[],
      customTemplates: [] as Template[],
    },
    history: {
        undo: [] as Canvas[],
        redo: [] as Canvas[],
    },
    canvas: {
        size: {
            height: 600,
            width: 800,
        },
        selectElement: null,
        background: '#FFF',
        elements: [] as Element[]
    }
}
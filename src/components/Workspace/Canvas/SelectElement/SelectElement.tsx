import React, { MutableRefObject, useRef } from 'react'
import styles from './SelectElement.module.css'
import type { Element } from '../../../../model/Canvas/Element/element'
import { getCentreAndSizeOfElement } from './SelectElementFunction'
import { isText } from '../../../../model/Canvas/Element/Text/text'

interface SelectElementPropsType {
    selectElement: Element | null,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    setViewInput: (view: boolean) => void,
    positionSelectElement: { x: number, y: number },
    setPositionSelectElement: (position: { x: number, y: number }) => void,
    size: {width: number, height: number}
}

export function SelectElement(props: SelectElementPropsType) {
    return (
        <>
            <foreignObject x={props.positionSelectElement.x - 2 - 7.5} y={props.positionSelectElement.y - 2 - 7.5} width={props.size.width + 20} height={1}>
                <div className={styles.border} style={{ width: props.size.width + 20, height: 1 }}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x - 2 - 7.5} y={props.positionSelectElement.y - 2 - 7.5} width={1} height={props.size.height + 20}>
                <div className={styles.border} style={{ width: 1, height: props.size.height + 20 }}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x + props.size.width + 7.5} y={props.positionSelectElement.y - 2 - 7.5} width={1} height={props.size.height + 20}>
                <div className={styles.border} style={{ width: 1, height: props.size.height + 20 }}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x - 2 - 7.5} y={props.positionSelectElement.y + props.size.height + 7.5} width={props.size.width + 20} height={1}>
                <div className={styles.border} style={{ width: props.size.width + 20, height: 1 }}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x - 15} y={props.positionSelectElement.y - 15} width={13} height={13}>
                <div className={styles.point + ' ' + styles.pointTopLeft}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x - 15} y={props.positionSelectElement.y + props.size.height + 3} width={13} height={13}>
                <div className={styles.point + ' ' + styles.pointBottomLeft}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x + props.size.width + 3} y={props.positionSelectElement.y + props.size.height + 3} width={13} height={13}>
                <div className={styles.point + ' ' + styles.pointBottomRight}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x + props.size.width + 3} y={props.positionSelectElement.y - 15} width={13} height={13}>
                <div className={styles.point + ' ' + styles.pointTopRight}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x + props.size.width / 2 + 11.5 - 20} y={props.positionSelectElement.y - 12} width={20} height={6}>
                <div className={styles.block + ' ' + styles.blockTop}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x + props.size.width + 6} y={props.positionSelectElement.y + props.size.height / 2 + 11.5 - 20} width={6} height={20}>
                <div className={styles.block + ' ' + styles.blockRight}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x - 12} y={props.positionSelectElement.y + props.size.height / 2 + 11.5 - 20} width={6} height={20}>
                <div className={styles.block + ' ' + styles.blockLeft}></div>
            </foreignObject>
            <foreignObject x={props.positionSelectElement.x + props.size.width / 2 + 11.5 - 20} y={props.positionSelectElement.y + props.size.height + 6} width={20} height={6}>
                <div className={styles.block + ' ' + styles.blockBottom}></div>
            </foreignObject>
        </>
    )
}

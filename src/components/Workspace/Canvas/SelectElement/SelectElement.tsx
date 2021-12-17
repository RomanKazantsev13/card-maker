import React, { useRef, useState } from 'react'
import styles from './SelectElement.module.css'
import type { Element } from '../../../../model/Canvas/Element/element'
import { getCentreAndSizeOfElement } from './SelectElementFunction'
import { isText } from '../../../../model/Canvas/Element/Text/text'
import { Point } from '../../../../model/Card/card'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'

interface SelectElementPropsType {
    selectElement: Element | null,
    refText: any,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    setViewInput: (view: boolean) => void,
}

export function SelectElement(props: SelectElementPropsType) {

    const ref = useRef(null)

    let position = { x: 0, y: 0 }

    const { centre, size, type } = getCentreAndSizeOfElement(props.selectElement, props.refText)

    position = centre

    if (props.selectElement !== null) {
        position = (useDragAndDrop(ref, props.selectElement.centre))
    }
    return (
        <foreignObject
            ref={ref}
            x={position.x} y={position.y}
            width={size.width + 40} height={size.height + 40}
            className={(() => {
                if (props.selectElement !== null) {
                    return styles.viewOn
                }
                return styles.viewOff
            })()}
            onClick={() => {
                if (type == 'Figure') {
                    props.setViewEditor({ view: true, state: 'Figure Properties' })
                }
                if (type == 'Text') {
                    props.setViewEditor({ view: true, state: 'Text Properties' })
                }
            }}
            onDoubleClick={() => {
                if (props.selectElement !== null && isText(props.selectElement.object)) {
                    props.setViewInput(true)
                }
            }}
        >
            <div className={styles.border} style={{ width: size.width + 20, height: size.height + 20 }}></div>

            <div className={styles.point + ' ' + styles.pointTopLeft}></div>
            <div className={styles.point + ' ' + styles.pointBottomLeft} style={{ top: size.height + 23 }}></div>
            <div className={styles.point + ' ' + styles.pointBottomRight} style={{ top: size.height + 23, left: size.width + 23 }}></div>
            <div className={styles.point + ' ' + styles.pointTopRight} style={{ left: size.width + 23 }}></div>

            <div className={styles.block + ' ' + styles.blockTop} style={{ left: size.width / 2 + 11.5 }}></div>
            <div className={styles.block + ' ' + styles.blockRight} style={{ top: size.height / 2 + 11.5, left: size.width + 26 }}></div>
            <div className={styles.block + ' ' + styles.blockLeft} style={{ top: size.height / 2 + 11.5 }}></div>
            <div className={styles.block + ' ' + styles.blockBottom} style={{ top: size.height + 26, left: size.width / 2 + 11.5 }}></div>
        </foreignObject>
    )
}

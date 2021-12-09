import React from 'react'
import styles from './SelectElement.module.css'
import type { Element } from '../../../../model/Canvas/Element/element'
import { getCentreAndSizeOfElement } from './SelectElementFunction'

interface SelectElementPropsType {
    selectElement: Element | null,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
}

export function SelectElement(props: SelectElementPropsType) {
    const { centre, size, type } = getCentreAndSizeOfElement(props.selectElement)
    return (
        <foreignObject
            x={centre.x - 20} y={centre.y - 20}
            width={size.width + 40} height={size.height + 40}
            className={(() => {
                if (props.selectElement !== null) {
                    return styles.viewOn
                }
                return styles.viewOff
            })()}
            onClick={() => {
                if (type == 'Figure') {
                    props.setViewEditor({view: true, state: 'Figure Properties'})
                }
                if (type == 'Text') {
                    props.setViewEditor({view: true, state: 'Text Properties'})
                }
            }}
        >
            <div className={styles.border} style={{width: size.width + 20, height: size.height + 20}}></div>

            <div className={styles.point + ' ' + styles.pointTopLeft}></div>
            <div className={styles.point + ' ' + styles.pointBottomLeft} style={{top: size.height + 23}}></div>
            <div className={styles.point + ' ' + styles.pointBottomRight} style={{top: size.height + 20 + 3, left: size.width + 20 + 3}}></div>
            <div className={styles.point + ' ' + styles.pointTopRight} style={{left: size.width + 20 + 3}}></div>

            <div className={styles.block + ' ' + styles.blockTop} style={{left: size.width / 2 + 20 + 3 - 10}}></div>
            <div className={styles.block + ' ' + styles.blockRight} style={ {top: size.height / 2 + 20 + 3 - 10, left: size.width + 20 + 6}}></div>
            <div className={styles.block + ' ' + styles.blockLeft} style={{top: size.height / 2 + 20 + 3 - 10}}></div>
            <div className={styles.block + ' ' + styles.blockBottom} style={{top: size.height + 20 + 6, left: size.width / 2 + 20 + 3 - 10}}></div>
        </foreignObject>
    )
}

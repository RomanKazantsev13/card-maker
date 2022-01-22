import React, { RefObject } from 'react'
import { isText } from '../../../../utils/typeGuards'
import { Element } from '../../../../utils/types'
import styles from './SelectElement.module.css'

interface pointsSelectElement {
    border: {x: number, y: number},
    pointTopLeft: {x: number, y: number},
    pointTopRight: {x: number, y: number},
    pointBottomLeft: {x: number, y: number},
    pointBottomRight: {x: number, y: number},
    blockTop: {x: number, y: number},
    blockLeft: {x: number, y: number},
    blockRight: {x: number, y: number},
    blockBottom: {x: number, y: number}
}

interface SelectElementPropsType {
    selectElement: Element | null,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    setViewInput: (view: boolean) => void,
    statePointsSelectElement: {
        positionPoints: pointsSelectElement,
        setPositionPoints: (points: pointsSelectElement) => void,
    }
    size: {width: number, height: number}
    refs: Array<RefObject<HTMLDivElement>>,
}

export function SelectElement(props: SelectElementPropsType) {
    return (
        <>
            // boreder Top
            <foreignObject 
                x={props.statePointsSelectElement.positionPoints.border.x - 2 - 7.5} 
                y={props.statePointsSelectElement.positionPoints.border.y - 2 - 7.5} 
                width={props.size.width + 20} height={1}
            >
                <div className={styles.border} style={{ width: props.size.width + 20, height: 1 }}></div>
            </foreignObject>
            
            //border Left
            <foreignObject 
                x={props.statePointsSelectElement.positionPoints.border.x - 2 - 7.5} 
                y={props.statePointsSelectElement.positionPoints.border.y - 2 - 7.5} 
                width={1} height={props.size.height + 20}
            >
                <div className={styles.border} style={{ width: 1, height: props.size.height + 20 }}></div>
            </foreignObject>

            // border Right
            <foreignObject 
                x={props.statePointsSelectElement.positionPoints.border.x + props.size.width + 9.5} 
                y={props.statePointsSelectElement.positionPoints.border.y - 2 - 7.5} 
                width={1} height={props.size.height + 20}
            >
                <div className={styles.border} style={{ width: 1, height: props.size.height + 20 }}></div>
            </foreignObject>

            // border Bottom
            <foreignObject 
                x={props.statePointsSelectElement.positionPoints.border.x - 2 - 7.5} 
                y={props.statePointsSelectElement.positionPoints.border.y + props.size.height + 9.5} 
                width={props.size.width + 20} height={1}
            >
                <div className={styles.border} style={{ width: props.size.width + 20, height: 1 }}></div>
            </foreignObject>
            {(props.selectElement && !isText(props.selectElement.object)) && <>
                <foreignObject 
                    x={props.statePointsSelectElement.positionPoints.pointTopLeft.x - 15} 
                    y={props.statePointsSelectElement.positionPoints.pointTopLeft.y - 15} 
                    width={13} height={13}
                >
                    <div ref={props.refs[0]} className={styles.point + ' ' + styles.pointTopLeft}></div>
                </foreignObject>
                <foreignObject 
                    x={props.statePointsSelectElement.positionPoints.pointBottomLeft.x - 15} 
                    y={props.statePointsSelectElement.positionPoints.pointBottomLeft.y + props.size.height + 3} 
                    width={13} height={13}>
                    <div ref={props.refs[2]} className={styles.point + ' ' + styles.pointBottomLeft}></div>
                </foreignObject>
                <foreignObject 
                    x={props.statePointsSelectElement.positionPoints.pointBottomRight.x + props.size.width + 3} 
                    y={props.statePointsSelectElement.positionPoints.pointBottomRight.y + props.size.height + 3} 
                    width={13} height={13}>
                    <div ref={props.refs[3]} className={styles.point + ' ' + styles.pointBottomRight}></div>
                </foreignObject>
                <foreignObject 
                    x={props.statePointsSelectElement.positionPoints.pointTopRight.x + props.size.width + 3} 
                    y={props.statePointsSelectElement.positionPoints.pointTopRight.y - 15} 
                    width={13} height={13}>
                    <div ref={props.refs[1]} className={styles.point + ' ' + styles.pointTopRight}></div>
                </foreignObject>
                <foreignObject 
                    x={props.statePointsSelectElement.positionPoints.blockTop.x + props.size.width / 2 + 11.5 - 20} 
                    y={props.statePointsSelectElement.positionPoints.blockTop.y - 12} 
                    width={20} height={6}>
                    <div ref={props.refs[4]} className={styles.block + ' ' + styles.blockTop}></div>
                </foreignObject>
                <foreignObject 
                    x={props.statePointsSelectElement.positionPoints.blockRight.x + props.size.width + 6} 
                    y={props.statePointsSelectElement.positionPoints.blockRight.y + props.size.height / 2 + 11.5 - 20} 
                    width={6} height={20}>
                    <div ref={props.refs[6]} className={styles.block + ' ' + styles.blockRight}></div>
                </foreignObject>
                <foreignObject 
                    x={props.statePointsSelectElement.positionPoints.blockLeft.x - 12} 
                    y={props.statePointsSelectElement.positionPoints.blockLeft.y + props.size.height / 2 + 11.5 - 20} 
                    width={6} height={20}>
                    <div ref={props.refs[5]} className={styles.block + ' ' + styles.blockLeft}></div>
                </foreignObject>
                <foreignObject 
                    x={props.statePointsSelectElement.positionPoints.blockBottom.x + props.size.width / 2 + 11.5 - 20} 
                    y={props.statePointsSelectElement.positionPoints.blockBottom.y + props.size.height + 6} 
                    width={20} height={6}>
                    <div ref={props.refs[7]} className={styles.block + ' ' + styles.blockBottom}></div>
                </foreignObject>
            </>}
        </>
    )
}

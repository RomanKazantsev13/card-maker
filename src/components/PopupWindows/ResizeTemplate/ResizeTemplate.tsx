import React, { useCallback, useEffect, useState } from 'react'
import { setSizeCanvas } from '../../../store/actionCreators/CanvasActionCreators'
import { store } from '../../../store/store'
import { Button as SaveButton } from '../SaveComputer/Button'
import { Button } from './Button'
import { fonts } from './fonts'
import styles from './ResizeTemplate.module.css'

interface ResizeTemplatePropsType {
    setView: (view: boolean) => void,
}

export function ResizeTemplate(props: ResizeTemplatePropsType) {
    const [width, setWidth] = useState(store.getState().canvas.size.width)
    const [height, setHeight] = useState(store.getState().canvas.size.height)
    const [viewList, setViewList] = useState(styles.viewOff)

    const font = fonts.find(font => (font.size_height == height && font.size_width == width))
    let font_name
    if (font === undefined) {
        font_name = "Freeform"
    } else {
        font_name = font.name
    }

    const buttons = fonts.map(function (font, index) {
        return <Button
            key={index}
            name={font.name}
            width={font.size_width}
            height={font.size_height}
            setSize={{ setWidth, setHeight }}
            setViewList={setViewList}
        />
    })

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            props.setView(false)
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false)

        return () => {
            document.removeEventListener("keydown", escFunction, false)
        }
    }, [])

    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    function handleChangeWidth(event: React.ChangeEvent<HTMLInputElement>) {
        if (digits.includes(event.target.value.slice(-1))) {
            setWidth(Number(event.target.value))
        }
    }
    function handleChangeHeight(event: React.ChangeEvent<HTMLInputElement>) {
        if (digits.includes(event.target.value.slice(-1))) {
            setHeight(Number(event.target.value))
        }
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.headerWrap}>
                <div className={styles.header}>Resize Template</div>
            </div>
            <div className={styles.content_layout}>
                <label className={styles.subHeader}>Template Size Presets</label>
                <div className={styles.font_family} onClick={() => {
                    return viewList == styles.viewOn ? setViewList(styles.viewOff) : setViewList(styles.viewOn)
                }}>
                    <div className={styles.font_layout}>
                        <div className={styles.font_name}>
                            {font_name}
                        </div>
                        <div className={styles.size_layout}>
                            <div className={styles.font_size}>
                                {width} × {height} px
                            </div>
                            <img className={styles.img} src="images/arrow_down.png" />
                        </div>
                    </div>
                </div>
                <div className={styles.font_list + ' ' + viewList}>
                    <div className={styles.buttons_layout}>
                        {buttons}
                    </div>
                </div>
                <div className={styles.sizes}>
                    <div className={styles.size}>
                        <div className={styles.px_layout}>
                            <div className={styles.size_header}>Width </div>
                            <div className={styles.px_w}>px</div>
                        </div>
                        <input className={styles.size_value}  maxLength={5} type="text" value={width} onChange={handleChangeWidth}/>
                    </div>
                    <div className={styles.size}>
                        <div className={styles.px_layout}>
                            <div className={styles.size_header}>Height</div>
                            <div className={styles.px_h}>px</div>
                        </div>
                        <input className={styles.size_value} maxLength={5} type="text" value={height} onChange={handleChangeHeight} />
                    </div>
                </div>
                <div className={styles.buttonLayout}>
                    <SaveButton content={"Cancel"} background={["#353948", "#484d61"]} color={"#f1f1f1"} onclick={props.setView} />
                    <SaveButton content={"Resize"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        store.dispatch(setSizeCanvas({ width: width, height: height }))
                        props.setView(false)
                    }} />
                </div>
            </div>
        </div>
    )
}
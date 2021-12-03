import React, { useCallback, useEffect, useState } from 'react'
import { dispatch } from '../../editor';
import { setSizeCanvas } from '../../model/Canvas/canvas';
import { Button as SaveButton } from '../SaveComputer/Button';
import { Button } from './Button';
import styles from './ResizeTemplate.module.css'

const fonts = [
    { name: "Presentation (4:3)", size_width: 1024, size_height: 768, },
    { name: "Presentation (16:9)", size_width: 1920, size_height: 1080, },
    { name: "Social Media Story", size_width: 1080, size_height: 1920, },
    { name: "Instagram Post", size_width: 1080, size_height: 1080, },
    { name: "Facebook Post", size_width: 1200, size_height: 1200, },
    { name: "Facebook Cover / Page Cover", size_width: 1702, size_height: 630, },
    { name: "Facebook Event Cover", size_width: 1920, size_height: 1080, },
    { name: "YouTube Channel Art", size_width: 2560, size_height: 1440, },
    { name: "YouTube Thumbnail", size_width: 1280, size_height: 720, },
    { name: "Twitter Post", size_width: 1200, size_height: 675, },
    { name: "Twitter Header", size_width: 1500, size_height: 500, },
    { name: "Pinterest Pin", size_width: 1000, size_height: 1500, },
    { name: "Etsy Big Banner", size_width: 3360, size_height: 840, },
    { name: "Etsy Mini Banner", size_width: 3360, size_height: 448, },
    { name: "Etsy Order Receipt Banner", size_width: 760, size_height: 100, },
]


export function ResizeTemplate(props: {
    view: boolean,
    setView: (view: boolean) => void,
    size: {
        width: number,
        height: number
    },
}) {

    const [width, setWidth] = useState(props.size.width)
    const [height, setHeight] = useState(props.size.height)
    const [viewList, setViewList] = useState(styles.viewOff)

    const font = fonts.find(font => (font.size_height == height && font.size_width == width))
    let font_name
    if (font === undefined) {
        font_name = "Freeform"
    } else {
        font_name = font.name
    }

    const buttons = []

    for (let i = 0; i < fonts.length; i++) {
        buttons.push(
            <Button
                name={fonts[i].name}
                width={fonts[i].size_width}
                height={fonts[i].size_height}
                setSize={{ setWidth, setHeight }}
                setViewList={setViewList}
            />
        )
    }

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
        <div className={styles.wrap + ' ' + (() => {
            if (props.view) {
                return styles.viewOn
            }
            return styles.viewOff
        })()}>
            <div className={styles.headerWrap}>
                <div className={styles.header}>Resize Template</div>
            </div>
            <div className={styles.content_layout}>
                <label className={styles.subHeader}>Template Size Presets</label>
                <div className={styles.font_family} onClick={() => {
                    if (viewList == styles.viewOn) {
                        setViewList(styles.viewOff)
                        return
                    }
                    setViewList(styles.viewOn)
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
                        <input
                            className={styles.size_value}
                            maxLength={5}
                            type="text"
                            value={width}
                            onChange={handleChangeWidth}
                        />
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
                    <SaveButton name={"Cancel"} background={["#353948", "#484d61"]} color={"#f1f1f1"} onclick={props.setView} />
                    <SaveButton name={"Resize"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        dispatch(setSizeCanvas, { width: width, height: height })
                        props.setView(false)
                    }} />
                </div>
            </div>
        </div>
    )
}
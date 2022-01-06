import React, { MutableRefObject, useRef, useState } from 'react'
import { uuid } from 'uuidv4'
import { Element } from '../../../../model/Canvas/Element/element'
import { ButtonFont } from './ButtonFont'
import styles from './FontChoose.module.css'
import { fonts } from './fonts'

interface FontChoosePropsType {
    selectElement: Element,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    font: string,
    setFont: (font: string) => void,
    setSizeSelectElement: (size: {width: number, height: number}) => void,
    refText: MutableRefObject<SVGTextElement | null>,
}

export function FontChoose(props: FontChoosePropsType) {
    const [value, setValue] = useState('')
    const fonts_elem: Array<JSX.Element> = fonts.map(function (font) {
        return <ButtonFont 
                key={uuid()} 
                font={font} 
                selectFont={props.font} 
                setFont={props.setFont} 
                selectElement={props.selectElement} 
                refText={props.refText}
                setSizeSelectElement={props.setSizeSelectElement}
            />
    })
    function handleChangeFont(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }
    return (
        <div>
            <div className={styles.header_layout}>
                <div className={styles.back_wrap} onClick={() => { props.setViewEditor({ view: true, state: 'Text Properties' }) }}>
                    <img className={styles.back} src="images/arrow_left.png" />
                </div>
                <div className={styles.header}>Choose a Font</div>
            </div>

            <div className={styles.search}>
                <img className={styles.search_image} src="images/search.png" />
                <input className={styles.search_input} type="text" placeholder="Search Fonts" onChange={handleChangeFont} />
            </div>

            <div className={styles.header_font}>Selected Font</div>
            <ButtonFont font={props.font} selectFont={props.font} setFont={props.setFont} selectElement={props.selectElement} refText={props.refText} setSizeSelectElement={props.setSizeSelectElement} />

            <div className={styles.header_font}>All Fonts</div>
            <div className={styles.fonts}>
                {fonts_elem}
            </div>
        </div>
    )
}
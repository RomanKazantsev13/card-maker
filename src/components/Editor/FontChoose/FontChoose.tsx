import React, { useState } from 'react'
import { uuid } from 'uuidv4'
import { store } from '../../../store/store'
import { ButtonFont } from './ButtonFont'
import styles from './FontChoose.module.css'
import { fonts } from './fonts'

interface FontChoosePropsType {
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    font: string,
    setFont: (font: string) => void,
    setNotification: (viewResize: boolean) => void,
}

export function FontChoose(props: FontChoosePropsType) {
    const [value, setValue] = useState('')
    const fonts_elem: Array<JSX.Element> = fonts.map(function (font) {
        return <ButtonFont 
                key={uuid()} 
                font={font} 
                selectFont={props.font} 
                setFont={props.setFont} 
                selectElement={store.getState().canvas.selectElement} 
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
                <input className={styles.search_input} type="text" placeholder="Search Fonts" onChange={handleChangeFont} onFocus={() => {
                    props.setNotification(true)
                    props.setViewEditor({view: true, state: 'Text Properties'})
                }} />
            </div>

            <div className={styles.header_font}>Selected Font</div>
            <ButtonFont font={props.font} selectFont={props.font} setFont={props.setFont} selectElement={store.getState().canvas.selectElement} />

            <div className={styles.header_font}>All Fonts</div>
            <div className={styles.fonts}>
                {fonts_elem}
            </div>
        </div>
    )
}
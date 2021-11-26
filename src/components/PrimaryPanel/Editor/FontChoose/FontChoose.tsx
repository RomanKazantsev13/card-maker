import React, { useState } from 'react'
import { ButtonFont } from './ButtonFont'
import styles from './FontChoose.module.css'

export function FontChoose(props: {
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    font: string,
    setFont: (font: string) => void,
}) {

    const fonts: Array<string> = [
        'Abel',
        'Abril Fatface',
        'Agency FB',
        'Alegreya',
        'Alfa Slab One',
        'ALGERIAN',
        'Allerta Stencil',
        'Amatic SC',
        'Amble',
        'Amita',
        'Annie Use Yor Telescope',
        'Anonymous Pro',
        'Anton',
        'Architects Daughter',
        'Arial',
        'Arima Madurai',
        'Arizonia',
        'Averia Serif Libre',
        'Bad Script',
        'Bahianita',
        'Bear and Loupe',
        'BEBAS NEUE',
        'Bellota',
        'Berkshire Swash',
        'Beth Eller',
        'Big Snow',
        'Bigelow Rules',
        'Biorhyme Expanded',
        'Boogaloo',
        'Bowlby One',
        'Brush Script MT',
        'BUNGEE',
        'BUNGEE SHADE',
        'BUTCHERMAN',
        'Butterfly Kids',
        'Cabin',
        'Cairo',
        'Calibri',
        'Californian FB',
        'Calisto MT',
        'Cambria',
        'Candal',
        'CAPTURE IT',
        'Carbon Type',
        'Carrington',
        'Caveat',
        'Caviar dreams',
        'Century Schoolbook',
        'Chango',
        'Charmonman',
        'Chewy',
        'Chilanka',
        'Chiller',
        'Chomsky',
        'ChunkFive',
        'CINZEL',
        'CINZEL DECORATIVE',
        'Coiny',
        'Colonna MT',
        'Comfortaa',
        'Comic Sans MS',
        'Concert One',
        'Cookie',
        'Cormorant Unicase',
        'COSTURA LIGHT',
        'Courier New',
        'Crass Roots',
        'CREEPSTER',
        'Croissant One',
        'Cutive Mono',
        'Dancing Script',
        'Darker Script',
        'Darker Grotesque',
        'Deutsch Gothic',
        'Didact Gothic',
        'DIGNA\'S HANDWRITING',
        'Domine',
        'Dosis',
        'Economica',
        'Eczar SemiBold',
        'EDO',
        'Elsie Swash Caps',
        'Emblema One',
        'Englebert',
        'Euphoria Script',
        'Exo',
        'Exo 2',
        'Fahkwang',
        'Fjalla One',
        'Franklin Gothic',
        'Fredericka the Great',
        'Fredoka One',
        'Free Universal',
        'FRENTHE H1',
        'Fugaz One'
    ]

    const fonts_elem: Array<JSX.Element> = []

    for (let i = 0; i < fonts.length; i++) {
        fonts_elem.push(
            <ButtonFont font={fonts[i]} selectFont={props.font} setFont={props.setFont} />
        )
    }

    const [value, setValue] = useState('')
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
            <ButtonFont font={props.font} selectFont={props.font} setFont={props.setFont} />

            <div className={styles.header_font}>All Fonts</div>
            <div className={styles.fonts}>
                {fonts_elem}
            </div>
        </div>
    )
}
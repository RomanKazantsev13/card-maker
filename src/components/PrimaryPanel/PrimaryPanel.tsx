import React from 'react'
import { Template } from '../../model/Card/Templates/templates'
import styles from './PrimaryPanel.module.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Templates {
    templates: Array<Template>,
    customTemplates: Array<Template>
}

export function PrimaryPanel() {
    return (
        <div className={styles.panel}>
            <p>Hello World! I'm Panel.</p> 
        </div>
    )
}
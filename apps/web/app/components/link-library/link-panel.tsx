import {Fragment} from 'react'
import Image from 'next/image'

// import styles from './link-panel.module.scss'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

interface IPropsLinkPanel{
    link:any
}

function LinkPanel(props:IPropsLinkPanel){
    return(
        <section className="border-2 border-blue-400">
        <a className="px-5" href={props.link.url}
        target="_blank"
        rel="noopener noreferrer">
            <h2>
                {props.link.title.toUpperCase()}
            </h2>
        </a>
        </section>
    )
}

export default LinkPanel;
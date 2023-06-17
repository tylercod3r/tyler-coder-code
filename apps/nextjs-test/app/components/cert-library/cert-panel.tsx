import {Fragment} from 'react'
import Image from 'next/image'

// import { CardHeaderFont, KeywordFont } from '@/fonts/fonts'

// import styles from './cert-panel.module.scss'

interface IProps{
    cert:any
}

export default function CertPanel(props:IProps){
    return(
        <section className="border-2 border-blue-400">    
            <div /*className={styles.keywordItems}*/>
                {props.cert.keywords?.map((keyword:string) => (
                <p key={keyword} /*className={KeywordFont.className}*/>{keyword.toUpperCase()}</p>
                ))}
            </div>
            
            <h3 /*className={CardHeaderFont.className}*/>
                {props.cert.title.toUpperCase()}
            </h3>

            <div /*className={styles.linkButtons}*/>
                <a href={props.cert.urlCert} /*className={styles.a}*/ target="_blank" rel="noopener noreferrer">cert</a>
                <a href={props.cert.urlCourse} /*className={styles.a}*/ target="_blank" rel="noopener noreferrer">course</a>
            </div>
        </section>
    )
}
import { Fragment } from 'react'

import path from 'path'
import ReactMarkdown from 'react-markdown'

import { getAllContent, getContentPath } from './../../utils/content-utils'
import { CERT_CONTENT_DIR } from './../../models/content-folders'

// import { CardHeaderFont } from '@/fonts/fonts'

// import styles from './cert-library.module.scss'
import CertPanel from './cert-panel'

interface IProps{
    certs:any
}

export default function CertLibrary(props:IProps){
    return (       
        <div /*className={styles.mainDiv}*/>
            <h2 /*className={CardHeaderFont.className}*/>CERT</h2>
            {props.certs?.map((cert:any) => (
                <CertPanel key={cert.title} cert={cert}/>
            ))}
        </div>
    )
};

export function getStaticProps(){
    return ({
        props: {
            certs: getAllContent(getContentPath(CERT_CONTENT_DIR))
        }
    })
}
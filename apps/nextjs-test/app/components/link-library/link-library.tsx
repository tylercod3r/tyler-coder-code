import { Fragment } from 'react'

import path from 'path'
import ReactMarkdown from 'react-markdown'

import { getAllContent, getContentPath } from './../../utils/content-utils'
import LinkPanel from './link-panel'
import { LINK_CONTENT_DIR } from './../../models/content-folders'

// import styles from './link-library.module.scss'

interface IProps{
    links:any
}

export default function LinkLibrary(props:IProps){
    return (       
        <div className='px-6'>
            {props.links?.map((link:any) => (
                <LinkPanel key={link.title} link={link}/>
            ))}
        </div>
    )
};

export function getStaticProps(){
    return ({
        props: {
            links: getAllContent(getContentPath(LINK_CONTENT_DIR))
        }
    })
}
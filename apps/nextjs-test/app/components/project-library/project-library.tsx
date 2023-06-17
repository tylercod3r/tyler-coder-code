import { Fragment } from 'react'

import path from 'path'
import ReactMarkdown from 'react-markdown'

import { getAllContent, getContentPath } from './../../utils/content-utils';
import { PROJECT_CONTENT_DIR } from './../../models/content-folders'

// import { CardHeaderFont } from '@/fonts/fonts'

// import styles from './project-library.module.scss';
import ProjectPanel from './project-panel';

interface IProps{
    projects:any
}

export default function ProjectLibrary(props:IProps){
    return (       
        <div /*className={styles.mainDiv}*/>
            <h2 /*className={CardHeaderFont.className}*/>LAB</h2>
            {props.projects?.map((project:any) => (
                <ProjectPanel key={project.title} project={project}/>
            ))}
        </div>
    )
};

export function getStaticProps(){
    return ({
        props: {
            projects: getAllContent(getContentPath(PROJECT_CONTENT_DIR))
        }
    })
}
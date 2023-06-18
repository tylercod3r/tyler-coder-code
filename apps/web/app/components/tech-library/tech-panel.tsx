import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

// import { CardHeaderFont, KeywordFont } from '@/fonts/fonts'

// import styles from './cert-panel.module.scss'

interface IProps {
  tech: any;
}

export default function TechPanel(props: IProps) {
  return (
    <section className="border-2 border-blue-400">
      <div /*className={styles.keywordItems}*/>
        {props.tech.keywords?.map((keyword: string) => (
          <p key={keyword} /*className={KeywordFont.className}*/>
            {keyword.toUpperCase()}
          </p>
        ))}
      </div>

      <div /*className={styles.linkButtons}*/>
        <Link href={props.tech.url}>{props.tech.title}</Link>
      </div>
    </section>
  );
}

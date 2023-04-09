import styles from '@/styles/HomePage.module.css'
import Head from 'next/head'

export  default function Home()
{
    return (
        <>
            <Head>
            <title>Home</title>
            <meta name="description" content="Student Home Page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <div className={styles.body}>
                <div className={styles.header}>
                    <div className={styles.appName}>
                        <div className={styles.bleap}> </div>
                        <span>GERDISC</span>
                    </div>
                    <div className={styles.headerOptions}>
                    <div>Olá, Coordenador</div>
                    </div>
                </div>
                <div className={styles.headerBreak}></div>
                <br></br>
                <div>
                    <pre id='pre' style={{ margin: "1rem"}}>Acesse os paineis para consulta e cadastro:</pre>
                </div>
                <div className={styles.dashboard}>
                    <div className={styles.boardItem}>
                        <div id='student' className={styles.itemIcon} >
                            <img src="student.png" />
                        </div>
                        <label htmlFor='student' className={styles.iconLabel}>Students</label>
                    </div>
                    <div className={styles.boardItem}>
                        <div id='professor' className={styles.itemIcon} >
                            <img src="professor.png" />
                        </div>
                        <label htmlFor='professor' className={styles.iconLabel}>Professors</label>
                    </div>
                    <div className={styles.boardItem}>
                        <div id='research' className={styles.itemIcon} >
                            <img src="research.png" />
                        </div>
                        <label htmlFor='research' className={styles.iconLabel}>Research</label>
                    </div>
                    <div className={styles.boardItem}>
                        <div id='project' className={styles.itemIcon} >
                            <img className={styles.filtered} src="lamp.png" />
                        </div>
                        <label htmlFor='project' className={styles.iconLabel}>Project</label>
                    </div>
                    <div className={styles.boardItem}>
                        <div id='report' className={styles.itemIcon} >
                            <img className={styles.filtered} src="report.png" />
                        </div>
                        <label htmlFor='report' className={styles.iconLabel}>Report</label>
                    </div>
                </div>
                <div className={styles.footer}><img src='/cefet.png' /></div>
            </div>
        </main>
        </>
    );
}
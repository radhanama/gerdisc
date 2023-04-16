/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../styles/home.scss';

export default function Home({ role, name})
{
    role = "Administrator"
    name = "Radhanama"
    return (
        <div className='home'>
        <main className={"main"}>
            <div className={"body"}>
                <div className={"header"}>
                    <div className={"appName"}>
                        <div className={"bleap"}> </div>
                        <span>GERDISC</span>
                    </div>
                    <div className={"headerOptions"}>
                    <div>Óla, {name}</div>
                    </div>
                </div>
                <div className={"headerBreak"}></div>
                <br></br>
                <div>
                    <pre id='pre' style={{ margin: "1rem"}}>Acesse os paneis para consulta e cadastro:</pre>
                </div>
                <div className={"dashboard"}>
                    {(role === "Professor" || role === "Administrator") && <div className={"boardItem"}>
                        <div id='student' className={"itemIcon"} >
                            <img src="student.png" />
                        </div>
                        <label htmlFor='student' className={"iconLabel"}>Students</label>
                    </div>}
                    {(role === "Student") && <div className={"boardItem"}>
                        <div id='Profile' className={"itemIcon"} >
                            <img src="student.png" />
                        </div>
                        <label htmlFor='Profile' className={"iconLabel"}>Meu Perfil</label>
                    </div>}
                    {(role === "Student") && <div className={"boardItem"}>
                        <div id='extensions' className={"itemIcon"} >
                            <img className={"filtered"} src="calender.png" />
                        </div>
                        <label htmlFor='extensions' className={"iconLabel"}>Pedidos de Extensão</label>
                    </div>}
                    {(role === "Administrator") && <div className={"boardItem"}>
                        <div id='professor' className={"itemIcon"} >
                            <img src="professor.png" />
                        </div>
                        <label htmlFor='professor' className={"iconLabel"}>Professors</label>
                    </div>}
                    {(role === "Administrator" || role === "Professor") && <div className={"boardItem"}>
                        <div id='research' className={"itemIcon"} >
                            <img src="research.png" />
                        </div>
                        <label htmlFor='research' className={"iconLabel"}>Research</label>
                    </div>}
                    {(role === "Administrator" || role === "Professor") && <div className={"boardItem"}>
                        <div id='project' className={"itemIcon"} >
                            <img className={"filtered"} src="lamp.png" />
                        </div>
                        <label htmlFor='project' className={"iconLabel"}>Project</label>
                    </div>}
                    {(role === "Administrator") && <div className={"boardItem"}>
                        <div id='report' className={"itemIcon"} >
                            <img className={"filtered"} src="report.png" />
                        </div>
                        <label htmlFor='report' className={"iconLabel"}>Report</label>
                    </div>}
                </div>
                <div className={"footer"}><img src='cefet.png' /></div>
            </div>
        </main>
        </div>
    );
}
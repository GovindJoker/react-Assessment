import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const SideBar = () => {

    const [isProjectOpen, setIsProjectOpen] = useState(false);

    const toggleProject = () => {
        setIsProjectOpen(!isProjectOpen);
    };
    useEffect(() => {
        const fullHeight = () => {
            const windowHeight = window.innerHeight;
            document.querySelectorAll('.js-fullheight').forEach(element => {
                element.style.height = `${windowHeight}px`;
            });
        };

        fullHeight();

        window.addEventListener('resize', fullHeight);

        return () => {
            window.removeEventListener('resize', fullHeight);
        };
    }, []);

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    };
    return (
        <nav id="sidebar">
            <div class="custom-menu">
                <button type="button" id="sidebarCollapse" onClick={toggleSidebar} class="btn btn-primary">
                    <i class="fa fa-bars"></i>
                    <span class="sr-only">Toggle Menu</span>
                </button>
            </div>
            <div>
                <h1><a href="#" class="logo"></a></h1>
                <ul class="list-unstyled components mb-5">
                    <li class="active">
                        <a href="#" onClick={toggleProject} data-toggle="collapse" aria-expanded={isProjectOpen ? "true" : "false"}
                            >Project <i className={`fa ${!isProjectOpen ? 'fa-chevron-right ms-123' : 'fa-chevron-down ms-123'}`}></i></a>
                        <ul className={`collapse dropdown_menu list-unstyled ${isProjectOpen ? 'show' : 'fade'}`}>
                            <li>
                                <Link to="/">Create Project</Link>
                            </li>
                            <li>
                                <Link to="/Manage-Project">Manage Project</Link>
                            </li>
                        </ul>
                    </li>
                </ul>



                

            </div>
        </nav>
    )
}

export default SideBar
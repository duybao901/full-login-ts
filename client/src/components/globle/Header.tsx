import React from 'react'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../utils/Typescript'
import { logout } from '../../redux/actions/authActions'

const Header = () => {
    const dispatch = useDispatch()
    const { auth } = useSelector((state: RootStore) => state)
    const location = useLocation()

    var menu = [
        { path: "/", label: "home" },
        { path: "/blog", label: "blog" },
    ]


    const isActive = (location: any, path: string) => {
        if (location.pathname === path) {
            return 'active'
        }
        return ''
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="header">
            <div className="container">
                <div className='header__wrapper'>
                    <div className="header__search">
                        <Search />
                    </div>
                    <div className="header__menu">
                        <ul className="header__menu-list">
                            {
                                menu.map((item, index) => {
                                    return <li key={index} className="list__item">
                                        <Link className={`list__item-link ${isActive(location, item.path)}`} to={`${item.path}`}>{item.label}</Link>
                                    </li>
                                })
                            }
                            {
                                !auth.access_token && <>
                                    <li className="list__item">
                                        <Link className={`list__item-link ${isActive(location, '/register')}`} to={`/register`}>register</Link>
                                    </li>
                                    <li className="list__item">
                                        <Link className={`list__item-link ${isActive(location, '/login')}`} to={`/login`}>login</Link>
                                    </li>
                                </>
                            }

                            {
                                auth.access_token && <div>
                                    <div className="dropdown">
                                        <div className="list__item-link" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img className="header__avatar" src={auth.user?.avatar} alt="user avatar">
                                            </img>
                                            <i className="ti ti-angle-down"></i>
                                        </div>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <Link className="dropdown-item" to={`/profile/${auth.user?._id}`}>Profile</Link>
                                            <Link className="dropdown-item" to="create_blog">Create Blog</Link>
                                            <Link className="dropdown-item" to="" onClick={handleLogout}>Logout</Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

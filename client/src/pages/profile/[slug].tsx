import React from 'react'
import PageNotFount from "../../components/globle/NotFound"
import { RootStore, IParams } from '../../utils/Typescript'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import UserInfor from '../../components/profile/UserInfor'
import OrtherInfor from '../../components/profile/OrtherInfor'
import UserBlog from '../../components/profile/UserBlog'

const UserProfile = () => {
    const { slug } = useParams<IParams>();
    const { auth } = useSelector((state: RootStore) => state)
    if (!auth.user) return <PageNotFount />

    return (
        <div className="profile">
            <div className="profile__heading">
                <h2 className="footer__heading heading heading--black">Coding <span>For</span> Life</h2>
            </div>
            <div className="container">
                <div className="profile__body">

                    {
                        auth.user._id === slug ?
                            <UserInfor /> :
                            <OrtherInfor />
                    }

                    <UserBlog />
                </div>
            </div>
        </div>
    )
}

export default UserProfile

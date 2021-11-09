import React, { useState, useEffect } from 'react'
import { IParams } from '../../utils/Typescript'
import { useParams } from 'react-router-dom'
import { postAPI } from '../../utils/FetchData'
import { alertSuccess, alertError } from '../../components/alert/Alert'

const ActiveAccount = () => {

    const { slug }: IParams = useParams()
    const [showErr, setShowErr] = useState()
    const [showSuccess, setShowSuccess] = useState()

    useEffect(() => {
        if (slug) {
            postAPI('active', { active_token: slug })
                .then(res => setShowSuccess(res.data.msg))
                .catch(err => setShowErr(err.response.data.msg))
        }
    }, [slug])

    return (
        <div className='active-account'>
            {showSuccess && alertSuccess(showSuccess)}
            {showErr && alertError(showErr)}

        </div>
    )
}

export default ActiveAccount

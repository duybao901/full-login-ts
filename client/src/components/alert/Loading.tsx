import React from 'react'

const Loading = () => {
    return (
        <div className='alert__loading'>
            <div className="spiner">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading

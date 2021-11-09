import React, { useState } from 'react'
import { InputChange, FormSubmit } from '../../utils/Typescript'
const Search = () => {

    const [state, setState] = useState('');

    const onHandleChang = (e: InputChange) => {
        setState(e.target.value)
    }

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
    }

    return (
        <form className='search-form' onSubmit={onHandleSubmit}>
            <i className="ti ti-search"></i>
            <input placeholder="SEARCH..." value={state} onChange={onHandleChang} />
            {state && <i className="ti ti-close" onClick={() => setState('')}></i>}
        </form>
    )
}

export default Search

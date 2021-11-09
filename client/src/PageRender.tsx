import React from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from './utils/Typescript'
import NotFound from './components/globle/NotFound'

const generataPage = (name: string) => {
    const component = () => require(`./pages/${name}`).default
    try {
        return React.createElement(component())
    } catch (err) {
        return <NotFound />
    }
}

const PageRender = () => {
    const { page, slug }: IParams = useParams()

    let name = ''
    if (page) {
        name = slug ? `${page}/[slug]` : `${page}`
    }

    return generataPage(name)
}

export default PageRender

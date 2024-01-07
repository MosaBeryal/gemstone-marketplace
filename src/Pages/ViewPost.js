import React from 'react'

import Header from '../Components/Header/Header'
import View from '../Components/View/View'
import { useParams } from 'react-router-dom'


function ViewPost(props) {
const {id} = useParams()
console.log(id)

    return (
        <div>
            
            <Header />
            <div>

            </div>
            
        </div>
    )
}

export default ViewPost

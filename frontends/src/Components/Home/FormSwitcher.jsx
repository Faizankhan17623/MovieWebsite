import React from 'react'
import { useState } from 'react'
const FormSwitcher = () => {
    const [Switch, setSwitch] = useState(false)
    const [loading, setLoading] = useState(false)
    const data =[
        "OrgainezerForm",
        "TheatrerForm",
    ]
  return (
    <div className='flex flex-col items-center justify-center '>
        <h1>Became a Member of Our Communitey</h1>
        <p>Make Anything That you ove</p>
        <div>
            <button>Orgainezer</button>
            <button>Theatrer</button>
        </div>
    </div>
  )
}

export default FormSwitcher
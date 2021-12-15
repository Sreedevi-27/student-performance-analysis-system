import { useEffect, useState } from 'react';

import { API_END_POINT } from '../../config'

import './Info.css'

function Info() {
    const [info, setInfo] = useState(null)

    useEffect(function() {
        window.fetch(`${API_END_POINT}/students/18cs01`)
            .then(function(res) {
                return res.json()
            })
            .then(setInfo)
    }, [])

    return (
        <div className="info">
            {info !== null 
                ?   <>
                        <div className="avatar">
                            {info.name.charAt(0)}
                        </div>
                        <div className="name-and-regno">
                            <div className="name">{info.name}</div>
                            <div className="roll-no">{info.id}</div>
                        </div>
                    </> 
                : null}
        </div>
    );
}

export default Info
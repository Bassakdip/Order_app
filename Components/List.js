import React from 'react'
import Card from './Card'

const List = ({datas,handleEdit,handleDelete}) => {
    return (
        <Card>
            <ul>
                <h3>-: All Student Information :-</h3>

                {datas.map((data) =>(
                    <li key={data.id}>{data.title} &ensp; {data.password} &ensp; {data.address}&ensp;
                        
                        <button onClick={() =>handleEdit(data.id)}>Edit</button>&ensp;
                        <button onClick={() => handleDelete(data.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </Card>
    )
}

export default List

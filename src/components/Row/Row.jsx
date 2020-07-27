import React from "react";
import s from './Row.module.css'


const Row = ({id, firstName, lastName, email, phone, sendRowToBottom, sendDataToBottomDataLines, removeRowFromBottom, address, description}) => {
    return <tr className={s.row + ' ' + s.data}>
        <td onClick={() => {
            removeRowFromBottom();
            sendRowToBottom({id, firstName, address, description});
            sendDataToBottomDataLines({id, firstName, lastName, email, phone})
        }}>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>
    </tr>
}
export default Row;
import React from "react";
import s from './Row.module.css'


const Row = ({id, firstName, lastName, email, phone, clickable ,sortColumn, sortOrder, sendRowToBottom, address, description}) => {
    const toSort = (sortOrder, param) => {
      return   sortOrder === 'toTop'
            ? () => sortColumn(param, 'toBottom')
            : () => sortColumn(param, 'toTop')
    }

    return clickable ? <tr className={s.row}>
        <td className={s.noHover} onClick={toSort(sortOrder, 'id')}>{id} {sortOrder === 'toBottom' ? '▽' : '△'}</td>
        <td onClick={toSort(sortOrder, 'firstName')}>{firstName}{sortOrder !== null && sortOrder === 'toBottom' ? '▽' : '△'}</td>
        <td onClick={toSort(sortOrder, 'lastName')}>{lastName}{sortOrder === 'toBottom' ? '▽' : '△'}</td>
        <td onClick={toSort(sortOrder, 'email')}>{email}{sortOrder === 'toBottom' ? '▽' : '△'}</td>
        <td onClick={toSort(sortOrder, 'phone')}>{phone}{sortOrder === 'toBottom' ? '▽' : '△'}</td>
    </tr>
        : <tr className={s.row} >
            <td onClick={() => sendRowToBottom({id, firstName, lastName, email, phone})}>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
        </tr>
}
export default Row;
import React from "react";
import s from './Row.module.css'


const Row = ({id, firstName, lastName, email, phone, clickable ,sortColumn, sortOrder}) => {
    const toSort = (sortOrder, param) => {
      return   sortOrder === 'toTop'
            ? () => sortColumn(param, 'toBottom')
            : () => sortColumn(param, 'toTop')
    }
    return clickable ? <tr className={s.row}>
        <td onClick={toSort(sortOrder, 'id')}>{id}</td>
        <td onClick={toSort(sortOrder, 'firstName')}>{firstName}</td>
        <td onClick={toSort(sortOrder, 'lastName')}>{lastName}</td>
        <td onClick={toSort(sortOrder, 'email')}>{email}</td>
        <td onClick={toSort(sortOrder, 'phone')}>{phone}</td>
    </tr>
        : <tr className={s.row}>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
        </tr>
}
export default Row;
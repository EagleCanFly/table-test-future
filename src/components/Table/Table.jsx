import React from "react";
import s from './Table.module.css'
import Row from "../Row/Row";
import Pagination from "react-js-pagination"


const Table = ({data, setCurrentPage, currentPage, getData, getUsersPortion, sortColumn, sortOrder}) => {


    return <div>

        <table className={s.table}>
            <button onClick={() => getData('small')}>Get small amount</button>
            <button onClick={() => getData('large')}>Get large amount</button>
            <Row id={'id'}
                 firstName={'firstName'}
                 lastName={'lastName'}
                 email={'email'}
                 phone={'phone'}
                 clickable={true}
                 sortColumn={sortColumn}
                 sortOrder={sortOrder}/>

            {getUsersPortion(data, currentPage).map((user, i) => <Row key={i}
                                                                      id={user.id}
                                                                      firstName={user.firstName}
                                                                      lastName={user.lastName}
                                                                      email={user.email}
                                                                      phone={user.phone}/>)}

        </table>
        <Pagination onChange={setCurrentPage}
                    totalItemsCount={data.length}
                    activePage={currentPage}
                    itemsCountPerPage={50}
                    pageRangeDisplayed={5}
                    innerClass={s.pagination}
                    activeClass={s.active}/>
    </div>

}
export default Table;
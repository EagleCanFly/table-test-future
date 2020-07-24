import React from "react";
import s from './Table.module.css'
import Row from "../Row/Row";
import Pagination from "react-js-pagination"


const Table = ({
                   data,
                   setCurrentPage,
                   currentPage,
                   getData,
                   getUsersPortion,
                   sortColumn, sortOrder,
                   sendRowToBottom,
                   bottomRow,
                   filterUsers,
                   isAddLineActive,
                   toggleAddMode
               }) => {


    return <div>
        <div className={s.topControl}>
            {isAddLineActive
                ? <form className={s.inputColumn}>
                    <input placeholder={'Id'} type="text"/>
                    <input placeholder={'First Name'} type="text"/>
                    <input placeholder={'Last Name'} type="text"/>
                    <input placeholder={'email'} type="text"/>
                    <input placeholder={'phone'} type="text"/>
                    <button onSubmit={(event) => {
                        toggleAddMode(false);
                        event.preventDefault();
                        // event.target[0].value
                    }}>Сохранить
                    </button>
                </form>
                : <button onClick={() => toggleAddMode(true)} className={s.addBtn}>Добавить</button>}

            <input type="text" className={s.filter} onKeyUp={(event => {
                if (event.key === 'Enter') {
                    if (event.target.value === '') {
                        getData('small')
                    }
                    filterUsers(event.target.value)
                }
            })}/></div>
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
                                                                      phone={user.phone}
                                                                      sendRowToBottom={sendRowToBottom}
                                                                      address={user.address}
                                                                      description={user.description}/>)}

        </table>
        <Pagination onChange={setCurrentPage}
                    totalItemsCount={data.length}
                    activePage={currentPage}
                    itemsCountPerPage={50}
                    pageRangeDisplayed={5}
                    innerClass={s.pagination}
                    activeClass={s.active}/>
        {bottomRow.map((item, i) => {
            return <div key={i} className={s.bottomLine}>
                <span> <b>ID: </b>{item.id}</span>
                <span><b>First Name: </b>{item.firstName}</span>
                <span><b>Last Name: </b>{item.lastName}</span>
                <span><b>Email: </b>{item.email}</span>
                <span><b>Phone: </b>{item.phone}</span>
            </div>
        })}
    </div>

}
export default Table;
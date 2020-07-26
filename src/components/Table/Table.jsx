import React from "react";
import s from './Table.module.css'
import Row from "../Row/Row";
import Pagination from "react-js-pagination"
import {Field, Form} from "react-final-form";
import Loader from "../Loader/Loader";


const Table = ({
                   data,
                   setCurrentPage,
                   currentPage,
                   getData,
                   getUsersPortion,
                   sortOrder,
                   sendRowToBottom,
                   sendDataToBottomDataLines,
                   removeRowFromBottom,
                   bottomRow,
                   bottomDataLines,
                   isAddLineActive,
                   toggleAddMode,
                   onAddLineSubmit,
                   isFetching,
                   onIdSearch,
                   toSort
               }) => {


    return <div>
        <div className={s.topControl}>
            {isAddLineActive
                ? <Form onSubmit={onAddLineSubmit}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}
                                  className={s.inputColumn}>
                                <Field name={'id'} placeholder={'Id'} component={"input"}/>
                                <Field name={'firstName'} placeholder={'First Name'} component={"input"}/>
                                <Field name={'lastName'} placeholder={'Last Name'} component={"input"}/>
                                <Field name={'email'} placeholder={'email'} component={"input"}/>
                                <Field name={'phone'} placeholder={'phone'} component={"input"}/>
                                <button>Сохранить</button>
                            </form>
                        )}
                />
                : <button onClick={() => toggleAddMode(true)} className={s.addBtn}>Добавить</button>}

            <input placeholder={'Поиск по ID'} type="text" className={s.filter} onKeyUp={(event) => {
                onIdSearch(event)
            }}/></div>
        {isFetching
            ? <Loader/>
            : <div>
                <div className={s.buttonsRow}>
                    <button onClick={() => getData('small')}>Получить маленький объём данных</button>
                    <button onClick={() => getData('large')}>Получить большой объём данных</button>
                </div>
                <table className={s.table}>
                    <tbody>
                    <tr className={s.topRow}>
                        <td onClick={toSort(sortOrder, 'id')}>ID {sortOrder === 'toBottom' ? '▼' : sortOrder && '▲'}</td>
                        <td onClick={toSort(sortOrder, 'firstName')}>Имя{sortOrder === 'toBottom' ? '▼' : sortOrder && '▲'}</td>
                        <td onClick={toSort(sortOrder, 'lastName')}>Фамилия{sortOrder === 'toBottom' ? '▼' : sortOrder && '▲'}</td>
                        <td onClick={toSort(sortOrder, 'email')}>Почта{sortOrder === 'toBottom' ? '▼' : sortOrder && '▲'}</td>
                        <td onClick={toSort(sortOrder, 'phone')}>Телефон{sortOrder === 'toBottom' ? '▼' : sortOrder && '▲'}</td>
                    </tr>

                    {getUsersPortion(data, currentPage).map((user, i) => <Row key={i}
                                                                              id={user.id}
                                                                              firstName={user.firstName}
                                                                              lastName={user.lastName}
                                                                              email={user.email}
                                                                              phone={user.phone}
                                                                              sendRowToBottom={sendRowToBottom}
                                                                              sendDataToBottomDataLines={sendDataToBottomDataLines}
                                                                              removeRowFromBottom={removeRowFromBottom}
                                                                              address={user.address}
                                                                              description={user.description}/>)}
                    </tbody>

                </table>
            </div>}
        <Pagination onChange={setCurrentPage}
                    totalItemsCount={data.length}
                    activePage={currentPage}
                    itemsCountPerPage={50}
                    pageRangeDisplayed={5}
                    innerClass={s.pagination}
                    activeClass={s.active}
                    hideDisabled={true}/>
        {bottomRow.map((item, i) => {
            return <div key={i} className={s.bottomLine}>
                <span> <b>ID: </b>{item.id}</span>
                <span><b>First Name: </b>{item.firstName}</span>
                <textarea>
                    {item.description}
                </textarea>
                <span>Адрес проживания: <br/><b>{item.address ? item.address.streetAddress : ''}</b></span>
                <span>Город: <br/><b>{item.address ? item.address.city : ''}</b></span>
                <span>Провинция\штат: <br/><b>{item.address ? item.address.state : ''}</b></span>
                <span>Индекс: <br/><b>{item.address ? item.address.zip : ''}</b></span>
            </div>
        })}
        {bottomDataLines.map((item, i) => {
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
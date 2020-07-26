import React, {useState} from "react";
import s from './Table.module.css'
import Row from "../Row/Row";
import Pagination from "react-js-pagination"
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
                   isError,
                   isFormEmptyError,
                   toSort
               }) => {

    const [searchValue, setSearchValue] = useState('');

    let currentPart = getUsersPortion(data, currentPage)

    const filteredTable = currentPart.filter((item, i) => {
        if (searchValue === '') return true;
        return item.id.toString().includes(searchValue)
            || item.phone.toString().includes(searchValue)
            || item.firstName.toLowerCase().includes(searchValue.toLowerCase())
            || item.lastName.toLowerCase().includes(searchValue.toLowerCase())
            || item.email.toLowerCase().includes(searchValue.toLowerCase())
    })


    return (
        <div>
            <div className={s.topControl}>
                {isAddLineActive
                    ? <form onSubmit={event => {
                        event.preventDefault();
                        onAddLineSubmit(event)
                    }}
                            className={s.inputColumn}>
                        <input name={'id'} placeholder={'ID'} type={"text"}/>
                        <input name={'firstName'} placeholder={'Имя'} type={"text"}/>
                        <input name={'lastName'} placeholder={'Фамилия'} type={"text"}/>
                        <input name={'email'} placeholder={'Почта'} type={"text"}/>
                        <input name={'phone'} placeholder={'Телефон'} type={"text"}/>
                        <button>Сохранить</button>
                        <div className={isFormEmptyError ? s.error : s.disabled}>Заполните все поля</div>
                    </form>

                    : <button onClick={() => toggleAddMode(true)} className={s.addBtn}>Добавить</button>}

                <form onSubmit={(event) => {
                    event.preventDefault();
                    setSearchValue(event.target[0].value)
                }} className={s.filter}>
                    <input placeholder={'Поиск'}
                           type="text"
                           className={s.filter}
                    />
                    <button>Найти
                    </button>
                </form>
            </div>

            {isFetching
                ? <Loader/>
                : <div>
                    <div className={isError ? s.error : s.disabled}>Что-то пошло не так...</div>
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

                        {filteredTable.map((user, i) => <Row key={i}
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
                    <textarea value={item.description} readOnly={true}/>
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
    )
}
export default Table;
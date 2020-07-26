import React, {useState} from "react";
import Table from "./Table";
import {connect} from "react-redux";
import {
    addLine,
    filterUsers,
    getData,
    removeRowFromBottom, sendDataToBottomDataLines,
    sendRowToBottom,
    sortColumn,
    toggleAddMode
} from "../../BLL/reducer";

const TableContainer = ({data,
                            getData,
                            sortColumn,
                            sortOrder,
                            bottomRow,
                            bottomDataLines,
                            sendRowToBottom,
                            sendDataToBottomDataLines,
                            removeRowFromBottom,
                            filterUsers,
                            isAddLineActive,
                            toggleAddMode,
                            addLine,
                            isFetching}) => {

    const [currentPage, setCurrentPage] = useState(1)

    const getUsersPortion = (arr, n = 1) => {
        return arr.filter((item, i) => (-50 + (n * 50)) <= i && i < (n * 50))
    }
    const isEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    const onAddLineSubmit = (params) => {

        if (isEmpty(params)) return;
        addLine(params);
        toggleAddMode(false)
    }
    const onIdSearch =  (event) => {
         if (event.key === 'Enter') {
             if (event.target.value === '') {
                 getData('small')
             }

            filterUsers(event.target.value)
         }
    }

    const toSort = (sortOrder, param) => {
        return   sortOrder === 'toTop'
            ? () => sortColumn(param, 'toBottom')
            : () => sortColumn(param, 'toTop')
    }

    return <Table data={data}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  getData={getData}
                  getUsersPortion={getUsersPortion}
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  sendRowToBottom={sendRowToBottom}
                  removeRowFromBottom={removeRowFromBottom}
                  sendDataToBottomDataLines={sendDataToBottomDataLines}
                  bottomRow={bottomRow}
                  bottomDataLines={bottomDataLines}
                  filterUsers={filterUsers}
                  isAddLineActive={isAddLineActive}
                  onAddLineSubmit={onAddLineSubmit}
                  toggleAddMode={toggleAddMode}
                  isFetching={isFetching}
                  onIdSearch={onIdSearch}
                  toSort={toSort}
    />
}
const mapDispatchToProps = (state) => {
    return {
        data: state.data,
        sortOrder: state.sortOrder,
        bottomRow: state.bottomRow,
        bottomDataLines: state.bottomDataLines,
        isAddLineActive: state.isAddLineActive,
        isFetching: state.isFetching
    }
}
export default connect(mapDispatchToProps, {
    getData,
    sortColumn,
    sendRowToBottom,
    sendDataToBottomDataLines,
    removeRowFromBottom,
    filterUsers,
    toggleAddMode,
    addLine
})(TableContainer);
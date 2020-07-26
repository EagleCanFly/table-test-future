import React, {useState} from "react";
import Table from "./Table";
import {connect} from "react-redux";
import {
    addLine,
    getData,
    removeRowFromBottom,
    sendDataToBottomDataLines,
    sendRowToBottom,
    sortColumn,
    toggleAddMode, toggleFormEmptyError
} from "../../BLL/reducer";

const TableContainer = ({
                            data,
                            getData,
                            sortColumn,
                            sortOrder,
                            bottomRow,
                            bottomDataLines,
                            sendRowToBottom,
                            sendDataToBottomDataLines,
                            removeRowFromBottom,
                            isAddLineActive,
                            toggleAddMode,
                            addLine,
                            isFetching,
                            isError,
                            isFormEmptyError,
                            toggleFormEmptyError
                        }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const getUsersPortion = (arr, n = 1) => {
        return arr.filter((item, i) => (-50 + (n * 50)) <= i && i < (n * 50))
    }
    const isEmpty = (obj) => {
        for (let key in obj) {
            if (obj[key] === "") {
                toggleFormEmptyError(true)
                return true;}
        }
        toggleFormEmptyError(false)
        return false;
    }
    const onAddLineSubmit = (event) => {
        const params = {}
        for (let i = 0; i < 5; i++) {
            params[event.target[i].name] = event.target[i].value
        }
        if (isEmpty(params)) return;
        addLine(params);
        toggleAddMode(false)
    }

    const toSort = (sortOrder, param) => {
        return sortOrder === 'toTop'
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
                  isAddLineActive={isAddLineActive}
                  onAddLineSubmit={onAddLineSubmit}
                  toggleAddMode={toggleAddMode}
                  isFetching={isFetching}
                  isError={isError}
                  isFormEmptyError={isFormEmptyError}
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
        isFetching: state.isFetching,
        isError: state.isError,
        isFormEmptyError: state.isFormEmptyError
    }
}
export default connect(mapDispatchToProps, {
    getData,
    sortColumn,
    sendRowToBottom,
    sendDataToBottomDataLines,
    removeRowFromBottom,
    toggleAddMode,
    addLine,
    toggleFormEmptyError
})(TableContainer);
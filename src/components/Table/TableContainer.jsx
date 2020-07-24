import React, {useEffect, useState} from "react";
import Table from "./Table";
import {connect} from "react-redux";
import {filterUsers, getData, sendRowToBottom, sortColumn, toggleAddMode} from "../../BLL/reducer";

const TableContainer = ({data, getData, sortColumn, sortOrder,bottomRow, sendRowToBottom,filterUsers, isAddLineActive, toggleAddMode}) => {
    // debugger
    const [currentPage, setCurrentPage] = useState(1)

    const getUsersPortion = (arr, n = 1) => {
        return arr.filter((item, i) => (-50 + (n * 50)) <= i && i < (n * 50))
    }
    return <Table data={data}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  getData={getData}
                  getUsersPortion={getUsersPortion}
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  sendRowToBottom={sendRowToBottom}
                  bottomRow={bottomRow}
                  filterUsers={filterUsers}
                  isAddLineActive={isAddLineActive}
                  toggleAddMode={toggleAddMode}
                  />
}
const mapDispatchToProps = (state) => {
    return {
        data: state.data,
        sortOrder: state.sortOrder,
        bottomRow: state.bottomRow,
        isAddLineActive: state.isAddLineActive
    }
}
export default connect(mapDispatchToProps, {getData, sortColumn, sendRowToBottom, filterUsers, toggleAddMode})(TableContainer);
import React, {useEffect, useState} from "react";
import Table from "./Table";
import {connect} from "react-redux";
import {getData, sortColumn} from "../../BLL/reducer";

const TableContainer = ({data, getData, sortColumn, sortOrder}) => {
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
                  sortOrder={sortOrder}/>
}
const mapDispatchToProps = (state) => {
    return {
        data: state.data,
        sortOrder: state.sortOrder
    }
}
export default connect(mapDispatchToProps, {getData, sortColumn})(TableContainer);
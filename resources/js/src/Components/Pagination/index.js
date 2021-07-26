import React from "react";
import styles from './Paginate.module.css';
import {default as Paginate} from "react-js-pagination";

const Pagination = props =>{
    return(
        <div className={styles.Paginate}>
            <Paginate
                activePage={props.activePage}
                itemsCountPerPage={props.itemsCountPerPage}
                totalItemsCount={props.totalItemsCount}
                pageRangeDisplayed={props.pageRangeDisplayed}
                innerClass={'pagination'}
                itemClass={"page-item"}
                linkClass={"page-link"}
                activeLinkClass={'active'}
                onChange={props.handlePageChange}
                lastPageText={props.lastPageText}
                firstPageText={props.firstPageText}
            />
        </div>
    );

}

export default Pagination

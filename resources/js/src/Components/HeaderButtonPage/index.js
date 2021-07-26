import React from 'react';
import styles from './HeaderButtonPage.module.css';
import {Link, useHistory} from "react-router-dom";
import Button from "../Button";
import {RiAddCircleLine, RiArrowGoBackLine} from 'react-icons/ri';
import {Row, Col} from 'react-bootstrap';

const HeaderButtonPage = ({type, to, title, h1, h2}) => {

    const history = useHistory();

    if(type === 'store') {
        return (
            <div className={styles.HeaderStoreButton}>
                <Row>
                    <Col lg={9}>
                        <h1>{h1}</h1>
                    </Col>
                    <Col lg={3}>
                        <Link to={to}>
                            <Button>{title}<RiAddCircleLine className={styles.Icon}/></Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }

    return (
        <div className={styles.Back}>
            <div>
                <Button onClick={e => history.goBack()}>
                    <RiArrowGoBackLine className={styles.Icon}/>
                </Button>
            </div>
            <h2>{h2}</h2>
            <div></div>
        </div>
    );
}

export default HeaderButtonPage;

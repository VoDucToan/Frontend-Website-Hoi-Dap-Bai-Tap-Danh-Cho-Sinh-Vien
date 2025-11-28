import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TableEdit from "./TableEdits";

const ManageEdits = () => {

    const [key, setKey] = useState('0');

    const handleTab = (k) => {
        setKey(k)
    }

    return (
        <div className="manage-edits-container">
            <Tabs
                defaultActiveKey='0'
                className="mb-3"
                onSelect={(k) => handleTab(k)}
                fill
            >
                <Tab eventKey="0" title="Đang chờ">
                    <TableEdit editStatus={key} />
                </Tab>
                <Tab eventKey="1" title="Chấp nhận">
                    <TableEdit editStatus={key} />
                </Tab>
                <Tab eventKey="2" title="Từ chối">
                    <TableEdit editStatus={key} />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ManageEdits;
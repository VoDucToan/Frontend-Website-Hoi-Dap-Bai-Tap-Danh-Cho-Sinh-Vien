import { Tab, Tabs } from "react-bootstrap"
import TableEditsTag from "./TableEditsTag";
import { useState } from "react";

const ManageEditsTag = () => {

    const [key, setKey] = useState('0');

    const handleTab = (k) => {
        setKey(k)
    }

    return (
        <div className="manage-edits-tag-container">
            <Tabs
                defaultActiveKey='0'
                className="mb-3"
                onSelect={(k) => handleTab(k)}
                fill
            >
                <Tab eventKey="0" title="Đang chờ">
                    <TableEditsTag editStatus={key} />
                </Tab>
                <Tab eventKey="1" title="Chấp nhận">
                    <TableEditsTag editStatus={key} />
                </Tab>
                <Tab eventKey="2" title="Từ chối">
                    <TableEditsTag editStatus={key} />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ManageEditsTag
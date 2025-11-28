import { useEffect, useState } from 'react';
import './ListSavedItems.scss';
import ModalCreateNewList from './ModalCreateNewList';
import { useOutletContext, useParams } from 'react-router-dom';
import { getItemsSaveByList, getItemsSaveByListLater } from '../../services/apiItemSaveService';
import PostSaved from './PostSaved';
import ModalEditListSave from './ModalEditListSave';

const ListSavedItems = () => {
    const [show, handleClose, handleShow, listName,
        setListName, fetchListSaves, user, listSaves
    ] = useOutletContext();

    const { idlist } = useParams();

    const [items, setItems] = useState([]);
    const [currentListSave, setCurrentListSave] = useState({});

    const fetchCurrentListSave = () => {
        if (listSaves && listSaves.length > 0 && idlist) {
            let obj = listSaves.find(listSave => listSave.id === +idlist);
            setCurrentListSave(obj);
        }
        else if (listSaves && listSaves.length > 0 && !idlist) {
            setCurrentListSave(listSaves[0]);
        }
    }
    useEffect(() => {
        fetchCurrentListSave();
    }, [listSaves, idlist])

    const fetchItems = async () => {
        if (idlist && !_.isEmpty(user)) {
            const resItemsSaveByList = await getItemsSaveByList(idlist)
            if (resItemsSaveByList && resItemsSaveByList.EC === 0) {
                setItems(resItemsSaveByList.DT);
            }
        }
        else {
            const resItemsSaveByListLater = await getItemsSaveByListLater(user.id)
            if (resItemsSaveByListLater && resItemsSaveByListLater.EC === 0) {
                setItems(resItemsSaveByListLater.DT);
            }
        }
    }

    useEffect(() => {
        fetchItems();
    }, [idlist, user])

    return (
        <div className="items-saved-container">
            <div className="header-items-saved">
                <h5>{!_.isEmpty(currentListSave) && currentListSave.list_name}</h5>

                {idlist ?
                    (
                        <ModalEditListSave currentListSave={currentListSave}
                            fetchListSaves={fetchListSaves} />
                    )
                    :
                    (
                        <button type="button" className="btn btn-primary"
                            onClick={handleShow}>Tạo danh sách mới</button>

                    )
                }
            </div>
            <div className="stats-items-saved">
                <span className="amount-items-saved">{items.length} mục lưu trữ</span>
            </div>
            <div className="content-items-saved">
                {items && items.length > 0 && items.map((item) => {
                    return (
                        <PostSaved key={item.id} post={item} user={user}
                            fetchItems={fetchItems} listSaves={listSaves} />
                    )
                })}
            </div>
            <ModalCreateNewList
                show={show}
                handleClose={handleClose}
                listName={listName}
                setListName={setListName}
                fetchListSaves={fetchListSaves}
            />
        </div>
    )
}

export default ListSavedItems;
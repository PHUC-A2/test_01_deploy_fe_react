import { App, Modal } from "antd";
import { getUserByIdApi } from "../../services/api";
import { useEffect } from "react";


interface IProps {
    openGetUserByIdModal: boolean;
    setOpenGetUserByIdModal: (v: boolean) => void;
    userById: {
        id: number;
        name: string;
        email: string;
    } | null;

    setUserById: any;

}


const GetUserByIdModal = (props: IProps) => {

    const { openGetUserByIdModal, setOpenGetUserByIdModal, userById, setUserById } = props;
    const { message } = App.useApp();
    const handleGetUserById = async () => {
        if (!userById?.id) return;
        try {
            const res = await getUserByIdApi(userById.id);
            console.log(userById.id)
            if (res?.data) {
                setUserById(res.data.data); // cập nhật lại data mới nhất
            }
        } catch (error: any) {
            const m = error?.response?.data ?? "unknow";
            message.error("Có lỗi xảy ra", m);
        }
    }

    useEffect(() => {
        if (openGetUserByIdModal && userById?.id) {
            handleGetUserById(); // gọi hàm khi mở modal
        }
    }, [openGetUserByIdModal, userById?.id])

    return (
        <Modal
            title="Thông tin sinh viên"
            closable={{ 'aria-label': 'Custom Close Button' }}
            okText={"Yes"}
            maskClosable={false} // không cho đóng khi nhấn vùng trống
            open={openGetUserByIdModal}
            onOk={() => setOpenGetUserByIdModal(false)}
            onCancel={() => setOpenGetUserByIdModal(false)}

        >


            {userById ? (
                <div >
                    <div><strong>Name:</strong>{userById?.name}</div>
                    <div><strong>Email:</strong>{userById?.email}</div>
                </div>
            ) : <div>Loading...</div>}

        </Modal>
    )
}
export default GetUserByIdModal;
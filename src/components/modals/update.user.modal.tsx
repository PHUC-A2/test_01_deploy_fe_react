import { App, Input, Modal} from "antd";
import { useEffect, useState } from "react";
import { updateUserApi } from "../../services/api";

interface IProps {
    openUpdateModal: boolean;
    setOpenUpdateModal: (v: boolean) => void;

    dataUpdateUser: {
        id: number;
        name: string;
        email: string;
    } | null;
    fetchUsers: any;
    setDataUpdateUser: any;

}

const UpdateUserModal = (props: IProps) => {
    const { notification, message } = App.useApp();
    const { openUpdateModal, setOpenUpdateModal, dataUpdateUser, setDataUpdateUser, fetchUsers } = props;
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    const handleSubmit = async () => {
        setLoading(true);
        if (dataUpdateUser) {
            try {
                const res = await updateUserApi(dataUpdateUser.id, name, email);
                if (res.data.data) {
                    message.success("Cập nhật người dùng thành công")
                    setOpenUpdateModal(false);
                    setName("");
                    setEmail("");
                    await fetchUsers();
                }
            } catch (error: any) {
                const m = error?.response?.data.messsge ?? "unknow";
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: m
                })

            }
        }
        setLoading(false);
    }

    // mỗi lần sửa thì hàm này sẽ chạy
    useEffect(() => {
        if (dataUpdateUser) { // nếu tồn tại data thì cập nhật
            setName(dataUpdateUser.name)
            setEmail(dataUpdateUser.email)

        }
    }, [dataUpdateUser])

    return (
        <Modal
            title="Update a user"
            closable={{ 'aria-label': 'Custom Close Button' }}
            okText={"Update"}
            maskClosable={false} // không cho đóng khi nhấn vùng trống
            open={openUpdateModal}
            onOk={handleSubmit}
            onCancel={() => {
                setOpenUpdateModal(false); // đóng modal
                setDataUpdateUser(null); // xóa data ở modal khi đóng
            }}

            // loading
            okButtonProps={{
                loading: loading
            }}
        >
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10, // khoảng cách các input
                        marginBottom: 15
                    }}
                >
                    <span>Name:</span>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10, // khoảng cách các input
                        marginBottom: 15

                    }}
                >
                    <span>Email:</span>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

            </div>
        </Modal>
    )
}

export default UpdateUserModal;
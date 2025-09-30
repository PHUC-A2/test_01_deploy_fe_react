import { App, Input, Modal } from "antd"
import { useState } from "react";
import { createUserApi } from "../../services/api";

interface IProps {
    openCreateModal: boolean;
    setOpenCreateModal: (v: boolean) => void;
    fetchUsers: any; // dùng any để có thể hiện thị bất kỳ loại dữ liệu nào
}

const CreateUserModal = (props: IProps) => {

    // dùng destructuring để gọi đến props
    const { openCreateModal, setOpenCreateModal, fetchUsers } = props;
    const { notification, message } = App.useApp(); // là ở dạng props
    // tạo state và lấy thông tin từ props
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); // tạo hiện ứng quay quay


    // Khi nhấn lưu sẽ gọi đến hàm create
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await createUserApi(name, email);
            console.log(name, email)
            if (res.data.data) {
                message.success("Tạo mới người dùng thành công");
                setOpenCreateModal(false);
                setName(""); // làm mới modal ngay sau khi tạo mới
                setEmail("");
                // gọi lại danh sách users
                await fetchUsers();
            }
        } catch (error: any) {
            console.log("============>Check: ", error)
            const m = error?.response?.data?.message ?? "unknow";
            notification.error({
                message: "Có lỗi xảy ra",
                description: m
            })
        }

        setLoading(false);
    }

    return (
        <Modal
            title="Crate a user"
            closable={{ 'aria-label': 'Custom Close Button' }}
            okText={"Save"}
            maskClosable={false} // không cho đóng khi nhấn vùng trống
            open={openCreateModal}
            onOk={handleSubmit}
            onCancel={() => {
                setOpenCreateModal(false) // đóng modal
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
                        value={name} // lấy name thông qua state
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

export default CreateUserModal;
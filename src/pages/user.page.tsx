import { Button, message, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteUserApi, getAllUsersApi } from "../services/api";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import CreateUserModal from "../components/modals/create.user.modal";
import UpdateUserModal from "../components/modals/update.user.modal";
import GetUserByIdModal from "../components/modals/get.a.user.modal";

interface IUser {
    id: number;
    name: string;
    email: string;

}

const UserPage = () => { // js => ts 



    // state 
    const [users, setUsers] = useState<IUser[]>([]); // lấy danh sách user => mảng
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [openGetUserByIdModal, setOpenGetUserByIdModal] = useState<boolean>(false);
    const [dataUpdateUser, setDataUpdateUser] = useState<IUser | null>(null);
    const [userById, setUserById] = useState<IUser | null>(null);
    // hàm gọi api
    const fetchUsers = async () => {
        const res = await getAllUsersApi();
        try {
            if (res?.data?.status === "success") {
                setUsers(res.data.data)
                console.log(res)
                console.log(res.data.statusCode == 200 ? "SUCCESS" : "ERROR");
            }
        } catch (error) {
            console.log("Lỗi khi lấy API: ", error)
        }
    }

    // dùng để gọi hàm lấy data

    useEffect(() => {
        fetchUsers();
    }, []);

    // hàm xóa
    const handleClickDelete = async (data: IUser) => {
        try {
            const res = await deleteUserApi(data.id);
            if (res.data) {
                message.success("Đã xóa người dùng thành công")
                await fetchUsers();
            }
        } catch (error: any) {
            console.log("Xóa thất bại", error)
        }
    }

    // hàm sửa
    const handelClickUpdate = (data: IUser) => {
        setDataUpdateUser(data); // luôn có data mới
        setOpenUpdateModal(true);
    }

    // hàm gọi mở modal get use by id
    const handleClickGetUserById = (data: IUser) => {
        setUserById(data);
        setOpenGetUserByIdModal(true);
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            render: (_: string, record: IUser) => {
                return (
                    <>
                        <div style={{
                            display: "flex",
                            gap: 10 // khoảng cách 2 button
                        }}>
                            <Button
                                style={{
                                    cursor: "pointer", // đổi biểu tượng con chuột khi click
                                    color: "orange",

                                }}

                                icon={<UserOutlined />}
                                onClick={() => handleClickGetUserById(record)}
                            />
                            <Button
                                style={{
                                    cursor: "pointer", // đổi biểu tượng con chuột khi click
                                    color: "orange",

                                }}

                                icon={<EditOutlined />}
                                onClick={() => handelClickUpdate(record)}
                            />

                            {/* xóa */}
                            <Popconfirm
                                title="Delete the user"
                                description="Are you sure to delete this user?"
                                onConfirm={() => handleClickDelete(record)}
                                onCancel={() => {
                                    setOpenCreateModal(false);
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    style={{
                                        cursor: "pointer", // đổi biểu tượng con chuột khi click
                                        color: "red",

                                    }}

                                    icon={<DeleteOutlined />}
                                />
                            </Popconfirm>

                        </div>

                    </>
                )
            }
        },
    ];

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: 'space-between',
                alignItems: "center"
            }}>
                <h1>Table user</h1>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => setOpenCreateModal(true)}
                >
                    Add user</Button>
            </div>
            <Table
                bordered
                dataSource={users} // nơi nhận data
                columns={columns}
                rowKey={"id"}
            />

            <CreateUserModal
                openCreateModal={openCreateModal} // props
                setOpenCreateModal={setOpenCreateModal}
                fetchUsers={fetchUsers}
            />

            <UpdateUserModal
                openUpdateModal={openUpdateModal} // props
                setOpenUpdateModal={setOpenUpdateModal}
                dataUpdateUser={dataUpdateUser}
                setDataUpdateUser={setDataUpdateUser}
                fetchUsers={fetchUsers}
            />

            <GetUserByIdModal
                openGetUserByIdModal={openGetUserByIdModal}
                setOpenGetUserByIdModal={setOpenGetUserByIdModal}
                userById={userById}
                setUserById={setUserById}


            />
        </div>
    )
}
export default UserPage;
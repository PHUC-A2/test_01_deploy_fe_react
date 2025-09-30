import { useEffect, useState } from "react";
import { Card, Typography, Button, Layout, Space, Spin, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { getHomeApi } from "../services/api";

const { Title, Text } = Typography;
const { Content, Footer } = Layout;

const HomePage = () => {
    const [chuoi, setChuoi] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const fetchHello = async () => {
        setLoading(true);
        try {
            const res = await getHomeApi();
            console.log(res.data);
            setChuoi(res.data);
            setLoading(false);
        } catch (error) {
            console.error("API Error:", error);
            setChuoi("");
            message.error("Lỗi kết nối API 😢");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHello();
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                        "linear-gradient(135deg, #7F00FF 0%, #E100FF 50%, #FF007F 100%)",
                    padding: 24,
                }}
            >
                <Card
                    style={{ width: 450, borderRadius: 16, textAlign: "center" }}
                    bordered={false}
                    hoverable
                >
                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        <Title level={2} style={{ marginBottom: 0 }}>
                            Welcome to Shopzy!
                        </Title>
                        <Text type="secondary">Trang chủ Shopzy hiển thị dữ liệu từ API</Text>

                        {loading ? (
                            <Spin tip="Đang tải dữ liệu..." size="large" />
                        ) : (
                            <Card
                                type="inner"
                                title="Dữ liệu API"
                                style={{ textAlign: "left" }}
                            >
                                <Text code>{chuoi || "Không có dữ liệu"}</Text>
                            </Card>
                        )}

                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            size="large"
                            block
                            onClick={fetchHello}
                        >
                            Tải lại dữ liệu
                        </Button>
                    </Space>
                </Card>
            </Content>
            <Footer style={{ textAlign: "center", background: "#fafafa" }}>
                © 2025 Shopzy. All rights reserved.
            </Footer>
        </Layout>
    );
};

export default HomePage;

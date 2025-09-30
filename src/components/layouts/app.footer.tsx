import { Footer } from "antd/es/layout/layout";
import { Typography, Space } from "antd";

const { Text, Link } = Typography;

const AppFooter = () => {
    return (
        <Footer
            style={{
                textAlign: "center",
                backgroundColor: "#f0f2f5",
                padding: "24px 50px",
                marginTop: "50px",
            }}
        >
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <Text>
                    © {new Date().getFullYear()} Ẩn sĩ - Dự án React + Vite + TypeScript
                </Text>
                <Text>
                    Liên hệ:{" "}
                    <Link href="mailto:example@email.com" target="_blank">
                        example@email.com
                    </Link>{" "}
                    |{" "}
                    <Link href="https://github.com/" target="_blank">
                        GitHub
                    </Link>
                </Text>
            </Space>
        </Footer>
    );
};

export default AppFooter;

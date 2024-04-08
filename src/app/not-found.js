'use client'

import { ArrowRightOutlined, InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Flex, Layout, Space, Typography } from "antd";


export default function NotFound() {
    return (
        <Layout >
            <Flex style={{ height: "100vh" }} justify="center" align="center">
                <div style={{ textAlign: "center" }}>
                    <InfoCircleOutlined style={{ fontSize: "40px" }} />
                    <Typography.Title>
                        Page note found
                    </Typography.Title>
                    <Typography.Paragraph strong>
                        Please check you url
                    </Typography.Paragraph>
                    <Space wrap>

                        <Typography.Text>
                            Checkout <Typography.Link href="/graph">graph</Typography.Link>
                        </Typography.Text>
                        <Typography.Text >
                            or <Typography.Link>search</Typography.Link> ayah,
                        </Typography.Text>
                        <Typography.Text >you can also <Typography.Link href="/tafsir?chapter=1&verse=1">read quran </Typography.Link>
                            with english and bangla tafsir
                        </Typography.Text>
                    </Space>
                </div>
            </Flex>
        </Layout>
    )
}
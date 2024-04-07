'use client'

import { InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Layout, Typography } from "antd";


export default function NotFound() {
    return (
        <Layout >
            <Flex style={{ height: "100vh" }} justify="center" align="center">
                <div style={{textAlign:"center"}}>
                    <InfoCircleOutlined style={{fontSize:"40px"}}/>
                    <Typography.Title>
                        Page note found
                    </Typography.Title>
                    <Typography.Paragraph strong>
                        Please check you url
                    </Typography.Paragraph>
                </div>
            </Flex>
        </Layout>
    )
}
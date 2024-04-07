import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { Breadcrumb, Flex, Layout } from "antd";

export default function layout({ children }) {

    const breadcrumb = [
        {
            'href': "/",
            'title': <HomeOutlined />
        },
        {
            title: <> <SearchOutlined /> <span>Search</span></>
        }
    ]

    return (
        <Layout>
            <Flex justify="center">
                <Layout style={{
                    maxWidth: "1100px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px"
                }}>
                    <Breadcrumb style={{marginTop:"20px"}} items={breadcrumb} />
                    {children}
                </Layout>
            </Flex>
        </Layout>
    )
}
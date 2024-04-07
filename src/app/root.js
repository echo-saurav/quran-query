'use client'
import { App, ConfigProvider, Layout, theme } from 'antd';

export default function Root({ children }) {
    return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, }}>
            <Layout style={{ minHeight: "100svh" }}>
                <App>
                    {children}
                </App>
            </Layout>
        </ConfigProvider>
    )
}
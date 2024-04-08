import { Space, Typography } from "antd"
const { Paragraph, Link } = Typography;

export default function SearchSuggestions() {
    const suggestions = [
        "Best story",
        "Stars and science",
        "magic",
        "when people die"
    ]

    const onSearch = (q: string) => {
        if (!q) {
            window.location.href = `/search`
            return
        }
        window.location.href = `/search?search=${q}`
    }

    return (
        <Space wrap style={{ marginTop: "20px" }}>
            <Paragraph style={{ margin: 0 }} >Some example for you ,</Paragraph>

            {suggestions.map((v, i) =>
                <Paragraph style={{ margin: 0 }} key={i}>
                    <Link
                        // href={`/search?search=${v}`}
                        onClick={() => { onSearch(v) }}>
                        {v}.
                    </Link>
                </Paragraph>
            )}
        </Space>
    )
}
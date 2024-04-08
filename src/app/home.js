'use client'

import { ArrowRightOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Input, Typography } from "antd";
import { useState } from "react";
import { getQueries, saveQuery } from "./utils/LocalSettings";
const { Title, Paragraph, Text} = Typography;


export default function Home(){
    const [query, setQuery] = useState("")

    const onSearch = (q) => {
        if (!q) {
            window.location.href = `/search`
            return
        }
        saveQuery(q)
        window.location.href = `/search?search=${q}`
    }

    const get_search_autocomplete = () => {
        return getQueries().reverse().map((v, i) => {
            return {
                value: v,
                label: <Text key={i}>{v}</Text>
            }
        })
    }

    return (
        <div>
            <div className="intro">
                <Title style={{ fontSize: "50px" }}>
                    Al-Quran
                </ Title>
                <Paragraph>
                    Using the power of A.I Here you can search Quran by semantic meaning,
                     so you dont have to use correct/exact words to search for something.
                    And also can view the whole quran in one big graph.
                </Paragraph>
                <Paragraph
                    strong
                    type='secondary'
                    style={{ marginBottom: '5px', marginTop: "10px" }}>
                    You can search bellow
                </Paragraph>

                <AutoComplete
                    style={{ width: "100%" }}
                    onSelect={onSearch}
                    value={query}
                    autoFocus
                    // onSearch={onSearch}
                    options={get_search_autocomplete()}>

                    <Input.Search
                        placeholder="Search ayah"
                        onChange={(e) => { setQuery(e.target.value) }}
                        onSearch={onSearch}
                        size='large'
                        allowClear
                        enterButton
                    />
                </AutoComplete>

                <Paragraph
                    strong
                    type='secondary'
                    style={{ marginBottom: '5px', marginTop: "13px" }}>
                    or explore here
                </Paragraph>
                <Button
                    href="/graph"
                    type='primary'
                    icon={<ArrowRightOutlined />}>
                    Explore graph
                </Button>
            </div>
        </div>
    )

}
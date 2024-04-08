'use client'

import { Affix, AutoComplete, Collapse, Divider, Flex, Input, Layout, List, Skeleton, Space, Switch, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getLanguageSettings, getQueries, saveLanguageSettings, saveQuery } from "../utils/LocalSettings";
import { search_similar_quran_verses } from "../utils/backend";
import { ArrowRightOutlined, InfoCircleFilled } from "@ant-design/icons";


const { Title, Paragraph, Text, Link } = Typography;

export default function Search() {
    const searchParms = useSearchParams()
    const [query, setQuery] = useState(searchParms.get("search"))
    //
    const [verses, setVerses] = useState([])
    const [isLoading, setLoading] = useState(true)
    //
    const [enableBangla, setBangla] = useState(getLanguageSettings().getBn)
    const [enableEnglish, setEnglish] = useState(getLanguageSettings().getEn)
    const [enableArabic, setArabic] = useState(getLanguageSettings().getAr)



    const onSearch = (q) => {
        if (!q) { return }
        setLoading(true)
        saveQuery(q)
        setQuery(q)

        search_similar_quran_verses(q, 10).then(_data => {
            setVerses(_data)
            setLoading(false)
            // set url without reload site
            if(window){
                window.history.replaceState(null, '', `/search?search=${q}`);
            }
        })
    }

    useState(() => {
        if (query) {
            saveQuery(query)
            onSearch(query)
        }

    }, [])
    const get_search_autocomplete = () => {
        return getQueries().reverse().map((v, i) => {
            return {
                value: v,
                label: <Text key={i}>{v}</Text>
            }
        })
    }


    return (
        <Layout>
            {/* search bar */}
            <Affix offsetTop={0}>
                <Layout style={{ paddingTop: "5px" }}>
                    <AutoComplete
                        autoFocus
                        onSelect={onSearch}
                        value={query ? query : ""}
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
                </Layout>
            </Affix>


            {/* toggle buttons */}
            <TopSwitch
                enableArabic={enableArabic}
                enableBangla={enableBangla}
                enableEnglish={enableEnglish}
                setBangla={(v) => {
                    setBangla(v)
                    saveLanguageSettings(enableEnglish, v, enableArabic)
                }}
                setArabic={(v) => {
                    setArabic(v)
                    saveLanguageSettings(enableEnglish, enableBangla, v)
                }}
                setEnglish={(v) => {
                    setEnglish(v)
                    saveLanguageSettings(v, enableBangla, enableArabic)
                }} />

            {isLoading ? <LoadingCards query={query} /> :
                <SearchResult
                    verses={verses}
                    enableBangla={enableBangla}
                    enableArabic={enableArabic}
                    enableEnglish={enableEnglish}
                />}

        </Layout>
    )
}

function LoadingCards({ query }) {
    if (!query) {
        return (
            <Flex justify="center" align="center" style={{ height: "80svh" }}>
                <Layout style={{ maxWidth: "700px", padding: "20px", textAlign: "center" }}>
                    <Typography>
                        <InfoCircleFilled style={{ fontSize: "40px" }} />
                    </Typography>
                    <Typography.Title level={3}>Search Quran by semantic meaning </Typography.Title>
                    <Typography.Paragraph strong>
                        Enter something in the search field to find your ayah
                    </Typography.Paragraph>
                    <Typography.Link href="/graph">Explore Graph <ArrowRightOutlined /></Typography.Link>
                    <Divider />

                </Layout>
            </Flex>
        )
    }
    return Array.from({ length: 50 }, (_, index) => (
        <Skeleton key={index} />
    ))

}


function TopSwitch({
    setBangla,
    setEnglish,
    setArabic,
    //
    enableBangla = true,
    enableEnglish = true,
    enableArabic = true }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <Text strong >Default Expand</Text>
            <Space style={{ marginLeft: "3px" }} wrap>
                <Switch checkedChildren="English" unCheckedChildren="English"
                    checked={enableEnglish} onChange={(v) => { setEnglish(v) }} />

                <Switch checkedChildren="Bangla" unCheckedChildren="Bangla"
                    checked={enableBangla} onChange={(v) => { setBangla(v) }} />

                <Switch checkedChildren="Arabic" unCheckedChildren="Arabic"
                    checked={enableArabic} onChange={(v) => { setArabic(v); }} />
            </Space>
        </div>
    )
}

function SearchResult({ verses,
    enableBangla = true,
    enableEnglish = true,
    enableArabic = true }) {

    return (
        <div>
            {verses.map((v, i) => (
                <Ayah
                    key={i}
                    // switch
                    enableBangla={enableBangla}
                    enableArabic={enableArabic}
                    enableEnglish={enableEnglish}
                    //
                    en={v.ayahs.verse_en}
                    bn={v.ayahs.verse_bn}
                    ar={v.ayahs.verse_ar}
                    title={v.surah_name}
                    distance={v.distance}
                />
            ))}
        </div>
    )
}


function Ayah({ title, en, bn, ar, distance,
    enableBangla = true,
    enableEnglish = true,
    enableArabic = true
}) {
    return (
        <div style={{ width: "100%", }}>
            <Flex align="center" justify="start">
                <Title style={{ textWrap: "nowrap" }} level={3}>{title}</Title>
                <Title style={{ textWrap: "nowrap", marginLeft: "5px" }} type="secondary" level={4}>
                    {`${cosineDistanceToPercentage(distance)}%`}
                </Title>
            </Flex>

            <Collapse size="small"
                defaultActiveKey={[
                    enableArabic ? 'ar' : 'ar_none',
                    enableEnglish ? 'en' : 'en_none',
                    enableBangla ? 'bn' : 'bn_none'
                ]}
                items={[
                    { key: 'ar', label: "Arabic", children: <TextList textArray={ar} rightSided /> },
                    { key: 'en', label: "English", children: <TextList textArray={en} /> },
                    { key: 'bn', label: "Bengali", children: <TextList textArray={bn} /> },
                ]}
            />
        </div>
    )
}

function TextList({ textArray, rightSided = false }) {

    return (
        <List size="small" >
            {textArray.map((t, k) =>
                <List.Item key={k}
                    extra={
                        <div style={{ margin: "3px", width: "100px", textAlign: "right" }}>
                            <Paragraph strong style={{ margin: 0 }} type="secondary">
                                Chapter: {t.chapter}
                            </Paragraph>
                            <Paragraph strong style={{ margin: 0 }} type="secondary">
                                Verse: {t.verse}
                            </Paragraph>
                            <Link style={{ textWrap: "nowrap" }} href={`/tafsir?chapter=${t.chapter}&verse=${t.verse}`}>
                                Read Tafsir
                            </Link>
                        </div>
                    }>
                    <div style={{ textAlign: rightSided ? "right" : "left", width: "100%" }}>
                        {t.text.trim()}
                    </div>
                </List.Item>)}
        </List>
    )
}


function cosineDistanceToPercentage(cosine) {
    const percentage = ((50 * cosine) - 100) * -1;
    return parseFloat(percentage.toFixed(1));
}



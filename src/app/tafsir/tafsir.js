'use client'

import { Affix, Button, Col, Divider, Flex, Layout, Row, Skeleton, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import outline from "./outline.json"
import { get_explanations } from "../utils/backend";
import { getDefaultTafsirTab, setDefaultTafsirTab } from "../utils/LocalSettings";
import ChapterMenu from "./ChapterMenu";
import { ArrowLeftOutlined, ArrowRightOutlined, SearchOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function Tafsir() {
    const searchParms = useSearchParams()
    const [chapter_no, setChapter_no] = useState(searchParms.get("chapter"))
    const [verse_no, setVerse_no] = useState(searchParms.get("verse"))
    const [total_verse, setTotal_verse] = useState(0)
    const [data, setData] = useState(null)
    //
    const [openMenu, setOpenMenu] = useState(false)

    const onOpenMenu = () => {
        setOpenMenu(true)
    }

    const getTotal = (chapter_no) => {

        for (let i = 0; i < 114; i++) {
            if (outline[i].chapter_no === Number(chapter_no)) {
                return Number(outline[i].total_verses)
            }
        }
        return -1
    }

    const goToPage = (new_chapter, new_verse) => {
        setChapter_no(new_chapter)
        setVerse_no(new_verse)
        window.history.replaceState(null, '', `/tafsir?chapter=${new_chapter}&verse=${new_verse}`);

    }


    const goNext = () => {
        let new_verse = 0
        let new_chapter = 0

        if (Number(verse_no) < Number(total_verse)) {
            new_verse = Number(verse_no) + 1
            new_chapter = Number(chapter_no)
        } else {

            if (Number(chapter_no) < Number(114)) {
                new_chapter = Number(chapter_no) + 1
                new_verse = 1

            } else {
                new_chapter = 1
                new_verse = 1
            }
        }
        goToPage(new_chapter, new_verse)
    }


    const goPrev = () => {
        let new_verse = 0
        let new_chapter = 0

        // if at 1st page of a chapter
        if (1 < Number(chapter_no) && 1 === Number(verse_no)) {
            new_chapter = Number(chapter_no) - 1
            new_verse = getTotal(new_chapter)
        }


        if (1 < Number(verse_no)) {
            new_verse = Number(verse_no) - 1
            new_chapter = Number(chapter_no)
        }


        goToPage(new_chapter, new_verse)
    }

    useEffect(() => {
        
        if (!chapter_no || !verse_no) {

            get_explanations(1, 1, 1).then((v) => {
                if (v && v[0]) {
                    setData(v[0])
                    setTotal_verse(getTotal(Number(chapter_no)))
                    console.log(v[0])


                }
            })
        } else {
            get_explanations(chapter_no, verse_no, 1).then((v) => {
                if (v && v[0]) {
                    setData(v[0])
                    setTotal_verse(getTotal(Number(chapter_no)))
                    console.log(v[0])

                }
            })
        }

    }, [chapter_no, verse_no])






    const getEng = () => { return data.text.split('\n').map((t, i) => <Paragraph key={i}>{t}</Paragraph>) }
    const getBn = () => { return data.text_bn.split('\n').map((t, i) => <Paragraph key={i}>{t}</Paragraph>) }
    const getTabItems = () => {
        if (data) {

            return [
                {
                    key: 'en',
                    label: 'English Tafsir',
                    children:
                        <div>
                            <Paragraph type="secondary">
                                English Tafsir is from <strong>Ibn Kathir</strong>
                            </Paragraph>
                            {getEng()}
                        </div>
                },
                {
                    key: 'bn',
                    label: 'Bangla Tafsir',
                    children: <div>
                        <Paragraph type="secondary">
                            Bangla Tafsir is from <strong>আহসানুল বায়ান</strong>
                        </Paragraph>
                        {getBn()}
                    </div>
                },
            ]
        } else {
            return []
        }
    }
    if (!data) {
        return <Flex justify="center">
            <Layout style={{ maxWidth: "700px", padding: "20px" }}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </Layout>
        </Flex>
    }

    return (

        <>
            <Flex justify="center">
                <Layout style={{ maxWidth: "700px", padding: "20px" }}>

                    <Flex justify="space-between" >
                        <Title level={3}>{data.surah_name}</Title>
                        <Title level={3} >{data.surah_arabic_name}</Title>
                    </Flex>
                    <Divider />

                    <Affix offsetTop={0}>
                        <Layout style={{ paddingBottom: "10px" }}>
                            <Row align="middle">
                                <Col style={{ marginRight: "10px" }}>
                                    <Button href="/search" icon={<SearchOutlined />}></Button>
                                </Col>
                                <Col onClick={() => { onOpenMenu() }} style={{ padding: "5px", cursor: "pointer" }}>
                                    <Text strong type="secondary" level={3}>{data.surah_english_name}</Text>
                                    <Paragraph strong style={{ margin: 0 }}>
                                        Chapter: {data.chapter_no} | Verse: {data.verse_no}
                                    </Paragraph>
                                </Col>
                            </Row>
                        </Layout>
                    </Affix>
                    <Divider style={{ margin: 0 }} />

                    <div style={{ marginBottom: "20px" }}>
                        <Title level={3} style={{ textAlign: "end" }}>{data.verse_ar}</Title>
                        <Title level={3}>{data.verse_en}</Title>
                        <Title level={3}>{data.verse_bn}</Title>
                        <Button.Group style={{ marginTop: "20px" }}>
                            <Button
                                disabled={Number(chapter_no) === 1 && Number(verse_no) === 1}
                                onClick={() => { goPrev() }} type="primary" icon={<ArrowLeftOutlined />}>Previous</Button>
                            <Button
                                disabled={Number(chapter_no) === 114 && Number(verse_no) === 6}
                                onClick={() => { goNext() }} type="primary" icon={<ArrowRightOutlined />}>Next</Button>
                        </Button.Group>
                    </div>

                    <Tabs
                        onChange={(t) => setDefaultTafsirTab(t)}
                        defaultActiveKey={getDefaultTafsirTab()}
                        items={getTabItems()} />
                </Layout>
            </Flex>
            <ChapterMenu
                open={openMenu}
                setOpen={setOpenMenu}
                goToPage={goToPage} />
        </>
    )
}
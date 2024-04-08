'use client'

import { Drawer, List } from "antd";
import outline from "./outline.json"
import { useEffect, useState } from "react";


export default function ChapterMenu({ open, setOpen, goToPage }) {
    const [openVerseMenu, setOpenVerseMenu] = useState(false)
    const [chapter, setChapter] = useState(0)
    const [width, setWidth] = useState(window.innerWidth);
    const [isMobile, setMobile] = useState(width <= 768)

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
        setMobile(window.innerWidth <= 768)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);


    const onSelectChapter = (i) => {
        setChapter(i)
        setOpenVerseMenu(true)
    }

    const getTotal = (chapter_no) => {

        for (let i = 0; i < 114; i++) {
            if (outline[i].chapter_no === Number(chapter_no)) {
                return Number(outline[i].total_verses)
            }
        }
        return -1
    }



    return (
        <>
            <Drawer
                open={open}
                title="Go to Chapters"
                onClose={() => { setOpen(false) }}
                placement={isMobile ? "bottom" : "right"}>

                <List >
                    {outline.map((v, i) => (
                        <List.Item onClick={() => { onSelectChapter(i + 1) }} key={i}>
                            Chapter {v.chapter_no}
                            <List.Item.Meta title={v.surah_name} ></List.Item.Meta>
                        </List.Item>
                    ))}
                </List>


                {/* verse menu */}
                <Drawer
                    open={openVerseMenu}
                    title="Select verse number"
                    onClose={() => { setOpenVerseMenu(false) }}
                    placement={isMobile ? "bottom" : "right"}>

                    <List >
                        {Array.from({ length: getTotal(chapter) }, (_, index) => (
                            <List.Item
                                onClick={() => {
                                    goToPage(chapter, index + 1)
                                    setOpenVerseMenu(false)
                                    setOpen(false)
                                }}
                                key={index}>
                                Verse {index + 1}
                            </List.Item>
                        ))}
                    </List>
                </Drawer>
            </Drawer>


        </>
    )
}
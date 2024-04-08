'use client'
import { ArrowLeftOutlined, InfoOutlined, LoadingOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, FloatButton, List, Spin, Typography } from "antd";
import ForceGraphWrapper from "./ForceWrapper"
import { useEffect, useRef, useState } from "react";
import { get_projection } from "../utils/backend";

const { Title, Paragraph, Link } = Typography;

export default function GraphView() {
    const graphRef = useRef(null)
    const [vectors, setVectors] = useState(null)
    const [open, setOpen] = useState(false)
    const [selectedNode, setSelectedNode] = useState(null)
    //
    const [width, setWidth] = useState(0);
    const [isMobile, setMobile] = useState(width <= 768)

    const [info, setInfoOpen] = useState(false)


    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
        setMobile(window.innerWidth <= 768)
    }
    useEffect(() => {
        get_projection().then((d) => {
            console.log(d)
            setVectors(d)
        })
    }, [])

    useEffect(() => {
        setWidth(window.innerWidth)
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);



    function handleClick(node) {
        console.log(node)
        setSelectedNode(node)
        setOpen(true)

        const distance = 100;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        if (!graphRef.current) { return }

        graphRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );
    }


    // double click

    let clicks = 0;
    let timer;
    function doubleClickHandler(node) {
        clicks++;
        if (clicks === 1) {
            timer = setTimeout(function () {
                clicks = 0;
            }, 300); // Adjust the time frame here (in milliseconds) as per your preference
        } else if (clicks === 2) {
            clearTimeout(timer);
            clicks = 0;

            // console.log("Double click detected!");
            handleClick(node)
        }
    }


    function getUniqueColor(numbers) {
        const hue = numbers * (340 / 114);
        const saturation = 70
        const lightness = 50
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    return (
        <div style={{ background: "black" }}>
            {vectors ?

                <ForceGraphWrapper
                    ref={graphRef}
                    nodeOpacity={.8}
                    graphData={vectors}
                    cooldownTicks={0}
                    cooldownTime={0}
                    nodeRelSize={10}
                    enableNodeDrag={false}
                    nodeLabel={node => node.surah_name}
                    nodeAutoColorBy="surah_name"
                    // nodeAutoColorBy={node => getUniqueColor(node.verse_en[0].chapter)}
                    nodeResolution={15}
                    // onNodeClick={handleClick}
                    onNodeClick={doubleClickHandler}
                /> :
                <Flex style={{height:"100vh"}} justify="center" align="center">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
                </Flex>
            }
            <FloatButton.Group
                type="primary"
                icon={<MenuOutlined />}
                trigger={isMobile ? "click" : "hover"}>

                <FloatButton
                    type="primary"
                    onClick={() => { setInfoOpen(true) }} icon={<InfoOutlined />} />

                <FloatButton
                    type="primary"
                    href="/"
                    icon={<ArrowLeftOutlined />} />

                <FloatButton
                    type="primary"
                    href="/search"
                    icon={<SearchOutlined />} />

            </FloatButton.Group>


            <Drawer
                placement={isMobile ? "bottom" : "right"}
                open={info}
                onClose={() => { setInfoOpen(false) }}
                title="The Quran">
                <Title level={3}>Graph view</Title>
                <Paragraph>
                    Welcome into this 3D experience, where each node represents a meaningful fragment of a Quranic verse.
                    These nodes dont simply float around at random; instead, they form cohesive groups
                    with similar themes and ideas or meaning. Imagine diving into a cluster of interconnected verses,
                    all discussing related topics and concepts.
                    As you navigate through our immersive 3D environment,
                    you will gracefully transition from one thematic constellation to another,
                    creating a captivating journey through the heart of the divine revelations
                </Paragraph>
                <Paragraph strong>
                    Double click any node to see its quotes. You can more around by dragging the view
                </Paragraph>
                <Paragraph type="danger">
                    As this this page load almost 6,236 verse from quran, it can drain your battery
                    if you are using mobile
                </Paragraph>

                <Button onClick={() => { setInfoOpen(false) }} type="primary">Ok understood</Button>

            </Drawer>

            <Drawer
                title={selectedNode ? selectedNode.surah_name : ""}
                placement={isMobile ? "bottom" : "right"}
                onClose={() => { setOpen(false) }}
                open={open}>

                {selectedNode && <List>
                    {selectedNode.verse_en.map(((v, i) =>
                        <List.Item
                            extra={
                                <Link href={`/tafsir?chapter=${v.chapter}&verse=${v.verse}`}>
                                    {` Read tafsir `}
                                </Link>
                            }
                            key={i}>
                            <List.Item.Meta
                                title={`Chapter: ${v.chapter} | Verse: ${v.verse}`} />
                            {v.text}
                        </List.Item>
                    ))}
                </List>}
            </Drawer>
        </div>
    )
}

import { Suspense } from "react";
import Tafsir from "./tafsir";


export default function TafirPage() {
    return (
        <Suspense>
            <Tafsir />
        </Suspense>
    )
}
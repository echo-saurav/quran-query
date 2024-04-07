'use client'
import { Typography } from "antd";
import Welcome from "./Welcome";

export default function HomePage({text}) {
  return (
    <main >
      <div>
        <Typography.Title>{text}</Typography.Title>
        <Welcome/>
      </div>
    </main>
  );
}

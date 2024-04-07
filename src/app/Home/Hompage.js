'use client'
import { Typography } from "antd";
import Welcome from "./Welcome";

export default function HomePage({text,api}) {
  return (
    <main >
      <div>
        <Typography.Title>{text}</Typography.Title>
        <Typography.Title>{api}</Typography.Title>
        <Welcome/>
      </div>
    </main>
  );
}

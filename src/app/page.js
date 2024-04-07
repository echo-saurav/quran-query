import HomePage from "./Home/Hompage";


export default function Home() {
  return (
    <main>
      <HomePage text={process.env.TEXT}/>
    </main>
  );
}

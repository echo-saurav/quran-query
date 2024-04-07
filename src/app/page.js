import HomePage from "./Home/Hompage";


export default function Home() {
  return (
    <main>
      <HomePage 
      api={process.env.WEAVIATE_API}
      text={process.env.TEXT}/>
    </main>
  );
}

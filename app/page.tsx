import { PrismaClient } from "@prisma/client/extension";
import BBSCardList from "./components/BBSCardList";
import { BBSData } from "./types/types";


async function getBBSAllData() {
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store" // SSR
  });
  
  const bbsAllData: BBSData[] = await response.json();

  return bbsAllData;
};

export default async function Home() {
  const bbsAllData = await getBBSAllData();

  return (
    <main className="">
      <BBSCardList bbsAllData= {bbsAllData}/>
    </main>
  );
}

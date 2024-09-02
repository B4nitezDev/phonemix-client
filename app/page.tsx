import { YouRequest } from "./components/you-request/youRequest";
import { YouResponse } from "./components/you-response/youResponse";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  pt-12 bg-[#000113]">
      <h1 className="text-white text-[24px]">Phonemix | AI Tools</h1>
      <div className="flex flex-wrap items-center gap-20 pt-[50px]">
      <YouRequest/>
      <YouResponse/>
      </div>
    </main>
  );
}

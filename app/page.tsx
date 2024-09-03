import { YouRequest } from "./components/you-request/youRequest";
import { YouResponse } from "./components/you-response/youResponse";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  pt-8 bg-[#000113]">
      <h1 className="text-white text-[18x]">Phonemix | AI Tools</h1>
      <div className="flex flex-wrap items-center gap-20 pt-[20px]">
      <YouRequest/>
      <div className="w-px bg-gray-600 h-[600px]"></div>
      <YouResponse/>
      </div>
    </main>
  );
}

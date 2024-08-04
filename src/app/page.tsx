import Quiz from "@/components/quiz";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <header className="py-8 px-10 ">
          <h4 className="text-lg capitalize text-center font-merienda text-orange ">QuizWizdom</h4>
      </header>

      <main className="pb-20 flex flex-1 flex-col items-center justify-center ">
        <Quiz/>
        
      </main>
    </div>
  );
}

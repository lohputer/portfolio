

export default function Home() {
  return (
    <main className="bg-yellow-100 flex min-h-screen flex-col items-centers">
      <nav className="fixed p-5 z-20 w-full font-mono text-md gap-5 flex flex-row justify-between bg-orange-500 border-b-4 border-b-yellow-400">
        <div className="flex flex-row float-left gap-5 justify-center items-center">
          <a className="z-20 text-xl lg:text-2xl text-yellow-400 font-bold" href="#aboutme">lohputer</a>
          <a className="z-20 text-base lg:text-lg text-yellow-100 font-semibold" href="">Writings</a>
        </div>
        <div className="flex flex-row float-right gap-5">
          <a className="z-20 text-base lg:text-lg text-yellow-100 font-semibold" href="https://github.com/lohputer">GitHub</a>
        </div>
      </nav>
      <br className="m-5" />
      <div className="mt-20 z-10 items-center justify-center font-mono text-md flex flex-col w-full">
        <p className="text-center text-base md:text-xl text-orange-500">Hi I&apos;m</p>
        <h1 className="text-center text-2xl md:text-4xl text-orange-500 font-semibold">lohputer</h1>
        <div id="aboutme" className="max-h-max rounded-3xl border-4 border-yellow-400 bg-orange-500 py-4 px-8 lg:py-8 m-10 md:grid md:grid-cols-2 md:grid-flow-row gap-5 w-4/5">
          <div className="text-yellow-100 h-full items-left justify-center flex flex-col py-4">
            <h1 className="mb-2 text-left text-xl md:text-2xl lg:text-3xl font-semibold">About Me</h1>
            <p className="text-left text-sm md:text-base lg:text-xl">I am Lyndon, member of EC<sup>3</sup> [Electronics, Communications & Computing Club]. I am an aspiring web developer/writer/duck collector, none of which I am reaching but I hope to be able to get somewhat close :D </p>
          </div>
          <img src="bread.jpeg" className="rounded-3xl"></img>
        </div>
        <h1 className="text-center text-2xl md:text-4xl text-orange-500 font-semibold">My Programming Languages</h1>
        <div id="lang" className="py-4 px-8 lg:py-8 m-5 flex flex-wrap">
          
        </div>
      </div>
    </main>
  );
}

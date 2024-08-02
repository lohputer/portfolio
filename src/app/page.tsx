

export default function Home() {
  return (
    <main className="bg-orange-500 flex min-h-screen flex-col items-centers">
      <nav className="fixed p-5 z-10 w-full font-mono text-md gap-5 flex flex-row">
        <a className="text-sm md:text-base lg:text-lg text-yellow-400" href="https://github.com/lohputer">GitHub</a>
        <a className="float-right text-base lg:text-lg text-yellow-400" href="">Idk</a>
      </nav>
      <div className="pt-20 z-10 items-center justify-center font-mono text-md lg:flex lg:flex-col w-full">
        <p className="text-center text-sm lg:text-xl text-yellow-400">Hi I'm</p>
        <h1 className="text-center text-2xl lg:text-4xl text-yellow-400 font-semibold">lohputer</h1>
      </div>
    </main>
  );
}

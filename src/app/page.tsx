

export default function Home() {
  return (
    <main className="bg-orange-500 flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex lg:flex-col ">
        <nav className="border border-4 z-10 w-full max-w-5xl items-left justify-left gap-5 font-mono text-sm flex flex-wrap">
          <a className="text-yellow-400" href="https://github.com/lohputer">GitHub</a>
          <a className="text-yellow-400" href="">Idk</a>
        </nav>
        <p className="text-center text-yellow-400">Hi I'm</p>
        <h1 className="text-center text-2xl text-yellow-400 font-semibold">lohputer</h1>
      </div>
    </main>
  );
}

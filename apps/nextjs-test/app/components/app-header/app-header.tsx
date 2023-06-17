import Link from 'next/link'

const AppHeader = () => {
  return (
    <header className="border-2 border-cyan-400 mx-auto">
      <h1 /*className={AppHeaderFont.className}*/>tyl3rc0d3r</h1>
      <br />
      <h2 /*className={CardHeaderFont.className}*/>
        Fullstack software development for web, gaming, & mixed-reality.
      </h2>

      {/* <nav>
        <Link href="/">Home</Link>
        <Link href="/games">Games</Link>
      </nav> */}
    </header>
  );
}

export default AppHeader;
export default function NavBar() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-opacity-50 p-4 backdrop-blur-lg">
      <div className="block flex-none md:hidden">{/* <MobileMenu /> */}</div>
    </nav>
  );
}

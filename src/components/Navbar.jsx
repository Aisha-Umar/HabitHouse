function Navbar() {
  return (
    <nav className="bg-purple-900 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-purple-900">
          H
        </div>
        <span className="text-white font-bold text-lg">HabitHouse</span>
      </div>

      <div className="flex items-center gap-6">
        <a href="/dashboard" className="text-purple-100 hover:text-yellow-400 font-medium text-sm">
          Dashboard
        </a>
        <a href="/chores" className="text-purple-100 hover:text-yellow-400 font-medium text-sm">
          Chores
        </a>
        <a href="/children" className="text-purple-100 hover:text-yellow-400 font-medium text-sm">
          Children
        </a>
        <button className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300">
          Log Out
        </button>
      </div>
    </nav>
  )
}
export default Navbar
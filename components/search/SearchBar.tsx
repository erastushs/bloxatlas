export default function SearchBar() {
  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <input
        type="text"
        placeholder="Search Roblox games..."
        className="
          w-full
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900
          px-4
          py-3
          outline-none
          focus:border-cyan-500
        "
      />
    </div>
  )
}

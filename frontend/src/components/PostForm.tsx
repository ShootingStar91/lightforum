export const PostForm = () => {
  return (
    <div className="mt-6 bg-sky-200">
      <div className="bg-sky-400 text-white p-2"><div>Reply to thread</div></div>
      <textarea className="p-2 mx-auto h-32 w-[100%] text-left" />
      <div className="flex justify-end"><button>Send</button></div>
    </div>
  )
}
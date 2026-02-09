export default async function UserProfile({params} : any){
    const { id } = await params;
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
            <div className="w-full max-w-2xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">Profile</h1>
                <p className="text-4xl text-cyan-400 text-center font-semibold">You are on Profile Page {id}</p>
            </div>
        </div>
    )
}
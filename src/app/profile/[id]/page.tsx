export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Profile Page 
            <span className=" p-2 rounded bg-orange-500 ml-2">{params.id}</span></h1>
        </div>
    )
}
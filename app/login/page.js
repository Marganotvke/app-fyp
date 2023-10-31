export default function Login(){
    return <>
      <div className="flex flex-wrap h-[calc(100vh-3.75rem)] mx-auto w-full justify-center bg-center bg-cover bg-[url(https://i.natgeofe.com/n/cb873b6f-18ff-4647-8dc0-82b62e9d5849/hong-kong-travel_16x9.jpg)]">
        <div className="flex flex-wrap w-full backdrop-blur-sm items-center justify-center">
          <div className="flex border rounded-xl px-12 py-5 bg-slate-800 items-center justify-center">
            <div className="flex flex-col gap-8 justify-center items-center">
              <h2 className="text-2xl text-white font-bold">Welcome to FYP</h2>
              <div className="flex flex-col gap-2">
                <label className="text-white" htmlFor="account">Email</label>
                <input className="border rounded-md p-2 text-black font-light" type="text" id="account" name="account" placeholder="XXX@xxx.com"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white" htmlFor="password">Password</label>
                <input className="border rounded-md p-2 text-black font-light" type="password" id="password" name="password" placeholder="6-12 characters"/>
              </div>
              <div className="flex w-full gap-10">
                <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-5 rounded">
                  Login
                </button>
                <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-5 rounded">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  }
  

export function Logo()
{
    return (
    <div className ="flex items-center justify-center">
        <div >
            <p className= "font-black font-Ubuntu font-500 text-8xl">
             KIN
             </p>
        </div>
        <div className="-translate-x-30">
        <img src = "./logo.png" className="h-60 w-80">
        </img>
        </div>
        <div className="-translate-x-60">
        <p className= "font-black font-Ubuntu font-500 text-8xl">
            RA
        </p>
        </div>
    </div>
    )
}
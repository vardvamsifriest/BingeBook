interface logovariant {
    variant:"primary"|"secondary"
}
export function Logo(props:logovariant)
{
    return (
        <div>
            {props.variant=="primary" ?<img src ="./logo.png" className="w-120 h-120" /> : <img src= "./logo2.png" className="w-120 h-120"/>}
        </div>
    )
}
interface crossprops {
    onClick:()=>void
}
export function CrossIcon(props:crossprops)
{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" onClick={props.onClick} viewBox="0 0 24 24" fill="none" stroke="#7E8B56 " strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    )
}
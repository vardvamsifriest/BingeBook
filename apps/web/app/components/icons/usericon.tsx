interface colorprops {
    "variant":"primary"|"secondary"

}
const variantStyles = {
"primary":"text-accent",
"secondary":"text-background"
}
export function UserIcon(props:colorprops)
{
    return (
        
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className={variantStyles[props.variant]}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/></svg>
    )
}
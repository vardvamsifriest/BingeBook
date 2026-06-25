interface StarProps {
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent<SVGSVGElement>) => void;
  fillstate:"empty" |"half"| "filled"
}
export function StarIcon(props:StarProps)
{
    return  (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" fill={
            props.fillstate === "filled"
              ? "#BDBC70"
              : props.fillstate === "half"
              ? "url(#halfFill)"
              : "none"
          } onClick={props.onClick} height="40" viewBox="0 0 24 24"  stroke="#7A8A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="lucide lucide-star-icon lucide-star" onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave} onMouseMove={props.onMouseMove}> <defs>
        <linearGradient id="halfFill">
          <stop offset="50%" stopColor="#BDBC70" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
    )
}
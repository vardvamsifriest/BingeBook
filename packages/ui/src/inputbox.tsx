interface inputprops {
    placeholder:string,
    id:string
}
export function InputBox(props:inputprops)
{
    return (
        <div>
            <div>
            <label htmlFor = {props.id} className="font-geist text-primary text-xl">{props.id}</label>
            </div>
            <input type="text" placeholder={props.placeholder} className="bg-olive-400 rounded-md text-md" />
        </div>
    )
}
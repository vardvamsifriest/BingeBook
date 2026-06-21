interface inputprops {
    placeholder:string,
    id:string
}
export function InputBox(props:inputprops)
{
    return (
        <div>
            <div>
            <label htmlFor = {props.id} className="font-geist text-primary text-md">{props.id}</label>
            </div>
            <input type="text" placeholder={props.placeholder} className="bg-accent outline-2 outline-gray-900 rounded-md text-md" />
        </div>
    )
}
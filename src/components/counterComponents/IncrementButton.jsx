import { useDispatch } from "react-redux";
import { increment } from "../../features/counter/counterSlice";


function IncrementButton() {
    const dispatch = useDispatch();
    return(
        <div>
            <button className="bg-green-400 text-2xl p-2 m-2 text-white rounded-full w-44 hover:ring-2 hover:ring-green-600 transition" onClick={() => dispatch(increment())}>Increment</button>
        </div>
    )
}

export default IncrementButton;
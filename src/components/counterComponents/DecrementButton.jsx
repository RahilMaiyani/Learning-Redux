import { useDispatch } from "react-redux";
import { decrement } from "../../features/counter/counterSlice";

function DecrementButton() {

    const dispatch = useDispatch();

    return(
        <div>
            <button className="bg-red-400 text-2xl p-2 m-2 text-white rounded-full w-44 hover:ring-2 hover:ring-red-600 transition" onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    )
    
}

export default DecrementButton
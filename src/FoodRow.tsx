import _ from 'lodash';

export interface IFoodEntry {
  name: string,
  time: number,
  temperature: number,
}

interface IProps {
  food: IFoodEntry,
  onChange: any
}


export function FoodRow(props: IProps) {

  // Makes a mock of event by casting the string to number
  const castEvent = event => {
    return { target: { value: Number(event.target.value) } }
  }

  const inputClasses = "bg-gray-100 border transition-all border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 inline-block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  return (
    <div >
      <form className="flex">
        <input className={inputClasses} value={props.food.name} onChange={props.onChange("name")} placeholder="Food name..." />
        <input className={inputClasses} type="number" value={props.food.time.toString()} onChange={_.flow(castEvent, props.onChange("time"))} />
        <input className={inputClasses} type="number" value={props.food.temperature.toString()} onChange={_.flow(castEvent, props.onChange("temperature"))} />
      </form>
    </div>
  )
}

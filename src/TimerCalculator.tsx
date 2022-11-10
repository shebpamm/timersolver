import { useState } from 'react';

import { IFoodEntry, FoodRow } from "./FoodRow";
import { Instructions } from "./Instructions";
import _ from 'lodash';

function TimerCalculator() {
  const [foods, setFoods] = useState<Array<IFoodEntry>>([{ name: "", time: 0, temperature: 0 }])
  const [targetTemperature, setTargetTemperature] = useState(200);

  const addEntry = () => setFoods([...foods, { name: "", time: 0, temperature: 0 }])

  const updateFood = (idx: number, field: keyof IFoodEntry, event) => {
    const updatedFoods = [...foods];
    //@ts-ignore coz I'm not good at TS
    updatedFoods[idx][field] = event.target.value;

    setFoods(updatedFoods);
  }

  const foodElements = foods.map((food, i) => {

    const onChange = _.curry(updateFood);

    return <FoodRow key={`food-${i}`} food={food} onChange={onChange(i)} />
  })

  let prev = 0;

  const durations = _(foods).filter(food => food.name !== "").sortBy('time').reverse().map((food, i, sortedFoods) => {
    const duration = food.time - (sortedFoods[i + 1]?.time || 0)

    return { name: food.name, duration: duration }
  }).value();

  console.log(durations)

  return (
    <div className="font-body m-16 rounded-lg bg-slate-400 shadow-2xl p-8">
      <h1 className="text-4xl text-center mb-8 font-display italic" onClick={addEntry}>Timer Solver</h1>
      <div className="flex w-full justify-between">
        <h2 className="w-full font-semibold text-l font-body">Name</h2>
        <h2 className="w-full font-semibold text-l font-body">Time (Minutes)</h2>
        <h2 className="w-full font-semibold text-l font-body">Temperature (°C)</h2>
      </div>
      {foodElements}
      <div className="flex justify-between items-start mt-8">
        <input onClick={addEntry} type="button" className="font-body  mr-4 shadow-xl transition-colors bg-stone-700 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded" value="Add new food" />
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">Temperature</span>
          <input size={3} type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={targetTemperature} />
        </div>
      </div>
      <Instructions durations={durations} />
    </div>
  )
}

export default TimerCalculator;

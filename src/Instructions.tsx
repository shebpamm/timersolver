import _ from 'lodash';

interface IProps {
  durations: [{
    name: string,
    duration: number
  }]
}

export function Instructions(props: IProps) {

  // Makes a mock of event by casting the string to number

  return (
    <div className="flex flex-col mt-8 items-center min-h-[30vh]">
      <h2 className="w-full text-center text-4xl mb-8 font-display italic">Instructions</h2>
      <ol className="list-decimal">
        {props.durations.map((food, i) => {

          return (
            <li className='text-xl'><span className='capitalize font-bold'>{food.name}</span>: {food.duration} minutes.</li>
          )

        })}
      </ol>
    </div>
  )
}

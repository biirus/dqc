import data from "../data/models.json";
import { FC, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { DataPoint } from "../types";

type Props = {
  selected: DataPoint;
  onChange: (prop: DataPoint) => void;
};

const dataPoints = Object.keys(data[0]);

export const PropSelect: FC<Props> = (props) => {
  const { selected, onChange } = props;

  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative w-full max-w-3xl z-20 md:w-64">
        <div className="relative w-full overflow-hidden bg-white rounded-lg shadow-md transition-all focus-within:ring-2 focus-within:ring-sky-400">
          <Listbox.Button className="w-full py-4 pl-4 pr-10 text-sm font-semibold text-left text-gray-900 border-none leading-5 focus:outline-none focus:ring-0">
            <span className="block truncate">{selected}</span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full z-10 py-1 mt-2 overflow-auto text-base bg-white shadow-lg max-h-60 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {dataPoints.map((prop) => (
              <Listbox.Option
                key={prop}
                className={({ active }) =>
                  `relative cursor-pointer select-none outline-none py-4 pl-12 pr-4 ${
                    active ? "bg-purple-500 text-white" : "text-gray-900"
                  }`
                }
                value={prop}
              >
                {({ selected, active }) => (
                  <>
                    <div className="inline-flex items-center gap-3">
                      <span className="block truncate">{prop}</span>
                    </div>

                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-purple-600"
                        }`}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

import {
  KeyboardSensor,
  PointerActivationConstraints,
  PointerSensor,
  type PointerSensorOptions,
} from "@dnd-kit/dom";

export const POINTER_SENSOR_ACTIVATION_DELAY = 250;
export const POINTER_SENSOR_ACTIVATION_DISTANCE = 8;
export const POINTER_SENSOR_ACTIVATION_TOLERANCE = 5;

export const SORTABLE_POINTER_SENSOR_OPTIONS = {
  activationConstraints(event) {
    // Touch: hold for 250ms without moving more than 5px.
    return event.pointerType === "touch"
      ? [
          new PointerActivationConstraints.Delay({
            value: POINTER_SENSOR_ACTIVATION_DELAY,
            tolerance: {
              x: POINTER_SENSOR_ACTIVATION_TOLERANCE,
              y: POINTER_SENSOR_ACTIVATION_TOLERANCE,
            },
          }),
        ]
      : // Mouse or pen: move 8px before dragging begins.
        [
          new PointerActivationConstraints.Distance({
            value: POINTER_SENSOR_ACTIVATION_DISTANCE,
          }),
        ];
  },
} satisfies PointerSensorOptions;

export const SORTABLE_KEYBOARD_SENSOR = KeyboardSensor.configure({
  keyboardCodes: {
    ...KeyboardSensor.defaults.keyboardCodes,
    start: ["Space"],
  },
});

export const DEFAULT_SORTABLE_SENSORS = [
  PointerSensor.configure(SORTABLE_POINTER_SENSOR_OPTIONS),
  SORTABLE_KEYBOARD_SENSOR,
];

export { PointerSensor };

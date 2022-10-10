import { ChangeEvent, useCallback, useState } from "react";

export default function useInput<T = HTMLInputElement>(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback((evt: ChangeEvent<T>) => {
    // @ts-expect-error Value does exists
    setValue(evt.target.value);
  }, []);

  return { value, onChange };
}

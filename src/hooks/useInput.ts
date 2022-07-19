import { InputRef } from 'antd';
import { useRef } from 'react';

/**
 * 获取input的value内容
 * @description 兼容原生input和antd Input
 * @returns
 */
function useInput<T = InputRef>(): [React.RefObject<T>, () => string | undefined] {
    const inputRef = useRef<T>(null);
    const getValue = () => {
        const inpElement =
            (inputRef.current as unknown as InputRef)?.input ||
            (inputRef.current as unknown as { value: string });
        return inpElement?.value;
    };
    return [inputRef, getValue];
}

export default useInput;

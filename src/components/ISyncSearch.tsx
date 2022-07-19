import { Input, InputRef } from 'antd';
import { SearchProps } from 'antd/lib/input/Search';
import React, { useState } from 'react';

interface IProps<T> extends SearchProps, React.RefAttributes<InputRef> {
    /**
     * 点击触发事件
     */
    clicktriggle?: (value: string, extral?: Record<string, unknown>) => Promise<T>;
    /**
     * 验证输入内容
     */
    vaildRule?: (value: string) => boolean;
    /**
     * 额外的参数
     */
    extralCallbackParams?: Record<string, unknown>;
    /**
     * 执行回调
     */
    callback?: {
        err: (value: string) => void;
        ok: (result: T) => void;
    };
}

const ISyncSearch = <T extends object>(props: IProps<T>) => {
    const { clicktriggle, vaildRule, extralCallbackParams, callback } = props;
    const inputProps = { ...props };
    delete inputProps.vaildRule;
    delete inputProps.clicktriggle;

    // loading状态
    const [loading, setLoading] = useState<boolean>(false);
    // 输入框校验状态
    const [status, setStatus] = useState<SearchInputStatus>();
    /**
     * 搜索
     * @param value 关键字
     */
    const onSearch = async (value: string) => {
        const isInvalidValue = vaildRule ? vaildRule(value) : true;
        if (!isInvalidValue) {
            setStatus('error');
            callback?.err(value);
        } else {
            setLoading(true);
            if (!clicktriggle) {
                return;
            }
            const res = await clicktriggle?.(value, extralCallbackParams);
            callback?.ok(res);
            setLoading(false);
        }
    };
    return (
        <div>
            <Input.Search
                //  eslint-disable-next-line react/jsx-props-no-spreading
                {...inputProps}
                loading={loading}
                status={status}
                onSearch={onSearch}
            />
        </div>
    );
};

export default ISyncSearch;

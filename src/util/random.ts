/**
 * @description: 创建一个随机16进制色值
 * @param {void}
 * @return {hexTxt} string
 */
export const createRandomColor = () => {
    const hexOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'f'];
    let hexTxt = '#';
    for (let index = 0; index < 6; index += 1) {
        const random = Math.floor(Math.random() * 15);
        hexTxt += hexOptions[random];
    }
    return hexTxt;
};

/**
 * @description : 创建一个随机的x和y坐标
 * @param {xRange} array<number>
 * @param {yRange} Array <number>
 * @return {*}
 */
export const createRandomPath = (xRange = [0, 0], yRange = [0, 0]) => {
    // const xAbsUnit = Math.abs(xRange[0] - xRange[1]);
    // x的最大返回
    const xMinPath = Math.min(...xRange);
    const xMaxPath = Math.max(...xRange);

    const yMinPath = Math.min(...yRange);
    const yMaxPath = Math.max(...yRange);

    const xMove = xMinPath - 0;
    const yMove = yMinPath - 0;

    const xNum = Math.random() * (xMaxPath - xMove) + xMove;
    const yNum = Math.random() * (yMaxPath - yMove) + yMove;

    const xPath = parseInt(xNum.toString(), 10);
    const yPath = parseInt(yNum.toString(), 10);

    return [xPath, yPath];
};

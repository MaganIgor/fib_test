export function makeFibArray(count: number): number[] {
    const arr: number[] = [];
    if(count >= 1) {
        arr.push(1);    
    }
    if (count >= 2) {
        arr.push(1);
    }
    if( count > 2) {
        for (let i = 2; i < count; i++) {
            arr.push(arr[i-1] + arr[i - 2]);
        }
    }
    return arr
}

export {}
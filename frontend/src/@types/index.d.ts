interface LotteryBoxProps {
    // test:string
    onLetClicked:((numbers:number[]) => void);
}

interface LotteryBoxState {
    number: FixedLengthArray<number, 6>;
    effect: boolean;
}

interface LotteryItemProps {
    index: string;
    number: number;
    decrypting: boolean;
    color: string;
}

interface LotteryItemState {
    decryptingDone: string;
    number: number | string;
}
import {TransactionType} from "./TransactionType";
import dayjs from "dayjs";

export default interface Transaction {
    transactionType: TransactionType,
    date: dayjs.Dayjs,
    description: string,
    amount: string,
}
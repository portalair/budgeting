import {TransactionType} from "./TransactionType";

export default interface Transaction {
    transactionType: TransactionType,
    date: Date,
    description: string,
    amount: number,
}
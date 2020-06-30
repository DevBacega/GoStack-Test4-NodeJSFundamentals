import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initBalance: Balance = { income: 0, outcome: 0, total: 0 };

    const calcBalance = this.transactions.reduce<Balance>(
      (prevBalance, currentTransaction) => {
        let { income, outcome } = prevBalance;
        if (currentTransaction.type === 'outcome') {
          outcome += currentTransaction.value;
        } else {
          income += currentTransaction.value;
        }
        return { ...prevBalance, outcome, income, total: income - outcome };
      },
      initBalance,
    );

    return calcBalance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'outcome' && type !== 'income')
      throw Error(
        'Please, check the type of transactions. Must be outcome or income.',
      );
    if (Math.sign(value) === -1)
      throw Error('Value must be a Positive, not a negative.');
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value)
      throw Error('Insufficient balance for the transaction.');

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
